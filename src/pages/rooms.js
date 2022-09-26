import React from "react";
import {useState, useEffect} from "react";
import "../index.css";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';




const API_BASE = "http://localhost:3001";

const Room = () => {

    const [rooms, setRooms] = useState([{}]);

    useEffect(()=>{
        GetRooms();
   
    
       }, [])
   
       const GetRooms = async () => {
           await fetch(API_BASE + "/rooms")
           .then(res => res.json())
           .then(data => setRooms(data))
           .catch(err => console.error("Error: ", err));
        
       };

       

  return (
    <div className = "background">

    <div className="content">
     <h1>Hotel Rooms</h1>
     <div>
     <Row>
     {
                rooms.map(room => (<Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1% 1%'}}>
                  <Card key={room._id} style={{ width: '20rem', height: '25rem' }}>
      <Card.Img variant="top" src={room.image} />
      <Card.Body>
        <Card.Title>{room.title}</Card.Title>
        <Card.Text style={{ height: '3rem' }}>
         {room.desc}
        </Card.Text>
        <Card.Text>
         £{room.price} per night
         </Card.Text>
        {room.available ? "Available" : "Unavailable"}
      </Card.Body>
    </Card>
    </Col>
    
                ))}
                </Row>
                </div>
                
    
    </div>
    </div>
    
  
    
  )
};

export default Room;