
window._Session = {};
window._Stat = {mail:0,money:5000};
_Session = window._Session;
_Stat = window._Stat;

window.onload = () => {
	window._Camera = new Camera();
	
	PIXI.loader
	  .add("./img/objects.png")
	  .load(start); 
}

window.changeMode = (i) => {
	_Session.mode = i
	if(_Session.mode == 0){
		$("#buildMenu").addClass('hide')
		$("#activeMode").html('Menu actions: Select')
	} else if(_Session.mode == 1){
		$("#buildMenu").removeClass("hide");
		$("#activeMode").html('Menu actions: Build')
	} else if(_Session.mode == 2){
		$("#buildMenu").addClass('hide')
		$("#activeMode").html('Menu actions: Clear')
	}
}

window.buildMode = (i) => {	
	$("button").removeClass("selected");
	$("#build"+i).addClass('selected')
	_Session.build = i
}

start = () => {
	var c = document.getElementById("screen");
	var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
	_Session.renderer = renderer;
	renderer.plugins.interaction.destroy()
	PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

	document.body.appendChild(renderer.view); 
	_Session.view =renderer.view
	_Session.build = 0
	window._Mouse = new Mouse();
	_Session.stage = new PIXI.Container();
	_Session.stage.scale.x = 1;
	_Session.stage.scale.y = 1;
	_Session.direction = 2;
	_Session.mailLevel = 4;
	_Session.mailCooldown = 20;
	_Session.mode = 0;
	list = new SpriteSheet('./img/objects.png');
	// test = list.createSpriteFromSheet(4,0);
	 
	// test.position.x = 200;  
	// test.position.y = 150;

	map = new Map() 
	map.setParentContainer(_Session.stage)
	entityController = new EntityController()
	entityController.setParentContainer(_Session.stage)
	//for(let i=0;i<70;i++) 
	// for(let i2=0;i2<20;i2++) 
	//	test = new Entity(100+~~(10*i),100+~~(10*i2))
	test = new Worker(400,50)
	test = new Worker(200,50)
	move = new MoveCamera()
	selector = new Selector() 
	selector.init()
	move.init() 
	//_Session.stage.addChild(list.container);
	
	animate();
}

animate = () => {
    // start the timer for the next animation loop
    requestAnimationFrame(animate);
    $("#dataMenu").html('Mail count: '+_Stat.mail+' Money: $'+_Stat.money)
    _Map.update()
    _EntityController.update()
    _Session.stage.position.x = _Camera.x;
    _Session.stage.position.y = _Camera.y;
    _Session.stage.scale.x = _Camera.scale;
    _Session.stage.scale.y = _Camera.scale;
    _Session.renderer.render(_Session.stage);
}

