import React from 'react';
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const NavbarComponent = () => {
    const router = useRouter();

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                <img className="d-inline-block align-top" src="/images/markets.png" alt="logo" width="30"/>{' '}
                LUJEPA Market
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#deets">
                        <img className="d-inline-block align-top" src="/images/misdeseos.png" title="Mi lista de deseos" alt="logo" height="25"/>
                    </Nav.Link>
                    <Nav.Link href="#deets">
                        <img className="d-inline-block align-top" src="/images/micarrito.png" title="Mi carrito de compras" alt="logo" height="25"/>
                    </Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Mi Perfil</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Mis deseos</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Mi carrito</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Cerrar sesión</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
