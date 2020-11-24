import React, { Component } from 'react'
import {
	Container,
	Col,
	Row,
	Button
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import ModalTest from './ModalTest';

export default class Title extends Component {
	constructor(props) {
		super(props)
		this.state = {
			comics: [],
			titleCountry: null,
			titleEditorial: null,
			titleName: null,
			titleid: null,
			show: false,
			match: [],
			b: []
		}
	}

	async componentDidMount() {
		const { id } = this.props.match.params
		await this.setState({
			titleid: id
		});
		await this.renderComics();
	}

	renderComics = async () => {
		const res = await axios.get('http://localhost:4000/comics/alltitle', {
			params: {
				id: this.state.titleid
			}
		});
		this.setState({
			comics: res.data.list,
			titleCountry: res.data.title.country,
			titleEditorial: res.data.title.editorial,
			titleName: res.data.title.titlename,
			match: res.data.match,
			b: Array(res.data.list.length).fill(false)
		});
	}

	handleModal = (boo) => {
		this.setState({ show: boo });
	}

	handleComic = async (idComic) => {
		console.log(idComic);
		const res = await axios.post('http://localhost:4000/comics/addtomycomics', {
			id: idComic
		});
		console.log(res);
		await this.renderComics();
	}

	alreadyMine = (idComic) => {
		var b = false;
		this.state.match.forEach(element => {
			if(element.comic._id === idComic){
				b = true;
			}
		});
		return b;
	}

	showButtons = (index) => {
		const arre = this.state.b;
		arre[index] = true;
		this.setState({
			b: arre
		});
	}

	hideButtons = (index) => {
		const arre = this.state.b;
		arre[index] = false;
		this.setState({
			b: arre
		});
	}

	render() {
		return (
			<Container>
				<Row>
					<Col sm={1}>sm=1</Col>
					<Col sm={10}>
						<Row>
							<Col>
								<div className="titleTitle">{this.state.titleName}
									<img style={{ width: ".8em", marginLeft: "10px" }} src={'/icons/' + this.state.titleCountry + '.svg'} alt="" />
								</div>
								<Row style={{ textAlign: "center" }}>
									<Col></Col>
									<Col># Comics</Col>
									<Col>Precio</Col>
									<Col>{this.state.titleEditorial}</Col>
									<Col></Col>
								</Row>
								<Row>
									<Col><Button size="sm">Añadir todo</Button></Col>
									<Col><Button size="sm">Faltantes</Button></Col>
									<Col></Col>
									<Col><Button size="sm" onClick={() => this.handleModal(true)}>+ comic</Button></Col>
								</Row>
							</Col>
						</Row>
						<Row>
							{
								this.state.comics.map((comic, index) =>
									<Col className="cd" lg={2} sm={3} xs={4} key={comic._id}>
										<div className="comic" onMouseOver={()=>{this.showButtons(index)}} onMouseOut={() => {this.hideButtons(index)}}>
											<div className="wrapper">
												<div className="cover">
													<img className={this.alreadyMine(comic._id)?"image":"imageOp"} src={'http://localhost:4000/static/' + comic.cover} name={comic._id} alt="" />
													<div className="title">#{comic.no}</div>
													<div className={this.state.b[index]?"buttons2":"buttons"}>
														<div className={this.alreadyMine(comic._id)?"added":"addedDisabled"} onDoubleClick={() => this.handleComic(comic._id)} ><FontAwesomeIcon icon={faHeart} /></div>
														<div className="wanted"><FontAwesomeIcon icon={faStar} /></div>
													</div>
												</div>
											</div>
										</div>
									</Col>
								)
							}
						</Row>
						<ModalTest value={this.state.titleid} rComics={this.renderComics} showV={this.state.show} hModal={this.handleModal} />
					</Col>
					<Col sm={1}>sm=1</Col>
				</Row>
			</Container>
		)
	}
}