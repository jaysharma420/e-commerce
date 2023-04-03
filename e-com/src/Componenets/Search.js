import { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Table } from "react-bootstrap";
function Search() {
  const [data, setData] = useState([]);
  function getproduct(item) {
    if (item.length > 1) {
      let obj = { name: item };
      axios
        .post("http://localhost:1000/searchproduct", obj)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          console.log("error is", err);
        });
    }
  }

  return (
    <>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        <h1>Search Product</h1>
        <input
          className="form-control"
          placeholder="search"
          onChange={(e) => getproduct(e.target.value)}
        />
        {data.length > 0 ? (
          <Table  striped bordered hover>
            <thead>
              <tr>
                {/* <th>Id</th> */}
                <th>Name</th>
                <th>Price</th>
                <th>description</th>
                <th>image</th>
              </tr>
            </thead>
            <tbody>
              {data.map((value, index) => {
                console.log(value.name);
                return (
                  <tr key={index}>
                    {/* <td>{value._id}</td> */}
                    <td>{value.name}</td>
                    <td>{value.price}</td>
                    <td>{value.description}</td>
                    <td>
                      <img
                        src={"http://localhost:1000/" + value.file}
                        width="100px"
                        height="100px"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : null}
      </div>

     
    
    </>
  );
}

export default Search;
