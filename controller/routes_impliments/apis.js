const db = require('../db/pgQueries');
module.exports.home =async (req,res) =>{
    const resp = await db.existed("Aimen")
    console.log(resp)
res.render('home')
}