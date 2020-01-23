import express from 'express';
import employeeRouter from "./employee.route";
import authenticationRouter from "./authentication.route";

export default express.Router()
    .use(employeeRouter)
    .use(authenticationRouter)