/**
 * Created by Angela on 2018/3/6.
 */
// var hello = require('./hello');
// hello.world();

var Hello = require('./hello');
hello = new Hello();
hello.setName('BYVoid');
hello.sayHello();

var server = require("./server");
var router = require("./router");

server.start(router.route);