const jwt = require('jsonwebtoken');
const auth_ver =  (req,res,next) => {
const token = req.cookies.jwt;
if(token){

    jwt.verify(token,process.env.TOKEN_SECRET,async (err, decodedToken) => {
        
        if(err){ 
          res.locals.user = null;
            res.redirect('/login');
            }
            else{  
              res.locals.user = "hhh";  
             // const user = await users.findById(decodedToken.id);
                next();
              //  
}
    });
    }
    else{
       // console.log('error 2:  ==== ' ,err);
       res.locals.user = null;
        res.redirect('/login');
        }

}

module.exports = auth_ver;