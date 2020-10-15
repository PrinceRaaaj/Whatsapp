import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";
import path from "path";

const app = express();

app.use(express.json());
app.use(cors());

const pusher = new Pusher({
    appId: '1085684',
    key: '16c74566fc8f85841108',
    secret: '1f4eddfd839d4d5ba15c',
    cluster: 'ap2',
    useTLS: true
});

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(()=>{
    console.log("Database connected");
});

const messageSchema = mongoose.Schema({
    message: String,
    name: String,
    timeStamp: String
});
const roomSchema = mongoose.Schema({
    roomName: String,
    messages: [messageSchema]
});

const Message = mongoose.model("Message", messageSchema);
const Room = mongoose.model("Room", roomSchema);


//*** Pusher config ***//
const db = mongoose.connection;
db.once('open', () => {
    const roomCollection = db.collection("rooms");
    const changeStream = roomCollection.watch();
    changeStream.on('change', (change) => {
        if(change.operationType === "insert"){
            const roomDetails = change.fullDocument;
            pusher.trigger("rooms", "inserted",
            {
                roomName: roomDetails.roomName,
                messages: roomDetails.messages
            });
        } else if(change.operationType === "update"){
            const messageObj = (Object.values(change.updateDescription.updatedFields))[0];
            pusher.trigger("rooms", "updated", messageObj);
        } else {
            console.log("Error trigger Pusher");
        }
    });
  });

if(process.env.NODE_ENV === "production"){
    app.use(express.static("whatsapp-frontend/build"));

    app.get("/", (req, res)=>{
        res.sendFile(path.join(__dirname, "whatsapp-frontend", "build", "index.html"));
    });

    app.get("/rooms/get", (req, res)=>{
        Room.find((err, roomList)=>{
            if(err){
                res.status(500).send(err);
            } else {
                res.status(200).send(roomList);  
            }
        });
    });

    app.post("/rooms/create", (req, res)=>{
        const room = new Room({
            roomName: req.body.roomName,
            messages: []
        });
        room.save();
    }); 

    app.get("/rooms/:roomId/get", (req, res)=>{
        const id = req.params.roomId;
        Room.findById({_id: id}, (err, foundRoom)=>{
            if(err){
                console.log(err);
            } else {
                res.status(200).send(foundRoom);
            }
            
        })
    })

    app.post("/rooms/:roomId/newMessage", (req, res)=>{
        const _id = req.params.roomId;
        const {name, message, timeStamp} = req.body;
        const messageObj = new Message({
            name: name,
            message: message,
            timeStamp: timeStamp
        });
        Room.findOneAndUpdate(
            {_id: _id}, 
            { $push: { messages: messageObj } },
            function (error) {
                if (error) {
                    console.log(error);
                }
            }
        );
    });
}

const port = process.env.PORT || 9000;
app.listen(port, ()=>{
    console.log("Server started at port : ", port);
})