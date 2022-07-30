import React from "react";
import HeaderContact from "./header/HeaderContact";
import HeaderNavBar from "./header/HeaderNavBar";
import HeaderSearch from "./header/HeaderSearch";

const Header = ({ name }) => {
  return (
    <>
      <HeaderContact />
      <HeaderSearch />
      <HeaderNavBar />
    </>
  );
};

export default Header;
