const config = require('./config/config'),
    express = require('express'),
    controllers = require('./controllers'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    cookieSession = require('cookie-session');
    app = express();

controllers.passport(passport);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static/vendor'));
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    res.render('index',{
        isAuthenticated : req.isAuthenticated(),
        user : req.user,
        title : 'Index'});
    console.log(`> Sirviendo Index`);
});

app.get('/user/signup',controllers.users_controllers.getSignup);
app.post('/user/signup',controllers.users_controllers.postSignup);
app.get('/user/signin',controllers.users_controllers.getSignin);
app.post('/user/signin',passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/user/signin'
}));
app.get('/logout',controllers.users_controllers.logout);
app.get('/inventory/new',controllers.inventory_controllers.getNew);
app.post('/inventory/new',controllers.inventory_controllers.postNew);
app.get('/inventory/show',controllers.inventory_controllers.getShow);
app.post('/inventory/show',controllers.inventory_controllers.postShow); 
app.get('/inventory/update',controllers.inventory_controllers.getUpdate);
app.post('/inventory/update',controllers.inventory_controllers.postUpdate);
app.post('/inventory/update/show',controllers.inventory_controllers.postUpdateShow);
app.post('/inventory/update/item',controllers.inventory_controllers.postUpdateItem);

app.listen(config.PORT,(err)=>{
    if(err) throw err;
    console.log(`Corriendo aplicacion en el puerto ${config.PORT}`);
});