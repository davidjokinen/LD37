
class SpriteSheet {
  constructor(img_loc) {
    this.img_loc = img_loc;
    this.texture = PIXI.loader.resources[img_loc].texture;
    this.texture.scaleMode = PIXI.SCALE_MODES.NEAREST;
	this.container = new PIXI.ParticleContainer(6000,{position:true, uvs: true,alpha: true,rotation: true,scale: true});
	this.spriteSheet = [];
	var tileSize = 20;
	for(var x =0;x<10;x++){	
		this.spriteSheet[x] = new Array();
		for(var y =0;y<10;y++){
			this.spriteSheet[x][y] = new PIXI.Texture(this.texture, new PIXI.Rectangle(x*(tileSize), y*(tileSize), tileSize, tileSize));
			this.spriteSheet[x][y].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
		}
	}
  }

  createSpriteFromSheet(x,y){
  	let newSprite = new PIXI.Sprite(this.spriteSheet[x][y]);
  	this.container.addChild(newSprite);
  	return newSprite;
  }

  remove(sprite){
  	this.container.removeChild(sprite)
  	sprite.destroy()
  	
  }	


}






