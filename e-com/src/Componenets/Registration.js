import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Registration() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/")
    }
  }, [])
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [err, seterr] = useState();
  function signup() {
    let obj = { name, email, password };
    // console.log(obj)
    axios
      .post("http://localhost:1000/registration", obj)
      .then((res) => {
        console.log(res.data.data);
        // localStorage.setItem("user", JSON.stringify(res.data.data));
        alert("Registration successfull");
        navigate("/login");
      })
      .catch((err) => seterr(err.response.data.message));
  }

  return (
    <>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        <h2>User Registration</h2>
        <br />

        <input
          type={"text"}
          className="form-control"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type={"email"}
          className="form-control"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type={"password"}
          className="form-control"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <Button variant="secondary" onClick={signup}>
          Sign UP
        </Button>
        <br />
        <div style={{color:"red"}}>{err}</div>
      </div>
    </>
  );
}

export default Registration;
