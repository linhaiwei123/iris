const {ccclass, property} = cc._decorator;

@ccclass
export default class ResCtrl extends cc.Component {
    @property(cc.SpriteAtlas)
    itemAtlas:cc.SpriteAtlas = null;
    
    private static _instance:ResCtrl = null;
    public static get instance():ResCtrl {
        return ResCtrl._instance;
    }

    onLoad() {
        ResCtrl._instance = this;
    }
}
