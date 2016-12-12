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