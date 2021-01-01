import React, { useState, useEffect } from 'react'
import {
    FormControl,
    Col,
    Row,
    InputGroup,
    Form,
    Modal,
    Button,
    Tab,
    Tabs,
    Table
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faInfoCircle,
    faChartArea,
    faClipboard
} from '@fortawesome/free-solid-svg-icons'
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios'
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export default function ModalShowComic(props) {
    const [trys, setTrys] = useState({
        cover: ''
    });
    const [comicId, setComicId] = useState();
    const [key, setKey] = useState('home');
    const [key2, setKey2] = useState('contact');
    const data = {
        labels: [
            'Lo quieren',
            'Lo tienen',
        ],
        datasets: [{
            data: [50, 100],
            backgroundColor: [
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#FFCE56'
            ]
        }]
    };

    useEffect(() => {
        console.log(props.value);
        setComicId(props.value);
        const fetchData = async () => {
            const res = await axios.get('http://localhost:4000/comics', {
                params: {
                    id: props.value
                }
            });
            let resT = res.data.comic;
            resT.date = calcDate(resT.date);
            setTrys(resT);
        }
        fetchData();
    }, [props.value]);

    function calcDate(date) {
        const month = date.toString().substring(5, 7);
        return date.toString().substring(0, 10).replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1').replace('/' + month + '/', '/' + months[parseInt(month) - 1] + '/');
    }

    return (
        <Modal show={props.showV} onHide={() => props.hModal(false)} centered dialogClassName="modal-fullscreen">
            <Modal.Header closeButton>
                <Modal.Title><span style={{ marginLeft: "20%" }}>{(trys.title != undefined) ? trys.title.titlename : ''} #{trys.no}</span></Modal.Title>
            </Modal.Header>
            <Form onSubmit={(e) => { }}>
                <Modal.Body style={{ padding: "0" }}>
                    <Row>
                        <Col sm={6}>
                            <div className="comic" >
                                <div className="wrapper-modal">
                                    <div className="cover">
                                        <img className="image"
                                            src={(trys.cover != '') ? 'http://localhost:4000/static/' + trys.cover : ''}
                                            name="" alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <Tabs className="tabs-modal"
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                            >
                                <Tab eventKey="home" title={<span><FontAwesomeIcon icon={faClipboard} /> Contenido</span>}>
                                    <Table size="sm" striped hover>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: "50%" }}>Fecha de publicación</td>
                                                <td>{trys.date}</td>
                                            </tr>
                                            <tr>
                                                <td>Editorial</td>
                                                <td>{(trys.title != undefined) ? trys.title.editorial : ''}</td>
                                            </tr>
                                            <tr>
                                                <td>Precio de portada</td>
                                                <td>{trys.price}</td>
                                            </tr>
                                            <tr>
                                                <td>Impresión</td>
                                                <td>{
                                                    (trys.print == 1 || trys.print == 3) ? trys.print + 'ra impresión' :
                                                        (trys.print == 2) ? trys.print + 'da impresión' :
                                                            (trys.print == 4 || trys.print == 5 || trys.print == 6) ? trys.print + 'ta impresión' :
                                                                (trys.print == 7) ? trys.print + 'ma impresión' : ''}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Tipo de comic</td>
                                                <td>{trys.type}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Tab>
                                <Tab eventKey="profile" title={<span><FontAwesomeIcon icon={faChartArea} /> Estadísticas</span>}>
                                    <Doughnut data={data} />
                                </Tab>

                            </Tabs>
                            <Tabs className="tabs-modal"
                                id="controlled-tab-example"
                                activeKey={key2}
                                onSelect={(k) => setKey2(k)}
                            >
                                <Tab eventKey="contact" title={<span><FontAwesomeIcon icon={faInfoCircle} /> Infomación</span>}>
                                    Subido el {trys.createdAt} por {(trys.user != undefined) ? trys.user.username : ''}
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}