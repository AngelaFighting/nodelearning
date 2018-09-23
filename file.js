/**
 * Created by Angela on 2018/3/6.
 */
var fs = require("fs");
var zlib = require('zlib');
// 处理文件路径
var path = require("path");

// var data = fs.readFileSync('input.txt');
//
// console.log('同步：' + data.toString());
//
// fs.readFile('input.txt', function (err, data) {
//     if (err) return console.error(err);
//     console.log('异步：' + data.toString());
// });

/**
 flags 参数可以是以下值：
 r	以读取模式打开文件。如果文件不存在抛出异常。
 r+	以读写模式打开文件。如果文件不存在抛出异常。
 rs	以同步的方式读取文件。
 rs+	以同步的方式读取和写入文件。
 w	以写入模式打开文件，如果文件不存在则创建。
 wx	类似 'w'，但是如果文件路径存在，则文件写入失败。
 w+	以读写模式打开文件，如果文件不存在则创建。
 wx+	类似 'w+'， 但是如果文件路径存在，则文件读写失败。
 a	以追加模式打开文件，如果文件不存在则创建。
 ax	类似 'a'， 但是如果文件路径存在，则文件追加失败。
 a+	以读取追加模式打开文件，如果文件不存在则创建。
 ax+	类似 'a+'， 但是如果文件路径存在，则文件读取追加失败。
 */
// 在异步模式下打开文件fs.open(path, flags[, mode], callback) callback(err, fd)
// 通过异步模式获取文件信息 fs.stat(path, callback) callback(err, stats), stats 是 fs.Stats 对象。
console.log("准备打开文件！");
fs.stat('input.txt', function (err, stats) {
    if (err) {
        return console.error(err);
    }
    console.log(stats);
    console.log("读取文件信息成功！");

    // 检测文件类型
    console.log("是否为文件(isFile) ? " + stats.isFile());
    console.log("是否为目录(isDirectory) ? " + stats.isDirectory());
    // isBlockDevice、isCharacterDevice、isSymbolicLink、isFIFO、isSocket
});

// 异步模式下写入文件fs.writeFile(file, data[, options], callback)
// writeFile 直接打开文件默认是 w 模式，所以如果文件存在，该方法写入的内容会覆盖旧的文件内容。
// data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(流) 对象。
// options - 该参数是一个对象，包含 {encoding, mode, flag}。
// 默认编码为 utf8, 模式为 0666 ， flag 为 'w'
// callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。

// 异步模式下读取文件fs.read(fd, buffer, offset, length, position, callback)
/**
 fd - 通过 fs.open() 方法返回的文件描述符。
 buffer - 数据写入的缓冲区。
 offset - 缓冲区写入的写入偏移量。
 length - 要从文件中读取的字节数。
 position - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
 callback - 回调函数，有三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象。
 */

var buf = new Buffer(1024);
fs.open('input.txt', 'r+', function(err, fd) {
    if (err) {
        return console.error(err);
    }
    console.log("文件打开成功！");
    console.log("准备读取文件：");
    fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
        if (err){
            console.log(err);
        }
        console.log(bytes + "  字节被读取");

        // 仅输出读取的字节
        if(bytes > 0){
            console.log(buf.slice(0, bytes).toString());
        }

        // 关闭文件
        fs.close(fd, function(err){
            if (err){
                console.log(err);
            }
            console.log("文件关闭成功");
        });
    });
});

// 异步模式下截取文件fs.ftruncate(fd, len, callback)

// 删除文件fs.unlink(path, callback)

// 创建目录fs.mkdir(path[, mode], callback)

// 读取目录fs.readdir(path, callback)
fs.readdir("../node/",function(err, files){
    if (err) {
        return console.error(err);
    }
    files.forEach( function (file){
        console.log( file );
    });
});

// 删除目录fs.rmdir(path, callback)

// 重命名fs.rename(oldPath, newPath, callback)

// 异步追加文件内容fs.appendFile(filename, data[, options], callback)

// 查看文件的修改fs.watchFile(filename[, options], listener)

// 检测给定的路径是否存在fs.exists(path, callback)

/**
 *
 Node.js，Stream 有四种流类型：
 Readable - 可读操作。
 Writable - 可写操作。
 Duplex - 可读可写操作.
 Transform - 操作被写入数据，然后读出结果。
 所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
 data - 当有数据可读时触发。
 end - 没有更多的数据可读时触发。
 error - 在接收和写入过程中发生错误时触发。
 finish - 所有数据已被写入到底层系统时触发。
 */
var dataSteam = '';

// 创建可读流
var readerStream = fs.createReadStream('input.txt');

// 设置编码为 utf8。
readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
    dataSteam += chunk;
});

readerStream.on('end',function(){
    console.log(dataSteam);
});

readerStream.on('error', function(err){
    console.log(err.stack);
});

var dataWrite = '菜鸟教程官网地址：www.runoob.com';

// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('output.txt');

// 使用 utf8 编码写入数据
writerStream.write(dataWrite,'UTF8');

// 标记文件末尾
writerStream.end();

// 处理流事件 --> data, end, and error
writerStream.on('finish', function() {
    console.log("写入完成。");
});

writerStream.on('error', function(err){
    console.log(err.stack);
});

// 创建一个可读流
// var readerStream1 = fs.createReadStream('input.txt');
//
// // 创建一个可写流
// var writerStream1 = fs.createWriteStream('output.txt');
//
// // 管道读写操作
// // 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
// readerStream1.pipe(writerStream1);

// 压缩 input.txt 文件为 input.txt.gz
// fs.createReadStream('input.txt')
//     .pipe(zlib.createGzip())
//     .pipe(fs.createWriteStream('input.txt.gz'));

// 解压 input.txt.gz 文件为 input.txt
// fs.createReadStream('input.txt.gz')
//     .pipe(zlib.createGunzip())
//     .pipe(fs.createWriteStream('input.txt'));

console.log("程序执行结束!");

// path.join([path1][, path2][, ...])
// 用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，
// Unix系统是"/"，Windows系统是"\"。

// path.isAbsolute(path)
// 判断参数 path 是否是绝对路径。
//
// path.extname(p)
// 返回路径中文件的后缀名，即路径中最后一个'.'之后的部分。
// 如果一个路径中并不包含'.'或该路径只包含一个'.' 且这个'.'为路径的第一个字符，
// 则此命令返回空字符串。
//
// path.resolve([from ...], to)
// 将 to 参数解析为绝对路径。




