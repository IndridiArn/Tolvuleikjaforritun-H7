// ============
// SPRITE STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// Construct a "sprite" from the given `image`,
//
function Sprite(image) {
    this.image = image;

    this.width = 140;
    this.height = 190;
    this.scale = 1;
    this.glow = false;
    this.glowColor = "white";
}

Sprite.prototype.drawAt = function (ctx, x, y) {
    if(this.glow === true){
    ctx.shadowBlur = 50;
    ctx.shadowColor = this.glowColor;
    }
    ctx.drawImage(this.image,
                  x, y);
    ctx.shadowBlur = 0;
};

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation) {
    if(this.glow === true){
    ctx.shadowBlur = 50;
    ctx.shadowColor = this.glowColor;
    }
    if (rotation === undefined) rotation = 0;

    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scale);

    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
    ctx.drawImage(this.image,
                  -w/2, -h/2);

    ctx.restore();
    ctx.shadowBlur = 0;
};

Sprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, rotation) {
    if(this.glow === true){
    ctx.shadowBlur = 50;
    ctx.shadowColor = this.glowColor;
    }

    // Get "screen width"
    var sw = g_canvas.width;

    // Draw primary instance
    this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation);

    // Left and Right wraps
    this.drawWrappedVerticalCentredAt(ctx, cx - sw, cy, rotation);
    this.drawWrappedVerticalCentredAt(ctx, cx + sw, cy, rotation);

    ctx.shadowBlur = 0;
};

Sprite.prototype.drawWrappedVerticalCentredAt = function (ctx, cx, cy, rotation) {
    if(this.glow === true){
    ctx.shadowBlur = 50;
    ctx.shadowColor = this.glowColor;
    }

    // Get "screen height"
    var sh = g_canvas.height;

    // Draw primary instance
    this.drawCentredAt(ctx, cx, cy, rotation);

    // Top and Bottom wraps
    this.drawCentredAt(ctx, cx, cy - sh, rotation);
    this.drawCentredAt(ctx, cx, cy + sh, rotation);

    ctx.shadowBlur = 0;
};
