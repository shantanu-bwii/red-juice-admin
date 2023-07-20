import React, { useEffect, useState } from 'react';
import axios from 'axios';
<link href="https://fonts.googleapis.com/css2?family=Mr+Dafoe&family=Poppins&display=swap" rel="stylesheet"></link>





const App = () => {
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [whitelistedAddresses, setWhitelistedAddresses] = useState([]);

  const handleLogin = () => {
    // Replace 'admin' with your desired password
    if (password === 'admin') {
      setLoggedIn(true);
    } else {
      alert('Invalid password!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      address: address,
      name: name
    };
  
    axios.post('https://redjuice-api.onrender.com/api/v1', data)
      .then(response => {
        console.log('Post request successful:', response.data);
        // Reset the form
        setName('');
        setAddress('');
        fetchData();
      })
      .catch(error => {
        console.error('Error posting data: ', error);
      });
  };

  const fetchData = () => {
    axios.get('https://redjuice-api.onrender.com/api/v1')
      .then((res) => {
        setWhitelistedAddresses(res.data);
        console.log('res ==> '+res.data);
      })
      .catch(error => {
        console.error('Error getting data: ', error);
      })
  }

  const handleDelete = (address) => {
    axios.delete(`https://redjuice-api.onrender.com/api/v1/`+address)
      .then(response => {
        console.log('Delete request successful:', response.data);
        const updatedAddresses = whitelistedAddresses.filter(item => item.address !== address);
        setWhitelistedAddresses(updatedAddresses);
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [])
  

  if (!loggedIn) {
    return (

      <div className="background_121">
      <div>
          <div>
            <div className="login_panel_box11">
        <div>
          <h1 className="mainheading_11">Admin Login</h1>
        </div>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/>
        <button onClick={handleLogin}>Login</button>
        </div>
        </div>
      
      </div>
      </div>
    );
  }

  return (
    <div className="background_121">
    <div>
        <div className="container">
          <div className="row">
              <div className="col-lg-6">
      <div className="dashboard_box_2233">
      <h1 className="mainheading_1122">Admin Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required  
        /><br/>
        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      </div>
      </div>

      <div className="col-lg-6">
      <div className="dashboard_box_2233">
      <div>
        <h2 className="mainheading_1122">Whitelisted Addresses</h2>
        <table className="tableitems">
          <tr className="">
            <th>Address</th>
            <th>Name</th>
            <th>Delete</th>
          </tr>

          {Array.isArray(whitelistedAddresses) ? (
            whitelistedAddresses.map((item) => (
              <tr>
                <td>{item.address.slice(0,5)}...{item.address.slice(-5)}</td>
                <td>{item.name}</td>
                <td><button onClick={() => handleDelete(item.address)}>Delete</button></td>
              </tr>
            ))
          ) : (
            <p>No whitelisted addresses available.</p>
          )}
        </table>
      </div>
      </div>
    </div>
    </div>
    </div>
    </div>
    
    </div>
  );
};

export default App;
