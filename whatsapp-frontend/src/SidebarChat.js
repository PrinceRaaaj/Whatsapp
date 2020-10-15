import { Avatar } from "@material-ui/core";
import React from "react";
import {Link} from "react-router-dom";
import "./SidebarChat.css";

export default function SidebarChat({id, room}){

    return (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${id}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{room.roomName}</h2>
                </div>
            </div>
        </Link>
    );
}