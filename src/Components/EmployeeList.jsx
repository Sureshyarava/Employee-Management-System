import React, { useState } from "react";
import data from '../data/mockEmployees'


export default function EmployeeList() {
  const [employeeData, setEmployeeData] = useState(data);

  const handleSort =(keyPath, direction) => {
    
        const sortedData = [...employeeData].sort((a,b) => {
            let aValue = keyPath.split(".").reduce((obj, key) => obj[key], a);
            let bValue = keyPath.split(".").reduce((obj, key) => obj[key], b);

            if(keyPath === 'jobInfo.hireDate'){
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            return direction === 'asc' ? aValue - bValue : bValue - aValue;

        })
        setEmployeeData(sortedData);
    
  }

  const renderSortButtons = (keyPath) => (
    <span style={{ marginLeft: "5px", fontSize: "0.9em" }}>
      <button onClick={() => handleSort(keyPath, 'asc')}>↑</button>
      <button onClick={() => handleSort(keyPath, 'desc')}>↓</button>
    </span>
  );

  return (
    <>
    <div className="employee-table-container">
      <h2>Employee Details</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Position</th>
            <th >Salary ($) {renderSortButtons("jobInfo.salary")}</th>
            <th>Hire Date {renderSortButtons("jobInfo.hireDate")}</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee, index) => (
            <tr key={index}>
              <td>{employee.personalInfo.firstName}</td>
              <td>{employee.personalInfo.lastName}</td>
              <td>{employee.personalInfo.email}</td>
              <td>{employee.personalInfo.phone}</td>
              <td>{employee.jobInfo.department}</td>
              <td>{employee.jobInfo.position}</td>
              <td>{employee.jobInfo.salary}</td>
              <td>{employee.jobInfo.hireDate}</td>
              <td>{employee.status.isActive ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}