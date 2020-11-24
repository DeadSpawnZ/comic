import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive, faCrown } from '@fortawesome/free-solid-svg-icons'
import {
    Navbar,
    Nav,
    NavDropdown,
    Dropdown,
    DropdownButton
} from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'

class Navigation extends Component {
    componentDidMount = async () => {

    }

    signOut = () => {
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Navbar.Brand href="">Collect</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/comics">Comics</Nav.Link>
                        <Nav.Link href="/eventos">Eventos</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/myuser"><FontAwesomeIcon icon={faCrown} /> Yo</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                        <NavDropdown title="Yo" id="collasible-nav-dropdown" className="userMenu">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={this.signOut}><FontAwesomeIcon icon={faCrown} /> Salir</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withRouter(Navigation);