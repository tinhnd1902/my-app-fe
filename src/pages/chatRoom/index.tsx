import {useRef, useState} from "react";
import {io} from 'socket.io-client';

import {Home} from "../index";
import './style.css'

const ChatRoom = () => {
    const [inputValue, setInputValue] = useState<any>('')

    const socket = io("http://localhost:3000")
    const inputRef = useRef<HTMLInputElement>(null);
    const [listMessage, setListMessage] = useState<any[]>([]);

    const handleChange = () => {
        const inputValue = inputRef.current?.value;
        setInputValue(inputValue)
    }

    const handleKeyDown = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmitNewMessage();
        }
    }

    const handleSubmitNewMessage = () => {
        if (inputValue !== '') {
            socket.emit('message', {
                title: `user: ${Math.floor(Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100))}`,
                content: inputValue
            });
            setInputValue('');
            return inputRef.current?.focus();
        }
        return null
    }

    socket.on('message', (data) => {
        setListMessage([...listMessage, {title: data?.title, message: data?.content}]);
    })


    return <>
        <Home/>
        <h1>This is page ChatRoom</h1>
        <div>
            <ul id="messages">
                {listMessage.map((item: any, i: any) => (
                    <div className="wrap-li" key={i}>
                        <li style={{display: "flex", flexDirection: "column"}}>
                            <span>{item?.title}</span>
                            <span>{item?.message}</span>
                        </li>
                    </div>

                ))}
            </ul>
        </div>

        <div>
            <input type="text" id="message" value={inputValue} ref={inputRef} onChange={handleChange}
                   onKeyDown={(event) => handleKeyDown(event)}/>
            <button onClick={handleSubmitNewMessage}>Submit</button>
        </div>
    </>
}

export default ChatRoom