
import { useState,useEffect} from 'react';
import { useLocation,Link ,Route, Switch} from 'react-router-dom';
import axios from 'axios'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Alert

} from "reactstrap";
import { Redirect } from 'react-router-dom';
const Login = () => {
  const [islogged, setlogin] = useState(false);
  const [error, setError] = useState(false);
  const [Success, setSuccess] = useState(false);
  const onDismissSuccess = () => setSuccess(false);
  const [errorMessage ,setErrorMessage]=useState("")
  const location = useLocation();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const message = queryParams.get('Message');
    if (message) 
    {
      if(message==='LoggedOutSuccessfully')
      {
        setSuccess(true);
        setErrorMessage('LoggedOut Successfully')
      }
      else if(message==='AccountRegisteredSuccessfully')
      {
        setSuccess(true);
        setErrorMessage('Account Registered Successfully')
      }
      else{
        setSuccess(true);
        setErrorMessage('Account registration request has sent')
      }
      
    }
  }, [location.search]);

  const handleSubmit = (e) => 
  {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    if( email === '' || password==''){
      if(email==='' &&  password=='')
      {
        setError(true)
        setErrorMessage('Please Enter your Credientials !')
      }
      else if(email==='')
      {
        setError(true)
        setErrorMessage('Please Enter your Email !')
      }
      else{
        setError(true)
        setErrorMessage('Please Enter your Pssword !')
      }
      return;
    }
    else
    {
       // axios.post('http://localhost:8000/auth/get_data?name=rida').then(res =>{console.log(res)})
       axios({
       method: 'post',
       withCredentials: true,
       url: 'http://localhost:8000/Test/login',
       data: { email: email, password: password }
       })
      .then(res => {
        console.log("Password is incorrect")
        if(res.data==="Password is incorrect")
         { console.log("Password is incorrect")
            setError(true)
            setErrorMessage("Incorrect Password");
         }
         else if(res.data==="Email not found")
         {
           setError(true);
           setErrorMessage("Incorrect Email");
         }
         else 
         {
          localStorage.setItem("user", JSON.stringify(res.data))
          setlogin(true)
         }
         
       })
      .catch(error => {
          console.log(error);
           setError(true)
           setErrorMessage('Server Failure !')
      })
    }
    
  }
   const onDismiss = () => setError(false);
   if (islogged) 
   {
     return <Redirect to="/admin/user-profile?Message=LoggedInSuccessfully" />;
   }
  

  return (
    <>
    <Switch>
        <Route path="/login">
      <Col lg="5" md="10">
        <Card className="bg-secondary shadow border-0">
        
          <CardBody className="px-lg-5 ">
          <Alert color="success" isOpen={Success} toggle={onDismissSuccess}>
              <strong>!- </strong>{errorMessage}
            </Alert>
            <Alert color="danger" isOpen={error} toggle={onDismiss}>
              <strong>Error ! </strong>{errorMessage}
            </Alert>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , paddingTop: '20px' }}>
              <h1 style={{color:'blue'}}>Sign in</h1>
            </div>
            {/* <CardHeader className="bg-transparent pb-5"> */}
            {/* <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
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
            </div> */}
            {/* </CardHeader> */}

            <div className="text-center text-muted mb-4">
              <small>sign in with credentials</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
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
                    name="password"
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              {/* <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                  style={{background:'#f86f2d'}}
                </label>
              </div> */}
              <div className="text-center">
                <Button className="my-4" color='info' type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        {/* <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <Link
              className="text-light"
              href="#pablo"
             to={"/register?id=" } 
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </Link>
          </Col>
        </Row> */}
      </Col>
      </Route>
      </Switch>
    </>
  );
};

export default Login;
