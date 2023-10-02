import React, { useState, useEffect} from "react";
import axios from 'axios';
import {Modal, Button} from 'react-bootstrap';
import validator from 'validator'; 
import Swal from 'sweetalert2';

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
  const [data2, setData2] = useState({
    name: '', 
    identification_number: '', 
    email: '', 
    date_of_birth: ''
  });

  const [nameError, setNameError] = useState({ message: '', status: false });
	const [identificationNumberError, setIdentificationNumberError] = useState({ message: '', status: false });
  const [emailError, setEmailError] = useState({ message: '', status: false });
  const [dateOfBirthError, setDateOfBirthError] = useState({ message: '', status: false });

  const validatorIdentificationNumber = new RegExp("[0-9]{12}");
  const validatorDateOfBirth = new RegExp("[0-9]{4}-[0-9]{2}-[0-9]{2}");
  const validationName = new RegExp("[A-Za-z]$");

  const handleChange = (e, type) => {
    if (type === 'name') {
      if (e.target.value === '') {
        setNameError({ message: 'Name Cannot be Empty', status: false });
      } else {
        if (validationName.test(e.target.value)) {
          setNameError({ message: 'Name is Correct', status: true });
        } else {
          setNameError({ message: 'Name is Wrong', status: false });
        }
      }
      setData2({ ...data2, name: e.target.value });
    } else if (type === 'identification_number') {
      if (e.target.value === '') {
        setIdentificationNumberError({ message: 'Identification Number Cannot be Empty', status: false });
      } else if (e.target.value.length < 12){
        setIdentificationNumberError({ message: 'Identification Number Must be Complete', status: false });
      } else{
        if (validatorIdentificationNumber.test(e.target.value)) {
          setIdentificationNumberError({ message: 'Identification Number is Correct', status: true });
        } else {
          setIdentificationNumberError({ message: 'Identification Number does not Match the Format', status: false });
        }
      }
      setData2({ ...data2, identification_number: e.target.value });
    } else if (type === 'email') {
      if (e.target.value === '') {
        setEmailError({ message: 'Email Cannot be Empty', status: false });
      } else{
        if (validator.isEmail(e.target.value)) {
          setEmailError({ message: 'Email is Correct', status: true });
        } else {
          setEmailError({ message: 'Email is does not Match the Format', status: false });
        }
      }
      setData2({ ...data2, email: e.target.value });
    } else if (type === 'date_of_birth') {
      if (e.target.value === '') {
        setDateOfBirthError({ message: 'Date Of Birth Cannot be Empty', status: false });
      } else if (e.target.value.length < 10){
        setDateOfBirthError({ message: 'Date Of Birth Must be Complete', status: false });
      } else{
        if (validatorDateOfBirth.test(e.target.value)) {
          setDateOfBirthError({ message: 'Date Of Birth is Correct', status: true });
        } else {
          setDateOfBirthError({ message: 'Date Of Birth does not Match the Format', status: false });
        }
      }
      setData2({ ...data2, date_of_birth: e.target.value });
    }
  };
  
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/data`, data2)
      .then((response) => {
        setShow3(false)
        window.location.reload(false);
      })
      .catch((error) => {
        Swal.fire({
          title: 'Failed to Save Data!',
          text: 'Name, email, or identification number already exists',
          icon: 'error',
          confirmButtonText: 'Create Form Again',
        });
      });
    } catch (e) {
      Swal.fire({
        title: 'Failed to Save Data!',
        text: 'Network Error!',
        icon: 'error',
        confirmButtonText: 'Create Form Again',
      });
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
                    value={data2.name}
                    placeholder="Name"
                    onChange={(e) => handleChange(e, 'name')}
                  />
                  {nameError.status ? 
                    null : <p className="mb-0 text-sm text-danger">{nameError.message}</p>
                  }
                </div>
              </div> 
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Identity Number</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="text"
                    name="identification_number"
                    placeholder="identification number (12 digit) ex: 110101000001"
                    value={data2.identification_number}
                    onChange={(e) => handleChange(e, 'identification_number')}
                  />
                  {identificationNumberError.status ? 
                    null : <p className="mb-0 text-sm text-danger">{identificationNumberError.message}</p>
                  }
                </div>
              </div> 
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Email</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    value={data2.email}
                    placeholder="email"
                    onChange={(e) => handleChange(e, 'email')}
                  />
                  {emailError.status ? 
                    null : <p className="mb-0 text-sm text-danger">{emailError.message}</p>
                  }
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">Date of Birth</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="text"
                    name="date_of_birth"
                    placeholder="date of birth ex: 2000-01-01"
                    value={data2.date_of_birth}
                    onChange={(e) => handleChange(e, 'date_of_birth')}
                  />
                  {dateOfBirthError.status ? 
                    null : <p className="mb-0 text-sm text-danger">{dateOfBirthError.message}</p>
                  }
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