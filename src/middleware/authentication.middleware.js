import jwt from 'jsonwebtoken';
import AuthenticationService from "../service/authentication.service";

const authenticationService = new AuthenticationService();
const authentication = async (req, res, next) => {
    try {
        const token = req.get('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const valid = await authenticationService.validateSession(data.sessionId);

        if (valid) {
            next();
        } else {
            res.status(403).json({message: "Access not permitted"});
        }
    } catch (error) {
        res.status(403).json({message: "Access not permitted"});
    }


};

export default authentication;