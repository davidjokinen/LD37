
window._Session = {};
window._Stat = {mail:0,money:5000};
_Session = window._Session;
_Stat = window._Stat;

window.onload = () => {
	window._Camera = new Camera();
	
	PIXI.loader
	  .add("./img/objects.png")
	  .load(start); 
}

window.changeMode = (i) => {
	_Session.mode = i
	if(_Session.mode == 0){
		$("#buildMenu").addClass('hide')
		$("#activeMode").html('Menu actions: Select')
	} else if(_Session.mode == 1){
		$("#buildMenu").removeClass("hide");
		$("#activeMode").html('Menu actions: Build')
	} else if(_Session.mode == 2){
		$("#buildMenu").addClass('hide')
		$("#activeMode").html('Menu actions: Clear')
	}
}

window.buildMode = (i) => {	
	$("button").removeClass("selected");
	$("#build"+i).addClass('selected')
	_Session.build = i
}

start = () => {
	var c = document.getElementById("screen");
	var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
	_Session.renderer = renderer;
	renderer.plugins.interaction.destroy()
	PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

	document.body.appendChild(renderer.view); 
	_Session.view =renderer.view
	_Session.build = 0
	window._Mouse = new Mouse();
	_Session.stage = new PIXI.Container();
	_Session.stage.scale.x = 1;
	_Session.stage.scale.y = 1;
	_Session.direction = 2;
	_Session.mailLevel = 4;
	_Session.mailCooldown = 20;
	_Session.mode = 0;
	list = new SpriteSheet('./img/objects.png');
	// test = list.createSpriteFromSheet(4,0);
	 
	// test.position.x = 200;  
	// test.position.y = 150;

	map = new Map() 
	map.setParentContainer(_Session.stage)
	entityController = new EntityController()
	entityController.setParentContainer(_Session.stage)
	//for(let i=0;i<70;i++) 
	// for(let i2=0;i2<20;i2++) 
	//	test = new Entity(100+~~(10*i),100+~~(10*i2))
	test = new Worker(400,50)
	test = new Worker(200,50)
	move = new MoveCamera()
	selector = new Selector() 
	selector.init()
	move.init() 
	//_Session.stage.addChild(list.container);
	
	animate();
}

animate = () => {
    // start the timer for the next animation loop
    requestAnimationFrame(animate);
    $("#dataMenu").html('Mail count: '+_Stat.mail+' Money: $'+_Stat.money)
    _Map.update()
    _EntityController.update()
    _Session.stage.position.x = _Camera.x;
    _Session.stage.position.y = _Camera.y;
    _Session.stage.scale.x = _Camera.scale;
    _Session.stage.scale.y = _Camera.scale;
    _Session.renderer.render(_Session.stage);
}


 class Component {
 	constructor() {
 	}

 	remove(){

 	}

 }
 

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

class Camera {
  constructor() {
    this.x = 0;
    this.y = 0; 
    this.scale = 2;
 
    if(window._Camera){
		console.error("There is already a camera!");
		return _Camera;
	}
  }
}


class SpriteSheet {
  constructor(img_loc) {
    this.img_loc = img_loc;
    this.texture = PIXI.loader.resources[img_loc].texture;
    this.texture.scaleMode = PIXI.SCALE_MODES.NEAREST;
	this.container = new PIXI.ParticleContainer(6000,{position:true, uvs: true,alpha: true,rotation: true,scale: true});
	this.spriteSheet = [];
	var tileSize = 20;
	for(var x =0;x<10;x++){	
		this.spriteSheet[x] = new Array();
		for(var y =0;y<10;y++){
			this.spriteSheet[x][y] = new PIXI.Texture(this.texture, new PIXI.Rectangle(x*(tileSize), y*(tileSize), tileSize, tileSize));
			this.spriteSheet[x][y].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
		}
	}
  }

  createSpriteFromSheet(x,y){
  	let newSprite = new PIXI.Sprite(this.spriteSheet[x][y]);
  	this.container.addChild(newSprite);
  	return newSprite;
  }

  remove(sprite){
  	this.container.removeChild(sprite)
  	sprite.destroy()
  	
  }	


}







 
class Floor extends Tile {
	constructor(map, x, y) {
		super(map, x, y);
		
	}
	
	init(){
		this.changeImage(4,0);
	}

