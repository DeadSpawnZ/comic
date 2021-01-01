import React, { useState, useEffect } from 'react'
import {
    FormControl,
    Col,
    Row,
    InputGroup,
    Form,
    Modal,
    Button
} from 'react-bootstrap'
import axios from 'axios'

export default function ModalAddComic(props) {
    const [no, setNo] = useState();
    const [print, setPrint] = useState();
    const [variant, setVariant] = useState();
    const [type, setType] = useState();
    const [price, setPrice] = useState();
    const [dateP, setDate] = useState();
    const [title, setTitle] = useState();
    const [coverfile, setCoverfile] = useState();

    useEffect(() => {
        setTitle(props.value);
    },[props.value]);

    async function createNewComic(event) {
        event.preventDefault();
        const fd = new FormData();
        fd.append('coverfile', coverfile, coverfile.name);
        fd.append('no', no);
        fd.append('variant', variant);
        fd.append('print', print);
        fd.append('type', type);
        fd.append('price', price);
        fd.append('dateP', dateP);
        fd.append('title', title);
        const res = await axios.post('http://localhost:4000/comics', fd);
        console.log(res);
        props.rComics();
    }

    return (
        <Modal show={props.showV} onHide={() => props.hModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Agregar comic al título</Modal.Title>
            </Modal.Header>
            <Form onSubmit={(e) => createNewComic(e)}>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Label className="col-form-label-sm">Número</Form.Label>
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>#</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl name="no" onChange={(e) => setNo(e.target.value)} required />
                            </InputGroup>
                        </Col>
                        <Col>
                            <Form.Label className="col-form-label-sm">Precio de portada</Form.Label>
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl name="price" onChange={(e) => setPrice(e.target.value)} required />
                            </InputGroup>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label className="col-form-label-sm">Tipo</Form.Label>
                                <Form.Control size="sm" as="select" name="type" onChange={(e) => setType(e.target.value)} required >
                                    <option value="-">Choose...</option>
                                    <option value="gp">Grapa</option>
                                    <option value="fl">Foil</option>
                                    <option value="lt">Lenticular</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label className="col-form-label-sm">Impresión</Form.Label>
                                <Form.Control size="sm" type="number" min="1" name="print" onChange={(e) => setPrint(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                                <Form.Label className="col-form-label-sm">Fechas de publicación</Form.Label>
                                <Form.Control size="sm" type="date" name="dateP" onChange={(e) => setDate(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label className="col-form-label-sm">Variante</Form.Label>
                                <Form.Control size="sm" type="text" name="variant" onChange={(e) => setVariant(e.target.value)} style={{textTransform: "uppercase"}}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label className="col-form-label-sm">Portada</Form.Label>
                                <Form.File label=""
                                    data-browse="Buscar" custom name="coverfile" onChange={(e) => setCoverfile(e.target.files[0])} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" variant="secondary" onClick={() => props.hModal(false)}>
                        Cancelar
			  	</Button>
                    <Button size="sm" variant="primary" type="submit" onClick={() => props.hModal(false)}>
                        Añadir comic
			  	</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}