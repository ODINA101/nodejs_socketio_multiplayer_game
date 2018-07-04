'use strict'




var socket = io();
var ImFirst = true;


socket.emit("check")
socket.on("checked",(num) => {
console.log(num)
if(num > 1) {
ImFirst = false
}
})



var canvas = document.querySelector("#playground")
var ctx = canvas.getContext("2d")
var clientY = 0;
var client2Y = 0;
setInterval(render,1000/60);
window.addEventListener("mousemove",(mouse) => {

    clientY = mouse.clientY
    socket.emit("clientY",mouse.clientY)

})
socket.on("playerY",(data) => {
  
    clientY = data;

})

socket.on("player2Y",(data) => {
    client2Y = data;

})

var ballx,bally;
ballx = 70;
bally = 70;
var speedx,speedy;
speedx = 5;
speedy = 5;

    socket.on("ball",(data) => {
       console.log(data)
        ballx = data.x;
        bally = data.y;

    })


function render() {
ctx.fillStyle = "black"
ctx.fillRect(0,0,canvas.width,canvas.height)

///ball




ctx.fillStyle = "#c82124"; //red
ctx.beginPath();
ctx.arc(ballx,bally,15,0,Math.PI*2,true);
ctx.closePath();
ctx.fill();
if(ImFirst) {
ballx += speedx;
bally += speedy;
}
///sending ball cordinates

if(ImFirst) {
    socket.emit("ball",{x:ballx,y:bally})
}

if(ImFirst) {
if(ballx >= canvas.width - 10) {
    speedx = - speedx
}

if(bally >= canvas.height - 10) {
    speedy = - speedy
}


if(ballx <=  10) {
    speedx = - speedx
}

if(bally <= 10) {
    speedy = - speedy
}

console.log(clientY)
if(ballx < 70 && bally < clientY+100 && bally > clientY) {
    speedx = - speedx

}

if(ballx > canvas.width-70 && bally < client2Y+100 && bally > client2Y) {
    speedx = - speedx

}


}
//player 1
if(ImFirst) {
ctx.fillStyle = "white";
ctx.fillRect(50,clientY,20,100)
}else{
    ctx.fillStyle = "white";
ctx.fillRect(50,client2Y,20,100)
}
//player2
 if(ImFirst) {
ctx.fillStyle = "white";
ctx.fillRect(canvas.width-50,client2Y,20,100)

 }else{
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width-50,clientY,20,100)
    
 }


}