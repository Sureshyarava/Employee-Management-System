import React from "react";

export default function DepartmentFilter({ departments, selectedDept, onSelect }) {
  return (
    <div className="demo-filter">
      <label htmlFor="department-select">Filter by Department: </label>
      <select
        id="department-select"
        value={selectedDept}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">All</option>
        {departments.map((dept, index) => (
          <option key={index} value={dept}>
            {dept}
          </option>
        ))}
      </select>
    </div>
  );
}
