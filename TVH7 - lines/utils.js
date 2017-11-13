// =====
// UTILS
// =====
 function square(x) {
    return x*x;
};
function wrappedDistSq(x1, y1, x2, y2, xWrap, yWrap) {
    var dx = Math.abs(x2-x1),
	dy = Math.abs(y2-y1);
    if (dx > xWrap/2) {
	dx = xWrap - dx;
    };
    if (dy > yWrap/2) {
	dy = yWrap - dy;
    }
    return this.square(dx) + this.square(dy);
};
function clearCanvas(ctx) {
  var prevfillStyle = ctx.fillStyle;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = prevfillStyle;
}

function fillCircle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

function fillBox(ctx, x, y, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
}
function gameEnd() {
  silfrid.setcurrentTime = 0;
  silfrid.pause();
}
