process.env.NODE_CLUSTER_SCHED_POLICY = 'rr';
var cluster = require('cluster');
var cpuNums = require('os').cpus().length;
var http = require('http');
const message = {
    cmd: 'NODE_CLUSTER',
    act: 'queryServer'
  };
  process.send(message);
console.log(cluster.isMaster)
if(cluster.isMaster){
    for(var i = 0; i < cpuNums; i++){
      cluster.fork();
    }
  }else{
    http.createServer(function(req, res){
      res.end(`response from worker ${process.pid}`);
    }).listen(3000);
    
    console.log(`Worker ${process.pid} started`);
  }
  