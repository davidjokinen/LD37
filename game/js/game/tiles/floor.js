 
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
