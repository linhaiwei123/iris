require=function c(i,s,a){function u(t,e){if(!s[t]){if(!i[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(p)return p(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var o=s[t]={exports:{}};i[t][0].call(o.exports,function(e){return u(i[t][1][e]||e)},o,o.exports,c,i,s,a)}return s[t].exports}for(var p="function"==typeof require&&require,e=0;e<a.length;e++)u(a[e]);return u}({ChessCtrl:[function(e,t,r){"use strict";cc._RF.push(t,"3b517dIk/BLzq8qyapeQXjl","ChessCtrl"),Object.defineProperty(r,"__esModule",{value:!0});var n=cc._decorator,o=n.ccclass,c=n.property,i=n.requireComponent,s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.tiledSize=cc.size(50,50),e.mapSize=cc.size(5,5),e._debugGrid=!1,e}return __extends(e,t),Object.defineProperty(e.prototype,"debugGrid",{get:function(){return this._debugGrid},set:function(e){this._debugGrid=e,this.drawDebugGrid(this.mapSize)},enumerable:!0,configurable:!0}),e.prototype.onLoad=function(){},e.prototype.getGridPos=function(e,t){var r=(e.x+.5)*this.tiledSize.width,n=(e.y+.5)*this.tiledSize.height;return t?t.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(cc.v2(r,n))):cc.v2(r,n)},e.prototype.drawDebugGrid=function(e){var t=this.getComponent(cc.Graphics);if(t){if(t.clear(),this._debugGrid){for(var r=0,n=e.width;r<n;r++)for(var o=0,c=e.height;o<c;o++){var i=this.getGridPos(cc.v2(r,o));t.circle(i.x,i.y,5)}t.fill()}}else console.warn("cannot find ctx")},e.prototype.drawDebugGridPoint=function(e){var t=this.getComponent(cc.Graphics),r=this.getGridPos(e);t.circle(r.x,r.y,30),t.clear(),t.fillColor=cc.Color.WHITE,t.fill()},__decorate([c()],e.prototype,"tiledSize",void 0),__decorate([c()],e.prototype,"mapSize",void 0),__decorate([c()],e.prototype,"debugGrid",null),e=__decorate([o,i(cc.Graphics)],e)}(cc.Component);r.default=s,cc._RF.pop()},{}],Const:[function(e,t,r){"use strict";var n;cc._RF.push(t,"aa509CcGz9PgLP3wnHshcms","Const"),Object.defineProperty(r,"__esModule",{value:!0}),(n=r.ItemType||(r.ItemType={})).A="A",n.B="B",n.C="C",n.D="D",n.E="E",n.F="F",n.G="G",cc._RF.pop()},{}],GameCtrl:[function(e,t,r){"use strict";cc._RF.push(t,"c22130LuNhFk5zu/AOQMQaW","GameCtrl"),Object.defineProperty(r,"__esModule",{value:!0});var u=e("./ItemCtrl"),n=e("./ChessCtrl"),p=e("./Const"),o=cc._decorator,c=o.ccclass,i=o.property,s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.chessCtrl=null,e.itemPrefab=null,e._preItem=null,e._lock=!1,e}return __extends(e,t),r=e,Object.defineProperty(e,"instance",{get:function(){return r._instance},enumerable:!0,configurable:!0}),e.prototype.onLoad=function(){(r._instance=this)._initChess()},e.prototype._initChess=function(){for(var e=[],t=[p.ItemType.A,p.ItemType.B,p.ItemType.C,p.ItemType.D,p.ItemType.E,p.ItemType.F,p.ItemType.G],r=0,n=32;r<n;r++){var o=t[r%t.length];e.push(o),e.push(o)}e.sort(function(e,t){return Math.random()-.5});for(r=0,n=32;r<n;r++){var c=cc.instantiate(this.itemPrefab).getComponent(u.default),i=r/4>>0,s=r%4,a=this.chessCtrl.getGridPos(cc.v2(s,i));this.chessCtrl.node.addChild(c.node),c.node.position=a;o=e[r];c.init(o)}},e.prototype.onItemTouchEnd=function(i){return __awaiter(this,void 0,void 0,function(){var t,r,n,o,c;return __generator(this,function(e){switch(e.label){case 0:return this._lock?[2]:(this._lock=!0,this._preItem?[3,2]:[4,(this._preItem=i).show()]);case 1:return e.sent(),[3,7];case 2:return this._preItem.type===i.type?[3,4]:(n=this._preItem,this._preItem=i,t=i.show(),r=n.hide(),[4,Promise.all([t,r])]);case 3:return e.sent(),[3,7];case 4:return this._preItem.type!==i.type?[3,7]:[4,i.show()];case 5:return e.sent(),n=this._preItem,this._preItem=null,o=n.dead(),c=i.dead(),[4,Promise.all([o,c])];case 6:e.sent(),e.label=7;case 7:return this._lock=!1,[2]}})})},e._instance=null,__decorate([i(n.default)],e.prototype,"chessCtrl",void 0),__decorate([i(cc.Prefab)],e.prototype,"itemPrefab",void 0),e=r=__decorate([c],e);var r}(cc.Component);r.default=s,cc._RF.pop()},{"./ChessCtrl":"ChessCtrl","./Const":"Const","./ItemCtrl":"ItemCtrl"}],ItemCtrl:[function(e,t,r){"use strict";cc._RF.push(t,"75c3do1Q3xDBbiszzTiImAc","ItemCtrl"),Object.defineProperty(r,"__esModule",{value:!0});var d,n,o=e("./GameCtrl"),c=e("./ResCtrl"),i=cc._decorator,s=i.ccclass,a=i.property;(n=d||(d={}))[n.SHOW=2]="SHOW",n[n.HIDE=2]="HIDE",n[n.DEAD=3]="DEAD";var u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.contentSpr=null,e.anim=null,e._state=null,e._type=null,e}return __extends(e,t),Object.defineProperty(e.prototype,"type",{get:function(){return this._type},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"state",{get:function(){return this._state},enumerable:!0,configurable:!0}),e.prototype.init=function(e){this._type=e,this.node.on("touchend",this._onTouchEnd,this),this.contentSpr.spriteFrame=c.default.instance.itemAtlas.getSpriteFrame(this._type)},e.prototype._onTouchEnd=function(){o.default.instance.onItemTouchEnd(this)},e.prototype.show=function(){var n=this;return new Promise(function(e,t){n._state=d.SHOW;var r=n.anim.getAnimationState("ItemShow");r.wrapMode=cc.WrapMode.Normal,n.anim.play("ItemShow"),r.once("finished",e)})},e.prototype.hide=function(){var n=this;return new Promise(function(e,t){n._state=d.HIDE;var r=n.anim.getAnimationState("ItemShow");r.wrapMode=cc.WrapMode.Reverse,n.anim.play("ItemShow"),r.once("finished",e)})},e.prototype.dead=function(){var l=this;return new Promise(function(e,t){l._state=d.DEAD,l.node.zIndex=2;var r=cc.find("Canvas"),n=l.node.parent.convertToNodeSpaceAR(r.position),o=cc.moveTo(1,n).easing(cc.easeSineInOut()),c=cc.scaleTo(1,2).easing(cc.easeSineInOut()),i=cc.spawn(o,c),s=cc.delayTime(1),a=cc.scaleTo(1,0).easing(cc.easeBackIn()),u=cc.callFunc(function(){e()}),p=cc.sequence(i,s,a,u);l.node.runAction(p)})},__decorate([a(cc.Sprite)],e.prototype,"contentSpr",void 0),__decorate([a(cc.Animation)],e.prototype,"anim",void 0),e=__decorate([s],e)}(cc.Component);r.default=u,cc._RF.pop()},{"./GameCtrl":"GameCtrl","./ResCtrl":"ResCtrl"}],ResCtrl:[function(e,t,r){"use strict";cc._RF.push(t,"45ca8HP0Q1JvKiz1bAgiSRG","ResCtrl"),Object.defineProperty(r,"__esModule",{value:!0});var n=cc._decorator,o=n.ccclass,c=n.property,i=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.itemAtlas=null,e}return __extends(e,t),r=e,Object.defineProperty(e,"instance",{get:function(){return r._instance},enumerable:!0,configurable:!0}),e.prototype.onLoad=function(){r._instance=this},e._instance=null,__decorate([c(cc.SpriteAtlas)],e.prototype,"itemAtlas",void 0),e=r=__decorate([o],e);var r}(cc.Component);r.default=i,cc._RF.pop()},{}]},{},["ChessCtrl","Const","GameCtrl","ItemCtrl","ResCtrl"]);