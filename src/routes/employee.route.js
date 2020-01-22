import { Router } from 'express';
import {EmployeeService} from "../service";

const employeeService = new EmployeeService();
const employeeRouter = Router()
    .get("/employees", async (req, res) => {
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
            res.status(500).json({message: error.message});
        }
    })
    .delete("/employee/:id", async (req,res) => {
        try {
            const {id} = req.params;
            const employee = await employeeService.delete(id);
            res.status(200).json();
        } catch (error) {
            res.status(500).json({message: `Employee ${id} not found` })
        }
    })
    .get("/employee/:id", async (req,res) => {
        try {
            const {id} = req.params;
            const employee = await employeeService.findById(id);
            await res.json(employee)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }).put("/employee/:id", async (req, res) => {
        try {
            const { id } = req.params;
            let employee = {...req.body};
            const data = await employeeService.update(id, employee);
            await res.json(employee)
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    });

export default employeeRouter;