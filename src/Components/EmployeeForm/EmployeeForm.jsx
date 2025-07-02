import React, { useState } from "react";

export default function EmployeeForm({ onAdd, onClose }) {
  const [formData, setFormData] = useState({
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      id: Date.now(), 
      salary: parseFloat(formData.salary),
      isActive: formData.isActive === "true", 
      managerId: parseInt(formData.managerId)
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <h2>Add New Employee</h2>
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
