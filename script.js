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

function lineline(x1,y1,x2,y2,x3,y3,x4,y4){
  var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
  var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
  
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {

    // optionally, draw a circle where the lines meet

    var intersectionX = x1 + (uA * (x2-x1));

    var intersectionY = y1 + (uA * (y2-y1));

    //fill(255,0,0);

    //noStroke();

    ellipse(intersectionX,intersectionY, 20,20);

    var out=[intersectionX, intersectionY];
    return out;

  }

  return false;
}

class voxel{
  constructor(x,y,z){
    this.size=50;
    this.x=x*this.size;
    this.y=y*this.size;
    this.z=z*this.size;
  }
  action(){

  }

  trigger(player){
    //collision & response
    if(player.x > this.x && player.x < this.x + this.size && player.y > this.y && player.y < this.y + this.size && player.z > this.z && player.z < this.z + this.size &&){
      let pos = raycast(player, player.previos);
    }
  }

  draw(){
    push();
    translate(this.x,this.y,this.z);
    box();
    pop();
  }

  raycast(p1,p2){
    let l1=lineline(p1.x, p1.y, p2.x, p2.y, this.x-(this.size/2),this.y+(this.size/2),this.x-(this.size/2),this.y-(this.size/2));
    let l2=lineline(p1.y, p1.z, p2.y, p2.z, this.y+(this.size/2),this.z+(this.size/2),this.y+(this.size/2),this.z-(this.size/2));
    let l3=lineline(p1.x, p1.z, p2.x, p2.z, this.x-(this.size/2),this.z+(this.size/2),this.x-(this.size/2),this.z-(this.size/2));
    let res={x:undefined,y:undefined,z:undefined};
    if(l1[0]===undefined){
      res.x=l3[0];
    }else{
      res.x=l1[0];
    }
    if(l1[1]===undefined){
      res.y=l2[1];
    }else{
      res.y=l1[1];
    }
    if(l2[0]===undefined){
      res.z=l3[1];
    }else{
      res.z=l2[0];
    }
    if(res=undefined){return false;}
    return res;
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

  b=new voxel(1,1,1);
  b.draw();
  
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

