import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './styles/App.css';
import EmployeeList from './Components/EmployeeList/EmployeeList.jsx';
import StatisticsPage from './Components/Statistics/Statistics.jsx'; // You’ll create this
import data from './data/mockEmployees.js';
import EmployeeNotFound from './Components/EmployeeNotFound/EmployeeNotFound.jsx';

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
    <Router>
      <nav style={{ padding: '1rem', borderBottom: '1px solid gray' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>🏠 Employee List</Link>
        <Link to="/statistics">📊 Statistics</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <EmployeeList
              employees={employeeData}
              onAdd={handleAddEmployee}
              onEdit={handleEditEmployee}
              onDelete={handleDeleteEmployee}
            />
          }
        />

        <Route path="/employeNotFound" element={<EmployeeNotFound />} />
        <Route
          path="/statistics"
          element={<StatisticsPage employees={employeeData} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
