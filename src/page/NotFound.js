

// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='NotFound'>

      <div >
      <i class="fa-solid fa-4"></i>
      <i class="fa-solid fa-0"></i>
      <i class="fa-solid fa-4"></i>
      </div>
      <h3>Sorry, the page you are looking for does not exist. <br/> </h3>
      <h4>  <Link to="/Product">Go Shopping</Link></h4>
     
    </div>
  );
};

export default NotFound;
