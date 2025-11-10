import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EmployeeService from '../services/EmployeeService';


function CreateEmployeeComponent() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState({
    name: "",
    doj: "",
    exp: "",
    ph:"", 
    dept: {
      deptName: "",
      designation: ""
    }
  });
  const [errors, setErrors] = useState({
    name: "",
    doj: "",
    exp: "",
    ph: "",
    deptName: "",
    designation: ""
  });



  const validate = () =>{
    const tempErrors = {};
    let isValid = true;

    if(!employees.name){
      tempErrors.name = "Name is mandatory";
      isValid = false;
    }
    if(!employees.doj){
      tempErrors.doj = "Date of joining is mandatory";
      isValid = false;
    }
    if(!employees.exp){
      tempErrors.exp = "Experience is mandatory";
      isValid = false;
    }
   if(!employees.ph){
      tempErrors.ph = "Phone number is mandatory";
      isValid = false;
   }
    if(!employees.dept.deptName){
      tempErrors.deptName = "Department is mandatory";
      isValid = false;
    }
    if(!employees.dept.designation){
      tempErrors.designation = "Designation is mandatory";
      isValid = false;
    }
    setErrors(tempErrors);
    return isValid;
  }

  const handleCancel = (e)=>{
    e.preventDefault();
    navigate("/employees");
  }

  const handleReset = (e) =>{
    e.preventDefault();
    navigate("");
  }

  const dateFormat = (date) =>{

    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth()+1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }


  const handleSubmit = (e) =>{
    e.preventDefault();
    if(validate()){
      const formattedDate = dateFormat(employees.doj);
      const employeeDate = {
        ...employees,
        doj: formattedDate
      }
      EmployeeService.addEmployee(employeeDate).then(() => {
        navigate("/employees");
      });
    }
  }


 const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "name" || name === "doj" || name === "exp" || name === "ph") {
    setEmployees((prev) => ({ ...prev, [name]: value }));
  } else if (name === "deptName" || name === "designation") {
    setEmployees((prev) => ({
      ...prev,
      dept: {
        ...prev.dept,
        [name]: value
      }
    }));
  }

  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: ""
  }));
};

 const handleBlur = (e) => {
  const { name, value } = e.target;

  if (name === 'ph') {
    if (value.length !== 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ph: "Phone number must be exactly 10 digits"
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ph: ""
      }));
    }
  }
};


  return (
    <div className="container" style={{ maxHeight: "90vh", padding: "2rem", overflowY: "auto" }}>
      <div className="card col-md-6 offset-3" style = {{backgroundColor:'#18181b'}}>
        <h5 className="text-center text-white py-2">Add Employee</h5>
        
        {/* Make the scrollable content inside the card */}
        <div className="card-body text-white" style={{ fontWeight: 500, maxHeight: '61vh', overflowY: 'auto', }}>
          
          <label>Name: </label>
          <input className="form-control bg-dark text-white border-0" type="text" name="name" autoComplete='off' onChange={handleChange}/>
          {errors.name && <small className ="text-danger">{errors.name}</small>}<br/><br/>

          <label>Date of Joining: </label>
          <input className="form-control bg-dark text-white border-0" type="date" name="doj" onChange={handleChange} />
          {errors.doj && <small className ="text-danger">{errors.doj}</small>}<br /><br />

          <label>Experience: </label>
          <input className="form-control bg-dark text-white border-0" type="text" name="exp" onChange={handleChange} />
          {errors.exp && <small className ="text-danger">{errors.exp}</small>}<br /><br />

          <label>Phone Number: </label>
          <input className="form-control bg-dark text-white border-0" type="text" name="ph" maxLength={10} onBlur={handleBlur} onChange={handleChange} />
          {errors.ph && <small className ="text-danger">{errors.ph}</small>}<br /><br />

          <label>Department: </label>
          <input className="form-control bg-dark text-white border-0" type="text" name="deptName"  onChange={handleChange} />
          {errors.deptName && <small className ="text-danger">{errors.deptName}</small>}<br /><br />

          <label>Designation: </label>
          <input className="form-control bg-dark text-white border-0" type="text" name="designation" onChange={handleChange} />
          {errors.designation && <small className ="text-danger">{errors.designation}</small>}<br /><br />

          <div className="card-footer d-flex justify-content-between">
                    {/* Left-aligned Reset button */}
              <div>
                <button className="btn btn-warning" onClick={handleReset}>Reset</button>
              </div>

                      {/* Right-aligned Cancel and Submit buttons */}
              <div>
                <button className="btn btn-danger me-2" onClick={handleCancel}>Cancel</button>
                <button className="btn btn-success" onClick = {handleSubmit}>Submit</button>
              </div>
          </div>

        </div>
       
        
      </div>
    </div>
  );
}

export default CreateEmployeeComponent;
