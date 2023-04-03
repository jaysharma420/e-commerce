import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


function NotFound() {
    const navigate = useNavigate()
    return (<div style={{ textAlign: "center" }}>
        <h1>404 PAGE NOT FOUND</h1><br />
        <Button variant="danger" onClick={() => { navigate("/") }}>Go to Home Page</Button>

    </div>)
}

export default NotFound