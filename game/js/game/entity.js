 

class Entity {
	constructor(x, y, controller) {
		this.controller = controller || window._EntityController;
		this.sprite = this.controller.sheet.createSpriteFromSheet(7+~~(Math.random()*2),2+~~(Math.random()*2));;
		this.x = x;
		this.y = y;
		this.rotation = 0//10*Math.random();
		this.rotation_random = 1.0
		this.scale = Math.random()*.4+.2;
		this.size = _Map.tileSize*this.scale;
		this.sprite.anchor.set(.5, .5)
		this.sprite.position.x = x;
		this.sprite.position.y = y;
		this.push = .1
		
		this.controller.add(this);
		this.componentsList = []
		this.addComponent(new Movement())
		this.removed = false
	}

	addComponent(comp){
		comp.parent = this; 
		this[comp.name] = comp;
		this.componentsList.push(comp);
	}

	init(){

	}

	changeImage(x,y){
		this.sprite.texture = this.controller.sheet.spriteSheet[x][y];
	}

	remove(){
		this.removed = true
		this.controller.sheet.remove(this.sprite); 
		for(var i=0;i<this.componentsList.length;i++)
			this.componentsList[i].remove()
		this.controller.remove(this);
	}

	update(){
		if(this.removed)return;
		this.sprite.position.x = this.x-this.size/2;//-10; 
		this.sprite.position.y = this.y-this.size/2;//-10;
		this.sprite.scale.x = this.scale;
		this.sprite.scale.y = this.scale;
		this.sprite.rotation += (this.rotation-this.sprite.rotation)*.44; 
		//this.rotation += .03;
		//this.changeImage(0+~~(10*Math.random()),0+~~(2*Math.random()))
		for(var i=0;i<this.componentsList.length;i++)
			this.componentsList[i].update()
	}

}
