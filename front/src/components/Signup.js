import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Signup() {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    function handleSignup() {

        axios.post("http://localhost:8000/user",  { name: name, username: username, password: password, isAdmin: false })
            .then(res => {console.log(res.data)})
        alert("Signed up")
        navigate(-1)
    }

    const navigate = useNavigate()
    return <Modal show={show} backdrop={"static"} onHide={handleShow}>
        <Modal.Header>
            <h1>Sign Up</h1>
        </Modal.Header>
        <Modal.Body>
            <div className="form">
                <label>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
                <label>Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" />
                <label>Password</label>
                <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />
                <label>Confirm Password</label>
                <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={() => handleSignup()}>Sign Up</Button>
            <Button variant="danger" onClick={() => navigate(-1)}>Back to Login</Button>
        </Modal.Footer>
    </Modal>
}