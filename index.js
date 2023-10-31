const http = require("http");
const gpio = require('rpi-gpio');
var i2c = require('i2c-bus');

const port = 3000;
const DEVICE_NUMBER = 1;
const TARGET_IC_ADDR = 0x08;

gpio.setup(8, gpio.DIR_OUT);

const server = http.createServer((request, response) => {
  let mesg = "";
  if (request.url === "/on") {
    mesg = "on";
    gpio.write(8, true);

    console.log("GPIO On~~")
  } else if (request.url === "/off") {
    mesg = "off";
    gpio.write(8, false);

    console.log("GPIO Off~")
  } else if (request.url === "/temp") {
    var i2c1 = i2c.openSync(DEVICE_NUMBER);

    var readBuf = new Buffer.alloc(0x2);
    i2c1.i2cReadSync(TARGET_IC_ADDR, readBuf.length, readBuf);

    // 16進数から数値に変換
    mesg = `現在の温度は${readBuf.readInt8(0)}度です`;
    console.log(readBuf);
  } else {
    mesg = "no command";
  }

  response.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8"
  });


  const responseMessage = `<h1>${mesg}</h1>`;
  response.end(responseMessage);
});

server.listen(port);
console.log("Server Start!")
