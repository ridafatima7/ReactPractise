/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
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

const Register = () => {
  const [isregistered, setRegister]=useState(false);
  const [Error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onDismissError = () => setError(false);
  const [AlertMessage, setAlertMessage] = useState(false);
  const [usernameMessage,setAlertUsername ] = useState(false);
  const onDismissMessage = () => setAlertMessage(false);
  const onDismissUsername = () => setAlertUsername(false);
  const handleSubmit=(e)=>{
    e.preventDefault();
    const name=e.target.elements.name.value;
    const username=e.target.elements.username.value;
    const email=e.target.elements.email.value;
    const password=e.target.elements.password.value;
    const confirm_password=e.target.elements.confirm_password.value;
    const address=e.target.elements.address.value;
    console.log(name);
    console.log(email);
    if(password===confirm_password)
    {
        axios.post('http://localhost:5000/Test', {
        name,
        username,
        email,
        password, 
        address

      })
    }
  }
//   const handleSubmit=(e)=>{
//     e.preventDefault();
   
//     const name=e.target.elements.name.value;
//     const username=e.target.elements.username.value;
//     const email=e.target.elements.email.value;
//     const password=e.target.elements.password.value;
//     const confirm_password=e.target.elements.confirm_password.value;
//     const address=e.target.elements.address.value;
//     console.log(name);
//     // axios.post('http://localhost:8000/auth/get_data?name=rida').then(res =>{console.log(res)})
//     if(password===confirm_password)
//     {
//        axios({
//          method:'post',
//          url:'http://localhost:5000/register',
//          data:{name:name,username:username,email:email,password:password,address:address}
//        })
//       .then(res=>{
//         //  console.log(res);
//         // setRegister(true);
//          if(res.data.indicator === "success")
//          {
//             setRegister(true);
//          }
         
//          else if(res.data.message==="Failed to add user")
//          {
//             setError(true);
//             setErrorMessage("Failed to register account,Try Again!");
//          }
//          else
//          {
//            setErrorMessage(res.data);
//            setError(true);
//          }
//        console.log(res);
//       })
//       .catch(error=>{
//         console.log(error);
//        })
//     }
//     else
//     {
//       setAlertMessage(true);
//       console.log('Please retype same passwords !')
//     } 
//  }
  return (
    <>
    
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
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
              <h1 style={{color:'blue', display: 'flex', justifyContent: 'center', alignItems: 'center' , paddingTop: '40px'}}>Register </h1>
            {/* </div> */}
            <div className="text-center text-muted mb-4">
              <small>sign up with credentials</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                   name="name"
                   placeholder="Name"
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
                   name="username"
                   placeholder="User_name"
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
                    name="email"
                    placeholder="Email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </InputGroup>
              </FormGroup>
              {/* <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div> */}
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="password"
                    placeholder="Password"
                    type="password"
                    autoComplete="password"
                    required
                  />
                </InputGroup>
              </FormGroup>
              {/* <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div> */}
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="confirm_password"
                    placeholder="Confirm Password"
                    type="password"
                    autoComplete="password"
                    required
                  />
                </InputGroup>
              </FormGroup>
              {/* <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div> */}
             
               
                   
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                   name="address"
                   placeholder="Address"
                    type="text"
                    required />
                </InputGroup>
              </FormGroup>
             
                 
              {/* <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                      
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col> */}
              {/* </Row> */}
              <div className="text-center">
                {/* <Button className="mt-4"  color="info" type="submit" >  */}
                 {/* style={{background:'#f86f2d'}} */}
                  {/* Create account
                </Button> */}
                <Button className="mt-4"  color="info" type="submit" > 
                 {/* style={{background:'#f86f2d'}} */}
                 Test
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
