
class Camera {
  constructor() {
    this.x = 0;
    this.y = 0; 
    this.scale = 2;
 
    if(window._Camera){
		console.error("There is already a camera!");
		return _Camera;
	}
  }
}
