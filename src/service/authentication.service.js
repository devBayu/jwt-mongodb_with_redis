import EmployeeService from "./employee.service";
import HashLib from "../libs/hash.lib";
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import RedisService from "./redis.service";

const redisService = new RedisService();
const employeeService = new EmployeeService();
const hashLib = new HashLib();
class AuthenticationService {

    async login (username, password) {
        const user = await employeeService.findByUsername(username);
        if (!user || !(await hashLib.compare(password, user.password))) {
            throw new Error(`${username} ${password} is not found`);
        }

        const sessionId = md5(Date.now());
        const expiresIn = +process.env.JWT_EXPIRED;
        const token = jwt.sign({sessionId}, process.env.JWT_SECRET, {expiresIn});
        await redisService.set({key: sessionId, value: user._id.toString(), expires: expiresIn});
        return token;
    }

    async validateSession(sessionId) {
        const sessionID = await redisService.get(sessionId);
        const employee =  await employeeService.findById(sessionID);
        return !!employee;
    }

}

export default AuthenticationService;