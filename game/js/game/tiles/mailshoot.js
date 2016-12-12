
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

