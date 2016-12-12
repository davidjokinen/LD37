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
