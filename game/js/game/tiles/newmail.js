
 

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

