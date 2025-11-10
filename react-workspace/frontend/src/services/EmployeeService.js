import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:9191/api/v1/employees";

class EmployeeService {
   
    addEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getAllEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL);
    }
    getEmployeeById(employeeId)
    {
        return axios.get(EMPLOYEE_API_BASE_URL+'/'+ employeeId);
    }
    updateEmployee(employeeId, employee)
    {
        return axios.put(EMPLOYEE_API_BASE_URL+'/'+ employeeId, employee);
    }

    deleteEmployee(id){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + id);
    }

}

export default new EmployeeService();
