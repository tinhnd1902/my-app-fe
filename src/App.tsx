import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login, Register, Home, Personal, ChatRoom, NotFound, NewFeed} from "./pages";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/personal" element={<Personal/>}/>
                <Route path="/newfeed" element={<NewFeed/>}/>
                <Route path="/chatroom" element={<ChatRoom/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
