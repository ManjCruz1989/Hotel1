import React from "react";
import {useState, useEffect} from "react";
import "../index.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const API_BASE = "http://localhost:3001";

const Manage = () => {
    const [rooms, setRooms] = useState([{}]);
    const [roomName, setRoomName] = useState("");
    const [roomPrice, setRoomPrice] = useState("");
    const [roomDesc, setRoomDesc] = useState("");
    const [roomImages, setRoomImages] = useState("");
    const [uptRoomTitle, setUptRoom] = useState("");
    const [uptRoomPrice, setUptRoomPrice] = useState("");
    const [uptRoomDesc, setUptRoomDesc] = useState("");
    const [uptRoomImages, setUptRoomImages] = useState("");
    const [uptRoomAvail, setUptRoomAvail] = useState();
    const [roomId, setRoomId] = useState("");
    const [checked, setChecked] = useState();
    const [ok, setOk] = useState();
    const [target, setTarget] = useState();



    useEffect(()=>{
        GetRooms();
   
    
       }, [])
   
       const GetRooms = async () => {
           await fetch(API_BASE + "/rooms")
           .then(res => res.json())
           .then(data => setRooms(data))
           .catch(err => console.error("Error: ", err));
        
       };


       const createRoom = (event) => {
      axios.post("http://localhost:3001/new-room", {
        title: roomName,
        price: roomPrice,
        desc: roomDesc,
        images: roomImages
      })
      event.preventDefault()
      window.location.reload(false);
       };

       const updateRoom = (id) => {
        axios.put("http://localhost:3001/update-rooms" , {
            id: roomId, 
            uptRoom: uptRoomTitle,
            uptPrice: uptRoomPrice,
            uptDesc: uptRoomDesc,
            uptImage: uptRoomImages,
            uptAvail: uptRoomAvail,
        })
        window.location.reload(false);
       
         };

        const deleteRoom =  async id => {
            await fetch(API_BASE + "/delete-rooms/" + id, {method: "DELETE"})
            .then(res => res.json());
    
            window.location.reload(false);
        };
      
      
        const button1Active = () => {
            if(roomName.length === 0 || roomPrice.length === 0 || roomDesc.length === 0){
            return true;}
                }  

       const button2Active = (i) => {
        if(uptRoomTitle.length === 0 || uptRoomPrice.length === 0 || uptRoomDesc.length === 0){
        return true;}else if(i===target){
         return false;
        }else{
            return true;
        }
            };

        const handleChange = (i) => {
                setChecked(i);
                setOk(!ok)
                if(ok === true){
                setUptRoomAvail(true)
                }else{
                setUptRoomAvail(false)    
                };
              };

              

        const checkBox = (i) => {
            if(i === checked){
            
            return ok};
        }     
        
       

   return (
    <div className = "background">
    
    <div className="content">
     <div className="manage-title"><h1>Hotel Rooms</h1></div>
     <div className="create">
        <h2>Create Room</h2>
        <form className="createForm">
        <h5 className="fields">* Please Enter all Fields Before Submitting</h5>
       <input className="inputs" type="text" placeholder="Room name" onChange={(event) => {setRoomName(event.target.value)}}></input>
       
       <input className="inputs" type="text" placeholder="Room Price" onChange={(event) => {setRoomPrice(event.target.value)}}></input>
      
       <input className="inputs" type="text" placeholder="Room description" onChange={(event) => {setRoomDesc(event.target.value)}}></input>

       <input className="inputs" type="text" placeholder="Room image URL" onChange={(event) => {setRoomImages(event.target.value)}}></input>
     
       
       <button type="submit" disabled = {button1Active() ? "disabled" : ""} onClick={createRoom}>Submit</button>
       </form>
     </div>
     <div className="container">
     
     <Row>{
                rooms.map((room, i) => (<Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1% 1%'}}>
     <Card>
     <Card.Body >
     <div id={i}>
     <h4 className="fields">* Please Enter all Fields Before Submitting</h4>
     
     <h3 style={{fontWeight: 400, fontSize: '1rem'}}>Room name: {room.title}</h3>
     <input type="text" placeholder="Room name" onChange={(event) => {setUptRoom(event.target.value); setRoomId(room._id)}}></input> 
     
     <h4 style={{fontWeight: 400, fontSize: '1rem'}}>Price: £{room.price}</h4>
     <input type="text" placeholder="Room Price" onChange={(event) => {setUptRoomPrice(event.target.value)}} ></input> 
     
     <h4 style={{fontWeight: 400, fontSize: '1rem'}}>Description: {room.desc}</h4>
     <input type="text" placeholder="Room description" onChange={(event) => {setUptRoomDesc(event.target.value); setTarget(i)}}></input>

     <h4 style={{fontWeight: 400, fontSize: '1rem'}}>Image Url: {room.images}</h4>
     <input type="text" placeholder="Room Image URL" onChange={(event) => {setUptRoomImages(event.target.value)}}></input>
     
     <h4 style={{fontWeight: 500, fontSize: '1rem'}}>Availability: {room.available ? "Available" : "Unavailable"}</h4>
     <h4 style={{fontWeight: 400, fontSize: '1rem'}}>Tick box to make unavailable</h4>
     <input type="checkbox" checked={checkBox(i) ? true : false} onChange={()=> handleChange(i)}></input> 
    <br/>
    <div className="button-box"><button type="submit" className="updateButton" onClick={()=>updateRoom()} disabled = { button2Active(i) ? "disabled" : ""} >Update Room Details</button></div>
    <Button className="delete-button" onClick={()=>deleteRoom(room._id)}>Delete
     </Button>
     
     </div>
     </Card.Body>
     </Card>
        </Col>     ) )}</Row>
     
              
    </div>
    
   
    </div>
            
    </div>
    
  
    
  )
};

export default Manage;


