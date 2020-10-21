import { Avatar } from "@material-ui/core";
import React from "react";
import {Link} from "react-router-dom";
import "./SidebarChat.css";

export default function SidebarChat({id, room}){

    return (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://joeschmoe.io/api/v1/${id}`} />
                <div className="sidebarChat__info">
                    <h2>{room.roomName}</h2>
                </div>
            </div>
        </Link>
    );
}