import { useState } from 'react'
import './App.css'
import EmployeeList from './Components/EmployeeList/EmployeeList.jsx'

import data from './data/mockEmployees.js'

function App() {

  const [employeeData, setEmployeeData] = useState(data);

  const handleAddEmployee = (newEmp) => {
    setEmployeeData([newEmp, ...employeeData]);
  };

  const handleEditEmployee = (updatedEmp) => {
    setEmployeeData((prev) =>
      prev.map((emp) => (emp.id === updatedEmp.id ? updatedEmp : emp))
    );
  };

  const handleDeleteEmployee = (id) => {
    setEmployeeData((prev) => prev.filter((emp) => emp.id !== id));
  };



  return (
    <>
      <EmployeeList employees={employeeData} onAdd={handleAddEmployee} onEdit={handleEditEmployee} onDelete={handleDeleteEmployee}/>
    </>
  )
}

export default App
