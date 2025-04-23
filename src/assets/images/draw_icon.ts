export interface DrawOmegaOptions {
  outerCircleColor: string;
  innerCircleColor?: string; // 可选参数
}

export function drawOmega(
  ctx: OffscreenCanvasRenderingContext2D,
  options: DrawOmegaOptions,
) {
  ctx.fillStyle = options.outerCircleColor;
  ctx.beginPath();
  ctx.arc(0.5, 0.5, 0.5, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();

  if (options.innerCircleColor !== undefined) {
    ctx.fillStyle = options.innerCircleColor;
  } else {
    ctx.globalCompositeOperation = "destination-out";
  }

  ctx.beginPath();
  ctx.arc(0.5, 0.5, 0.25, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}
