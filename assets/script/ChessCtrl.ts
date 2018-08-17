const {ccclass, property, requireComponent} = cc._decorator;

@ccclass
@requireComponent(cc.Graphics)
export default class ChessCtrl extends cc.Component {
    @property()
    tiledSize:cc.Size = cc.size(50,50);

    @property()
    mapSize:cc.Size = cc.size(5,5);

    _debugGrid:boolean = false;
    @property()
    set debugGrid(v:boolean) {
        this._debugGrid = v;
        this.drawDebugGrid(this.mapSize);
    }
    get debugGrid():boolean{
        return this._debugGrid;
    }

    onLoad() {
        
    }

    getGridPos(grid:cc.Vec2,node?:cc.Node) {
        let x = (grid.x + 0.5) * this.tiledSize.width;
        let y = (grid.y + 0.5) * this.tiledSize.height;
        if(node) {
            return node.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(cc.v2(x,y)));
        }
        return cc.v2(x,y);
    }

    drawDebugGrid(mapSize:cc.Size) {
        let ctx = this.getComponent(cc.Graphics);
        if(ctx){
            ctx.clear();
            if(this._debugGrid){
                for(let x = 0,lx = mapSize.width; x < lx; x++) {
                    for(let y = 0,ly = mapSize.height; y < ly; y++) {
                        let pos = this.getGridPos(cc.v2(x,y));
                        ctx.circle(pos.x,pos.y,5);
                    }
                }
                ctx.fill();
            }
        }else{
            console.warn('cannot find ctx');
        }
    }

    drawDebugGridPoint(grid:cc.Vec2) {
        let ctx = this.getComponent(cc.Graphics);
        const pos = this.getGridPos(grid);
        ctx.circle(pos.x,pos.y,30);
        ctx.clear();
        ctx.fillColor = cc.Color.WHITE;
        ctx.fill();
    }
}
