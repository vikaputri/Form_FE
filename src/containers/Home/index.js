import React, { useState, useEffect} from "react";
import axios from 'axios';
import {Modal, Button} from 'react-bootstrap'; 

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
  
  const [datas, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const onDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/data/${id}`).then(()=> {
      setShow2(false)
      window.location.reload(false);
    })
  }

  const onView = (id) => {
    setShow(true)
    axios.get(`http://127.0.0.1:8000/data/${id}`).then((res) => {
      setData1(res.data);
    });
  }

  useEffect(() => {
    const getApi = async () => {
      try {
        await axios
        .get('http://127.0.0.1:8000/data')
          .then((res) => {
            setData(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getApi();
  }, []);

  return (
    <header className="py-5 px-5">
      <div className="d-flex justify-content-center">
        <h1 className="mb-5">Form</h1>
      </div>
      <button type="button" className="btn btn-primary btn-lg mb-5">Add New Form</button>
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
          {datas.map((data) => {
            return (
              <tr key={data.id}>
                <th scope="row">{data.name}</th>
                <td>{data.identification_number}</td> 
                <td>{data.email}</td>
                <td>{data.date_of_birth}</td>
                <td>
                  <button className="btn btn-info" onClick={() => onView(data.id)}>View</button>
                  <Modal show={show1} onHide={modalView}>  
                    <Modal.Header>  
                      <Modal.Title>Update Data</Modal.Title>  
                    </Modal.Header>  
                    <Modal.Body> 
                      <div className="form-group">
                        <label for="first_name">Name</label>
                        <input className="form-control" type="text" name="name"/>
                      </div> 
                      <div className="form-group">
                        <label for="identity_number">Identity Number</label>
                        <input className="form-control" type="text" name="identity_number"/>
                      </div> 
                      <div className="form-group">
                        <label for="email">Email</label>
                        <input className="form-control" type="text" name="email"/>
                      </div>
                      <div className="form-group">
                        <label for="date_of_birth">Date of Birth</label>
                        <input className="form-control" type="text" name="date_of_birth"/>
                      </div>
                    </Modal.Body>  
                    <Modal.Footer>
                      <Button variant="success">Update</Button> 
                      <Button variant="secondary" onClick={modalClose1}>Close</Button>  
                    </Modal.Footer>  
                  </Modal>  

                  <button style={{marginLeft: "10px"}} className="btn btn-warning" onClick={modalUpdate}>Update</button>
                  <Modal show={show} onHide={modalUpdate}>  
                    <Modal.Header>  
                      <Modal.Title>Data Detail</Modal.Title>  
                    </Modal.Header>  
                    <Modal.Body>
                    <table className="table">
                      <tbody>
                        <tr>
                          <th scope="row">Name</th>
                          <td>:</td>
                          <td>{data1.name}</td>
                        </tr>
                        <tr>
                          <th scope="row">Identity Number</th>
                          <td>:</td>
                          <td>{data1.identification_number}</td>
                        </tr>
                        <tr>
                          <th scope="row">Email</th>
                          <td>:</td>
                          <td>{data1.email}</td>
                        </tr>
                        <tr>
                          <th scope="row">Date of Birtday</th>
                          <td>:</td>
                          <td>{data1.date_of_birth}</td>
                        </tr>
                      </tbody>
                    </table>
                    </Modal.Body>  
                    
                    <Modal.Footer>  
                      <Button variant="primary" onClick={modalClose}>Close</Button>  
                    </Modal.Footer>  
                  </Modal> 

                  <button style={{marginLeft: "10px"}} className="btn btn-danger" onClick={modalDelete}>Delete</button>
                  <Modal show={show2} onHide={modalDelete}>  
                    <Modal.Header>  
                      <Modal.Title>Delete Confirm</Modal.Title>  
                    </Modal.Header>
                    <Modal.Body>  
                      <p className="font-weight-bold mb-2">Do you really want to delete these records?</p>
                      <p className="text-muted ">This process cannot be undone.</p>
                    </Modal.Body>  
                    <Modal.Footer>
                      <Button variant="secondary" onClick={modalClose2}>Cancel</Button>  
                      <Button variant="danger" onClick={() => onDelete(data.id)}>Delete</Button>  
                    </Modal.Footer>  
                  </Modal>  
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </header>
  );
}

export default Home;