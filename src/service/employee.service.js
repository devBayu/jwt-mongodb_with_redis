import { model } from 'mongoose';
import employee from "../database/schema/employee.schema";
import {ObjectID}  from 'mongodb';

class EmployeeService {
    employeeRepository() {
        return model('Employee', employee)
    }

    async findAll() {
        return await this.employeeRepository().find();
    }

    async save(employee) {
        return this.employeeRepository().create(employee);
    }

    async findById(id) {
        return await this.employeeRepository().findById(id);
    }

    async update(id, employee) {
        return await this.employeeRepository().findOneAndUpdate({_id: new ObjectID(id)}, {$set:employee});
    }

    async delete(id) {
        const employee = await this.findById(id);
        return await this.employeeRepository().findByIdAndDelete(employee.id);
    }
}

export default EmployeeService;