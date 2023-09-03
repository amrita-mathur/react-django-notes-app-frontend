import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";

const NotePage = () => {
  const { id } = useParams();
  let [note, setNote] = useState([]);
  const textInput = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getNote();
  }, [id]);

  const handleSubmit = () => {
    const text = textInput.current.value;

    const save = async () => {
      if(text === ""){
        deleteHandler()
        return
      }  
      let headers = {
        "Content-Type": "application/json",
      };
      await axios.put(`http://127.0.0.1:8000/notes/${id}/update/`, {
        headers,
        body: text,
      });
    };

    save();
    navigate("/notes/");
  };

  let getNote = async () => {
    let headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.get(`http://127.0.0.1:8000/notes/${id}`, {
      headers,
    });

    setNote(response.data);
  };
  
  const deleteHandler = () => {
    axios
    .delete(`http://127.0.0.1:8000/notes/${id}/delete/`)
    .then((response) => {
      console.log(`Deleted post with ID ${id}`);
    })
    .catch((error) => {
      console.error(error);
    });

    window.location.href = "/notes/"
          
          }   
    

  

  return (
      <div className="container w-75 ">
        <textarea
          defaultValue={note?.body}
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

export default NotePage;
