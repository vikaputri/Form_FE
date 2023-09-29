import React, { useState }  from "react";
import {Modal, Button} from 'react-bootstrap';  
import "../../index.css";

const Home = () => {
  const [show, setShow] = useState(false);  
  const [show1, setShow1] = useState(false);  
  const [show2, setShow2] = useState(false);  

  const modalClose = () => setShow(false); 
  const modalClose1 = () => setShow1(false);  
  const modalClose2 = () => setShow2(false);   

  const modalView = () => setShow(true); 
  const modalUpdate = () => setShow1(true); 
  const modalDelete= () => setShow2(true); 

  return (
    <header className="py-5 px-5">
      <div className="d-flex justify-content-center">
        <h1 className="mb-5">Form</h1>
      </div>
      <button type="button" class="btn btn-primary btn-lg mb-5">Add New Form</button>
      <table className="table">
        <thead>
          <tr className="table-dark">
            <th scope="col">Name</th>
            <th scope="col">Identity Number</th>
            <th scope="col">Email</th>
            <th scope="col">Date of Birtday</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">Vika</th>
          <td>3326115101000002</td> 
          <td>vikaputriariyanti@gmail.com</td>
          <td>1 Januari 2000</td>
          <td>
            <button className="btn btn-info" onClick={modalView}>View</button>
            <button style={{marginLeft: "10px"}} className="btn btn-warning" onClick={modalUpdate}>Update</button>
            <button style={{marginLeft: "10px"}} className="btn btn-danger" onClick={modalDelete}>Delete</button>
          </td>
        </tr>
        </tbody>
      </table>

      <Modal show={show} onHide={modalUpdate}>  
        <Modal.Header>  
          <Modal.Title>Data Detail</Modal.Title>  
        </Modal.Header>  
        <Modal.Body>
        <table class="table">
          <tbody>
            <tr>
              <th scope="row">Name</th>
              <td>:</td>
              <td>Vika</td>
            </tr>
            <tr>
              <th scope="row">Identity Number</th>
              <td>:</td>
              <td>3326115101000002</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>:</td>
              <td>vikaputriariyanti@gmail.com</td>
            </tr>
            <tr>
              <th scope="row">Date of Birtday</th>
              <td>:</td>
              <td>1 Januari 2000</td>
            </tr>
          </tbody>
        </table>
        </Modal.Body>  
        
        <Modal.Footer>  
          <Button variant="primary" onClick={modalClose}>Close</Button>  
        </Modal.Footer>  
      </Modal> 

      <Modal show={show1} onHide={modalView}>  
        <Modal.Header>  
          <Modal.Title>Update Data</Modal.Title>  
        </Modal.Header>  
        <Modal.Body> 
          <div class="form-group">
					  <label for="first_name">Name</label>
					  <input class="form-control" type="text" name="name"/>
				  </div> 
          <div class="form-group">
					  <label for="identity_number">Identity Number</label>
					  <input class="form-control" type="text" name="identity_number"/>
				  </div> 
          <div class="form-group">
					  <label for="email">Email</label>
					  <input class="form-control" type="text" name="email"/>
				  </div>
				  <div class="form-group">
					  <label for="date_of_birth">Date of Birth</label>
					  <input class="form-control" type="text" name="date_of_birth"/>
				  </div>
        </Modal.Body>  
        <Modal.Footer>
          <Button variant="success">Update</Button> 
          <Button variant="secondary" onClick={modalClose1}>Close</Button>  
        </Modal.Footer>  
      </Modal>  

      <Modal show={show2} onHide={modalDelete}>  
        <Modal.Header>  
          <Modal.Title>Delete Confirm</Modal.Title>  
        </Modal.Header>
        <Modal.Body>  
          <p class="font-weight-bold mb-2">Do you really want to delete these records?</p>
          <p class="text-muted ">This process cannot be undone.</p>
        </Modal.Body>  
        <Modal.Footer>
          <Button variant="secondary" onClick={modalClose2}>Cancel</Button>  
          <Button variant="danger">Delete</Button>  
        </Modal.Footer>  
      </Modal>  
    </header>
  );
}

export default Home;