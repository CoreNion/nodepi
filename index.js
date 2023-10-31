const http = require("http");
const gpio = require('rpi-gpio');

const port = 3000;

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
  } else {
    mesg = "no command";
  }

  response.writeHead(200, {
    "Content-Type": "text/html"
  });


  const responseMessage = `<h1>${mesg}</h1>`;
  response.end(responseMessage);
});

server.listen(port);
console.log("Server Start!")
