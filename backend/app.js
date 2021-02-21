const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const postsRouter = require('./routes/posts');
const useRouter = require('./routes/user');


const url = "mongodb://mgaberweb:mgaberweb@cluster0-shard-00-00.ylww9.mongodb.net:27017,cluster0-shard-00-01.ylww9.mongodb.net:27017,cluster0-shard-00-02.ylww9.mongodb.net:27017/node-angular?ssl=true&replicaSet=atlas-we1gzw-shard-0&authSource=admin&retryWrites=true&w=majority";
// mongodb+srv://mgaber:b7qnUrdWGQy9OeBo@cluster0.vgiv1.mongodb.net/node-angular?retryWrites=true&w=majority



mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('database connected!!');
}).catch(err => {
  console.log(err);
})
// const db = mongoose.connection;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images")))




// middlware => access on request object and response object and next function

///////////////////// Fix Cors Origin For Diffrent Domain

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use('/api/posts', postsRouter);
app.use('/api/user', useRouter);


module.exports = app; // export anythings
