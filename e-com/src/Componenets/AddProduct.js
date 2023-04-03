import { useState } from "react";
import { Button } from "react-bootstrap";
import Header from "./Header";
import axios from "axios";

function AddProduct() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [img, setImg] = useState()
    const [err, seterr] = useState();

    function add() {
        console.log(name, price, img, description);
        const formdata = new FormData()
        formdata.append("name", name)
        formdata.append("price", price)
        formdata.append("description", description)
        formdata.append("file", img)
        console.log(formdata);
        // D:\e-commerce\Backend\src\Route\MyImg.png
        axios({
            method: "post",
            url: "http://localhost:1000/createproduct",
            data: formdata,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((res) => { console.log("response", res.data.message); alert("product added successfully") })
            .catch((err) => { console.log("error"); console.log("err", err.message) ;seterr(err.response.data.message)})
    }
    return (<>
        <Header />
        <div className="col-sm-6 offset-sm-3">
            <h1>Add Product</h1>
            <input type="text" className="form-control" placeholder="name" onChange={(e) => { setName(e.target.value) }} /><br />
            <input type="text" className="form-control" placeholder="price" value={price} onChange={(e) => { setPrice(e.target.value) }} /><br />
            <input type="text" className="form-control" placeholder="decription" value={description} onChange={(e) => { setDescription(e.target.value) }} /><br />
            <input type="file" className="form-control" placeholder="file" onChange={(e) => { setImg(e.target.files[0]) }} /><br />
            <Button variant="secondary" onClick={add}>Add Product</Button>
            <div>{err}</div>
        </div></>)
}

export default AddProduct;