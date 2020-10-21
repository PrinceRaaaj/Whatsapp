import React, {useState, useEffect} from "react";
import {Avatar, IconButton} from "@material-ui/core";
import {SearchOutlined, AttachFile, MoreVert} from "@material-ui/icons";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from "react-router-dom";
import "./Chat.css";
import axios from "./axios";
import Pusher from "pusher-js";


export default function Chat({name}){

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [roomName, setRoomName] = useState("");
    const [lastSeen, setLastSeen] = useState("");
    const {roomId} = useParams();

    useEffect(()=>{
        axios.get(`/rooms/${roomId}/get`).then(response=>{
            setRoomName(response.data.roomName);
            setMessages(response.data.messages);
        })
    }, [roomId]);

    useEffect(()=>{
        const pusher = new Pusher("16c74566fc8f85841108", {
          cluster: "ap2"
        });
        const channel = pusher.subscribe("rooms");
         channel.bind("updated", function(data) {
            setMessages([...messages, data]);
        });
        return ()=>{
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [messages]);
 
    function sendMessage(event){
        const dateTime = new Date().toLocaleString();
        axios.post(`/rooms/${roomId}/newMessage`, {
            name: name,
            message: input,
            timeStamp: dateTime
        });
        event.preventDefault();
        setLastSeen(dateTime);
        setInput("");
    }

    return(
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://joeschmoe.io/api/v1/${roomId}`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>{lastSeen}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton><SearchOutlined /></IconButton>
                    <IconButton><AttachFile /></IconButton>
                    <IconButton><MoreVert /></IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message=>{
                    return  <div className={`chat__message ${name===message.name && "chat__receiver"}`} key={message._id}>
                                <span className="chat__name">
                                    {message.name}
                                </span>
                                    {message.message}
                                <span className="chat__timestamp">
                                    {message.timeStamp}
                                </span>
                            </div>
                })}
                
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input type="text" placeholder="Type a message" value={input} onChange={e=>setInput(e.target.value)}></input>
                    <button onClick={sendMessage} type="submit">Submit</button>
                </form>
                <MicIcon />
            </div>
        </div>
    );
}