	getName(){
		return 'Floor';
	}
}


 class MailShoot extends Tile {
	init(){
		this.changeImage(0,0);
		this.passable = true;
		this.dir = 0
		this.count = 0
		this.type = ~~(Math.random()*4)
		this.setImage()
	}

	setImage(){
		if(this.type==0)
			this.changeImage(7,4);
		else if(this.type==1)
			this.changeImage(7,5);
		else if(this.type==2)
			this.changeImage(8,5);
		else if(this.type==3)
			this.changeImage(8,4);
	}

	getName(){
		return 'Outgoing Mail';
	}

	update(){
		for(let i=0;i<this.listOfEntities.length;i++){
			let entity = this.listOfEntities[i]
			//console.log(entity.type == this.type)
			//if(entity.type){

				if(entity.type == this.type)
					_Stat.money+=5;
				else
					_Stat.money-=10;
			//}
			entity.remove()
		}
	}


}


class MoverFloor extends Floor {
	constructor(map, x, y) {
		super(map, x, y);
		this.count = 0;
		this.direction = _Session.direction;//~~(4*Math.random());
		this.sprite.rotation = 1.5708*this.direction
		this.speed = .15
		this.countSpeed = 6
		this.changeImage(this.direction,1+~~(0));
	}
 
	init(){
		
		
	}

	changeDirection(){
		if(_Session.direction == this.direction)
			_Session.direction = (_Session.direction+1)%4;
		this.direction = _Session.direction;
		this.sprite.rotation = 1.5708*this.direction
		this.changeImage(this.direction,1);
	}

	getName(){
		return 'Floor Mover';
	}

	changeDirection2(x,y){
		if(Math.abs(x)>Math.abs(y)){
			if(x> 3)
				_Session.direction = 3
			else if(x< -3)
				_Session.direction = 1
		}else{
			if(y> 3)
				_Session.direction = 0
			else if(y< -3)
				_Session.direction = 2
		}


		this.direction = _Session.direction;
		this.sprite.rotation = 1.5708*this.direction
		this.changeImage(this.direction,1);
	}

	setImage(){
		let count = this.countSpeed;
		if(this.count++%count==0){
			this.changeImage(this.direction,1+~~(3-this.count/count%3));
		}

	}

	update(){
		this.setImage()
				//if(Math.random()>.995)this.changeDirection()
		for(let i=0;i<this.listOfEntities.length;i++){
			let entity = this.listOfEntities[i]
			if(entity.movement){
				if(this.direction == 0){
					//if(entity.movement.vx < this.speed)
					entity.movement.vy += -this.speed;
				}
				if(this.direction == 1){
			
					entity.movement.vx += this.speed;
				}
				if(this.direction == 2){
					entity.movement.vy += this.speed;
				}
				if(this.direction == 3){

					entity.movement.vx += -this.speed;
				}
			}
		}
	}
}


 

class NewMail extends Tile {
	init(){
		this.changeImage(7,0);
		this.passable = false;
		this.dir = 0
		this.count = 0
		this.active = true;
	}

	update(){
		if(this.count++ == _Session.mailCooldown-10){
			this.passable = true;
			this.changeImage(8,0);
			test = new Mail(this.x*20+5,this.y*20+10)
			test.movement.vy = 7
			test.movement.vx = 2*(Math.random()-.5)
		}
		if(this.count >_Session.mailCooldown){
			this.changeImage(7,0);
			this.passable = false;
			if(Math.random()>.95)
			this.count = 0;
			for(let i=0;i<this.listOfEntities.length;i++){
			let entity = this.listOfEntities[i]
			entity.remove()
		}
		}

	}
	getName(){
		return 'Incoming Mail';
	}


}


 

class Pole extends Tile {
	init(){
		
		this.changeImage(9,0);
		this.passable = false;
	}

	getName(){
		return 'Pole';
	}
}

 
class Sorter extends MoverFloor {
	constructor(map, x, y,type) {
		super(map, x, y);
		this.type = type
		this.setImage();
	}

	setImage(){
		if(this.type==0)
			this.changeImage(5,2);
		else if(this.type==1)
			this.changeImage(5,3);
		else if(this.type==2)
			this.changeImage(6,3);
		else if(this.type==3)
			this.changeImage(6,2);
	}

