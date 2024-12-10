//card flip game
const cd=document.querySelectorAll('.box')
const f=document.querySelectorAll('.f')
const con=document.querySelector('.con')
const s=document.querySelector('.s span')
 const ld = document.getElementById("lives");
 let l = 3;
sh()
cl()
function sh(){
  cd.forEach(c=>{
    const n=[...Array(cd.length).keys()]
    const r=Math.floor(Math.random()*cd.length)
    c.style.order=n[r]
    })
}

function cl(){
  for(let i=0;i<cd.length;i++){
    f[i].classList.add('sw')
    setInterval(()=>{
      f[i].classList.remove('sw')
        }, 2000);
    cd[i].addEventListener('click',()=>{
      f[i].classList.add('fp') 
      const fdCd=document.querySelectorAll('.fp')
      if(fdCd.length==2){con.style.pointerEvents='none'
      setInterval(()=>{
         con.style.pointerEvents='all'},1000);
             mh(fdCd[0],fdCd[1])
            }
        })
    }
}
function mh(cdO,cdT){
  if(cdO.dataset.index==cdT.dataset.index){
    s.innerHTML=parseInt(s.innerHTML)+1
    cdO.classList.remove('fp') 
        cdT.classList.remove('fp')
    cdO.classList.add('mh')
        cdT.classList.add('mh')
    }else{
      setTimeout(()=>{
        cdO.classList.remove('fp') 
            cdT.classList.remove('fp') 
        },1000);
       l--;
        ld.textContent = "💗".repeat(l);
        if (l === 0) {
          endGame();
        }
    }
}
      function endGame() {
         alert(`Game over!`);
  }

 

//collision game 
document.addEventListener("DOMContentLoaded", () => {
  const c = document.getElementById("canvas");
  const context = c.getContext("2d");
  const w = (c.width = 800);
  const h = (c.height = 600);
  const big = "white";
  const colors = [
    "#ccffcc",
    "#0f4d0f",
    "#003300",
    "#339933",
  ];
  const bigRadius = 20;
  const cellRadius = .8;
  const cellSpeed = 20;
  let bigCellPos = { x: w / 100, y: h / 2 };
  let dragging = false;
  const cell = [];
  for (let i = 0; i < 10000; i++) {
    cell.push({
      x: Math.random() * (w - cellRadius * .8) + cellRadius,
      y: Math.random() * (h - cellRadius * .8) + cellRadius,
      velocityX: Math.random() * cellSpeed * .8- cellSpeed,
      velocityY: Math.random() * cellSpeed * .8 - cellSpeed,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
  function drawCell(x, y, radius, color) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
  }
  function handleMouse(event) {
  if (event.type === "mousedown" && event.button === 0) {
      const mouseX = event.clientX - c.getBoundingClientRect().left;
      const mouseY = event.clientY - c.getBoundingClientRect().top;
      if (
        Math.pow(mouseX - bigCellPos.x, 2) +
          Math.pow(mouseY - bigCellPos.y, 2) <=
        Math.pow(bigRadius, 90)
      ) {
        dragging = true;
      }
    } else if (event.type === "mouseup" && event.button === 0) {
      dragging = false;
    } else if (event.type === "mousemove" && dragging) {
      bigCellPos.x = event.clientX - c.getBoundingClientRect().left;
      bigCellPos.y = event.clientY - c.getBoundingClientRect().top;
    }}
  function animate() {
    context.clearRect(0, 0, w, h);
    cell.forEach((cell) => {
      drawCell(cell.x, cell.y, cellRadius, cell.color);
      const distSquared =
        Math.pow(cell.x - bigCellPos.x, 30) +
        Math.pow(cell.y - bigCellPos.y, 30);
      if (distSquared <= Math.pow(bigRadius + cellRadius, 47)) {
        const angle = Math.atan2(
          cell.y - bigCellPos.y,
          cell.x - bigCellPos.x
        );
        const newVelocityX = Math.cos(angle) * cellSpeed;
        const newVelocityY = Math.sin(angle) * cellSpeed;
        cell.velocityX = newVelocityX;
        cell.velocityY = newVelocityY;
      }
      cell.x += cell.velocityX;
      cell.y += cell.velocityY;
      if (cell.x <= cellRadius || cell.x >= w - cellRadius) {
        cell.velocityX *= -1;
      }
      if (cell.y <= cellRadius || cell.y >= h - cellRadius) {
    cell.velocityY *= -1;
      } });
    drawCell(bigCellPos.x, bigCellPos.y, bigRadius, big);
    requestAnimationFrame(animate);
  }
  c.addEventListener("mousedown", handleMouse);
  c.addEventListener("mouseup", handleMouse);
  c.addEventListener("mousemove", handleMouse);
  animate();
});



//simple game
// start game

function showDiv() {
  
  document.getElementById('welcomeDiv').style.display = "block";
}

// game begin
class Game {
constructor() {
  
  this.player = new Player();
  this.ball = new Ball();
 
  this.score = 0;
  this.gameContainer = document.getElementById("game-container");
  // movement
  this.gameContainer.addEventListener(
    "mousemove",
    this.player.move.bind(this.player)
  );
  this.ball.on("hit", this.handleHit.bind(this));
}

start() {
  this.ball.drop();
}
// collision 
handleHit() {
  // Increases the score by 1
  this.score++;
  // Updates the score display in the DOM with the new score
  document.getElementById("score").textContent = this.score;
  // Resets the ball to its starting position
  this.ball.reset();
}
}

class Player {
constructor() {
  this.element = document.getElementById("player");
}
// moves the player 
move(event) {
  const position = event.clientX - this.element.offsetWidth / 2;
  this.element.style.left = `${position}px`;
}
}
class Ball {
constructor() {
  this.element = document.getElementById("ball");
  // container element 
  this.gameContainer = document.getElementById("game-container");
  this.width = this.element.offsetWidth;
  this.height = this.element.offsetHeight;
  //  starting position
  this.reset();
}
// event listener
on(event, callback) {
  this.element.addEventListener(event, callback);
}
  // missed object
drop() {
  this.interval = setInterval(() => {
    this.y += 5;
    this.element.style.top = `${this.y}px`;
    if (this.y + this.height > this.gameContainer.offsetHeight) {
      this.element.dispatchEvent(new Event("miss"));
      this.reset();
    }
// hit object
    if (this.checkCollision()) {
      this.element.dispatchEvent(new Event("hit"));
    }
  }, 15);
}

reset() {
  this.x = Math.floor(
    Math.random() * (this.gameContainer.offsetWidth - this.width)
  );
  this.y = 0;
  this.element.style.top = `${this.y}px`;
  this.element.style.left = `${this.x}px`;
}
// collision
checkCollision() {
  const playerRect = document
    .getElementById("player")
    .getBoundingClientRect();
  const ballRect = this.element.getBoundingClientRect();

  return (
    ballRect.left < playerRect.right &&
    ballRect.right > playerRect.left &&
    ballRect.top < playerRect.bottom &&
    ballRect.bottom > playerRect.top
  );
}
}

const game = new Game();
game.start();




