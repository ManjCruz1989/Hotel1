import express from "express";
import ("dotenv").config();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(express.json());


app.use(
    express.urlencoded({ extended: true })
);
app.use(bodyParser.json())

app.use(cors());
dotenv.config();


mongoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("connected to DB"))
.catch(console.error);



import Room from "./rooms.js"




app.get("/rooms", async (req,res)=>{
   try{ const roomsAvailable = await Room.find();
    res.status(200).json(roomsAvailable)
   }catch(err){
    next(err);
   }
 });


app.post("/new-room", async(req,res,next) => {

const titleC = req.body.title;
const priceC = req.body.price;
const descC = req.body.desc;
const imagesC = req.body.images;

    const addRoom = new Room({
        title: titleC,
        price: priceC,
        desc: descC,
        image: imagesC

    })
    try{
        const savedRoom = await addRoom.save()
        res.status(200).json(savedRoom)
    }catch(err){
        next(err);

    }
});

/*app.put("/update-rooms/:id", async(req,res,next)=> {
    const ident = req.params.id;
    const titleC = req.body.uptRoom;
   try{
     const updateRoom = await Room.findByIdAndUpdate(ident, {$set: {title: titleC}}, err);
     res.status(200).json(updateRoom);
     await Room.save();
        
    }catch(err){
        next(err)
    }
});*/



app.put("/update-rooms", async(req,res,next) => {

    const titleU = req.body.uptRoom;
    const id = req.body.id;
    const priceU = req.body.uptPrice;
    const descU = req.body.uptDesc;
    const imageU = req.body.uptImage;
    const availU = req.body.uptAvail;
    
    try{
            Room.findById(id, (err, updatedRoom)=>{
                updatedRoom.title = titleU;
                updatedRoom.price = priceU;
                updatedRoom.desc = descU;
                updatedRoom.image = imageU;
                updatedRoom.available = availU;
                
                updatedRoom.save();
                res.send("updated")
            })
        }catch(err){
            next(err);
    
        }
    });



app.delete("/delete-rooms/:id", async(req,res,next) => {

    try{
        await Room.findByIdAndDelete(req.params.id)
        res.status(200).json("Room has been deleted")
    }catch(err){
        next(err);

    }
}
);


app.listen(3001, () => {
    console.log(`server started on port 3001`)
  });