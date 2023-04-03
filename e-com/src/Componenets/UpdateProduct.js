import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";

function UpdateProduct() {
    const data = useLocation()
     const navigate = useNavigate()
    const [name, setName] = useState("hello brother")
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()
    const [file, setFile] = useState()
    const [err, seterr] = useState();


   useEffect(() => {
    if(data.state == null) {navigate("/")}
    else {
      
        axios({
            method: "get",
            url: `http://localhost:1000/getbyid/${data.state.id}`,
        })
            .then((res) => {
                setName(res.data.data.name)
                setPrice(res.data.data.price)
                setDescription(res.data.data.description)
                setFile(res.data.data.file)
                
            })
            .catch((err) => {
                console.log("error is", err)
               
            })
    }
    }, [] )

    function Change(id) {
        console.log(name,price,description,file)
        console.log("this thing i want", id);
        let obj = { name, price, description, file }
        const formdata = new FormData()
        formdata.append("name",name)
        formdata.append("price",price)
        formdata.append("description",description)
        formdata.append("file",file)
        formdata.append("id",id)
        console.log("formdata is" ,formdata);
        // obj.id = id
        axios({
            method: "put",
            url: "http://localhost:1000/updateproduct",
            data: formdata,
            headers: { "Content-Type": "multipart/form-data" }
        }).then((res) => {
            alert("updated successfully")
            console.log("response is", res);
        }).catch((err) => {
            console.log("error is", err)
            seterr(err.response.data.message)
        })
    }
    return (<>
        <Header />
        {console.log(name,price,description,file)}
        <div style={{ textAlign: "center" }}>UpdateProduct is here</div>
        <div className="col-sm-6 offset-sm-3">
            <input className="form-control" placeholder="name" value={name} onChange={(e) => { setName(e.target.value) }} /><br />
            <input className="form-control" placeholder="price" value={price} onChange={(e) => { setPrice(e.target.value) }} /><br />
            <input className="form-control" placeholder="description" value={description} onChange={(e) => { setDescription(e.target.value) }} /><br />
            <input type={"file"} className="form-control"  onChange={(e) => { setFile(e.target.files[0]) }} /><br />
            <Button onClick={() =>Change(data.state.id) }>Update Product Details</Button>
            <div>{err}</div>

        </div></>)
}

export default UpdateProduct;