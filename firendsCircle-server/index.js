const express = require("express");
const bodyParser = require("body-parser");
const url = require("url");
let deliverInfo = [];
let id = 0;

const app = express();
app.use(bodyParser.urlencoded({extended:false}));

app.listen(3000,(err)=>{
    if(err){console.log("failed")}
    else{console.log("true:127.0.0.1:3000")}
})
app.get("/api",function(req,res){
    timeDuration(deliverInfo)
    res.json({"result":deliverInfo})
})
app.post("/api",function(req,res){
    parseimgArr(req.body)
    deliverInfo.unshift(req.body);
})
app.get("/zan",function(req,res){
    let qs = url.parse(req.url,true).query;
    let idx = Number(qs.idx);
    let nickName = qs.nickName;
    
    if(deliverInfo[idx].zan){
        deliverInfo[idx].zan += (", "+ nickName);
    }else{
        deliverInfo[idx].zan = nickName;
    }
})

//因为接收过来数据经过编码解码，body对象中的imgARR是字符串形式，所以需要转为数组形式。顺便加上接收时间
function parseimgArr(obj){
    if(obj.imgArr == 'null'){obj.imgArr=null}
    else {
        obj.imgArr = obj.imgArr.split(",");
    }
    obj.time = new Date();
}
//前端get时计算这条信息已经过去的时长，调试经段暂用，后期优化此函数
function timeDuration(obj){
    let curTime = new Date();
    for(let i=0; i<obj.length; i++){
        obj[i].id = i; //为了显示点赞和评论的条件判断设置id
        let temp = (curTime - obj[i].time)/1000;
        if(temp < 60){obj[i].time = ~~temp + "秒前"}
        else if(temp >= 60 && temp < 3600){obj[i].time = ~~temp/60 + "分钟前"}
        else if(temp >= 3600 && temp < 86400){obj[i].time = ~~temp/3600 + "小时前"}
        else if(temp >= 86400){obj[i].time = ~~temp/86400 + "天前"}
    }
}