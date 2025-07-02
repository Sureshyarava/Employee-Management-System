import React from "react";

export default function EmployeeCard({ employee, onEdit, onDelete }) {
  return (
    <div className="employee-card">
      <div className="employee-info">
        <h3>{employee.firstName} {employee.lastName}</h3>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Position:</strong> {employee.position}</p>
        <p><strong>Salary:</strong> ${employee.salary}</p>
        <p><strong>Hire Date:</strong> {employee.hireDate}</p>
        <button onClick={() => onEdit(employee)}>✏️ Edit</button>
        <button onClick={() => onDelete(employee.id)}>🗑️ Delete</button>
      </div>
    </div>
  );
}
