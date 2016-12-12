 
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
