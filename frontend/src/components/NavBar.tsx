import {Container, Navbar, Nav } from "react-bootstrap";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import {Link} from "react-router-dom";

interface NavBarProps {
  loggedInUser: User | null,
  onSignUpClicked: () => void,
  onLoginClicked: () => void,
  onLogoutSuccessful: () => void,
}

const NavBar = ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful } : NavBarProps) => {
  return (
    <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <h1>Notes App</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar"/>
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link as={Link} to="/privacy">
              Privacy
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            { loggedInUser
              ? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} />
              : <NavBarLoggedOutView onSignUpClicked={onSignUpClicked} onLoginClicked={onLoginClicked} />
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;