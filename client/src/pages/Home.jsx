import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import '../styles/home.css';

function Home() {
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user?.id) {
        try {
          const res = await axios.get(`http://localhost:5000/api/user/${user.id}`);
          setUserDetails(res.data);
        } catch (err) {
          console.error('Failed to fetch user details:', err);
        }
      }
    };
    fetchUserDetails();
  }, [user]);

  if (!userDetails) return <p>Loading your details...</p>;

  return (
  <div className="home-container">
    <h2 className="home-title">Welcome, {userDetails.name}</h2>
    <p className="home-detail"><strong>Username:</strong> {userDetails.username}</p>
    <p className="home-detail"><strong>Email:</strong> {userDetails.email}</p>
    <p className="home-detail"><strong>Mobile No:</strong> {userDetails.mobileno}</p>
    <p className="home-detail"><strong>Description:</strong> {userDetails.description}</p>
  </div>
);

}

export default Home;
