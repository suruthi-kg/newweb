
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Edit from "./Edit";

function DataDisplay() {
  const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetchData();
  }, []);


  const fetchData = async () => {
    //  setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/show");
      setData(response.data);
    }
    catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      //  setIsLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    console.log("hello");
    try {
      // Make an HTTP request to delete the item with the given ID
      const response = await axios.delete(`http://localhost:8000/delete/${itemId}`);
      console.log(response.data.message);
      console.log("del try");
      // Update the UI by removing the deleted ++++ from the data array
      setData((prevData) => prevData.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting data:", error);

    }
  };




  //   return (
  //     <div>
  //       <button onClick={fetchData}>show</button>

  //       {isLoading ? (
  //         <p>Loading...</p>
  //       ) : (
  //         <table id="datadis">
  //           {data.map((item) => (
  //             <tr key={item._id} >
  //                <td>{item.name} </td>
  //                 {/* <td><button onClick={() => (item._id)}>edit</button></td> */}
  //                 <td><button onClick={() => handleDelete(item._id)}>del</button></td>       
  //                 <Edit />
  //           </tr>
  //           )  
  //           )}
  //         </table>


  //  )}
  // </div>
  //   );


  const handleEdit = (item) => {
    // Enable edit mode and set the data to be edited
    console.log(item, "hhhhhhhhhhhh");
    setEditMode(true);
    setEditedData(item);
  };

  const handleSave = async () => {
    console.log(editedData, "hrrr")
    try {
      await axios.put(`http://localhost:8000/edit/${editedData._id}`, editedData); // Replace with your API endpoint
      setEditMode(false);
      // Optionally, you can refetch the data to display the updated version
      fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };



  return (
    <section class="display">
    <div class="container-fluid">
      <button onClick={fetchData}>show</button>
      {data.map((item) => (
        <table key={item._id} >
          {editMode && editedData._id === item._id ? (
            <div>
              {/* Edit mode */}
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


            <table class="table">
            
                <tr class="col-xl-3">
                <th>Name</th>
                <th>Email</th>
              </tr>
              
              <tr>
                <td class="col-xl-3">{item.name} </td>
                <td class="col-xl-3">{item.email}</td>
                <td> <button class="" onClick={() => handleEdit(item)}>Edit</button></td>
                <td> <button onClick={() => handleDelete(item._id)}>del</button></td>
              </tr>
              
            </table>
          
          )}
        </table>
       
      ))}

    </div>
    </section>
  );





}
export default DataDisplay;

