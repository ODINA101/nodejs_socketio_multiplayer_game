const express = require("express")
const app = express()
const http = require('http').Server(app)
const io = require("socket.io")(http)
app.use(express.static(__dirname + "/"))
app.get("/",(req,res) => {
  res.sendFile(__dirname + "./index.html")
})



var usersNUM = 0;
http.listen(3000,function(){
  console.log("server is running")
})


io.on("connection",(socket) => {
  usersNUM++
  console.log(usersNUM)

  socket.on('clientY',function(data) {
     socket.broadcast.emit("player2Y",data)
  })

  socket.on("check",function(){
  socket.emit("checked",usersNUM)
  });
  
  socket.on("ball",function(xy){

  socket.broadcast.emit("ball",xy)
  })

 socket.on("disconnect",() => {
  usersNUM--
console.log(usersNUM)
 })

})