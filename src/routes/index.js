import express from 'express';
import employeeRouter from "./employee.route";

export default express.Router()
    .use(employeeRouter);