
class Tile {
	constructor(map, x, y) {
		this.map = map;
		this.sprite = map.sheet.createSpriteFromSheet(1,0);;
		this.x = x;
		this.y = y;
		this.sprite.position.x = x*this.map.tileSize+0.000001;
		this.sprite.position.y = y*this.map.tileSize+0.000001;
		this.sprite.anchor.set(.5, .5)
		this.listOfEntities = []
		this.passable = true;
		this.init();
		
	} 

	init(){

	}

	changeImage(x,y){
		this.sprite.texture = this.map.sheet.spriteSheet[x][y];
	}

	addEntity(e){
		this.listOfEntities.push(e)
	}  

	removeEntity(e){
		this.listOfEntities.splice(this.listOfEntities.indexOf(e),1)
	}

	update(){ 
		//this.changeImage(0+~~(10*Math.random()),0+~~(2*Math.random()))
	}  

	remove(){ 
		this.map.sheet.remove(this.sprite);
	}
 
 	getName(){ 
		return 'Tile';
	}

}    