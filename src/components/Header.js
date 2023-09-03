import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {

  const logoutHandler = () => {
    sessionStorage.removeItem("loggedInUser")
    window.location.href = "/"
  }
  return (
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/notes/">
    <span class="material-symbols-outlined">format_list_bulleted</span>
      <span style={{fontSize: "2rem"}}>Notes</span></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
        <li class="nav-item">
          <a class="nav-link" href="/create/">Create Note</a>
        </li>
        
        
     
        
      </ul>
      
    </div>
    <button class="btn btn-outline-success float-end" type="submit" onClick={logoutHandler}>Log Out</button>
  </div>
</nav>
    </div>
  )
}

export default Header