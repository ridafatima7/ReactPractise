
import { Redirect,Link,Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import { InputGroupText as InputGroupAddon} from "reactstrap";
import axios from 'axios'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Alert
} from "reactstrap";

const Cars = () => {
  const [isCar, setCar]=useState(false);
  const [Error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onDismissError = () => setError(false);
  const [AlertMessage, setAlertMessage] = useState(false);
  const [usernameMessage,setAlertUsername ] = useState(false);
  const onDismissMessage = () => setAlertMessage(false);
  const onDismissUsername = () => setAlertUsername(false);
  const token = localStorage.getItem('token');

  const handleSubmit=(e)=>{
    e.preventDefault();
   
    const car=e.target.elements.car.value;
    const Id=e.target.elements.Id.value;
    const Price=e.target.elements.Price.value;
    const model=e.target.elements.model.value;
    const color=e.target.elements.color.value;
    axios.get('http://localhost:2000/addcar', {

      params: {
        car: car,
        Id: Id,
        Price: Price,
        model: model,
        color: color
      },
      headers: 
      {
        Authorization: `Token ${token}`,
      }
    })
    
      .then(res=>{
        
         if(res.data.indicator === "success")
         {
            setCar(true);
         }
         
         else if(res.data.message==="Failed to add car")
         {
            setError(true);
            setErrorMessage("Failed to add car,Try Again!");
         }
         else
         {
           setErrorMessage(res.data);
           setError(true);
         }
       console.log(res);
      })
      .catch(error=>{
        console.log(error);
       })

 }
 
  return (
    <>
    
      <Col lg="6" md="8">
        <Card className="bg-info shadow border-0">
          {/* <CardHeader className="bg-transparent pb-5"> */}
            {/* <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader> */}
          <CardBody className="px-lg-5 ">
          <Alert color="danger" isOpen={AlertMessage} toggle={onDismissMessage}>
              <strong> Please Enter Correct password  </strong> 
            </Alert>
            {/* <Alert color="danger" isOpen={usernameMessage} toggle={onDismissUsername}>
              <strong> UserName Already Exists, Try another </strong> 
            </Alert> */}
            <Alert color="danger" isOpen={Error} toggle={onDismissError}>
              <strong> {errorMessage}</strong> 
            </Alert>
            {/* <div style={{ }}> */}
              <h1 style={{display: 'flex', justifyContent: 'center', alignItems: 'center' , paddingTop: '40px'}} color= 'info'>Add Car </h1>
            {/* </div> */}
            {/* <div className="text-center text-muted mb-4">
              <small>Cars</small>
            </div> */}
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                   name="car"
                   placeholder="Car"
                    type="text"
                    required  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                   name="Id"
                   placeholder="Id"
                    type="text" 
                    required />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="Price"
                    placeholder="Price"
                    type="text"
                    required
                  />
                </InputGroup>
              </FormGroup>
          
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="model"
                    placeholder="model"
                    type="text"
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="color"
                    placeholder="Color"
                    type="text"
                    required
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="mt-4"  color="dark" type="submit" > 
                  Add Information
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Cars;
