/**
 * Created by Angela on 2018/3/6.
 */
// 创建一个长度为 100、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(100);

// 写入缓冲区buf.write(string[, offset[, length]][, encoding])
len = buf1.write("www.runoob.com");

console.log("写入字节数 : " + len);

// 创建一个长度为 26、且用 0x1 填充的 Buffer。
const buf2 = Buffer.alloc(26, 1);

// 从缓冲区读取数据buf.toString([encoding[, start[, end]]])
for (var i = 0; i < 26; i++) {
    buf2[i] = i + 97;
}

console.log(buf2.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log(buf2.toString('ascii', 0, 5));   // 输出: abcde
console.log(buf2.toString('utf8', 0, 5));    // 输出: abcde
console.log(buf2.toString(undefined, 0, 5)); // 使用 'utf8' 编码, 并输出: abcde

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

buf3.fill('a');

console.log('buf3.fill: ' + buf3.toString('utf8'));

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');

// 缓冲区合并Buffer.concat(list[, totalLength])
var buffer1 = Buffer.from(('菜鸟教程'));
var buffer2 = Buffer.from(('www.runoob.com'));
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log("buffer3 内容: " + buffer3.toString());

// 缓冲区比较buf.compare(otherBuffer);
var buffer4 = Buffer.from('ABC');
var buffer5 = Buffer.from('ABCD');
var result = buffer4.compare(buffer5);

if (result < 0) {
    console.log(buffer4 + " 在 " + buffer5 + "之前");
} else if (result == 0) {
    console.log(buffer4 + " 与 " + buffer5 + "相同");
} else {
    console.log(buffer4 + " 在 " + buffer5 + "之后");
}

// 拷贝缓冲区buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
var buf7 = Buffer.from('abcdefghijkl');
var buf8 = Buffer.from('RUNOOB');

//将 buf2 插入到 buf1 指定位置上
buf8.copy(buf7, 2);

console.log(buf7.toString());// abRUNOOBijkl
//  缓冲区长度
console.log("buf7 length: " + buf7.length);

// 返回字节值
console.log('buf[3]: ' + buf7[3]);

console.log('buf7==buf8? ' + buf7.equals(buf8));

// 缓冲区裁剪buf.slice([start[, end]])
var buffer6 = buffer3.slice(12, 16);
console.log("buffer6 content: " + buffer6.toString('utf8'));


