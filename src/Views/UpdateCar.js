import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
const UpdateCar = () => {
    const [carIds, setCarIds] = useState([]); 
    const [selectedCarId, setSelectedCarId] = useState(null); 
    const [carData, setCarData] = useState({}); 
  
    useEffect(() => {
      axios.get('http://localhost:5000/getcarids')
        .then((response) => {
          setCarIds(response.data.carIds);

        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
console.log(carIds);
  useEffect(() => {
    if (selectedCarId) {
      axios.get(`http://localhost:5000/getcar/${selectedCarId}`)
        .then((response) => {
          setCarData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedCarId]);
console.log(carData);
  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/updatecar/${selectedCarId}`, carData)
      .then((response) => {
        console.log('Car record updated successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <h1>Update Car Record</h1>
      <select onChange={(e) => setSelectedCarId(e.target.value)}>
     <option value="">Select Car ID</option>
    {carIds.length > 0 ? (
    carIds.map((Id) => (
      <option key={Id} value={Id}>
        {Id}
      </option>
    ))
  ) : (
    <option value="" disabled>
      No data found
    </option>
  )}
</select>
      {selectedCarId && (
        <form onSubmit={handleUpdate}>
          <Input
            type="text"
            defaultValue={carData.Car}
            // placeholder="car"
            name="car"
            value={carData.Car}
            onChange={(e) => setCarData({ ...carData, Car: e.target.value })}
          />
           <Input
                    name="Id"
                    placeholder="Id"
                    type="text"
                    value={carData.Id}
                    onChange={(e) => setCarData({ ...carData, Id: e.target.value })}
                    required
                  />
            <Input
                    name="Price"
                    placeholder="Price"
                    type="text"
                    value={carData.Price}
                    onChange={(e) => setCarData({ ...carData, Price: e.target.value })}
                    required
                  />
            <Input
                    name="model"
                    placeholder="model"
                    type="text"
                    value={carData.Model}
                    onChange={(e) => setCarData({ ...carData, Model: e.target.value })}
                    required
                  />
              <Input
                    name="color"
                    placeholder="Color"
                    type="text"
                    value={carData.Color}
                    onChange={(e) => setCarData({ ...carData, Color: e.target.value })}
                    required
                  />
            
          {/* Add more input fields for other car properties */}
          <button type="submit">Update Car</button>
        </form>
      )}
    </>
  );
};

export default UpdateCar;