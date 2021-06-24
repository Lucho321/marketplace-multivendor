import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const NavbarComponent = () => {
    const router = useRouter();

    const [ usuario, setUsuario ] = useState({});
    let usuarioLogeado;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            usuarioLogeado = JSON.parse(localStorage.getItem('_user'));
            if(usuarioLogeado != undefined){
                if(usuarioLogeado.nombre_usuario){
                    setUsuario(usuarioLogeado);
                }
            }else{
                localStorage.removeItem("_user");
                return router.push('/auth/login');
            }
            
        }
    }, [])

    const handleLogout = (e)=>{
        localStorage.removeItem("_user");
        return router.push('/auth/login');
    }

    return (
        <Navbar className="" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">
                <img className="d-inline-block align-top" src="/images/markets.png" alt="logo" width="30"/>{' '}
                LUJEPA Market
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/productos">Productos</Nav.Link>
                    <Nav.Link href="/tiendas">Tiendas</Nav.Link>
                </Nav>
                <Nav>
                    <NavDropdown title={usuario.nombre_usuario} id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/miperfil">Mi Perfil</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Mis deseos</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Mi carrito</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#deets">
                        <img className="d-inline-block align-top" src="/images/misdeseos.png" title="Mi lista de deseos" alt="logo" height="25"/>
                    </Nav.Link>
                    <Nav.Link href="#deets">
                        <img className="d-inline-block align-top" src="/images/micarrito.png" title="Mi carrito de compras" alt="logo" height="25"/>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
