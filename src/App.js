import React, { useState ,useEffect} from "react";
import './App.css';
import axios from 'axios';
import DataDisplay from "./DataDisplay";
// import Edit from "./Edit";

const App = () => {
  const [data, setData] = useState({
    name: "",
    password: ""
  });
 
  const [submitted, setSubmitted] = useState(false); // State to control the message display

  useEffect(() => {
    fetchData();
  }, []);



  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: data.name,
      password: data.password
    };
    axios.post("http://localhost:8000/message", userData)
      .then((response) => {
        console.log(response.status, response.data.token);
        console.log("success");
      });
      setSubmitted(true); // Set submitted to true after successful submission
    
  };



  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/delete"); // Replace with your data fetching route
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  


  return (
    <section class="appreturn">
      <center>
    <div class="container">
     
        {/* {<h1>{message}</h1> } */}
        <p>hello</p>
     
        {submitted ? (
        <div class="container"><i>Submitted Successfully...! <strong>click show</strong> to see your data</i></div>
      ) : ( 
        <form onSubmit={handleSubmit} method="GET" class="form-control form-label box" id="form">
          <table class="table">
            <tr>
              {/* <th  class="hname"> <span>Name</span></th> */}
             <th class="hname"><span>N</span><span>a</span><span>m</span><span>e</span></th>
              <td><input type="text" name="name" id="name" value={data.name}   onChange={handleChange} /></td>
            </tr>

            <tr>
              <th class="hpassword"><span>P</span><span>a</span><span>s</span><span>s</span><span>w</span><span>o</span><span>r</span><span>d</span></th>
              <td><input type="password" name="password" id="password" onChange={handleChange} /></td><br></br>
           </tr>

{/* <tr>
  <th class="hmobile"><span>P</span><span>h</span><span>o</span><span>n</span><span>e</span><span>N</span><span>u</span><span>m</span><span>b</span><span>e</span><span>r</span></th>
</tr> */}
          
               <button name="submit" id="submit" type="submit" >Submit</button>
             

            
          </table>
        </form>
      )}
      <DataDisplay />
      {/* <Edit/> */}
       

    </div>
    </center>
    </section>
  );
}
export default App;

