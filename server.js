var app = require("./backend/app");
var debug = require("debug")("node-angular");
var http = require("http");

var normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

var onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

var onListening = () => {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

var server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
