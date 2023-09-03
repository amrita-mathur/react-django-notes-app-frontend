import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";

const CreateNote = () => {
  let [note, setNote] = useState([]);
  const textInput = useRef(null);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))

  const handleSubmit = () => {
    const text = textInput.current.value;

    const save = async () => {
      let headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.post(`http://127.0.0.1:8000/notes/add/`, {
        headers,
        body: text,
        userId: parseInt(loggedInUser)
      });
    };

    save();
    navigate("/notes/");
  };  
    
  
  

  return (
      <div className="container w-75 ">
        <textarea
          className="my-5 mx-auto d-block"
          style={{textAlign: "center", boxShadow: "10px 2px 2px solid gray" }}
          ref={textInput}
          cols={50}
          rows={15}
        ></textarea>
        <button onClick={handleSubmit} className="mx-auto d-block">Save</button>
        
      </div> 
  );
};

export default CreateNote;
