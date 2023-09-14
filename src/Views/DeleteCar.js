import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteCar = () => {
  const [carIds, setCarIds] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState('');
  const [isDeleted, setDeleted] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/getcarids')
      .then((response) => {
        setCarIds(response.data.Id);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = () => {
    if (!selectedCarId) {
      // Handle if no car is selected
      return;
    }

    axios.delete(`http://localhost:5000/deletecar/${selectedCarId}`)
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
        {carIds.map((Id) => (
          <option key={Id} value={Id}>
            {Id}
          </option>
        ))}
      </select>
      <button onClick={handleDelete}>Delete Record</button>
      {isDeleted && <p>Car record deleted successfully!</p>}
    </>
  );
};

export default DeleteCar;
