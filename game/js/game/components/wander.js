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