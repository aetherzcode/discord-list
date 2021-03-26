const port = process.env.PORT || 3000;
const app = require("express")();
const express = require("express");
const httpServer = require("http").createServer(app);
const options = { /* ... */ };
const io = require("socket.io")(httpServer, options);
var compression = require("compression");
let client = require("@bot/index.js");
let auth = require("@utils/auth.js");
const authRoute = require("@routes/authclient.js");
module.exports = { httpServer, port };
var cookieParser = require("cookie-parser");
app.disable('x-powered-by');
app.use(cookieParser());
app.use(compression());
let log = console.log;
const rovel = require("rovel.js")
const fetch = rovel.fetch;
const dayjs = rovel.time;
const rateLimit = require("express-rate-limit");
let path = require("path");
const bots = require('@routes/bots.js');
setTimeout(()=>{
 console.log(rovel.text.green(`Everything Started! RDL is ready to go!`))
}, 5000);
// ejs setting
app.set('view engine', 'ejs');
app.set('views', path.resolve("src/pages"));
const limiter = rateLimit({
 windowMs: 60 * 60 * 1000, // 60 minutes
 max: 1000 // limit each IP to 1000 requests per windowMs
});
app.set('trust proxy', 1);
app.use(limiter);

process.on('unhandledRejection', err => {
 var unre = function(req, res, next) {
  log(error("**PROCESS** - Unhandled Rejection:\n") + warn(err));
  next(err);
  app.use(unre);
 }
});

var checkBanned = function(req, res, next) {
 if(req.cookies['key']){
  var user = await auth.getUser(req.cookies['key']);
  fetch(`${process.env.DOMAIN}/api/client/bannedusers/${user.id}`).then(r=>r.json()).then(d=>{
   if(d.banned){
    res.send("You're banned from Rovel Stars");
   }
   else next()
  });
 }
};
app.use(checkBanned);
var weblog = function(req, res, next) {
 const weburl = process.env.WEBHOOK;
 const logweb = `**New Log!**\n**Time:** \`${dayjs().format("ss | mm | hh A - DD/MM/YYYY Z")}\`\n**IP:** ||${req.ip || req.ips}||\n**Path requested:** \`${req.originalUrl}\`\n**Request type:** \`${req.method}\``;
 fetch(weburl, {
  method: "POST",
  headers: {
   "Content-Type": "application/json"
  },
  body: JSON.stringify({
   "username": "RDL logging",
   "content": logweb
  })
 });
 next();
}
app.use(weblog);
log("[SERVER] Started!\n[SERVER] Webhooks started!");

app.use('/assets', express.static(path.resolve("src/public/assets")));
app.use('/api/bots', bots);
app.use('/api/auth', authRoute);
app.use('/api/client', client);

app.get('/api', (req, res)=>{
 res.json({hello: "coder!"});
})

app.get('/api/*', (req, res)=>{
 res.json({err: 404});
})

app.get("/", async (req, res) => {
 if(req.cookies['key']){
 var user = await auth.getUser(req.cookies['key']);
 await res.render('index.ejs', {user});
}
else res.render('index.ejs', {user: null});
});
app.get("/favicon.ico", (req, res) => {
 res.redirect("/assets/img/robot.png");
});

app.get("/server", (req, res)=>{
 res.redirect("https://discord.gg/953XCpHbKF");
});

app.get("/email", (req, res)=>{
 res.redirect("mailto: support@rovelstars.com");
});

app.get("/arc-sw.js", (req, res) => {
 res.sendFile(path.resolve("src/public/assets/arc-sw.js"));
});

app.get("/beta", (req, res)=>{
 res.sendFile(path.resolve("src/public/assets/join.html"));
});

 app.get("/login", (req, res)=>{
 res.redirect(auth.auth.link);
});

app.get("/logout", async (req, res)=>{
 if(req.cookies['key']) res.cookie('key', req.cookies['key'], {maxAge: 0});
 res.redirect("/");
});

app.get("*", (req, res) => {
 res.sendFile(path.resolve("src/public/assets/index.html"));
 });
 
 io.on("connection", (socket)=>{
  socket.on('post_stats', (msg) => {
   
  });
 });