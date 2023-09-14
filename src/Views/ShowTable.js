import React, { useState,useEffect } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import {
  Container,
  Col,
  Card,
  CardHeader,
  CardFooter,
  Table,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge,
  Button,
  Alert,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Progress,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal, ModalHeader, ModalBody, ModalFooter,
  FormGroup,
  Form,
  Row,
  Input,
  Label
} from "reactstrap";
const ShowTable =(args)=>{

const formData = new FormData();
const [modal, setModal] = useState(false);
const toggle = () => setModal(!modal);
const closeModal = () => setModal(false);
const [errorMessage, setErrorMessage] = useState("");
const [error, setError] = useState(false);
const onDismissError = () => setError(false);
const [InformationTable,setInformationTable]=useState(false);
const [deletesuccess, setdeleteSuccess] = useState(false);
const [tempId, setTempId] = useState('');
const [tempName, setTempName] = useState('');
const [deletemodal, setdeleteModal] = useState(false);
const[rerender,setRerender]=useState(false);
const onDismissdeleteSuccess = () => setdeleteSuccess(false);
const onDismissaddSuccess = () => setaddSuccess(false);
const [addsuccess, setaddSuccess] = useState(false);
const Deletetoggle = (event) => { 
  setTempId(event.target.attributes.getNamedItem('data-id').value); 
  setTempName(event.target.attributes.getNamedItem('data-name').value);
  setdeleteModal(!deletemodal); 
};
const edittoggle1=(event)=>
  {
    setEditModal(!editmodal);
  };
  const editModalClose=()=>
  {
    setEditModal(!editmodal); 
  }
  const [id, setInformationid] = useState(null);
  const [oldcar, setCar] = useState(null);
  const [oldId, setId]=useState(null);
  const [oldPrice, setPrice]=useState(null);
  const[oldColor,setColor]=useState(null);
  const[oldModel,setModel]=useState(null);
  const[survivors,setSurvivors]=useState(null);
  const[deaths,setDeaths]=useState(null);
  const[selectedFiles,setSelectedFiles]=useState(null);
  const[date,setDate]=useState(null);
  const[shelters,setShelters]=useState(null);
  const[food,setFood]=useState(null);
  const[medicine,setMedicine]=useState(null);
  const[gallery,setGallery]=useState(null);
  const[editmodal, setEditModal]=useState(false);
  const onDismisseditSuccess = () => seteditSuccess(false);
  const [editsuccess, seteditSuccess] = useState(false);
  const [customError, setCustomError] = useState('')
  const [isCustomError, setIsCustomError] = useState(false)
  const [filtered_Information, setFilteredInformation] = useState('');
  const [currentInformation, setCurrentinformation] = useState("No Information Selected Yet")
  const token = localStorage.getItem('token');

  const handleInformationChange = (e) => {
    const filteredUsers = InformationTable.filter(
      (Information) => Information.Id === e.target.value
    );
    setFilteredInformation(filteredUsers);
    setCurrentinformation(e.target.value)
  };

// const editModalClose=()=>
// {
//   setEditModal(!editmodal); 
// }
const DeletetoggleClose = () => {
  setdeleteModal(!deletemodal); 
}
    
function GetInformation(e)
{
  axios({ 
    method:'get',
    url:"http://localhost:2000/getcar",
      headers: 
      {
        Authorization: `Token ${token}`,
      }
  })
  .then(res=>{
    if(res.data)
    {
      setInformationTable(res.data);
    }
  })
  .catch(error=>{
    console.log(error);
  })
}

useEffect(() => {
GetInformation();
}, []);
  function FindInformation(id)
  {
    axios({     
      method:'get',
      url:"http://localhost:2000/getcar1?temp_id="+id
      ,
      headers: 
      {
        Authorization: `Token ${token}`,
      }
    })
    .then(res=>{
      console.log(res);
      if (res.data ) {
        const firstCar = res.data;
        console.log(firstCar);
        setInformationid(firstCar._id);
        setCar(firstCar.Car);
        setId(firstCar.Id);
        setPrice(firstCar.Price);
        setModel(firstCar.Model);
        setColor(firstCar.Color);
        setEditModal(!editmodal);
      }
    })
    .catch(error=>{
      
      console.log(error);
      setError(true);
      setEditModal(!editmodal); 
    })
  };
  function EditInformation(e)
  {
    e.preventDefault();
    const car=e.target.caR.value;
    console.log(car);
    const Id=e.target.iD.value;
    console.log(Id);
    const Price=e.target.pricE.value;
    console.log(Price);
    const Model=e.target.modeL.value;
    console.log(Model);
    const Color=e.target.coloR.value; 
    console.log(Color);
    console.log(e.target);
    console.log(id);
    axios.get('http://localhost:2000/updatecars', {

      params: {
        id:id,
        car: car,
        Id: Id,
        Price: Price,
        Model: Model,
        Color: Color
      },
      headers: 
      {
        Authorization: `Token ${token}`,
      }
    })
    // axios({     
    //   method:'get',
    //   url:"http://localhost:2000/updatecars",
    //   data:formData,
    // })
    .then(res=>{
      if(res.data == "success")
      {
        seteditSuccess(true); 
        GetInformation();
        setRerender(!rerender);
      }
      else
      {
        setErrorMessage(res.data);
        setError(true);
      }
      setEditModal(!editmodal); 
      
    })
    .catch(error=>{

      setErrorMessage("Failed to connect to backend");
      setError(true);
      console.log(error);
     
    })
 
  };
  function DeleteInformation()
  {
    axios({     
      method:'delete',
      url:"http://localhost:2000/deletecar?temp_id="+tempId,
      headers: 
      {
        Authorization: `Token ${token}`,
      }
    })
    
    .then(res=>{
      if(res.data.indicator=="success")
      {
        setdeleteSuccess(true);
        GetInformation();
      }
      else{
        setError(true);
        setErrorMessage(res.data.messege.message);
      }
      setdeleteModal(!deletemodal); 
      
    })
    .catch(error=>{
      console.log(error);
      setErrorMessage("Network Error!");
      setError(true);
      setdeleteModal(!deletemodal); 
    })
    
  };
return (
    <>
     {/* <NewHeader /> */}
     <Container className="mt--9" fluid>
    <Alert color="success" isOpen={deletesuccess} toggle={onDismissdeleteSuccess}>
           <strong> Information Deleted! </strong> 
   </Alert>

    <Alert color="success" isOpen={editsuccess} toggle={onDismisseditSuccess}>
          <strong> Information Updated successfully! </strong> 
    </Alert>
    {/* <Alert color="danger" isOpen={error} toggle={onDismissError}>
           <strong> {errorMessage}</strong> 
   </Alert> */}
    <Modal isOpen={editmodal} toggle={edittoggle1} {...args} size='lg'>
        <Form  role="form" onSubmit={EditInformation} >
          <ModalHeader style={{ marginTop:'25px' }} toggle={edittoggle1}><b style={{ fontSize: '18px',marginLeft:'296px',marginTop:'48px' }}>Update Inforamtion</b></ModalHeader>
          <ModalBody>  
          {error ? 
           <Alert color="danger" isOpen={error} toggle={onDismissError}>
           <strong> {errorMessage}</strong> 
           </Alert>
          
          : 
          <></>
          //  <h4 style={{color: 'red'}}></h4> 
        }      
              <Row>
                <Col md={6}>
                  <FormGroup>
                  <Label
                    for="id"
                    hidden
                  >
                    ID
                  </Label>
                  <Input
                    id="id"
                    name="id"
                    placeholder="info id"
                    type="hidden"
                    value={id}
                  />
                    <Label for="Car">
                    Car
                    </Label>
                    <Input
                      id="Car"
                      name="caR"
                      placeholder="Update Car"
                      type="text" 
                     defaultValue={oldcar}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Id">
                      Id
                    </Label>
                    <Input
                      id="Id"
                      name="iD"
                      placeholder="Enter Id"
                      type="text"
                      defaultValue={oldId}

                      style={{ color: 'black' }}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="pricE">
                   Price
                    </Label>
                    <Input
                      id="Price"
                      name="pricE"
                      placeholder="Enter Price"
                      type="text"
                      defaultValue={oldPrice}
                    />
                    
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="modeL">
                     Model
                    </Label>
                    <Input
                      id=" Model"
                      name="modeL"
                      placeholder="Enter  Model"
                      defaultValue={oldModel}
                      type="text"
                      style={{ color: 'black' }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
              <FormGroup>
                <Label for="Color">
                  Color
                </Label>
                <Input
                  id="Color"
                  name="coloR"
                  placeholder="Total Color"
                  type='text'  
                  defaultValue={oldColor}
                  style={{ color: 'black' }}
                />
              </FormGroup>
              </Col>
              </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" >
              Update
            </Button>{' '}
            <Button color="secondary" onClick={editModalClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
        </Modal>
        {/* Delete modal */}
 
        <Modal isOpen={deletemodal} toggle={DeletetoggleClose} {...args} size='sm'>
          <ModalHeader toggle={DeletetoggleClose} >Delete Record</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this information ?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => {DeleteInformation()}}>
              Delete
            </Button>{' '}
            <Button color="secondary" onClick={DeletetoggleClose}>
              Cancel
            </Button>
          </ModalFooter>
          </Modal>
        <Modal isOpen={deletemodal} toggle={DeletetoggleClose} {...args} size='sm'>
          <ModalHeader toggle={DeletetoggleClose} onClick={DeleteInformation}>Delete Information</ModalHeader>
          <ModalBody>
          Are you sure you want to delete this information ?
            {/* Are you sure you want to delete <b>{tempName}</b>? */}
          </ModalBody>
          <ModalFooter>
            <Button color="danger"  onClick={DeleteInformation}>
              Delete
            </Button>{' '}
            <Button color="secondary" onClick={DeletetoggleClose}>
              Cancel
            </Button>
          </ModalFooter>

          </Modal>
    
    <Row>
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <Row className="align-items-center">
                  <div className="col">
                  <h3 className="text-white mb-0">Car Information</h3>
                  </div>
                  <Row>
                    {/* <div className="col "> 
                    <Button 
                      color="primary"
                      onClick={toggle}
                      size="md"
                    >
                      Add new Information
                    </Button>
                  </div> */}
                  </Row>
                </Row>
              </CardHeader>
              {/* <CardHeader className="border-0">
                <h3 className="mb-0">Courses</h3>
              </CardHeader> */}
              <Table className=" table align-items-center table-dark table-flush "  responsive>
               {/* AllCourses.map(function(item, i){
                  return <li key={i}>Test</li>
                }) */}               
                <thead className="thead-dark">
                  <tr>
                    <th scope="col" >Car</th>
                    <th scope="col">Id</th>
                    <th scope="col">price</th>
                    <th scope="col" >Model</th>
                    <th scope="col">Color</th>
                    <th scope="col" >Action</th>
                  </tr>
                </thead>

                <tbody>
                {/* { InformationTable ?
                  InformationTable.map((row, index) => {
                  return( */}
                  {filtered_Information.length > 0 ?
                    filtered_Information.map((row, index) => {
                      return (
                  <tr key={index}>
                    <th scope="row">
                      <i className="ni ni-book-bookmark text-blue"/>
                      <span className="mb-0 text-sm">
                      <td>{row.Car}</td>
                      </span>
                    </th>
                    <td>{row.Id}</td>
                    <td>
                       {row.Price}
                    </td>
                    <td>
                      {row.Model}
                      </td>
                    <td>  
                      {row.Color}
                    </td>
                    <td>
                      <Button color="info" onClick={() => {FindInformation(row._id)}}>
                      <i className="ni ni-active-40"></i>
                      </Button>
                      <Button data-id={row._id} data-name={row.Id}color="danger" onClick={Deletetoggle}> 
                        <i className="ni ni-fat-remove"></i>
                      </Button>
                    </td>

                  </tr> )
                      })
                      :
                      InformationTable && InformationTable.length > 0 && currentInformation == "No Information Selected Yet" ? (
                        InformationTable.map((row, index) => (
                          <tr key={index}>
                    <th scope="row">
                      <i className="ni ni-book-bookmark text-blue"/>
                      <span className="mb-0 text-sm">
                         {/* {row.dis_type} */}
                      <td>{row.Car}</td>
                      </span>
                    </th>
                    <td>{row.Id}</td>
                    {/* <td>{row.description}</td> */}
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                       {row.Price}
                      </Badge>
                    </td>
                    <td>
                    <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                      {row.Model}
                      </Badge>
                      </td>
                    {/* <td>
                       {row.dis_coordinatesX}
                    </td> 
                    <td>{row.dis_coordinatesY}</td> */}
                    <td style={{ textAlign: 'center' }}>  
                      {row.Color}
                    </td>
                    <td>
                      <Button color="primary" onClick={() => {FindInformation(row._id)}}>Update
                      <i className="ni ni-active-40"></i>
                      </Button>
                      <Button data-id={row._id} data-name={row.Car}color="danger" onClick={Deletetoggle}> Delete
                        <i className="ni ni-fat-remove"></i>
                      </Button>
                    </td>

                  </tr> 
                  ))
                  ) :

                    <tr>
                      <td span="5">No Disaster Information added yet !</td>
                    </tr>
                }
                      
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        </Container>
    </>
)
}
export default ShowTable;