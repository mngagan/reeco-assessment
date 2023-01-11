import { SearchOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import React from "react";
import Container from "../styledComponents/container";
import Input from "../styledComponents/input";

const SearchBar = ({
  searchText = "",
  setSearchText = () => {},
  updateFilteredCart = () => {},
  handleSearch = () => {},
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      updateFilteredCart(false);
      handleSearch();
    }
  };

  const handleOnChange = (e) => {
    setSearchText(e.target.value);
    e.target.value.length === 0 && updateFilteredCart("");
  };

  return (
    <>
      <Container
        border
        borderRadius="20px"
        width="fit-content"
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Container>
          <Input
            value={searchText}
            onChange={(e) => {
              handleOnChange(e);
            }}
            placeholder="Search..."
            width="200px"
            padLeft
            onKeyPress={handleKeyPress}
          />
          <SearchOutlined
            className="search-icon"
            onClick={() => {
              updateFilteredCart(false);
              handleSearch();
            }}
          />
        </Container>
      </Container>
    </>
  );
};

export default SearchBar;
