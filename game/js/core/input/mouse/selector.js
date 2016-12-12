class Selector {
	constructor() {
		this.click = {x:0,y:0,down:false,startTime:0};
		this.graphics = new PIXI.Graphics();
		this.graphics.lineStyle(1, 0xffd900, 1);
		this.graphics.drawRect(0,0,20,20);
		this.mapX = 0
		this.mapY = 0
	}

	init() {
		_Mouse.addOnClickDown((e)=>{this.onClickDown(e)});
		_Mouse.addOnClickUp((e)=>{this.onClickUp(e)});
		_Mouse.addOnMove((e)=>{this.onMove(e)});
		_Mouse.addOnZoom((e)=>{this.onZoom(e)});
		_Session.stage.addChild(this.graphics);
	}

	update(){

	}

	onClickDown(e) {
		if(e.button==0){
			this.click.down = true
			//for(let i=0;i<10;i++)
			//new Entity(this.mapX*10+(Math.random()*20),this.mapY*10+(Math.random()*20))
			//console.log(this.mapX+" "+this.mapY)
			let tile = _Map.getTile(this.mapX*10+20,this.mapY*10+20)
			if(_Session.mode == 1)
			if(!this.hover_entity)
			if(tile && tile.changeDirection && (
				(_Session.build == 0 && tile instanceof MoverFloor) ||
				(_Session.build == 1 && tile instanceof Sorter && tile.type ==0 ) ||
				(_Session.build == 2 && tile instanceof Sorter && tile.type ==1 ) ||
				(_Session.build == 3 && tile instanceof Sorter && tile.type ==2 ) ||
				(_Session.build == 4 && tile instanceof Sorter && tile.type ==3 ) 
					)){
				tile.changeDirection()
			} else if(tile instanceof Floor || tile instanceof MoverFloor || tile instanceof Sorter){
				if(_Session.build == 0)
					_Map.replaceTile(tile, new MoverFloor(tile.map,tile.x,tile.y))
				if(_Session.build == 1)
					_Map.replaceTile(tile, new Sorter(tile.map,tile.x,tile.y,0))
				if(_Session.build == 2)
					_Map.replaceTile(tile, new Sorter(tile.map,tile.x,tile.y,1))
				if(_Session.build == 3)
					_Map.replaceTile(tile, new Sorter(tile.map,tile.x,tile.y,2))
				if(_Session.build == 4)
					_Map.replaceTile(tile, new Sorter(tile.map,tile.x,tile.y,3))
				_Stat.money-=5;

			}
			if(_Session.mode == 2)
			if(!this.hover_entity)
			if(tile instanceof MoverFloor){
				_Map.replaceTile(tile, new Floor(tile.map,tile.x,tile.y))
				_Stat.money+=5;
			}
		}
	}

	onClickUp(e) {
		if(e.button==0){
			document.body.style.cursor="auto";
			this.click.down = false
		}
	}

	onMove(e) {
		//if(!this.click.down)return;
		if(e.button==0){
			// if(this.selected != [][0]){
			// 	this.selected.move(e.pageX - this.click.x,e.pageY - this.click.y,1)
			// } else {
			
			//}
			
			

		}
		let difX = this.click.x - e.pageX
		let difY = this.click.y - e.pageY
		if(this.hover_entity && this.click.down){
			this.hover_entity.x -= difX/_Camera.scale;
			this.hover_entity.y -= difY/_Camera.scale;
			$("#selectMenu").html('Selecting:<br>'+this.hover_entity.getName())
			if(this.hover_entity.movement){
				this.hover_entity.movement.vx = 0;
				this.hover_entity.movement.vy = 0;
			}
		} else if(!this.hover_entity && this.click.down){
			let tile = _Map.getTile(this.mapX*10+20,this.mapY*10+20)

			if(_Session.mode == 1)
			if(!this.hover_entity)
			if(tile && tile.changeDirection){
				if(_Session.build == 0)
				tile.changeDirection2(difX, difY)
			} else if(tile instanceof Floor && _Session.build == 0){
				_Map.replaceTile(tile, new MoverFloor(tile.map,tile.x,tile.y))
				_Stat.money-=5;
			}
			if(_Session.mode == 2)
			if(!this.hover_entity)
			if(tile instanceof MoverFloor){
				_Map.replaceTile(tile, new Floor(tile.map,tile.x,tile.y))
				_Stat.money+=5;
			}
		}
		this.click.x = e.pageX;
		this.click.y = e.pageY;
		let x = (((this.click.x-10*_Camera.scale)/_Camera.scale)-_Camera.x/_Camera.scale);
		let y = (((this.click.y-10*_Camera.scale)/_Camera.scale)-_Camera.y/_Camera.scale);
		this.mapX = (x-(x%20)+10)/10
		this.mapY = (y-(y%20)+10)/10
		if(1){
			let entity = _Map.selectEntityAt(x+10,y+10);
			
			if(entity){
				if(!this.click.down){
					this.hover_entity = entity
					$("#selectMenu").html('Hovering over:<br>'+entity.getName())
				}
				this.graphics.visible = false
				return
			}
		}
		let tile2 = _Map.getTile(this.mapX*10+20,this.mapY*10+20)
		if(tile2)
			$("#selectMenu").html('Hovering over:<br>'+tile2.getName())
		else
			$("#selectMenu").html('');
		if(!this.click.down)
			this.hover_entity = [][0]
		this.graphics.visible = true
		this.graphics.position.x = x-(x%20)+10
		this.graphics.position.y = y-(y%20)+10
	}

	onZoom(e) {
		if(_Camera.scale+((e.wheelDelta)/1800.0)>=.34&&_Camera.scale+((e.wheelDelta)/1800.0)<20)
		{
			var oldScale = _Camera.scale;
			
	
			var oldX = _Camera.x;
			var oldY = _Camera.y;
		
		}
	}


}