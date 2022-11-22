import '../css/NavbarMenu.css'; 
import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaRegAddressCard } from 'react-icons/fa';

const NavbarMenu = () => {

    return (
        <div>
            <Navbar className="navigation-bar-menu-container" fixed="top" expand="sm" collapseOnSelect>
                <Navbar.Brand className="navigation-logo-container">
                    <div className="logo-container">
                        <div>
                            <h1 className="navigation-logo-icon"><FaRegAddressCard/></h1>
                        </div>
                        <div>
                            <p className="navigation-logo-text">employee Database</p>
                        </div>
                    </div>    
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link className="navigation-bar-menu-text-style" href="/">Home</Nav.Link>
                        <Nav.Link className="navigation-bar-menu-text-style" href="createdata">Registration</Nav.Link>
                        <NavDropdown className="navigation-bar-menu-text-style" title="Data Search">
                            <NavDropdown.Item href="searchbynameoremail">Search By Name or Email</NavDropdown.Item>
                            <NavDropdown.Item href="searchbyphoneandrank">Search By Mobile service and Rank</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link className="navigation-bar-menu-text-style" href="updatedata">Data Modification</Nav.Link>
                    </Nav>
                </Navbar.Collapse>  
            </Navbar>
        </div>
    )
}

export default NavbarMenu;