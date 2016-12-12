 
class EntityController {
	constructor() {
		this.sheet = new SpriteSheet('./img/objects.png');
		this.tileSize = 20;//If I want to change this look at spritesheet. ;p
		this.size = {x:50,y:30};
		this.list = [];
		window._EntityController = this;
	}

	setParentContainer(parent){
	  	parent.addChild(this.sheet.container);
	}

	update(){
		for(let i=0;i<this.list.length;i++){
			this.list[i].update();
		}
	}

	add(entity){
		this.list.push(entity)
	}

	remove(entity){
		this.list.splice(this.list.indexOf(entity),1)
	}
}           