 
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