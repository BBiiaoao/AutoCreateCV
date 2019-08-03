const http =require("http");
const express= require("express");
const phantom =require('phantom')

const app=express();

app.get('/',function(req,res){
  res.send('Hello')
})

app.listen(3000,function(){
  console.log('app is listening in port 3000');
})
