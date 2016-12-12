 
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

