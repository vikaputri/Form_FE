import React, { useState, useEffect} from "react";
import axios from 'axios';
import {Modal, Button} from 'react-bootstrap'; 

const Home = () => {
  const [show, setShow] = useState(false);  
  const [show1, setShow1] = useState(false);  
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);   

  const modalClose = () => setShow(false); 
  const modalClose1 = () => setShow1(false);  
  const modalClose2 = () => setShow2(false);
  const modalClose3 = () => setShow3(false);   

  const modalView = () => setShow(true); 
  const modalUpdate = () => setShow1(true); 
  const modalDelete= () => setShow2(true);
  const modalAdd= () => setShow3(true);
  
  const [datas, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [identity_number, setIdentityNumber] = useState([]);
  const [date_of_birth, setDateOfBirth] = useState([]);
  
  const onSubmit = async (e) => {
    e.preventDefault()
    const post = { name: name, identification_number:identity_number, email: email, date_of_birth:date_of_birth }
    try {
      await axios.post('http://127.0.0.1:8000/data', post)
      setShow3(false)
      window.location.reload(false);
    } catch (e) {
      alert('Gagal Menyimpan Data')
    }
  }

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
      <div className="mb-5 px-4">
        <button type="button" className="btn btn-primary btn-lg" onClick={modalAdd}>Add New Form</button>
        <Modal show={show3} onHide={modalAdd}>  
          <Modal.Header>  
            <Modal.Title>Tambah Data</Modal.Title>  
          </Modal.Header>  
          <Modal.Body>
            <form onSubmit={onSubmit}>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Name</label>
                <div className="col-sm-8">
                  <input
                    className="form-control" 
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div> 
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Identity Number</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="text"
                    name="identity_number"
                    value={identity_number}
                    onChange={(e) => setIdentityNumber(e.target.value)}
                  />
                </div>
              </div> 
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Email</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Date of Birth</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="text"
                    name="date_of_birth"
                    value={date_of_birth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>
              </div>
              <Modal.Footer>
                <button type="submit" className="btn btn-primary">Save</button>
                <Button variant="danger" onClick={modalClose3}>Cancel</Button>  
              </Modal.Footer> 
            </form>
          </Modal.Body>   
        </Modal>  
      </div>
      <div className="container table-responsive"> 
        <table className="table">
          <thead>
            <tr className="table-dark">
              <td>Name</td>
              <td>Identity Number</td>
              <td>Email</td>
              <td>Date of Birtday</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {datas.map((data) => {
              return (
                <tr key={data.id}>
                  <td>{data.name}</td>
                  <td>{data.identification_number}</td> 
                  <td>{data.email}</td>
                  <td>{data.date_of_birth}</td>
                  <td>
                    <button className="btn btn-info" onClick={() => onView(data.id)}>View</button>
                    <Modal show={show} onHide={modalView}>  
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

                    <button style={{marginLeft: "10px"}} className="btn btn-warning" onClick={modalUpdate}>Update</button>
                    <Modal show={show1} onHide={modalUpdate}>  
                      <Modal.Header>  
                        <Modal.Title>Update Data</Modal.Title>  
                      </Modal.Header>  
                      <Modal.Body> 
                        <div className="mb-3 row">
                          <label for="name" class="col-sm-4 col-form-label">Name</label>
                          <div class="col-sm-8">
                            <input className="form-control" type="text" name="name"/>
                          </div>
                        </div> 
                        <div className="mb-3 row">
                          <label for="identity_number" class="col-sm-4 col-form-label">Identity Number</label>
                          <div class="col-sm-8">
                            <input className="form-control" type="text" name="identity_number"/>
                          </div>
                        </div> 
                        <div className="mb-3 row">
                          <label for="email" class="col-sm-4 col-form-label">Email</label>
                          <div class="col-sm-8">
                            <input className="form-control" type="text" name="email"/>
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <label for="date_of_birth" class="col-sm-4 col-form-label">Date of Birth</label>
                          <div class="col-sm-8">
                            <input className="form-control" type="text" name="date_of_birth"/>
                          </div>
                        </div>
                      </Modal.Body>  
                      <Modal.Footer>
                        <Button variant="success">Update</Button> 
                        <Button variant="secondary" onClick={modalClose1}>Close</Button>  
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
      </div>
    </header>
  );
}

export default Home;