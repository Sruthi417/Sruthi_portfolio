// One-off: split herome into a girl-only cutout and a wall-only layer.
const sharp = require("sharp");

(async () => {
  const SRC = "public/herome.png"; // original figure + wall, sky transparent
  // wall layer is inpainted from the SAME source as the mask (herome-tall.png
  // was an earlier intermediate that no longer ships); keeping it == SRC means
  // wall.png and girl.png share one coordinate system, so the girl can be
  // scaled about her seat and stay glued to the wall edge.
  const TALL = SRC;

  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const W = info.width,
    H = info.height;
  const idx = (x, y) => (y * W + x) * 4;

  // ── Region-grow flood fill to mark wall pixels ──────────────────────────
  // Seeds chosen on obvious wall areas (front face + top ledge), away from her.
  const seeds = [
    [0.2, 0.95], [0.45, 0.9], [0.85, 0.85], [0.95, 0.7], [0.4, 0.72],
    [0.6, 0.78], [0.1, 0.85], [0.3, 0.82], [0.7, 0.82], [0.97, 0.55],
    [0.55, 0.88], [0.5, 0.95], [0.8, 0.92], [0.9, 0.9], [0.35, 0.92],
  ].map(([fx, fy]) => [Math.round(W * fx), Math.round(H * fy)]);
  const TH = 16; // tight: spans smooth wall shading but stops at her dark outline
  const wall = new Uint8Array(W * H);
  const stack = [];
  for (const [sx, sy] of seeds) {
    const p = sy * W + sx;
    if (!wall[p] && data[p * 4 + 3] > 10) {
      wall[p] = 1;
      stack.push(p);
    }
  }
  const dist = (a, b) => {
    const dr = data[a] - data[b],
      dg = data[a + 1] - data[b + 1],
      db = data[a + 2] - data[b + 2];
    return Math.sqrt(dr * dr + dg * dg + db * db);
  };
  while (stack.length) {
    const p = stack.pop();
    const x = p % W,
      y = (p / W) | 0;
    const pi = p * 4;
    const nb = [];
    if (x > 0) nb.push(p - 1);
    if (x < W - 1) nb.push(p + 1);
    if (y > 0) nb.push(p - W);
    if (y < H - 1) nb.push(p + W);
    for (const q of nb) {
      if (wall[q]) continue;
      const qi = q * 4;
      if (data[qi + 3] <= 10) continue; // transparent sky — leave it
      if (dist(pi, qi) <= TH) {
        wall[q] = 1;
        stack.push(q);
      }
    }
  }

  // ── girl.png: keep opaque, non-wall pixels ──────────────────────────────
  const LEFT_CLIP = Math.round(W * 0.6); // drop the faint wall-edge line left of her
  const girl = Buffer.from(data);
  for (let p = 0; p < W * H; p++) {
    const x = p % W;
    if (wall[p] || data[p * 4 + 3] <= 10 || x < LEFT_CLIP) {
      girl[p * 4 + 3] = 0;
    }
  }
  await sharp(girl, { raw: { width: W, height: H, channels: 4 } })
    .png()
    .toFile("public/girl.png");

  // ── wall.png: take the tall image, inpaint the girl's footprint by
  // copying the nearest wall/sky pixel from the left on each row ────────────
  const tall = await sharp(TALL)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const TW = tall.info.width,
    TH2 = tall.info.height;
  const tb = Buffer.from(tall.data);
  // base girl mask, then dilate it so the inpaint also swallows the contact
  // shadow / anti-aliased halo hugging her silhouette
  let mask = new Uint8Array(W * H);
  for (let p = 0; p < W * H; p++) mask[p] = !wall[p] && data[p * 4 + 3] > 10 ? 1 : 0;
  // asymmetric dilation: sideways a little, DOWNWARD a lot (to swallow the
  // contact shadow under her seat), but never UPWARD so the wall's top edge
  // is left intact
  const RX = 14,
    RDOWN = 28;
  const dilate = (src) => {
    const tmp = new Uint8Array(W * H);
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        let v = 0;
        for (let dx = -RX; dx <= RX && !v; dx++) {
          const nx = x + dx;
          if (nx >= 0 && nx < W && src[y * W + nx]) v = 1;
        }
        tmp[y * W + x] = v;
      }
    const out = new Uint8Array(W * H);
    for (let x = 0; x < W; x++)
      for (let y = 0; y < H; y++) {
        let v = 0;
        for (let dy = 0; dy <= RDOWN && !v; dy++) {
          const ny = y - dy; // source above -> mark current (grow downward)
          if (ny >= 0 && tmp[ny * W + x]) v = 1;
        }
        out[y * W + x] = v;
      }
    return out;
  };
  mask = dilate(mask);
  const isGirl = (x, y) => mask[y * W + x] === 1;
  for (let y = 0; y < H; y++) {
    // left -> right, carry last non-girl pixel into girl pixels
    let lx = -1;
    for (let x = 0; x < W; x++) {
      if (isGirl(x, y)) {
        if (lx >= 0) {
          const s = (y * TW + lx) * 4,
            d = (y * TW + x) * 4;
          tb[d] = tb[s];
          tb[d + 1] = tb[s + 1];
          tb[d + 2] = tb[s + 2];
          tb[d + 3] = tb[s + 3];
        }
      } else {
        lx = x;
      }
    }
    // right -> left pass to fix any leading run with no left source
    let rx = -1;
    for (let x = W - 1; x >= 0; x--) {
      if (isGirl(x, y)) {
        if (rx >= 0 && lx < 0) {
          const s = (y * TW + rx) * 4,
            d = (y * TW + x) * 4;
          tb[d] = tb[s];
          tb[d + 1] = tb[s + 1];
          tb[d + 2] = tb[s + 2];
          tb[d + 3] = tb[s + 3];
        }
      } else {
        rx = x;
      }
    }
  }
  await sharp(tb, { raw: { width: TW, height: TH2, channels: 4 } })
    .png()
    .toFile("public/wall.png");

  // ── preview: girl scaled to 90% about her seat, composited over wall ────
  const SCALE = 0.9;
  const seatX = 0.748,
    seatY = 0.51; // her seat as a fraction of the girl canvas
  const gw = Math.round(W * SCALE),
    gh = Math.round(H * SCALE);
  const girlScaled = await sharp("public/girl.png").resize(gw, gh).png().toBuffer();
  const left = Math.round(seatX * W * (1 - SCALE));
  const top = Math.round(seatY * H * (1 - SCALE));
  await sharp("public/wall.png")
    .composite([{ input: girlScaled, left, top }])
    .png()
    .toFile("public/preview.png");

  console.log("done", { W, H, TW, TH2, left, top });
})();
