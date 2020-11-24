import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    Container,
    Col,
    Row,
    Button,
    Form,
    Card
} from 'react-bootstrap'
import axios from 'axios'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            password: null,
        }
    }

    async componentDidMount() {
    }

    signIn = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:4000/users/login', {
            username: this.state.username,
            password: this.state.password
        });
        console.log(res);
        await localStorage.setItem('token', res.data.token);
        //deberia ir esto aqui?
        axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
        this.props.history.push('/comics');
    }

    onChangeEvent = event => {
        console.log("lel");
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm={3}></Col>
                    <Col sm={6}>
                        <Card className="text-center">
                            <Card.Header></Card.Header>
                            <Card.Body>
                                <Form onSubmit={(e) => this.signIn(e)}>
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control size="sm" type="text" name="username" onChange={this.onChangeEvent} required />
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control size="sm" type="text" name="password" onChange={this.onChangeEvent} required />
                                    <br />
                                    <Link className="nav-link" to="/register">Registrarte aquí</Link>
                                    <Button size="sm" variant="primary" type="submit">
                                        Vamos!!
			  						</Button>
                                </Form>
                            </Card.Body>
                            <Card.Footer></Card.Footer>
                        </Card>
                    </Col>
                    <Col sm={3}></Col>
                </Row>
            </Container>
        )
    }
}