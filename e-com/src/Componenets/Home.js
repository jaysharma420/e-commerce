import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Home() {
    const [data, setdata] = useState([])
    const [demo, setDemo] = useState(true)
    const location = useLocation()
    console.log("products are ", location.state);
    useEffect(() => {
        axios.get("http://localhost:1000/getproduct")
            // .then((res)=>res.json())
            .then((res) => {
                console.log("response is", res.data.data);
                setdata(res.data.data)
                console.log(data);
            })
            .catch((err) => {
                console.log("error is ", err);
                // setdata(err)})
            })
    }, [demo])
    const remove = (id) => {
        let confirm = window.confirm("want to delete product")
        if (confirm) {
            let obj = { id: id }
            axios({
                url: "http://localhost:1000/deleteproduct",
                method: "delete",
                data: obj
            })
                .then((res) => {
                    setDemo(!demo)
                    window.alert("data deleted")
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    return (<>
        <Header />
        <div className="div">
            <Table striped bordered hover >
                <thead>
                    <tr>
                        {/* <th>Id</th> */}
                        <th>Name</th>
                        <th>Price</th>
                        <th>description</th>
                        <th>image</th>
                        <th>Operation</th>
                        <th>Update Product</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((value, index) => {
                            return <tr key={index}>
                                {/* <td>{value._id}</td> */}
                                <td>{value.name}</td>
                                <td>{value.price}</td>
                                <td>{value.description}</td>
                                <td><img alt="l" src={"http://localhost:1000/"+value.file} width="100px" height="100px"/></td>

                                <td onClick={() => remove(value._id)}><Button variant="secondary">Delete</Button></td>
                                <td><Link style={{ color: "GrayText" }} to={"/updateproduct"} state={{ id: value._id }}>Update</Link></td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
            {/* <div><img src="https://th.bing.com/th/id/OIP.1YM53mG10H_U25iPjop83QHaEo?pid=ImgDet&rs=1"></img></div> */}
        </div></>)
}

export default Home;