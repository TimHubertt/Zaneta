import React, { useState, useEffect } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

function EmployeeListComponent() {
  const [employees, setEmployees] = useState([]);

  const [text] = useTypewriter({
    words: ["Details", "Info", "List"],
    typeSpeed: 100,
    loop: true,
    deleteSpeed: 80,
  });

  useEffect(() => {
    EmployeeService.getAllEmployees()
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  const deleteEmployee = (id) => {
    EmployeeService.deleteEmployee(id)
      .then(() => {
        setEmployees(employees.filter((employee) => employee.id !== id));
      })
      .catch((err) => console.error("Error deleting employee:", err));
  };

  return (
    <div className="container mt-5">
      <h4 className="text-center text-white">
        Employee {text}
        <Cursor />
      </h4>

      <div className="row mt-5">
        <Link to="/add-emp" className="btn btn-warning w-25 mb-2">
          Add Employee
        </Link>

        <table className="table table-bordered table-striped overflow-auto">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date of Joining</th>
              <th>Experience</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees && employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.doj}</td>
                  <td>{employee.exp}</td>
                  <td>{employee.ph}</td>
                  <td>{employee.dept?.deptName || "N/A"}</td>
                  <td>{employee.dept?.designation || "N/A"}</td>
                  <td>
                    <Link to={`/edit-emp/${employee.id}`} className="btn btn-info">
                      Update
                    </Link>
                    <button className="btn btn-danger ms-2" onClick={() => deleteEmployee(employee.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeListComponent;
