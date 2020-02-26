import {Router} from 'express';
import AuthenticationService from "../service/authentication.service";
import authentication from "../middleware/authentication.middleware";

let authenticationService = new AuthenticationService();
const authenticationRouter = Router()
    .post("/login", async (req, res,) => {
        try {
            const {username, password} = req.body;
            const result = await authenticationService.login(username, password);
            return res.status(200).json({
                type: 'Bearer',
                status: true,
                token: result
            });
        } catch (e) {
            res.status(400).json({message: 'Invalid Credentials'})
        }
    });

export default authenticationRouter;
