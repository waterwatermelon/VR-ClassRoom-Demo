//搭建一个简单本地服务器
var http=require('http');
var fs = require('fs');//引入fs模块来读取文件
var root = "E:/Web前端训练营/第一阶段/第一阶段任务代码" //项目根目录
var server = http.createServer(function(req,res){
    var url = req.url;
    var file = root + url;
    fs.readFile(file,function(err,data){
        if(err){
            res.writeHeader(404,{
                'content-type':'text/html;charset="utf-8"'
            })
            res.write('<h1>404Error!</h1> <p>你要找s的页面不存在</p>');
            res.end();
        }else{
            var type = url.substr(url.lastIndexOf(".")+1,url.length)
            res.writeHeader(200,{
                // 设置文件类型为text/html,浏览器接收到这个文件时会调用html解析器对文件进行处理。
                // text/plain 纯文本文件，浏览器不会解析它
                'content-type':'text/'+type+';charset="utf-8"'
            });
            res.write(data);
            res.end();
        }
    })
}).listen(8888);//设置监听端口
console.log('服务器开启成功,127.0.0.1:8888');