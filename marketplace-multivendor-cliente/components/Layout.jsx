import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head';
import { NavbarComponent } from './NavbarComponent';
import { Footer } from './Footer';


export const Layout = ({children}) => {

    

    return (
        <>
            <Head>
                <title>Market Place</title>
                <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin="true"></script>
                <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossOrigin="true"></script>
                <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin="true"></script>
            </Head>
                <>
                    <Container fluid >
                        <Row style={{background:"#343A40"}}>
                            <Col>
                                <NavbarComponent/>
                            </Col>
                        </Row>
                        {children}
                        <Footer />
                    </Container>
                    
                </>
           
            
        </>
    )
}