import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Edit() {
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/edit'); // Replace with your API endpoint
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setEditedData(item);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8000/edit/${editedData._id}`, editedData); // Replace with your API endpoint
      setEditMode(false);
      fetchData(); // Refresh data after edit
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div>
      <p>DataList</p>
      {/* <ul> */}
        {data.map((item) => (
          <div key={item._id}>
            {editMode && editedData._id === item._id ? (
              <div>
                <input
                  type="text"
                  value={editedData.name}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      name: e.target.value,
                    })
                  }
                />
                <button onClick={handleSave}>Save</button>
              </div>
            ) : (
              <div>
                {/* <span>{item.name}</span> */}
                
                <button onClick={() => handleEdit(item)}>edit</button>
              </div>
            )}
          </div>
        ))}
      {/* </ul> */}
    </div>
  );
}

export default Edit;
