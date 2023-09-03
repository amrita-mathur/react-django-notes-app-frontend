import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    if (userId != undefined)
      sessionStorage.setItem("loggedInUser", JSON.stringify(userId));
  }, [userId]);

  const submitHandler = async (event) => {
    event.preventDefault();
    setError(null);
    if (username === "" || password === "") {
      setError("All fields are required to be filled.");
      return;
    }

    try {
      const res = await axios.get("http://127.0.0.1:8000/users");

      if (res.data) {
        if (
          res.data.find(
            (user) => user.username === username && user.password === password
          )
        ) {
          setUserId(
            res.data.find(
              (user) => user.username === username && user.password === password
            )["id"]
          );
          alert("User Logged In");
          console.log(res.data);
          
          window.location.href = "/notes/";
        } else {
          alert("Username or password is incorrect");
        }
      }
    } catch (err) {
      console.log("Error: " + err.message);
    }
  };
  return (
    <div>
      {error && (
        <Alert key="danger" variant="danger">
          {error}
        </Alert>
      )}

      <Container
        className="my-6"
        style={{
          width: "20rem",
          border: "2px solid grey",
          borderRadius: "10px",
          boxShadow: "2px 0 0 0 grey",
          marginTop: "2rem"
        }}
      >
        <span>
          <h2>
            <span class="material-symbols-outlined">format_list_bulleted</span>
            Notes
          </h2>
        </span>
        <Form>
          <Form.Group
            as={Row}
            className="mb-4 w-76 "
            controlId="formPlaintextName"
          >
            <Col sm="10">
              <Form.Control
                type="text"
                value={username}
                placeholder="User Name ..."
                onChange={(e) => setUserName(e.target.value)}
                required
                className="mx-4 my-4 text-align-center"
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-4 w-76 "
            controlId="formPlaintextName1"
          >
            <Col sm="10">
              <Form.Control
                type="password"
                value={password}
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mx-4 my-4"
              />
            </Col>
          </Form.Group>

          <Button
            variant="secondary"
            type="submit"
            onClick={submitHandler}
            className="mb-3 d-block mx-auto"
          >
            Log In
          </Button>
        </Form>
        <div>
          Don't have an account?
          <Link to={"/users/register/"}>
            <span className="mx-2"> Sign Up</span>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
