import React, { useState, useEffect} from "react";
import axios from 'axios';
import {Modal, Button} from 'react-bootstrap'; 

const Home = () => {
  const [show, setShow] = useState(false);   
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);   

  const modalClose = () => setShow(false); 
  const modalClose2 = () => setShow2(false);
  const modalClose3 = () => setShow3(false);   

  const modalView = () => setShow(true);  
  const modalDelete= () => setShow2(true);
  const modalAdd= () => setShow3(true);
  
  const [datas, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [identity_number, setIdentityNumber] = useState('');
  const [date_of_birth, setDateOfBirth] = useState('');
  
  const onSubmit = async (e) => {
    e.preventDefault()
    const post = { name: name, identification_number:identity_number, email: email, date_of_birth:date_of_birth }
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/data`, post)
      setShow3(false)
      window.location.reload(false);
    } catch (e) {
      alert('Gagal Menyimpan Data. Name, email, atau identification number sudah ada')
    }
  }

  const onDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/data/${id}`).then(()=> {
      setShow2(false)
      window.location.reload(false);
    })
  }

  const onView = (id) => {
    setShow(true)
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/data/${id}`).then((res) => {
      setData1(res.data);
    });
  }

  useEffect(() => {
    const getApi = async () => {
      try {
        await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/data`)
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
                    required
                    value={name}
                    placeholder="Name"
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
                    required
                    name="identity_number"
                    placeholder="identification number (12 digit) ex: 110101000001"
                    value={identity_number}
                    pattern="[0-9]{12}"
                    onChange={(e) => setIdentityNumber(e.target.value)}
                  />
                </div>
              </div> 
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Email</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    required
                    type="text"
                    name="email"
                    value={email}
                    placeholder="email"
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
                    required
                    name="date_of_birth"
                    placeholder="date of birth ex: 2000-01-01"
                    value={date_of_birth}
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
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