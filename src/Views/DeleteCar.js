import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteCar = () => {
  const [carIds, setCarIds] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState('');
  const [isDeleted, setDeleted] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/getcarids')
      .then((response) => {
        console.log(response);
        setCarIds(response.data.carIds);
        console.log(carIds);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(carIds);

  const handleDelete = () => {
    if (!selectedCarId) {
      return;
    }

    axios.get(`http://localhost:5000/deletecar/${selectedCarId}`)
      .then(() => {
        setDeleted(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
     <h1>Delete Car Record</h1>
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
      <button onClick={handleDelete}>Delete Record</button> 
      {isDeleted && <p>Car record deleted successfully!</p>}
    </>
  );
};

export default DeleteCar;
