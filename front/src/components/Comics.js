import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import {
	Container,
	FormControl,
	Col,
	Row,
	Form,
	Modal,
	Button
} from 'react-bootstrap'
//import { Link } from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faArchive, faCrown } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

class Comics extends Component {
	constructor(props) {
		super(props)
		this.state = {
			comics: [],
			searchedWord: '',
			show: false,
			titlename: '',
			editorial: '',
			country: '',
		}
	}

	async componentDidMount() {
		/*try{
			const res = await axios.get('http://localhost:4000/users/myuser');
		}catch(err){
			console.log(err);
			this.props.history.push('/login/');
		}*/
	}

	onChangeSearchedWord = async e => {
		await this.setState({
			searchedWord: e.target.value
		});
		const res = await axios.post('http://localhost:4000/titles/search', {
			comicName: this.state.searchedWord
		});
		this.setState({ comics: res.data.titles });
	}

	createNewTitle = async event => {
		event.preventDefault();
		const res = await axios.post('http://localhost:4000/titles', {
			titlename: this.state.titlename,
			editorial: this.state.editorial,
			country: this.state.country
		});
	}

	handleClose = e => {
		this.setState({ show: false });
	}

	handleShow = e => {
		this.setState({ show: true });
	}

	onChangeEvent = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	nextPath = (path) => {
		this.props.history.push(path);
	}

	render() {
		return (
			<Container>
				<Row>
					<Col sm={1} style={{ 'backgroundColor': 'red' }}>sm=1</Col>
					<Col sm={10}>
						<Row style={{ marginTop: "15px", marginBottom: "10px" }}>
							<Col>
								<FormControl type="text" placeholder="Buscar" onChange={this.onChangeSearchedWord} />
								<Form.Text className="text-muted">Add a new title<p onClick={this.handleShow} style={{ display: "inline", padding: "0px" }}> here</p>.
							</Form.Text>
								<Modal show={this.state.show} onHide={this.handleClose} centered>
									<Modal.Header closeButton>
										<Modal.Title>Nuevo titulo</Modal.Title>
									</Modal.Header>
									<Form onSubmit={this.createNewTitle}>
										<Modal.Body>
											<Form.Group>
												<Form.Label>Título</Form.Label>
												<Form.Control size="sm" type="text" placeholder="Example: 'JLA / Avengers'" name="titlename" onChange={this.onChangeEvent} />
											</Form.Group>
											<Form.Group>
												<Form.Label>Editorial</Form.Label>
												<Form.Control size="sm" type="text" placeholder="Example: 'Marvel Comics'" name="editorial" onChange={this.onChangeEvent} />
											</Form.Group>
											<Form.Group>
												<Form.Label>País</Form.Label>
												<Form.Control size="sm" type="text" placeholder="Example: 'México'" name="country" onChange={this.onChangeEvent} />
											</Form.Group>
										</Modal.Body>
										<Modal.Footer>
											<Button size="sm" variant="secondary" onClick={this.handleClose}>
												Close
			  						</Button>
											<Button size="sm" variant="primary" type="submit" onClick={this.handleClose}>
												Añadir título
			  						</Button>
										</Modal.Footer>
									</Form>
								</Modal>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Check inline label="Serie" type='checkbox' />
								<Form.Check inline label="Comic" type='checkbox' />
								<Form.Check inline label="Autor" type='checkbox' />
							</Col>
						</Row>
						<Row>
							{
								this.state.comics.map((comic) =>
									<Col className="cd" lg={2} sm={3} key={comic._id}>
										<div className="comic">
											<div className="wrapper" onClick={() => this.nextPath('/titles/' + comic._id)}>
												<div className="cover">
													<img className="image" src={comic.cover.length!==0?('http://localhost:4000/static/'+ comic.cover[0].cover):''} alt="" />
													<div className="title">{comic.titlename}</div>
													<img className="country" src={'/icons/' + comic.country + '.svg'} alt="" />
												</div>
											</div>
										</div>
									</Col>
								)
							}
						</Row>
					</Col>
					<Col sm={1} style={{ 'backgroundColor': 'red' }}>sm=4</Col>
				</Row>
			</Container>
		)
	}
}

export default withRouter(Comics);