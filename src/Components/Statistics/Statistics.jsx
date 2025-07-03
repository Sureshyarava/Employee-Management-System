import React from "react";

export default function StatisticsPage({ employees }) {
  if (!employees || employees.length === 0) return <p>No data available</p>;

  const total = employees.length;
  const avgSalary = (
    employees.reduce((acc, emp) => acc + emp.salary, 0) / total
  ).toFixed(2);

  const deptDist = employees.reduce((acc, emp) => {
    const dept = emp.department;
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  const sorted = [...employees].sort((a, b) => new Date(a.hireDate) - new Date(b.hireDate));
  const oldest = sorted[0];
  const newest = sorted[sorted.length - 1];

  const salaries = employees.map(emp => emp.salary);
  const minSalary = Math.min(...salaries);
  const maxSalary = Math.max(...salaries);

  return (
    <div className="statistics">
      <h2>Employee Statistics</h2>
      <p><strong>Total Employees:</strong> {total}</p>
      <p><strong>Average Salary:</strong> ${avgSalary}</p>

      <h3>Department Distribution</h3>
      <ul>
        {Object.entries(deptDist).map(([dept, count]) => (
          <li key={dept}>{dept}: {count}</li>
        ))}
      </ul>

      <h3>Newest Employee</h3>
      <p>{newest.firstName} {newest.lastName} – {newest.hireDate}</p>

      <h3>Oldest Employee</h3>
      <p>{oldest.firstName} {oldest.lastName} – {oldest.hireDate}</p>

      <h3>Salary Range</h3>
      <p>${minSalary} – ${maxSalary}</p>
    </div>
  );
}
