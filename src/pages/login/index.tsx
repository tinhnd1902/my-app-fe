import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import axios from "axios";

import {Loading} from "../../components";

const Login = () => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [status, setstatus] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const onLogin = (event: any) => {
        event.preventDefault();
        setLoading(true)
        if (username !== undefined && password !== undefined) {
            axios.post('http://localhost:3000/auth/login', {
                username: username,
                password: password
            }).then((res) => {
                if (res.data !== 'Username or password is not correct') {
                    localStorage.setItem("token", res.data?.access_token);
                    setLoading(true)
                    return navigate("/home");
                } else {
                    setstatus(false)
                    return setLoading(false)
                }

            }).catch((error) => {
                setLoading(false)
                console.log(error)
            })
        } else {
            setstatus(false)
            setLoading(false)
        }

    }

    return (<div>
        <h1>This is Login Page</h1>
        <form onSubmit={onLogin}>
            <legend>Login</legend>
            <div className="form-group">
                <label>User Name</label>
                <input type="text" className="form-control" id="userName" placeholder="User Name"
                       name="txtUserName" onChange={(event) => {
                    setUsername(event.target.value)
                    setstatus(true)
                }}/>
            </div>
            <div className="form-group">
                <label>PassWord</label>
                <input type="password" className="form-control" id="passWord" placeholder="Input field"
                       name="txtPassWord" onChange={(event) => {
                    setPassword(event.target.value)
                    setstatus(true)
                }}/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <button className="btn btn-primary" onClick={() => navigate('/register')}>Register</button>
        </form>
        <div style={{display: status ? "none" : "block"}}>Username or password incorrect</div>
        <div style={{display: 'flex', justifyContent: 'center'}}>{loading && <Loading/>}</div>
    </div>)
}

export default Login