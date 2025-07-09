import React, { useState, useEffect } from "react";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import SearchBar from "../SearchBar/SearchBar";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import DepartmentFilter from "../DepartmentFilter/DepartmentFilter";
import { useNavigate } from "react-router-dom";

export default function EmployeeList({ employees, onAdd, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedDept, setSelectedDept] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const departmentOptions = [...new Set(employees.map(emp => emp.department))];

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  useEffect(() => {
  const handleKeyDown = (e) => {
    
    if (e.ctrlKey && e.key.toLowerCase() === 'n') {
      e.preventDefault();
      setEditingEmployee(null);
      setShowForm(true);
    }
    if (e.key === 'Escape') {
      if (showForm) {
        setShowForm(false);
        setEditingEmployee(null);
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [showForm]);


  const filteredEmployees = () => {
    const lowerQuery = searchQuery.toLowerCase();

    let result = employees.filter((emp) =>
      Object.values(emp).some((val) =>
        typeof val === "string" || typeof val === "number"
          ? val.toString().toLowerCase().includes(lowerQuery)
          : false
      )
    ).filter((emp) =>
      selectedDept ? emp.department === selectedDept : true
    );

    if(result.length==0){
      navigate("/employeNotFound");
    }


    if (sortField) {
      result.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (sortField === "hireDate") {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        }

        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      });
    }

    return result;
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
          <button
            className="addEmployee"
            onClick={() => {
              setShowForm(true);
              setEditingEmployee(null);
            }}
          >
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
            setEditingEmployee(null);
          }}
        />
      ) : (
        <>
          <div className="searchContainer">

            <div className="sortControls">
              <label>Sort By: </label>
              <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
                <option value="">None</option>
                <option value="hireDate">Hire Date</option>
                <option value="salary">Salary</option>
              </select>

              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
            <DepartmentFilter
              departments={departmentOptions}
              selectedDept={selectedDept}
              onSelect={setSelectedDept}
            />
          </div>

          <div className="grid-employees">
            {currentEmployees.map((employee, index) => (
              <EmployeeCard
                key={index}
                employee={employee}
                onEdit={() => {
                  setEditingEmployee(employee);
                  setShowForm(true);
                }}
                onDelete={onDelete}
              />
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
