import ItemCtrl from "./ItemCtrl";
import ChessCtrl from "./ChessCtrl";
import { ItemType } from "./Const";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameCtrl extends cc.Component {
    
    private static _instance:GameCtrl = null;
    public static get instance():GameCtrl {
        return GameCtrl._instance;
    }

    @property(ChessCtrl)
    chessCtrl:ChessCtrl = null;
    @property(cc.Prefab)
    itemPrefab:cc.Prefab = null;

    onLoad() {
        GameCtrl._instance = this;
        this._initChess();
    }

    private _initChess() {
        let typeList:ItemType[] = [];
        let typePool:ItemType[] = [ItemType.A,ItemType.B,ItemType.C,ItemType.D,ItemType.E,ItemType.F,ItemType.G];
        for(let i = 0,l = 32; i < l ;i++) {
            let type = typePool[i % typePool.length];
            typeList.push(type)
            typeList.push(type)
        }
        typeList.sort((a,b) => (Math.random()-0.5));
        
        for(let i = 0,l = 32; i < l; i++) {
            let item = cc.instantiate(this.itemPrefab).getComponent(ItemCtrl);
            let y = i/4 >> 0;
            let x = i%4;
            let pos = this.chessCtrl.getGridPos(cc.v2(x,y));
            this.chessCtrl.node.addChild(item.node);
            item.node.position = pos;
            let type = typeList[i];
            item.init(type);
        }
    }

    private _preItem:ItemCtrl = null;
    private _lock:boolean = false;
    async onItemTouchEnd(item:ItemCtrl) {
        if(this._lock)return;
        this._lock = true;
        //翻开
        if(!this._preItem) {
            this._preItem = item;
            await item.show();
        }
        //匹配失败
        else if(this._preItem.type !== item.type){
            let preItem = this._preItem;
            this._preItem = item;
            let promiseShow = item.show();
            let promiseHide = preItem.hide();
            await Promise.all([promiseShow,promiseHide]);
        }
        //匹配成功
        else if(this._preItem.type === item.type){
            await item.show();
            let preItem = this._preItem;
            this._preItem = null;
            let promiseDead1 = preItem.dead();
            let promiseDead2 = item.dead();
            await Promise.all([promiseDead1,promiseDead2]);
        }
        this._lock = false;
    }
}
