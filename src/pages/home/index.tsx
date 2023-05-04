import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
        localStorage.setItem('token', '')
    }

    return (<div>
        <button onClick={() => navigate("/personal")}>Personal</button>
        <button onClick={() => navigate("/newfeed")}>New Feed</button>
        <button onClick={() => navigate("/chatroom")}>Chat - Room</button>
        <button style={{marginLeft: '20px', backgroundColor: 'red'}} onClick={() => handleLogout()}>Log out</button>
    </div>)
}

export default Home