import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  }, []);

  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
          <NavbarBrand 
            href="" 
            id="navbar-brand"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: '1rem', // Increase font size
              fontWeight: 'bold', // Optional, to make it stand out
              textAlign: 'center',
              color: '#000' // Optional, set the color you want for the brand name
            }}
          >
             Sree Teq’s Services <br/>
              
            </NavbarBrand>
 
            <a
              href={`tel:9494412464`}
              target="_blank"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '1rem', // Increase font size
                fontWeight: 'bold', // Optional, to make it stand out
                textAlign: 'center',
                color: '#000' // Optional, set the color you want for the brand name
              }}
            >
              9494412464
            </a>


            <UncontrolledTooltip target="#navbar-brand">
              Designed & Coded by USCL
            </UncontrolledTooltip>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse className="justify-content-end" isOpen={collapseOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink tag={Link} to="/profile-page">
                  <i className="now-ui-icons users_circle-08"></i>
                  <p>About</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <a
                  href="mailto:kingdev376@gmail.com"
                  className="nav-link"
                >
                  <i className="now-ui-icons ui-1_email-85"></i>
                  <p>Contact Us</p>
                </a>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("download-section")
                      .scrollIntoView();
                  }}
                >
                  <i className="now-ui-icons ui-2_settings-90"></i>
                  <p>Services</p>
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  href="#pablo"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="now-ui-icons design_app mr-1"></i>
                  <span>Login</span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem to="/login-page" tag={Link}>
                    <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                    User
                  </DropdownItem>
                  <DropdownItem
                    href="/login-page"
                    target="/login-page"
                  >
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                    Technician
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
