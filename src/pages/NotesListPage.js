import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";

const NotesListPage = () => {
  let [notes, setNotes] = useState([]);
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
 
  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.get(`http://127.0.0.1:8000/notes/`, {
      headers,
    });
    if(response.data){
      if(response.data.find((notes)=> notes.userId == loggedInUser )){
        setNotes(response.data.filter((notes)=> notes.userId == loggedInUser));

      }
      else{
        console.log("No notes of the logged in user")
      }
    }
    
  };

  const deleteHandler = (pk) => {
    axios
    .delete(`http://127.0.0.1:8000/notes/${pk}/delete/`)
    .then((response) => {
      console.log(`Deleted post with ID ${pk}`);
    })
    .catch((error) => {
      console.error(error);
    });

    window.location.href = "/notes/"
          
  }
  
  
  return (
    <div className="container mt-5" style={{width:"40rem"}}>
      {notes.map((note) => (
        <div class="card my-5 w-75 mx-auto" key={note.id}>
          <div class="card-body d-flex flex-column">
            <div>{note.body}</div>
            <div class="my-3">
              <Link to={`/note/${note.id}`}>
                <button class="btn btn-success" style={{ margin: "auto" }}>
                  Read
                </button>
              </Link>
              <button class="btn btn-success" style={{margin: "0.5rem"}} onClick={()=> deleteHandler(note.id)}>Delete</button> 
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesListPage;
