import React from "react";

export default function SearchBar({ searchQuery, onSearch }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search by any field..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        style={{ padding: "8px", width: "300px" }}
      />
    </div>
  );
}