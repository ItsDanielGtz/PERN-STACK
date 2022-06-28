import React from "react";
import { Container, Row, Button, Grid } from "@nextui-org/react";
import {Link, useNavigate } from 'react-router-dom';
import '../css/navbarStyle.css'

export default function NavBar() {
    let navigate = useNavigate()
    return (
        <Container>
            <Row>
                <Link to="/" className="nav_logo" style={{textDecoration:'none', color: '#eee'}}>
                            PERN stack
                 </Link>
                <div className="nav_menu" id="nav_menu">
                    <Grid>
                    <ul className="nav_list grid">
                        <li className="nav_item">
                        <Button variant='contained' color='primary' onClick= {() => {navigate("/tasks/new")  }} >
                                    Nueva Tarea
                        </Button>
                        </li>
                    </ul>
                    </Grid>
                    
                </div>
            </Row>
        </Container>
    );
}