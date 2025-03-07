import jwt from 'jsonwebtoken';
const secretKey = "Ashim!@#123";
export function setUser(user){
    const payload = {
        email:user.email,
        role:user.role,
        id : user._id,
    }
     return jwt.sign(payload,secretKey,{expiresIn:"4h"});
}
export function getUser(token){
    if(!token) return null;
    return jwt.verify(token,secretKey);
}
export default {setUser,getUser};