var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var numPage = require('./routes/numPage');
var vipDetail = require('./routes/vipDetail');
var Business = require('./routes/business');
var jwt = require("jsonwebtoken");
var app = express();
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({limit:'5mb',extended:true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public",express.static('public'));
// app.use(express.static(path.join(__dirname, 'public/images')));
app.use('*',function(req, res, next) {
  //路由拦截：是否存在token，存在放行，否则拦截
  let token = req.headers.token;
    if(token==""||token==undefined){
        res.status(401).send("请先登录");
        return;
    }else
    {
      let secretOrPrivateKey="meixibandao"
      jwt.verify(token, secretOrPrivateKey, function (err, decode) {
        if (err) {  //  时间失效的时候/ 伪造的token          
          res.status(401).send("登录超时，请重新登录");
        }
        else{
          next();
        }
      })
    }
});

app.use('/', indexRouter);
app.use('/numPage', numPage);
app.use('/vipDetail', vipDetail);
app.use('/users', usersRouter);
app.use('/business', Business);
// catch 404 and forward to error handler
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
