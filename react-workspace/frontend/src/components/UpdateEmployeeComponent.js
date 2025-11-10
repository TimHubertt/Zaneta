import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

function UpdateEmployeeComponent()
{
    let navigate = useNavigate();

    const [name,setName]=useState("");
    const [doj,setDoj]=useState("");
    const [ph, setPh] = useState("");
    const [exp, setExp] = useState("");
    const [department,setDepartment]=useState({deptName:"",designation:""})
    const {id}=useParams();

    const handleCancel=(e)=>{
        e.preventDefault();
        navigate("/employees");
    }

    useEffect((e)=>{
        
        EmployeeService.getEmployeeById(id).then(res=>{
            setName(res.data.name);
            setDoj(res.data.doj);
            setPh(res.data.ph);
            setExp(res.data.exp)
            setDepartment({
                deptName: res.data.dept.deptName,
                designation:res.data.dept.designation
            })
        })
        
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault();

        const updatedEmployee={
            name,
            doj,
            exp, // Assuming experience is not being updated here
            ph, // Assuming phone number is not being updated here
            dept:{
                deptName:department.deptName,
                designation:department.designation
            }
        }

        EmployeeService.updateEmployee(id,updatedEmployee).then(res=>{
            navigate("/employees");
        })
    }


    return (
        <div className = "container" style={{ maxHeight: "90vh", padding: "2rem", overflowY: "auto" }}>
        <div className="card col-md-6 offset-3" style = {{backgroundColor:'#18181B'}}>
            <h5 className="text-center text-white py-2">Update Employee</h5>
            <div className="card-body text-white" style={{ fontWeight: 500, maxHeight: '61vh', overflowY: 'auto', }}>
                
                    <label className="form-control text-white border-0 my-2" style = {{backgroundColor:'#18181B'}}>Name:</label>
                    <input type="text" name="name" id="name" className="form-control" autoComplete="off"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}/>

                    <label className="form-control text-white border-0 my-2" style = {{backgroundColor:'#18181B'}}>DOJ:</label>
                    <input type="text" name="doj" id="doj" className="form-control" autoComplete="off"
                    value={doj}
                    onChange={(e)=>setDoj(e.target.value)}/>

                    <label className="form-control text-white border-0 my-2" style = {{backgroundColor:'#18181B'}}>Phone:</label>
                    <input type="text" name="ph" id="ph" maxLength={10} className="form-control" autoComplete="off"
                    value={ph}
                    onChange={(e)=>setPh(e.target.value)}/>

                    <label className="form-control text-white border-0 my-2" style = {{backgroundColor:'#18181B'}}>Experience:</label>
                    <input type="text" name="exp" id="exp" className="form-control" autoComplete="off"
                    value={exp}
                    onChange={(e)=>setExp(e.target.value)}/>

                    <label className="form-control text-white border-0 my-2" style = {{backgroundColor:'#18181B'}}>Department:</label>
                    <input type="text" name="deptName" id="deptName" className="form-control" autoComplete="off"
                    value={department.deptName}
                    onChange={(e)=>setDepartment({...department,deptName:e.target.value})}/>

                    <label className="form-control text-white border-0 my-2" style = {{backgroundColor:'#18181B'}}>Designation:</label>
                    <input type="text" name="designation" id="designation" className="form-control" autoComplete="off"
                    value={department.designation}
                    onChange={(e)=>setDepartment({...department,designation:e.target.value})}/>
                    
                    <button className="btn btn-danger mt-3" onClick={handleCancel}> Cancel</button>
                    <button className="btn btn-success mt-3 float-end" onClick={handleSubmit}> Submit </button>
                
            </div>
        </div>
        </div>
    )
}
export default UpdateEmployeeComponent;
