function thingmenn() {
  Menu.prototype.cx = 0;
  Menu.prototype.cy = 0;

  var g_canvas = document.getElementById("myCanvas");
  var g_canvas_width = g_canvas.width;
  var g_canvas_height = g_canvas.height;

  function Thingmadur() {
    this.cx = g_canvas_width / 5;
    this.cy = g_canvas_height / 3;
  }

  Menu.prototype.update = function(du) {};

  Menu.prototype.render = function(ctx) {

  };
}