	changeDirection(){
		if(_Session.direction == this.direction)
			_Session.direction = (_Session.direction+1)%4;
		this.direction = _Session.direction;
		this.sprite.rotation = 1.5708*this.direction+2*1.5708
		this.changeImage(this.direction,1);
	}

	getName(){
		return 'Sorter';
	}

	changeDirection2(x,y){
		if(Math.abs(x)>Math.abs(y)){
			if(x> 3)
				_Session.direction = 3
			else if(x< -3)
				_Session.direction = 1
		}else{
			if(y> 3)
				_Session.direction = 0
			else if(y< -3)
				_Session.direction = 2
		}


		this.direction = _Session.direction;
		this.sprite.rotation = 1.5708*this.direction+2*1.5708
		this.changeImage(this.direction,1);
	}

	update(){
		this.setImage()
		this.sprite.rotation = 1.5708*this.direction+2*1.5708
		for(let i=0;i<this.listOfEntities.length;i++){
			let entity = this.listOfEntities[i]
			console.log(entity.type)
			if(entity.movement  && entity.type != this.type){
				if(this.direction == 0){
					//if(entity.movement.vx < this.speed)
					entity.movement.vy += -this.speed;
				}
				if(this.direction == 1){
			
					entity.movement.vx += this.speed;
				}
				if(this.direction == 2){
					entity.movement.vy += this.speed;
				}
				if(this.direction == 3){

					entity.movement.vx += -this.speed;
				}
			}
			if(entity.movement && entity.type == this.type){
				if(this.direction == 0){
					//if(entity.movement.vx < this.speed)
					entity.movement.vx += -this.speed*3;
				}
				if(this.direction == 1){
			
					entity.movement.vy += -this.speed*3;
				}
				if(this.direction == 2){
					entity.movement.vx += this.speed*3;
				}
				if(this.direction == 3){

					entity.movement.vy += this.speed*3;
				}
			}
		}

	}

}
 

class Wall extends Tile {
	init(){
		
		this.changeImage(2,0);
		this.passable = false;
	}
}

 
  
class Mail extends Entity {

	constructor(x, y,a) {
		super(x, y,a);
		_Stat.mail++;
		this.type = ~~(Math.random()*_Session.mailLevel)
		this.setImage()
	}

	setImage(){
		if(this.type==0)
			this.changeImage(7,2);
		else if(this.type==1)
			this.changeImage(7,3);
		else if(this.type==2)
			this.changeImage(8,3);
		else if(this.type==3)
			this.changeImage(8,2);
	}

	remove(){
		super.remove();
		_Stat.mail--;
	}

	getName(){
		return 'Mail';
	}

}

 
class Worker extends Entity {
	constructor(x, y,a) {
		super(x, y,a);
		this.scale = 1;
		this.size = _Map.tileSize*this.scale;
		this.changeImage(4,1);

		this.rotation_random = 0
		//this.push = 4; 
		this.addComponent(new Wander())
	}
	
	getName(){
		return 'Worker';
	}

}

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
class Wander extends Component {
 	
 	constructor() {
 		super()
 		this.name = "wander"
 		this.parent;		
 		this.count = 0;
 		this.speed = .1;
 	}

 	update(){
 		if(this.count == 0 && Math.random()>.99){
 			this.parent.rotation = 6.28319*Math.random()
 			this.count = ~~(Math.random()*100)+10;

 		} else if(this.count > 0){
 			this.count--;
 			//console.log(this.count)
 			if(this.parent.movement){
 				this.parent.movement.vx += this.speed*Math.cos(this.parent.rotation+1.5708)
 				this.parent.movement.vy += this.speed*Math.sin(this.parent.rotation+1.5708)
 				//console.log(Math.cos(this.parent.rotation))
 			}

 		}

 	}
 }
 
class Mouse {
	constructor() {

		this.x = 0;
		this.y = 0;
		
		this.div = _Session.view;

		this.onClick = [];
		this.onMove = [];
		this.onZoom = [];
		this.onClickDown = [];
		this.onClickUp = [];
		var self = this
		this.div.addEventListener('mousedown', (e)=>{self.mousedownCanvas(e)}, false);
		this.div.addEventListener('mouseup', (e)=>{self.mouseupCanvas(e)}, false);
		this.div.addEventListener('mousemove', (e)=>{self.mousemoveCanvas(e)}, false);
		this.div.addEventListener('mousewheel', (e)=>{self.mousewheelCanvas(e)}, false);
	}

