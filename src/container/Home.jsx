import axios from "axios";
import React, { useEffect, useState } from "react";
import "../container/Home.css"


const Home = () => {
  const [input, setInput]　= useState('');
  const [employees, setEmployees] = useState([]);
  

  useEffect(() => {
   
   axios.get("https://randomuser.me/api/?results=50&nat=us"

   ) 
      .then((response)=> {
          console.log(Object.keys(response.data.results));
          setEmployees(response.data.results)
        
      })
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    setInput(e.target.value);
  };
 
 

  return (
    <div>
      <div className="container">
        <div className="row">
          <h1>Employee Directory</h1>
        </div>
        <div className="row">
        <input
        placeholder = "Search by Name"
        value={input}
        onChange={handleChange}
        type="text"
      />
        </div>
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Location</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            
            {employees.filter((val) => {
              
              if (input ==""){
                return val
              }else if (val.name.first.toLowerCase().includes(input.toLowerCase())){

                return val

              }else if (val.name.last.toLowerCase().includes(input.toLowerCase())){
                return val
                
              }

            }).map((employee)=>(
                            <tbody>
                              <tr key={employee.login.uuid}>
                                
                              <th>
                                <img src={employee.picture.thumbnail} alt="" />
                              </th>
                              <td>
                                {employee.name.first}{" "}
                                {employee.name.last}
                              </td>
                              <td>
                                {employee.location.street.number}  {employee.location.street.name}{" "}
                                {employee.location.city},{" "}
                                {employee.location.state},{" "}
                                {employee.location.postcode}
                              </td>
                              <td>{employee.email}</td>
                              <td>{employee.phone}</td>
                            </tr>
                          </tbody>


            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
