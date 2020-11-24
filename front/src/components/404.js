import React, { Component } from 'react'
import {
    Container,
    Col,
    Row
} from 'react-bootstrap'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    async componentDidMount() {
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm={3}></Col>
                    <Col sm={6}>
                        Opss, no deberias estar aqui :P
                    </Col>
                    <Col sm={3}></Col>
                </Row>
            </Container>
        )
    }
}