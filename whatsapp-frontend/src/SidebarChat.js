import { Avatar } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./SidebarChat.css";

export default function SidebarChat({id, room}){

    const [seed, setSeed] = useState("");
    const [roomId, setRoomId] = useState("");

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*100));
        setRoomId(id);
    }, [id]);

    return (
        <Link to={`/rooms/${roomId}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{room.roomName}</h2>
                </div>
            </div>
        </Link>
    );
}