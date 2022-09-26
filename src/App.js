import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom"
import Home from "./pages/home";
import Room from "./pages/rooms.js";
import Manage from "./pages/manage";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './footer.js';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <>
      <Navbar bg="dark" variant="dark">
        <Container style={{marginLeft: "0"}}>
          <Navbar.Brand as={Link} to="/">Hotel</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/our-rooms" >Rooms</Nav.Link>
            <Nav.Link as={Link} to="/manage">Manage</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </>
      <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/our-rooms" element={<Room />}/>
        <Route path="/manage" element={<Manage />}/> 
      </Routes>

      </div>
      </div>
      <Footer />
      </BrowserRouter>
    
  );
}

export default App;
