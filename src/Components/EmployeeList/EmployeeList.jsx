import React, { useState } from "react";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import SearchBar from "../SearchBar/SearchBar";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import DepartmentFilter from "../DepartmentFilter/DepartmentFilter";

export default function EmployeeList({ employees, onAdd, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedDept, setSelectedDept] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);

  const departmentOptions = [...new Set(employees.map(emp => emp.department))];


  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const filteredEmployees = () => {
    const lowerQuery = searchQuery.toLowerCase();
    return employees.filter((emp) =>
      Object.values(emp).some((val) =>
        typeof val === "string" || typeof val === "number"
          ? val.toString().toLowerCase().includes(lowerQuery)
          : false
      )).filter((emp) =>
      selectedDept ? emp.department === selectedDept : true
    );
  };

  const totalPages = Math.ceil(filteredEmployees().length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const currentEmployees = filteredEmployees().slice(
    indexOfLastItem - itemsPerPage,
    indexOfLastItem
  );

  return (
    <div className="employee-list-container">
      <div className="header-bar">
        <h1 className="heading">Employee Management System</h1>
        {!showForm && (
          <button className="addEmployee" onClick={() => {
                setShowForm(true);
                setEditingEmployee(null);
              }}>
            ➕ Add Employee
          </button>
        )}
      </div>

      {showForm ? (
        <EmployeeForm
          onAdd={onAdd}
          onEdit={onEdit}
          editingEmployee={editingEmployee}
          onClose={() => {
          setShowForm(false);
          setEditingEmployee(false);
    }}
  />
      ) : (
        <>
          <div className="searchContainer">
          <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
          <DepartmentFilter departments={departmentOptions} selectedDept={selectedDept} onSelect={setSelectedDept} />
          </div>

          <div className="grid-employees">
            {currentEmployees.map((employee, index) => (
              <EmployeeCard employee={employee} key={index} onEdit={() => {
                  setEditingEmployee(employee);
                  setShowForm(true);
                }} onDelete={onDelete}/>
            ))}
          </div>

          <div className="pagination" style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
