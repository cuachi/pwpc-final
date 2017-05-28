const config = require('./config/config'),
    express= require('express'),
    app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/static/vendor'));

app.get('/',(req,res)=>{
    res.render('index');
    console.log(`Sirviendo Index`);
});

app.listen(config.PORT,(err)=>{
    if(err) throw err;
    console.log(`Corriendo aplicacion en el puerto ${config.PORT}`);
});