

"use strict";
var entityManager = {

  // "PRIVATE" DATA
  _menu: [],
  _thingmenn : [],
  // "PRIVATE" METHODS
  createMenu: function() {
    this._menu.push(new Menu());
  },
  render: function(ctx) {
    // TODO: Implement this
    this._menu[0].render(ctx);
    // NB: Remember to implement the ._bShowRocks toggle!
    // (Either here, or if you prefer, in the Rock objects)

  }
}
