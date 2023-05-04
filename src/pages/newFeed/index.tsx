import {useEffect, useState} from "react";

import * as request from "../../utils/request";
import {Loading} from "../../components";
import {Home} from "../index";
import "./style.css"

const NewFeed = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [listUser, setListUser] = useState<any>();

    useEffect(() => {
        setLoading(true)
        request.get('users').then((res) => {
            setListUser(res)
            setLoading(false)
        }).catch((error) => console.log(error))
    }, [])


    const filterPostUser = listUser?.filter((item: any) => item.post.length !== 0)
    const addAuthor = filterPostUser?.map((item: any) => (
        {
            author: item?.profile?.firstName ? `${item?.profile?.firstName} ${item?.profile?.lastName}` : 'Ẩn danh',
            title: item?.post?.map((i: any) => ({title: i?.title})),
            description: item?.post?.map((i: any) => ({description: i?.description})),
        }
    ))

    const result = addAuthor?.map((item: any) => {
        return item?.title.reduce((acc: any, curr: any, index: any) => {
            const newItem = {
                author: item?.author,
                title: curr?.title,
                description: item?.description[index]?.description
            };
            acc.push(newItem);
            return acc;
        }, []);
    });


    return <>
        <Home/>
        <h1>This is page NewFeed</h1>
        <button>Create New Feed</button>
        {result?.flat().map((item: any, index: any) => (
            <div key={index} className="wrap-new">
                <h1>author: {item?.author}</h1>
                <h3>Title: {item?.title}</h3>
                <span>Content: {item?.description}</span>
            </div>
        ))}
        {loading && <Loading />}
    </>
}

export default NewFeed