let cam;
let player;
function setup() {
  createCanvas(400, 400, WEBGL);
  cam=createCamera();
  
  player = {
  pos:createVector(0,0,0),
  velocity:createVector(0,0,0),
  acceleration:createVector(0,0,0)
}
}

function draw() {
  player.velocity.x=0;
  player.velocity.z=0;
  if (keyIsPressed === true) {
    if (keyCode === LEFT_ARROW) {
    player.velocity.x=-1;
  } else if (keyCode === RIGHT_ARROW) {
    player.velocity.x=1;
  } else if (keyCode === UP_ARROW) {
    player.velocity.z=-1;
  }else if (keyCode === DOWN_ARROW) {
    player.velocity.z=1;
  }
    
  else{
    player.velocity.x=0;
  }
}
  background(220);
  box();
  cam.pan(-movedX*0.005);
  cam.tilt(movedY*0.005);
  
  push();
  translate(0,-50,0);
  box(10);
  pop();
  
  player.velocity.x+=player.acceleration.x;
  player.velocity.y+=player.acceleration.y;
  player.velocity.z+=player.acceleration.z;
  player.pos.x+=player.velocity.x;
  player.pos.y+=player.velocity.y;
  player.pos.z+=player.velocity.z;
  //cam.setPosition();
  cam.move(player.velocity.x,player.velocity.y,player.velocity.z)
}

function mouseClicked() {
  requestPointerLock();
}

