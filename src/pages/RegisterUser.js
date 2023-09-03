import React, { useState } from "react";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import axios from 'axios';


const RegisterPage = () => {
  const [name, setName] = useState("");  
  const [username, setUserName] = useState("");  
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  
  const [confirmPassword, setConfirmPassword] = useState("");  
  const [error, setError] = useState("");

  const submitHandler = (event) => {

    event.preventDefault();
    setError(null);
    if(name === "" || username === "" || email === "" || password === "" || confirmPassword === ""){
      setError("All fields are required to be filled.");
      return;
    }

    // let users = JSON.parse(localStorage.getItem("users"));

    // if (users == null){
    //   users = {};
    //   var userId = 1;
    // }
    // else{
    //   var userId = Object.keys(users).length + 1;

    // }


    const newUser = {
     
      name,
      username,
      email,
      password
    };

    console.log(newUser);

    axios.post("http://127.0.0.1:8000/users/add/", newUser)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    window.location.href = "/"
  }

  return (
    <div>
      <Container className="w-75">
       
        {error && <Alert key="danger" variant="danger">
          {error}
        </Alert> }
        <Form>
          <Form.Group as={Row} className="mb-4 my-4" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" value={name} placeholder="Enter Name..." onChange={(e)=>setName(e.target.value)} required className="mx-4"/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextUsername">
            <Form.Label column sm="2">
              User Name
            </Form.Label>
            <Col sm="10">
              <Form.Control placeholder="Enter User Name..." value={username} onChange={(e)=>setUserName(e.target.value)} required className="mx-4"/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control type="email" placeholder="Enter Email..." onChange={(e)=>setEmail(e.target.value)} value={email} required className="mx-4"/>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            
          >
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} required className="mx-4"/>
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            
          >
            <Form.Label column sm="2">
              Confirm Password
            </Form.Label>
            <Col sm="10">
              <Form.Control type="password" placeholder="Password" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} required className="mx-4"/>
            </Col>
          </Form.Group>
          <Button variant="primary" onClick={submitHandler} className="m-auto">Submit</Button>
        </Form>
      </Container>
    </div>
  );
};

export default RegisterPage;
