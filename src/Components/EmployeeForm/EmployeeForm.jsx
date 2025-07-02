import React, { useState } from "react";

export default function EmployeeForm({ onAdd, onEdit, editingEmployee, onClose }) {

  const isEditMode = editingEmployee;

  const [formData, setFormData] = useState(() => {
    if (editingEmployee) {
      return { ...editingEmployee };
    }
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      salary: "",
      hireDate: "",
      profilePicUrl: "",
      isActive: true,
      performanceRating: "",
      managerId: ""
    };
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeePayload = {
      ...formData,
      salary: parseFloat(formData.salary),
      isActive: formData.isActive === "true" || formData.isActive === true,
      managerId: parseInt(formData.managerId),
    };

    if (isEditMode) {
      onEdit(employeePayload);
    } else {
      onAdd({ ...employeePayload, id: Date.now() });
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <h2>{isEditMode ? "Edit Employee" : "Add New Employee"}</h2>
      {Object.keys(formData).map((key) => (
        key !== "isActive" ? (
          <input
            key={key}
            name={key}
            placeholder={key}
            value={formData[key]}
            onChange={handleChange}
            required
          />
        ) : (
          <select
            key={key}
            name="isActive"
            value={formData.isActive}
            onChange={handleChange}
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        )
      ))}
    <div className="formFooter">
      <button type="submit">Submit</button>
      <button type="button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}
