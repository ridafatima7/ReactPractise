import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateCar = () => {
    const [carIds, setCarIds] = useState([]); 
    const [selectedCarId, setSelectedCarId] = useState(null); 
    const [carData, setCarData] = useState({}); 
  
    useEffect(() => {
      axios.get('http://localhost:5000/getcarids')
        .then((response) => {
          setCarIds(response.data.Id);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

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
        {carIds.map((Id) => (
          <option key={Id} value={Id}>
            {Id}
          </option>
        ))}
      </select>
      {selectedCarId && (
        <form onSubmit={handleUpdate}>
          {/* Display car data for update */}
          <input
            type="text"
            name="car"
            value={carData.car}
            onChange={(e) => setCarData({ ...carData, car: e.target.value })}
          />
          {/* Add more input fields for other car properties */}
          <button type="submit">Update Car</button>
        </form>
      )}
    </>
  );
};

export default UpdateCar;