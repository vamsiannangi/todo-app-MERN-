// const jwt=require('jsonwebtoken');

// const middleware= async(req,res,next)=>{
//     try{
//      let token=req.header('authorization');
//      if(!token){
//       return res.status(400).send('token not found');
//      }
//      let decode=await jwt.verify(token,"jwtSecurity");
//      req.user=decode.user;
//      next();
//     }catch (err) {
//       res.status(401).send('Invalid Token');
//     }
//   }

//   module.exports={middleware};

const jwt = require('jsonwebtoken');

const middleware = async (req, res, next) => {
  try {
    let token = req.header('x-token');
    if (!token) {
      return res.status(400).send('Token not found');
    }
    let decode = await jwt.verify(token, 'jwtSecurity');
    req.user = decode.user;
    next();
  } catch (err) {
    res.status(401).send('Invalid Token');
  }
};

module.exports = middleware;
