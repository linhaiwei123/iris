import { ItemType } from "./Const";
import GameCtrl from "./GameCtrl";
import ResCtrl from "./ResCtrl";

const {ccclass, property} = cc._decorator;
enum ItemState {
    SHOW = 2,
    HIDE = 2,
    DEAD = 3,
}
@ccclass
export default class ItemCtrl extends cc.Component {
    @property(cc.Sprite)
    contentSpr:cc.Sprite = null;
    @property(cc.Animation)
    anim:cc.Animation = null;
    private _state:ItemState = null;
    private _type:ItemType = null;
    public get type():ItemType {
        return this._type;
    }
    public get state():ItemState {
        return this._state;
    }

    init(type:ItemType) {
        this._type = type;
        this.node.on('touchend',this._onTouchEnd,this);
        this.contentSpr.spriteFrame = ResCtrl.instance.itemAtlas.getSpriteFrame(this._type);
    }

    private _onTouchEnd() {
        GameCtrl.instance.onItemTouchEnd(this);
    }

    show() {
        return new Promise<any>((resolve,reject) => {
            this._state = ItemState.SHOW;
            let animState = this.anim.getAnimationState('ItemShow');
            animState.wrapMode = cc.WrapMode.Normal;
            this.anim.play('ItemShow');
            animState.once('finished',resolve);
        })
    }

    hide() {
        return new Promise<any>((resolve,reject) => {
            this._state = ItemState.HIDE;
            let animState = this.anim.getAnimationState('ItemShow');
            animState.wrapMode = cc.WrapMode.Reverse;
            this.anim.play('ItemShow');
            animState.once('finished',resolve);
        })
    }

    dead() {
        return new Promise<any>((resolve,reject) => {
            this._state = ItemState.DEAD;
            this.node.zIndex = 2;
            let canvas = cc.find('Canvas');
            let targetPos = this.node.parent.convertToNodeSpaceAR(canvas.position);
            let duration = 1;
            let moveTo = cc.moveTo(duration,targetPos).easing(cc.easeSineInOut());
            let scaleTo = cc.scaleTo(duration,2).easing(cc.easeSineInOut());
            let spawn = cc.spawn(moveTo,scaleTo);
            let delayTime = cc.delayTime(1);
            let scaleBack = cc.scaleTo(duration,0).easing(cc.easeBackIn());
            let cb = cc.callFunc(() => {
                resolve();
            });
            let seq = cc.sequence(spawn,delayTime,scaleBack,cb);
            this.node.runAction(seq);
        })
    }
}
