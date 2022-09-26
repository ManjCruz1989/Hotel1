import mongoose from 'mongoose';
const {Schema} = mongoose;

const RoomSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    desc:{
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    image:{
        type: String,
        required: true
    }
    
});
    

export default mongoose.model("Room", RoomSchema)