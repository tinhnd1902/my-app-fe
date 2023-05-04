import {useEffect, useState} from "react";

import {ModelShowProfileUser} from "../../components/models";
import * as request from "../../utils/request";
import {Loading} from "../../components";
import {Home} from "../index";

const Personal = () => {
    const [listUser, setListUser] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [modelProfile, setModelProfile] = useState<boolean>(false);
    const [idCheck, setIdCheck] = useState<any>();


    useEffect(() => {
        setLoading(true)
        request.get('users').then((res) => {
            setListUser(res)
            setLoading(false)
        }).catch((error) => console.log(error))
    }, [])

    return <>
        <Home />
        <h1>This is page Personal</h1>
        <div>list user</div>
        <ul>
            {
                listUser?.map((user: any, i: any) =>
                     (<div key={i}>
                         <li>user: {user?.username}</li>
                         <button onClick={() => {
                             setModelProfile(!modelProfile)
                             setIdCheck(user?.user_id)
                         }}>Profile
                         </button>
                     </div>)
                )
            }
        </ul>
        {modelProfile && <ModelShowProfileUser idCheck={idCheck} listUser={listUser} setModelProfile={setModelProfile}/>}
        <div style={{display: 'flex', justifyContent: 'center'}}>{loading && <Loading/>}</div>
    </>
}

export default Personal