	addOnClickDown(event){
		this.onClickDown.push(event);
	}

	addOnClickUp(event){
		this.onClickUp.push(event);
	}

	addOnClick(event){
		this.onClick.push(event);
	}

	addOnMove(event){
		this.onMove.push(event);
	}

	addOnZoom(event){
		this.onZoom.push(event);
	}

	mousedownCanvas(e) {   
		for(let i in this.onClickDown)
			this.onClickDown[i](e);
 		
	}

	mouseupCanvas(e) {
		for(let i in this.onClickUp)
			this.onClickUp[i](e);

	}

	mousemoveCanvas(e) {

		this.x = e.pageX;
		this.y = e.pageY;
		for(let i in this.onMove)
			this.onMove[i](e);

	}

	mousewheelCanvas(e) {
		for(let i in this.onZoom)
			this.onZoom[i](e);
		
	}
}
 
class MoveCamera {
	constructor() {
		this.click = {x:0,y:0,down:false,startTime:0};
	}

	init() {
		_Mouse.addOnClickDown((e)=>{this.onClickDown(e)});
		_Mouse.addOnClickUp((e)=>{this.onClickUp(e)});
		_Mouse.addOnMove((e)=>{this.onMove(e)});
		_Mouse.addOnZoom((e)=>{this.onZoom(e)});
	}

	onClickDown(e) {
		if(e.button==2){
			document.body.style.cursor="move";
			this.click.x = e.pageX;
			this.click.y = e.pageY;
			this.click.startTime = Date.now();
			this.click.down = true
		}
	}

	onClickUp(e) {
		if(e.button==2){
			document.body.style.cursor="auto";
			this.click.down = false
		}
	}

	onMove(e) {
		if(!this.click.down)return;
		if(e.button==2){
			// if(this.selected != [][0]){
			// 	this.selected.move(e.pageX - this.click.x,e.pageY - this.click.y,1)
			// } else {
				_Camera.x += e.pageX - this.click.x;
				_Camera.y += e.pageY - this.click.y;
			//}
			
			this.click.x = e.pageX;
			this.click.y = e.pageY;
		}
	}

	onZoom(e) {
		if(_Camera.scale+((e.wheelDelta)/1800.0)>=.34&&_Camera.scale+((e.wheelDelta)/1800.0)<20)
		{
			var oldScale = _Camera.scale;
			
			_Camera.scale += (e.wheelDelta)/1800.0;
			
			var oldX = _Camera.x;
			var oldY = _Camera.y;
			_Camera.x += (_Mouse.x* (1-_Camera.scale/oldScale));
			_Camera.x -= (oldX* (1-_Camera.scale/oldScale));
		 	_Camera.y += (_Mouse.y* (1-_Camera.scale/oldScale));
		 	_Camera.y -= (oldY* (1-_Camera.scale/oldScale));
		}
	}

}


class Selector {
	constructor() {
		this.click = {x:0,y:0,down:false,startTime:0};
		this.graphics = new PIXI.Graphics();
		this.graphics.lineStyle(1, 0xffd900, 1);
		this.graphics.drawRect(0,0,20,20);
		this.mapX = 0
		this.mapY = 0
	}

	init() {
		_Mouse.addOnClickDown((e)=>{this.onClickDown(e)});
		_Mouse.addOnClickUp((e)=>{this.onClickUp(e)});
		_Mouse.addOnMove((e)=>{this.onMove(e)});
		_Mouse.addOnZoom((e)=>{this.onZoom(e)});
		_Session.stage.addChild(this.graphics);
	}

	update(){

	}

