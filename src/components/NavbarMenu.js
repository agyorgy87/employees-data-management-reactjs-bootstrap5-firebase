import '../css/NavbarMenu.css';
import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaRegAddressCard } from 'react-icons/fa';

const NavbarMenu = () => {

    return (
        <div>
            <Navbar className="navBarMenuBox" fixed="top" expand="sm" collapseOnSelect>
                <Navbar.Brand className="NavLogoBox">
                    <div className="LogoBox">
                        <div>
                            <h1 className="NavLogoIcon"><FaRegAddressCard/></h1>
                        </div>
                        <div>
                            <p className="NavLogoText">employee Database</p>
                        </div>
                    </div>    
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link className="NavBarMenuTextStyle" href="/">Home</Nav.Link>
                        <Nav.Link className="NavBarMenuTextStyle" href="createdata">Registration</Nav.Link>
                        <NavDropdown className="NavBarMenuTextStyle" title="Data Search">
                            <NavDropdown.Item href="searchbynameoremail">Search By Name or Email</NavDropdown.Item>
                            <NavDropdown.Item href="searchbyphoneandrank">Search By Mobile service and Rank</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link className="NavBarMenuTextStyle" href="updatedata">Data Modification</Nav.Link>
                    </Nav>
                </Navbar.Collapse>  
            </Navbar>
        </div>
    )
}

export default NavbarMenu;