 import React, {useState, useEffect} from "react";
 import {Avatar, IconButton} from "@material-ui/core";
 import MoreVertIcon from '@material-ui/icons/MoreVert';
 import DonutLargeIcon from '@material-ui/icons/DonutLarge';
 import ChatIcon from '@material-ui/icons/Chat';
 import SearchIcon from '@material-ui/icons/Search';
 import "./Sidebar.css";
 import Pusher from "pusher-js";
 import SidebarChat from "./SidebarChat";
 import axios from "./axios";
 export default function Sidebar(){

    const [rooms, setRooms] = useState([]);

    useEffect(()=>{
        axios.get("/rooms/get").then(response => {
            setRooms(response.data);
          });
    }, []);
    
    useEffect(()=>{
        const pusher = new Pusher("16c74566fc8f85841108", {
            cluster: "ap2"
        });
        const channel = pusher.subscribe("rooms");
        channel.bind("inserted", function(data) {
            setRooms([...rooms, data]);
        });
        return ()=>{
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [rooms]);

    const createChat=()=>{
        const roomName = prompt("Please Enter name for Chat");
        if (roomName !== "" && roomName !== null){
            axios.post("/rooms/create", {roomName : roomName});
        } 
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <IconButton><Avatar /></IconButton>
                <div className="sidebar__headerRight">
                    <IconButton><DonutLargeIcon /></IconButton>
                    <IconButton><ChatIcon /></IconButton>
                    <IconButton><MoreVertIcon /></IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                <SearchIcon />
                <input type="text" placeholder="Search or Start a new chat"></input>
                </div>
            </div>
            <div className="sidebar__chats">
                <div onClick={createChat} className="sidebarChat">
                    <h2 >Add New Chat</h2>
                </div>
                {rooms.map(room=>(
                    <SidebarChat key={room._id} id={room._id} room={room} />
                ))}
            </div> 
        </div>
     );
} 