/**
 * Created by Angela on 2018/3/6.
 */
exports.world = function() {
    console.log('Hello World');
}

function Hello() {
    var name;
    this.setName = function(thyName) {
        name = thyName;
    };
    this.sayHello = function() {
        console.log('Hello ' + name);
    };
};
module.exports = Hello;