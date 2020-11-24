import React, { Component } from 'react'
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
            email: null
        }
    }

    async componentDidMount() {
    }

    signUp = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:4000/users/register', {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        });
        console.log(res);
    }

    onChangeEvent = event => {
        if (event.target.name === 'password2') {
            if (this.state.password !== event.target.value) {
                console.log("las contraseñas no coinciden");
            }
        } else {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
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
                                <Form onSubmit={(e) => this.signUp(e)}>
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control size="sm" type="text" name="username" onChange={this.onChangeEvent} required />
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control size="sm" type="password" name="password" onChange={this.onChangeEvent} required />
                                    <Form.Label>Repite la contraseña</Form.Label>
                                    <Form.Control size="sm" type="password" name="password2" onChange={this.onChangeEvent} required />
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control size="sm" type="text" name="email" onChange={this.onChangeEvent} required />
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