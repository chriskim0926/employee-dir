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

  function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[0];
        y = rows[i + 1].getElementsByTagName("TD")[0];
        //check if the two rows should switch place:
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }
 

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
          <table id="myTable">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col" ><button onClick = {sortTable}>Sort Alphabetically</button> Name</th>
                <th scope="col" >Location</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            
            {employees.filter((val) => {
              
              if (input ===""){
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
