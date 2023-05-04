import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import axios from "axios";

import {Loading} from "../../components";

const Register = () => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [success, setSuccess] = useState<boolean>(true);
    const [checkStatus, setCheckStatus] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const onRegister = (event: any) => {
        event.preventDefault();
        setLoading(true)
        axios.post('http://localhost:3000/auth/register', {
            username: username,
            password: password,
            email: email
        }).then((res) => {
            if (res.data === 'Username already exists') {
                setSuccess(false);
                setCheckStatus(false)
                return setLoading(false)
            }
            setCheckStatus(true)
            setLoading(false)
            setSuccess(false);
            setTimeout(() => {
                setSuccess(true);
                return navigate("/")
            }, 1000)
        }).catch((error) => console.log(error))
    }

    return (<div>
        <h1>This is Register Page</h1>
        <form onSubmit={onRegister}>
            <legend>Register</legend>
            <div className="form-group">
                <label>User Name</label>
                <input type="text" className="form-control" id="userName" placeholder="User Name"
                       name="txtUserName" onChange={(event) => setUsername(event.target.value)}/>
            </div>
            <div className="form-group">
                <label>PassWord</label>
                <input type="password" className="form-control" id="passWord" placeholder="Input field"
                       name="txtPassWord" onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="text" className="form-control" id="email" placeholder="Input field"
                       name="txtEmail" onChange={(event) => setEmail(event.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
            <button className="btn btn-primary" onClick={() => navigate('/')}>Back</button>
        </form>
        <div style={{display: success ? 'none' : 'block'}}>{checkStatus ? "Success" : "Username already exists"}</div>
        <div style={{display: 'flex', justifyContent: 'center'}}>{loading && <Loading/>}</div>
    </div>)
}

export default Register