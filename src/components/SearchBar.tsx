import React from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <input
      type="text"
      placeholder="Search by fighter name..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{
        padding: "10px",
        width: "100%",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    />
  );
};

export default SearchBar;
