import './style.css'
const ModelShowProfileUser = ({idCheck, listUser, setModelProfile}: any) => {
    const findUserProfile = listUser?.find((item: any) => item.user_id === idCheck)

    return <div>
        <div id="overlay"></div>
        <div id='wrap-model'>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <button onClick={() => setModelProfile(false)}>Close</button>
            </div>
            <h1 style={{textAlign: "center"}}>Profile User {findUserProfile?.username}</h1>
            <ul>
                <li>first name: {findUserProfile?.profile?.firstName}</li>
                <li>last name: {findUserProfile?.profile?.lastName}</li>
                <li>age: {findUserProfile?.profile?.age}</li>
                <li>gender: {findUserProfile?.profile?.gender}</li>
            </ul>
        </div>
    </div>
}
export default ModelShowProfileUser