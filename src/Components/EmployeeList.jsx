import React, { useState } from "react";
import data from '../data/mockEmployees'


export default function EmployeeList() {
  const [employeeData, setEmployeeData] = useState(data);

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
            <th>Salary ($)</th>
            <th>Hire Date</th>
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