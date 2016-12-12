 class Movement extends Component {
 	
 	constructor() {
 		super()
 		this.name = "movement"
 		this.parent;
 		this.tile;
 		this.vx = 0//(.5-Math.random());
 		this.vy = 0//(.5-Math.random());
 		this.lvx = 0;
 		this.lvy = 0;
 	}

 	update(){
 		let entities = _Map.getEntitiesNear(this.parent.x+this.vx,this.parent.y+this.vy)
 		let r1 = this.parent.size*.5;
 		let x1 = this.parent.x+this.vx;
 		let y1 = this.parent.y+this.vy;
 		let r = this.parent.size/2
 		
 		for(let i=0;i<entities.length;i++){
 			let entity = entities[i];
 			if(entity == this.parent)
 				continue;
 			var r2 = entity.size*.5;
 			var x2 = entity.x
			var y2 = entity.y
			
 			if(Math.pow(x2-x1,2) + Math.pow(y1-y2,2) < Math.pow(r1+r2,2)){
 				
 				if(entity.movement){
 					
 					entity.movement.vx += this.vx*.8
 					entity.movement.vy += this.vy*.8

 				}
 				this.vx = -this.vx*.2
 				this.vy = -this.vy*.2
 				//if(this.parent.push>1)
 				return;
 			}
 		}
 		
 		let newTile2 = _Map.getTile(this.parent.x+10-r,this.parent.y+10-r);
 		if(!newTile2)
 			this.parent.remove()
 		let newTile = _Map.getTile(this.parent.x+this.vx+10-r,this.parent.y+this.vy+10-r);

 		if(this.tile != newTile){
 			if(newTile){
 				if(!newTile.passable){
 					this.vx = -this.vx*1.2+(Math.random()-.5)/100
	 				this.vy = -this.vy*1.2+(Math.random()-.5)/100

	 				return;
 				}
 				newTile.addEntity(this.parent);
 			}
 			if(this.tile)
 				this.tile.removeEntity(this.parent);
 			this.tile = newTile;
		}
		if(this.vx == 0 && this.vy == 0 )
 			return;
 		let dif = (Math.abs(this.lvx-this.vx)+Math.abs(this.lvy-this.vy))/7.0
 		this.parent.rotation += dif*this.parent.rotation_random;
 		this.parent.x += this.vx;
 		this.parent.y += this.vy;
 		this.lvx = this.vx;
 		this.lvy = this.vy;
 		
 		
 		this.vx *= .85
 		this.vy *= .85
 		if(Math.abs(this.vx)<.003)
 			this.vx = 0
 		if(Math.abs(this.vy)<.003)
 			this.vy = 0
 	}

 	remove(){
 		if(this.tile)
 			this.tile.removeEntity(this.parent);
 	}

 }