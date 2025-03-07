import {getUser} from '../service/auth.js';
export async function restrictToLoggedInUserOnly(req,res,next){
    const uid = req.cookies?.uid;
    if(!uid) res.redirect("/login");
    const user = await getUser(uid);
    if(!user) res.redirect("/login");
    req.user = user;
    next();
}
export default restrictToLoggedInUserOnly;