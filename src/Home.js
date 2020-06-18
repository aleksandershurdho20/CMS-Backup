import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('/api/')
      .then((response) => setUsers(response.data.user))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="">
      {/* <h2>{users.fname}</h2>
      <h2>{users.fname}</h2> */}
      <h4 className="w-100 text-center my-5 text-muted">Please log in</h4>
    </div>
  );
};
export default Home;
