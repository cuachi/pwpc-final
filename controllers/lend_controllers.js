const db = require('./db');

module.exports ={
    getNew : (req,res,next)=>{
        res.render('lend/new',{
            isAuthenticated : req.isAuthenticated(),
            user : req.user,
            title: 'Lend',
            bol: false,
            documents : null
        });
        console.log(`> Sirviendo lend-get-new`);
    },
    postNew : (req,res,next)=>{
        db.find(req,'items',req.body,(sol,bol)=>{
            data = {user : req.user[0]._id,objeto : sol[0]._id};
            console.log(data);
            if(db.insert(data,'prestamo')){
                var num = parseInt(sol[0].cantidad)-parseInt(req.body.cantidad);
                sol[0].cantidad = num;
                db.update(req,"items",sol[0]);
            }
            console.log(sol)
            res.render('lend/new',{
                isAuthenticated : req.isAuthenticated(),
                user : req.user,
                title: 'Lend',
                bol: bol,
                documents: sol
            });
            console.log(`> Sirviendo lend-post-new`);
        });
    },
    postNewStorage : (req,res,next)=>{
        db.find(req,'items',req.body,(sol,bol)=>{
            console.log(sol)
            res.render('lend/new',{
                isAuthenticated : req.isAuthenticated(),
                user : req.user,
                title: 'Lend',
                bol: bol,
                documents: sol
            });
            console.log(`> Sirviendo lend-post-new-storage`);
        });
    },
    getUpdate : (req,res,next)=>{
        res.render('lend/update',{
            isAuthenticated : req.isAuthenticated(),
            user : req.user,
            title: 'Lend',
        });
        console.log(`> Sirviendo lend-get-update`);
    },
    getShow : (req,res,next)=>{
        res.render('lend/show',{
            isAuthenticated : req.isAuthenticated(),
            user : req.user,
            title: 'Lend',
        });
        console.log(`> Sirviendo lend-get-show`);
    }
};