  
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
