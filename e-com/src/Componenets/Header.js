
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../App.css";

function Header() {
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem("user")
    const a = window.confirm("do u want to logout")
    a && navigate("/Login")
  }
  return (
    <div className="class">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand to="/">E-COM-PROJECT</Navbar.Brand>
        <div className="NavLink">
          {          
          localStorage.getItem("user") ? (
            <>
              <NavLink to="/"  >Home</NavLink>
              <NavLink to="/UpdateProduct">UpdateProduct</NavLink>
              <NavLink to="/AddProduct">AddProduct</NavLink>
              <NavLink to="/searchproduct">search product</NavLink>
              <Nav>
                <span className="span">
                  <NavDropdown style={{color:"green"}} title={JSON.parse(localStorage.getItem("user")).name}>
                    <NavDropdown.Item onClick={logout}> Log out </NavDropdown.Item>
                  </NavDropdown>
                </span>
              </Nav>
            </>
          ) : (
            <>
              <NavLink to="/Registration">Registration</NavLink>
              <NavLink to="/Login">Login</NavLink>
            </>
          )}
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
