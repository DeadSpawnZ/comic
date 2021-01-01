import React, { Component } from 'react'
import {
	Container,
	Col,
	Row,
	Button,
	ButtonGroup,
	ProgressBar,
	Table
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faStar,
	faHeart,
	faThList,
	faHeartBroken,
	faPoo,
	faTools,
	faStarHalfAlt,
	faPlus
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import ModalAddComic from './ModalAddComic';
import ModalShowComic from './ModalShowComic';

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
			show2: false,
			buttonsState: [],
			noComics: 0,
			titlePrice: 0,
			percent: 0,
			percentString: '',
			comicsTemp: [],
			comicId: ''
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
		console.log(res);
		this.setState({
			comics: res.data.comics,
			titleCountry: res.data.title.country,
			titleEditorial: res.data.title.editorial,
			titleName: res.data.title.titlename,
			buttonsState: Array(res.data.comics.length).fill(false),
			noComics: res.data.comics.length,
			titlePrice: this.calcPrice(res),
			percent: this.calcPercent(res),
			comicsTemp: res.data.comics,
			filterActive: ''
		});
	}

	calcPercent = (res) => {
		let tengo = 0;
		res.data.comics.forEach(comic => {
			if (comic.usercomic.length > 0) {
				if(comic.usercomic[0].status == 'have'){
					tengo++;
				}
			}
		});
		this.setState({
			percentString: tengo+' de '+res.data.comics.length
		});
		return (tengo*100/res.data.comics.length).toFixed(2);
	}

	calcPrice = (res) => {
		let price = 0;
		res.data.comics.forEach(comic => {
			price += comic.price;
		});
		return price.toFixed(2);
	}

	handleModal2 = (boo) => {
		this.setState({ show2: boo });
	}

	changeId = (comicIdp) => {
		this.setState({ comicId: comicIdp });
		this.handleModal2(true);
	}

	handleModal = (boo) => {
		this.setState({ show: boo });
	}

	handleComic = async (idComic, state) => {
		const res = await axios.post('http://localhost:4000/comics/addtomycomics', {
			id: idComic,
			status: state
		});
		await this.renderComics();
	}

	showButtons = (index) => {
		const tempButtons = this.state.buttonsState;
		tempButtons[index] = true;
		this.setState({
			buttonsState: tempButtons
		});
	}

	hideButtons = (index) => {
		const tempButtons = this.state.buttonsState;
		tempButtons[index] = false;
		this.setState({
			buttonsState: tempButtons
		});
	}

	showFaltantes = async () => {
		await this.showTodo();
		let comicsT = [];
		this.state.comics.forEach(comic => {
			if (comic.usercomic.length == 0) {
				comicsT.push(comic);
			}else{
				if(comic.usercomic[0].status == 'want'){
					comicsT.push(comic);
				}
			}
		});
		this.setState({
			comics: comicsT
		});
	}

	showTengo = async () => {
		await this.showTodo();
		let comicsT = [];
		this.state.comics.forEach(comic => {
			if (comic.usercomic.length > 0) {
				if(comic.usercomic[0].status == 'have'){
					comicsT.push(comic);
				}
			}
		});
		this.setState({
			comics: comicsT
		});
	}

	showTodo = () => {
		this.setState({
			comics: this.state.comicsTemp,
		});
	}

	render() {
		let questions = null
		if (this.state.show2) {
			questions = (
				<ModalShowComic value={this.state.comicId} showV={this.state.show2} hModal={this.handleModal2} />
			)
		}
		return (
			<Container>
				<Row>
					<Col sm={1} style={{ 'backgroundColor': 'red' }}>sm=1</Col>
					<Col sm={10}>
						<Row>
							<Col>
								<Row style={{ marginTop: "15px", marginBottom: "10px" }}>
									<div className="titleTitle">{this.state.titleName}
										<img style={{ width: ".8em", marginLeft: "10px" }} src={'/icons/' + this.state.titleCountry + '.svg'} alt="" />
									</div>
								</Row>
								{/*<Row style={{ textAlign: "center" }}>
									<Col></Col>
									<Col>Total: {this.state.noComics} comics</Col>
									<Col>Precio: ${this.state.titlePrice}</Col>
									<Col>Editorial: {this.state.titleEditorial}</Col>
									<Col></Col>
								</Row>*/}
								<Row>
									<Col sm={8}>
										<Table size="sm" style={{ marginBottom: "0px" }}>
											<tbody>
												<tr>
													<td style={{ padding: "0" }}>Comics</td>
													<td style={{ padding: "0" }}>{this.state.noComics} comics</td>
												</tr>
												<tr>
													<td style={{ padding: "0" }}>Precio</td>
													<td style={{ padding: "0" }}>${this.state.titlePrice}</td>
												</tr>
												<tr>
													<td style={{ padding: "0" }}>Editorial</td>
													<td style={{ padding: "0" }}>{this.state.titleEditorial}</td>
												</tr>
											</tbody>
										</Table>
									</Col>
									<Col sm={4}>
										<Row style={{ width: "100%", height: "50%", fontSize: "20px" }}>
											<p style={{ margin: "auto" }}>4.5</p>
										</Row>
										<Row style={{ width: "100%", height: "15%", fontSize: "17px" }}>
											<div style={{ margin: "auto" }}>
												<div>
													<FontAwesomeIcon icon={faStar} style={{ color: "D9DC00" }} />
													<FontAwesomeIcon icon={faStar} style={{ color: "D9DC00" }} />
													<FontAwesomeIcon icon={faStar} style={{ color: "D9DC00" }} />
													<FontAwesomeIcon icon={faStar} style={{ color: "D9DC00" }} />
													<FontAwesomeIcon icon={faStarHalfAlt} style={{ color: "D9DC00" }} />
												</div>
											</div>
										</Row>
									</Col>
								</Row>
								<Row>
									<Col>
										<ProgressBar now={this.state.percent} variant={
											this.state.percent <= 25 ? "danger" :
												this.state.percent <= 75 ? "warning" :
													this.state.percent < 100 ? "info" : "success"} style={{ marginTop: "5px", marginBottom: "10px" }} label={`${this.state.percent}% ' ${this.state.percentString}`} />
									</Col>
								</Row>
								<Row>
									<Col>
										<ButtonGroup>
											<Button size="sm" variant="secondary" onClick={() => this.showTodo()}><FontAwesomeIcon icon={faThList} />&nbsp; Todo</Button>
											<Button size="sm" variant="secondary" onClick={() => this.showTengo()}><FontAwesomeIcon icon={faHeart} />&nbsp;Tengo</Button>
											<Button size="sm" variant="secondary" onClick={() => this.showFaltantes()}><FontAwesomeIcon icon={faPoo} />&nbsp; Faltantes</Button>
										</ButtonGroup>
										<ButtonGroup style={{ 'float': 'right' }}>
											<Button size="sm" variant="dark" onClick={() => this.handleModal(true)}><FontAwesomeIcon icon={faPlus} /></Button>
											<Button size="sm" variant="dark" ><FontAwesomeIcon icon={faTools} /></Button>
										</ButtonGroup>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							{
								this.state.comics.map((comic, index) =>
									<Col className="cd" lg={2} sm={4} xs={6} key={comic._id}>
										<div className="comic"
											onMouseOver={() => { this.showButtons(index) }}
											onMouseOut={() => { this.hideButtons(index) }}
										>
											<div className="wrapper">
												<div className="cover">
													<img className={(comic.usercomic.length > 0) ? (comic.usercomic[0].status == 'have') ? "image" : "imageOp" : "imageOp"}
														src={'http://localhost:4000/static/' + comic.cover}
														name={comic._id} alt=""
														onClick={() => {
															this.changeId(comic._id)
														}}
													/>
													<div className="title">#{comic.no}</div>
													<div className={this.state.buttonsState[index] ? "buttons2" : "buttons"}>
														<div className={(comic.usercomic.length > 0) ? (comic.usercomic[0].status == 'have') ? "added" : "addedDisabled" : "addedDisabled"} onDoubleClick={() => this.handleComic(comic._id, 'have')} ><FontAwesomeIcon icon={faHeart} /></div>
														<div className={(comic.usercomic.length > 0) ? (comic.usercomic[0].status == 'want') ? "wanted" : "wantedDisabled" : "wantedDisabled"} onDoubleClick={() => this.handleComic(comic._id, 'want')}><FontAwesomeIcon icon={faStar} /></div>
													</div>
												</div>
											</div>
										</div>
									</Col>
								)
							}
						</Row>
						<ModalAddComic value={this.state.titleid} rComics={this.renderComics} showV={this.state.show} hModal={this.handleModal} />
					</Col>
					<Col sm={1} style={{ 'backgroundColor': 'red' }}>sm=1</Col>
				</Row>
				{questions}
			</Container>
		)
	}
}