import { useState } from 'react'
import './App.css'
import EmployeeList from './Components/EmployeeList/EmployeeList.jsx'

import data from './data/mockEmployees.js'

function App() {

  const [employeeData, setEmployeeData] = useState(data);

  const handleAddEmployee = (newEmp) => {
    setEmployeeData([newEmp, ...employeeData]);
  };


  return (
    <>
      <EmployeeList employees={employeeData} onAdd={handleAddEmployee}/>
    </>
  )
}

export default App
