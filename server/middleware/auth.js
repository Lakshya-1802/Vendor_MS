import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(' ')[1] // Bearer khqkfhqlfjqlfjqklfjqwkhdwq=>['Bearer','khqkfhqlfjqlfjqklfjqwkhdwq']
        jwt.verify(token,process.env.JWT_SECRET,async (err,payload)=>{
            try {
                if(err){
                    return res.status(401).json({error:'Unauthorized !'})
                }
                const user = await User.findOne({uid:payload.uid}).select('-password -_id')
                req.user=user
                next()
            } catch (error) {
                console.log(error);
            }
        })
    }else{
       return res.status(403).json({error:'Forbidden'})
    }
}
export default authMiddleware