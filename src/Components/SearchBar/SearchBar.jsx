import React, { useState } from "react";
import styles from "./Search.module.css"; // Import the modular CSS file

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return <div>

  </div>;
};

export default SearchBar;
