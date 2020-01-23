import { Router } from 'express';
import {EmployeeService} from "../service";
import authentication from "../middleware/authentication.middleware";
import {DELETE_FAILED, ID_NOT_FOUND, UPDATE_FAILED, USERNAME_NOT_FOUND} from "../constants/message.constant";

const employeeService = new EmployeeService();
const employeeRouter = Router()
    .get("/employees", authentication, async (req, res) => {
        try {
            const employees = await employeeService.findAll();
            await res.json(employees);
        } catch (e) {
            res.status(500).json({message: e.error})
        }
    })
    .post("/employee", async (req, res) => {
        try {
            let employee = {...req.body};
            employee = await employeeService.save(employee);
            res.status(201).json(employee);
        } catch (error) {
            res.status(500).json({message: 'Username Already Exist'});
        }
    })
    .delete("/employee/:id",authentication, async (req,res) => {
        try {
            const {id} = req.params;
            const employee = await employeeService.delete(id);
            res.status(200).json();
        } catch (error) {
            res.status(400).json({message: DELETE_FAILED})
        }
    })
    .get("/employee/:id",authentication, async (req,res) => {
        try {
            const {id} = req.params;
            const employee = await employeeService.findById(id);
            await res.json(employee)
        } catch (error) {
            res.status(404).json({message: ID_NOT_FOUND})
        }
    }).put("/employee/:id",authentication, async (req, res) => {
        try {
            const { id } = req.params;
            let employee = {...req.body};
            const data = await employeeService.update(id, employee);
            await res.json(employee)
        } catch (error) {
            res.status(500).json({message: UPDATE_FAILED});
        }
    });

export default employeeRouter;