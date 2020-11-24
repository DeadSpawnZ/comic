import React, { Component } from 'react'
import { Tabs, Tab } from 'react-bootstrap'

export default class User extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="home" transition={false} id="subNav">
                <Tab eventKey="home" title="Home">
                    hello
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    world
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                    hee hee
                </Tab>
            </Tabs>
        )
    }
}
