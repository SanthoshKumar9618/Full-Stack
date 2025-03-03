import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: "", position: "" });

  useEffect(() => { fetchEmployees(); }, []);

  const fetchEmployees = async () => {
    const res = await axios.get(API_URL);
    setEmployees(res.data);
  };

  const addEmployee = async () => {
    await axios.post(API_URL, newEmployee);
    setNewEmployee({ name: "", position: "" });
    fetchEmployees();
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchEmployees();
  };

  return (
    <div>
      <h2>Employee Management</h2>
      <input 
        placeholder="Name" 
        value={newEmployee.name} 
        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
      />
      <input 
        placeholder="Position" 
        value={newEmployee.position} 
        onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
      />
      <button onClick={addEmployee}>Add</button>
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.name} - {emp.position}  
            <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
