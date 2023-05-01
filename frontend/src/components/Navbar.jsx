import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../reduxSlices/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { searchCancel, searched } from "../reduxSlices/search";
import { loadingEnd, loadingStarted } from "../reduxSlices/loading";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.name);
  const [showBasic, setShowBasic] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const logout = () => {
    dispatch(removeUser());
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
  };
  const login = () => {
    navigate("/login", { replace: true });
  };
  const search = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/courses/search?q=${searchQuery}`
      );
      if (response.status !== 200) {
        console.log("axios error");
      }
      const searchResponse = response.data;
      const searchResults = [];
      for (let course of response.data) {
        if (
          Date.parse(course.releaseDate) < Date.now() ||
          !course.releaseDate
        ) {
          searchResults.push(course);
        }
      }
      dispatch(searched({ searchQuery, searchResults }));
    } catch (error) {
      throw "Something went wrong";
    }
  };
  if (searchQuery.length == 0) {
    dispatch(searchCancel());
  }
  // useEffect(() => {
  //   const handleHistoryChange = () => {
  //     dispatch(searchCancel());
  //     console.log("Back or reload button clicked");
  //   };

  //   window.addEventListener("beforeunload", handleHistoryChange);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleHistoryChange);
  //   };
  // }, []);
  return (
    <div style={{ height: "46px" }}>
      <MDBNavbar expand="lg" fixed="top" light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand href="/">
            <span style={{ color: "#4285F4", fontWeight: "bold" }}>PHN</span>
            &nbsp; Technology
          </MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <div className="row w-100">
              {username ? (
                <>
                  <div className="col-12 col-lg-8 mt-2 mt-lg-0">
                    <form
                      className="d-flex input-group w-auto"
                      onSubmit={search}
                    >
                      <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="search"
                        className="form-control"
                        placeholder="search ...."
                        aria-label="Search"
                      />
                      <MDBBtn type="submit" color="primary">
                        Search
                      </MDBBtn>
                    </form>
                  </div>
                  <div className="col-4 col-md-2 col-lg-2 mt-2 mt-lg-0">
                    <MDBNavbarNav className="d-flex w-auto mb-2 mb-lg-0">
                      <MDBNavbarItem>
                        <MDBNavbarLink active aria-current="page" href="#">
                          Contact Us
                        </MDBNavbarLink>
                      </MDBNavbarItem>
                    </MDBNavbarNav>
                  </div>
                  <div className="col-3 col-lg-2 mt-2 mt-lg-0">
                    <MDBBtn onClick={logout} className="" size="md">
                      Logout
                    </MDBBtn>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-12 col-lg-8 mt-2 mt-lg-0"></div>
                  <div className="col-4 col-md-2 col-lg-2 mt-2 mt-lg-0">
                    <MDBNavbarNav className="d-flex w-auto mb-2 mb-lg-0">
                      <MDBNavbarItem>
                        <MDBNavbarLink active aria-current="page" href="#">
                          Contact Us
                        </MDBNavbarLink>
                      </MDBNavbarItem>
                    </MDBNavbarNav>
                  </div>
                  <div className="col-3 col-lg-2 mt-2 mt-lg-0">
                    <MDBBtn onClick={login} className="" size="md">
                      Login
                    </MDBBtn>
                  </div>
                </>
              )}
            </div>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
};

export default Navbar;
