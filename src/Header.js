import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoiceDollar, faPlus } from "@fortawesome/free-solid-svg-icons";
import Files from "react-files";
import "./Header.css";

export default class Header extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      validated: false, //whether form is to be validated
      file: null,       //stores file name to upload
      store: "",        //vendor
      pdf: true,        //controls whether it's a pdf or not. Matters for rendering pic or pdf
      price: 0.00,      //total
      category: "",     //category, not required
      date: "",         //date
      description: "",  //description, not required
      fileCounter: 0    //since my file selector allows multiple files, I just keep up with how many files are in the array and update the displayed name of the most recent. Janky, I know.
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  add = id => {
    //calls add() in .app
    this.props.add(this.state.pdf, this.state.store, this.state.date, this.state.price, this.state.category, this.state.description);
  };
  handleSubmit(event) {
    //submit handler
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {//If form doesnt have all required fields filled out
      this.setState({ validated: true })
    }
    else {
      this.handleClose();
      //Adds to .app
      this.props.add(this.state.pdf, this.state.store, this.state.date, this.state.price, this.state.category, this.state.description);
      this.setState({
        store: "",
        price: 0.00,
        category: "",
        date: "",
        description: ""
      })
    }
  }
  //handleClose and handleShow control whether the form is visible, and whether the fields should be empty
  handleClose() {
    this.setState({ show: false, validated: false });
  }
  handleShow() {
    this.setState({
      show: true,
      pdf: true,
      store: "",
      price: 0.00,
      category: "",
      date: "",
      description: "",
      validated: false,
      file: null,
      fileCounter: 0
    });
  }
  onChange(files) { //Handler for what happens when a file is imported
    var imgType = false;
    var counter = this.state.fileCounter;
    counter = Number(counter + 1);
    if (files[counter - 1].extension === "pdf") {
      imgType = true;
    }
    console.log(imgType);
    this.setState({ file: files[counter - 1].name, pdf: imgType, fileCounter: counter });
  }
  handleChange(event) { //Handler for every field except the file browser
    if (event.target.id === "vendor")
      this.setState({ store: event.target.value });
    if (event.target.id === "price")
      this.setState({ price: event.target.value });
    if (event.target.id === "date")
      this.setState({ date: event.target.value });
    if (event.target.name === "category")
      this.setState({ category: event.target.id });
    if (event.target.id === "description")
      this.setState({ description: event.target.value });
  }
  render() {
    const { validated } = this.state;
    const divStyle2 = {
      padding: "1em"
    };
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <h4>
          <FontAwesomeIcon icon={faFileInvoiceDollar} />
          𝘙𝘦𝘤𝘦𝘪𝘱𝘵𝗚𝗲𝗻𝗶𝘂𝘀
        </h4>

        <div style={divStyle2}>
          <Nav variant="pills" activeKey="/home" expand="lg">
            <Nav.Item>
              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>𝗔𝗱𝗱 𝗥𝗲𝗰𝗲𝗶𝗽𝘁</Modal.Title>
                </Modal.Header>
                <Form
                  noValidate
                  validated={validated}
                  onSubmit={e => this.handleSubmit(e)}
                >
                  <Container>
                    <Form.Row>
                      <Form.Label>Receipt File*</Form.Label>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} md="10" controlId="file">

                        <Button variant="outline-dark">
                          <div className="files">
                            <Files
                              className="files-dropzone"
                              onChange={this.onChange}
                              onError={this.onFilesError}
                              accepts={["image/png", ".pdf"]}
                              maxFiles={10}
                              maxFileSize={10000000}
                              minFileSize={0}
                              clickable
                            >
                              Browse
                            </Files>

                          </div>
                        </Button>
                        <Form.Label>{this.state.file}</Form.Label>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} md="6" controlId="vendor">
                        <Form.Label>Vendor/Retailer*</Form.Label>
                        <Form.Control type="text" placeholder="" required value={this.state.store} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">
                          Please provide a vendor/retailer.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} md="6" controlId="date">
                        <Form.Label>Transaction date*</Form.Label>
                        <Form.Control type="date" placeholder="" required value={this.state.date} onChange={this.handleChange} />
                        <Form.Control.Feedback type="invalid">
                          Please provide a date.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} md="6" controlId="price">
                        <Form.Label>Receipt total ($USD)*</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder=""
                          required
                          value={this.state.price}
                          onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid price.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row><Form.Label>Category</Form.Label></Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} md="10" controlId="category">
                        <Form.Check
                          type="radio"
                          inline
                          label="Supplies"
                          name="category"
                          id="Supplies"
                          onChange={this.handleChange}
                        />
                        <Form.Check
                          type="radio"
                          inline
                          label="Subscriptions"
                          name="category"
                          id="Subscriptions"
                          onChange={this.handleChange}
                        />
                        <Form.Check
                          type="Radio"
                          inline
                          label="Personal"
                          name="category"
                          id="Personal"
                          onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid category.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} md="200" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="" size="lg" value={this.state.description} onChange={this.handleChange} />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>* Indicates a required field</Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} md="6" controlId="submit">
                        <Button
                          variant="outline-dark"
                          type="cancel"
                          onClick={this.handleClose}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="outline-dark"
                          type="submit"
                        >
                          𝗔𝗱𝗱 𝗿𝗲𝗰𝗲𝗶𝗽𝘁
                        </Button>
                      </Form.Group>
                    </Form.Row>

                  </Container>
                </Form>

                <Modal.Footer />
              </Modal>

              <Button variant="outline-dark" onClick={this.handleShow}>
                {" "}
                <FontAwesomeIcon icon={faPlus} /> 𝗔𝗱𝗱 𝗿𝗲𝗰𝗲𝗶𝗽𝘁
              </Button>
            </Nav.Item>
            <Nav.Item className="justify-content-end">
              <Nav.Link eventKey="disabled" disabled>
                Report Total: ${this.props.total}
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <hr />
        </div>
      </div>
    );
  }
}
