const db = require('./db');

module.exports = {
    getShow : (req,res,next)=>{
        res.render('inventory/show',{
            isAuthenticated : req.isAuthenticated(),
            user : req.user,
            title: 'Show',
            bol : false,
            documents: null
        });
        console.log(`> Sirviendo show`);
    },
    postShow : (req,res,next)=>{
        db.find(req,'items',req.body,(sol,bol)=>{
            console.log(sol)
            res.render('inventory/show',{
                isAuthenticated : req.isAuthenticated(),
                user : req.user,
                title: 'Show',
                bol: bol,
                documents: sol
            });
            console.log(`> Sirviendo show`);
        }); 
    },
    getUpdate : (req,res,next)=>{
        res.render('inventory/update',{
            isAuthenticated : req.isAuthenticated(),
            user : req.user,
            title: 'Update',
            bol : false,
            documents: null,
            update : false});
        console.log(`> Sirviendo update`);
    },
    postUpdate : (req,res,next)=>{
        db.update(req,"items",req.body);
        res.render('inventory/update',{
            isAuthenticated : req.isAuthenticated(),
            user : req.user,
            title: 'Update',
            bol : false,
            documents: [req.body],
            update : true});
        console.log(`> Sirviendo update`);
    },
    postUpdateShow : (req,res,next)=>{
        db.find(req,'items',req.body,(sol,bol)=>{
            console.log(sol)
            res.render('inventory/update',{
                isAuthenticated : req.isAuthenticated(),
                user : req.user,
                title: 'Update',
                bol: bol,
                documents: sol,
                update : false
            });
            console.log(`> Sirviendo update`);
        });
    },
    postUpdateItem : (req,res,next)=>{
        db.find(req,'items',req.body,(sol,bol)=>{
            console.log(sol)
            res.render('inventory/update',{
                isAuthenticated : req.isAuthenticated(),
                user : req.user,
                title: 'Update',
                bol: bol,
                documents: sol,
                update : true
            });
            console.log(`> Sirviendo update`);
        });
    },
    getNew : (req,res,next)=>{
        res.render('inventory/new',{
            isAuthenticated : req.isAuthenticated(),
            user : req.user,
            title: 'New'});
        console.log(`> Sirviendo new`);
    },
    postNew : (req,res,next)=>{
        if (db.insert(req,"items"))
        {
            res.render('inventory/new',{
            isAuthenticated : req.isAuthenticated(),
            user : req.user,
            title: 'New'});
            console.log(`> Sirviendo new post `);
        }
    }
};