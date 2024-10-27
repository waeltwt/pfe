const User = require ('../Models/userSchema.js')
const adminMiddleware = async (req, res, next)=>{
    try{
        const user = await User.findById(req.userId);
        if (user.role === 'RH') next();
        else res.status(401).json({msg:'you are not authorized' });
    }catch (error){
        res.status(400).json({ errors: [{ msg: err.message }] });
    }



    
};
module.exports = adminMiddleware;