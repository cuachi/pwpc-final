const db = require('./db');

module.exports = {
    getSignup : (req,res,next)=>{
        res.render('user/signup',{
            isAuthenticated : req.isAuthenticated(),
            user : req.user,
            title: 'Sign up'});
        console.log(`> Sirviendo signup`);
    },
    postSignup : (req,res,next)=>{
        if(db.insert(req.body,'users')){
            res.render("user/signup",{
            isAuthenticated : req.isAuthenticated(),
            user : req.user,
            title: 'Registro'});
        return;
        }        
    },
    getSignin : (req,res,next)=>{
        res.render('user/signin',{
        isAuthenticated : req.isAuthenticated(),
        user : req.user,
        title: 'Sign in'});
        console.log(`> Sirviendo signin`);
    },
    logout : (req,res,next)=>{
        req.logout();
        res.redirect('/');
    }
}; 