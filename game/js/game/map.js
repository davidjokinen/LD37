
class Map {
  constructor() {
    this.sheet = new SpriteSheet('./img/objects.png');
    this.tileSize = 20;//If I want to change this look at spritesheet. ;p
    this.size = {x:40,y:25};
    this.map = [];
	this.buildMap();
	window._Map = this;
  }

  buildMap() {
  	this.map = [];
  	for(let x=0;x<this.size.x;x++){
  		this.map[x] = new Array()
  		for(let y=0;y<this.size.y;y++){
  			let tile;
  			if(x==0 || y==0){
  				if(y==0 && x%8==4)
  					tile = new NewMail(this,x,y)
  				else if(x==0 && y%9==5)
  					tile = new MailShoot(this,x,y)

  				else 
  					tile = new Wall(this,x,y)
  			}
  				
  			else if(x==this.size.x-1 || y==this.size.y-1){
  				if(y==this.size.y-1 && x%8==5)
  					tile = new MailShoot(this,x,y)
  				else if(x==this.size.x-1 && y%8==5)
  					tile = new MailShoot(this,x,y)
  				else
  					tile = new Wall(this,x,y)

  			}
  			else {
  				//tile = new Floor(this,x,y)
  				if(x%10==0&&y%10==0)
  					tile = new Pole(this,x,y) 
  				//else if(x%13==5) 
  				//	tile = new MoverFloor(this,x,y) 
  			 	else 
  					tile = new Floor(this,x,y) 
 
  			}

  			//let sprite  =  
  			this.map[x][y] = tile; 
  		} 
  	}
  }

  getTile(x,y){
  	x = ~~(x/this.tileSize);
  	y = ~~(y/this.tileSize);
  	if(x<0 || y<0)
		return;
	else if(x>this.size.x-1 || y>this.size.y-1)
		return;
	return this.map[x][y]
  }

  getEntitiesNear(x,y){
  	x = ~~(x/this.tileSize);
  	y = ~~(y/this.tileSize);
  	let mx = (x%this.tileSize) > this.tileSize/2 ? 1 : -1;
  	let my = (y%this.tileSize) > this.tileSize/2 ? -1 : 1;
  	let list = []
  	Array.prototype.push.apply(list,this.getEntitiesAt(x,y))
  	Array.prototype.push.apply(list,this.getEntitiesAt(x+1,y))
  	Array.prototype.push.apply(list,this.getEntitiesAt(x+1,y-1))
  	Array.prototype.push.apply(list,this.getEntitiesAt(x+1,y+1))
  	Array.prototype.push.apply(list,this.getEntitiesAt(x-1,y))
  	Array.prototype.push.apply(list,this.getEntitiesAt(x-1,y-1))
  	Array.prototype.push.apply(list,this.getEntitiesAt(x-1,y+1))
  	Array.prototype.push.apply(list,this.getEntitiesAt(x,y+1))
  	Array.prototype.push.apply(list,this.getEntitiesAt(x,y-1))
  	return list;
  }

  selectEntityAt(x,y){
  	let list = this.getEntitiesNear(x,y)
	for(let i=0;i<list.length;i++){
		let entity = list[i];
		var r2 = entity.size/2;
		var x2 = entity.x-r2;
		var y2 = entity.y-r2;
		if(Math.pow(x-x2,2) + Math.pow(y-y2,2) < Math.pow(r2,2)){
			return entity;
		}
	}
	return;		
  }

  getEntitiesAt(x,y){ 
  	if(x<0 || y<0) 
		return [];
	else if(x>this.size.x-1 || y>this.size.y-1)
		return [];
	return this.map[x][y].listOfEntities;
  }

  replaceTile(oldTile, newTile){
  	let x = oldTile.x;
  	let y = oldTile.y;
  	 
  	this.map[x][y] = newTile
  	oldTile.remove()
  }

  setParentContainer(parent){
  	parent.addChild(this.sheet.container);
  }

  update(){
  	for(let x=0;x<this.size.x;x++)
  		for(let y=0;y<this.size.y;y++)
  			this.map[x][y].update()

  }

}