	onClickDown(e) {
		if(e.button==0){
			this.click.down = true
			//for(let i=0;i<10;i++)
			//new Entity(this.mapX*10+(Math.random()*20),this.mapY*10+(Math.random()*20))
			//console.log(this.mapX+" "+this.mapY)
			let tile = _Map.getTile(this.mapX*10+20,this.mapY*10+20)
			if(_Session.mode == 1)
			if(!this.hover_entity)
			if(tile && tile.changeDirection && (
				(_Session.build == 0 && tile instanceof MoverFloor) ||
				(_Session.build == 1 && tile instanceof Sorter && tile.type ==0 ) ||
				(_Session.build == 2 && tile instanceof Sorter && tile.type ==1 ) ||
				(_Session.build == 3 && tile instanceof Sorter && tile.type ==2 ) ||
				(_Session.build == 4 && tile instanceof Sorter && tile.type ==3 ) 
					)){
				tile.changeDirection()
			} else if(tile instanceof Floor || tile instanceof MoverFloor || tile instanceof Sorter){
				if(_Session.build == 0)
					_Map.replaceTile(tile, new MoverFloor(tile.map,tile.x,tile.y))
				if(_Session.build == 1)
					_Map.replaceTile(tile, new Sorter(tile.map,tile.x,tile.y,0))
				if(_Session.build == 2)
					_Map.replaceTile(tile, new Sorter(tile.map,tile.x,tile.y,1))
				if(_Session.build == 3)
					_Map.replaceTile(tile, new Sorter(tile.map,tile.x,tile.y,2))
				if(_Session.build == 4)
					_Map.replaceTile(tile, new Sorter(tile.map,tile.x,tile.y,3))
				_Stat.money-=5;

			}
			if(_Session.mode == 2)
			if(!this.hover_entity)
			if(tile instanceof MoverFloor){
				_Map.replaceTile(tile, new Floor(tile.map,tile.x,tile.y))
				_Stat.money+=5;
			}
		}
	}

	onClickUp(e) {
		if(e.button==0){
			document.body.style.cursor="auto";
			this.click.down = false
		}
	}

	onMove(e) {
		//if(!this.click.down)return;
		if(e.button==0){
			// if(this.selected != [][0]){
			// 	this.selected.move(e.pageX - this.click.x,e.pageY - this.click.y,1)
			// } else {
			
			//}
			
			

		}
		let difX = this.click.x - e.pageX
		let difY = this.click.y - e.pageY
		if(this.hover_entity && this.click.down){
			this.hover_entity.x -= difX/_Camera.scale;
			this.hover_entity.y -= difY/_Camera.scale;
			$("#selectMenu").html('Selecting:<br>'+this.hover_entity.getName())
			if(this.hover_entity.movement){
				this.hover_entity.movement.vx = 0;
				this.hover_entity.movement.vy = 0;
			}
		} else if(!this.hover_entity && this.click.down){
			let tile = _Map.getTile(this.mapX*10+20,this.mapY*10+20)

			if(_Session.mode == 1)
			if(!this.hover_entity)
			if(tile && tile.changeDirection){
				if(_Session.build == 0)
				tile.changeDirection2(difX, difY)
			} else if(tile instanceof Floor && _Session.build == 0){
				_Map.replaceTile(tile, new MoverFloor(tile.map,tile.x,tile.y))
				_Stat.money-=5;
			}
			if(_Session.mode == 2)
			if(!this.hover_entity)
			if(tile instanceof MoverFloor){
				_Map.replaceTile(tile, new Floor(tile.map,tile.x,tile.y))
				_Stat.money+=5;
			}
		}
		this.click.x = e.pageX;
		this.click.y = e.pageY;
		let x = (((this.click.x-10*_Camera.scale)/_Camera.scale)-_Camera.x/_Camera.scale);
		let y = (((this.click.y-10*_Camera.scale)/_Camera.scale)-_Camera.y/_Camera.scale);
		this.mapX = (x-(x%20)+10)/10
		this.mapY = (y-(y%20)+10)/10
		if(1){
			let entity = _Map.selectEntityAt(x+10,y+10);
			
			if(entity){
				if(!this.click.down){
					this.hover_entity = entity
					$("#selectMenu").html('Hovering over:<br>'+entity.getName())
				}
				this.graphics.visible = false
				return
			}
		}
		let tile2 = _Map.getTile(this.mapX*10+20,this.mapY*10+20)
		if(tile2)
			$("#selectMenu").html('Hovering over:<br>'+tile2.getName())
		else
			$("#selectMenu").html('');
		if(!this.click.down)
			this.hover_entity = [][0]
		this.graphics.visible = true
		this.graphics.position.x = x-(x%20)+10
		this.graphics.position.y = y-(y%20)+10
	}

	onZoom(e) {
		if(_Camera.scale+((e.wheelDelta)/1800.0)>=.34&&_Camera.scale+((e.wheelDelta)/1800.0)<20)
		{
			var oldScale = _Camera.scale;
			
	
			var oldX = _Camera.x;
			var oldY = _Camera.y;
		
		}
	}


}