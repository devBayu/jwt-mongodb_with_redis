import { model } from 'mongoose';
import employee from "../database/schema/employee.schema";
import {ObjectID}  from 'mongodb';
import HashLib from '../libs/hash.lib';

let hashLib = new HashLib();
class EmployeeService {
    employeeRepository() {
        return model('Employee', employee)
    }

    async findAll() {
        return await this.employeeRepository().find();
    }

    async save(employee) {
        const {password} = employee;
        employee.password = await hashLib.create(password);
        return this.employeeRepository().create(employee);
    }

    async findById(id) {
        return await this.employeeRepository().findById(id);
    }

    async findByUsername(username) {
        return this.employeeRepository().findOne({username: username});
    }

    async update(id, employee) {
        return this.employeeRepository().findByIdAndUpdate({_id: new ObjectID(id)}, {$set: employee});
    }

    async delete(id) {
        const employee = await this.findById(id);
        await this.employeeRepository().findByIdAndDelete(employee.id);
        return this.findAll();
    }
}

export default EmployeeService;