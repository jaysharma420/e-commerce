import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

function Login() {
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/")
    }
  }, [])
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
const [err, seterr] = useState();
  function signin() {
    let obj = { email, password };
    // console.log(obj)
    axios
      .post("http://localhost:1000/login", obj)
      .then((res) => {
        console.log(res.data.data);
        localStorage.setItem("user", JSON.stringify(res.data.data));
        alert("login successfull");
        navigate("/");
      })
      .catch((err) => seterr(err.response.data.message));
  }

  return (<>
    <Header />
    <div className="col-sm-6 offset-sm-3">
      <h2>User Login</h2><br />
      <input
        type={"email"}
        className="form-control"
        placeholder="enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type={"password"}
        className="form-control"
        placeholder="enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <Button variant="secondary" onClick={signin}>
        Sign in
      </Button>
      <br />
      <div>{err}</div>
    </div>
  </>)
}

export default Login;