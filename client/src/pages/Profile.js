import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../shopkeeper.css";
import Layout from "../components/Layout";

function Profile() {

  const [user, setUser] =
    useState(null);

    const navigate = useNavigate();
    
  const token =
    localStorage.getItem("token");

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile =
    async () => {

      try {

        const res =
          await axios.get(

            "http://localhost:5000/api/auth/profile",

            {
              headers: {
                Authorization:
                  token
              }
            }

          );

        setUser(
          res.data
        );

      } catch (err) {

        console.log(err);

      }

    };

  const saveProfile =
    async () => {

      try {

        await axios.put(

          "http://localhost:5000/api/auth/profile",

          user,

          {
            headers: {
              Authorization:
                token
            }
          }

        );

        alert(
          "Profile Updated"
        );

      } catch (err) {

        console.log(err);

      }

    };

  if (!user)
    return <p>Loading...</p>;

  return (

    <Layout>

 <div className="profile-header-card">

  <div className="profile-banner">

    <button
  className="edit-profile-btn"
  onClick={() =>
    navigate("/profile/edit")
  }
>
  Edit Profile
</button>

  </div>

  <div className="profile-header-content">

    <img
      src={
        user.profileImage ||
        "https://via.placeholder.com/120"
      }
      alt="Profile"
      className="profile-avatar"
    />

    <div className="profile-user-info">

      <h1>{user.name}</h1>

      <p className="profile-role">
        Shopkeeper
      </p>

      <p className="profile-location">
        📍 {user.address || "Kerala"}
      </p>

      <div className="profile-badges">

        <span className="verified-badge">
          ✓ Verified Shopkeeper
        </span>

      </div>

    </div>

  </div>

  <div className="member-since">

    📅 Member Since:
    {" "}
    {new Date(
      user.createdAt
    ).toLocaleDateString()}

  </div>

</div>

    <div className="profile-section">
<div className="profile-section">

  <h3>
    Activity Summary
  </h3>

  <div className="stats-grid">

    <div className="stat-card green">

      <h2>0</h2>

      <p>
        Orders Placed
      </p>

    </div>

    <div className="stat-card orange">

      <h2>0</h2>

      <p>
        Cart Items
      </p>

    </div>

    <div className="stat-card blue">

      <h2>0</h2>

      <p>
        Watchlist
      </p>

    </div>

    <div className="stat-card purple">

      <h2>0</h2>

      <p>
        Distributors
      </p>

    </div>

  </div>

</div>
  <h3>
    Account Security
  </h3>

  <div className="security-card">

    <div>

      <h4>
        Password
      </h4>

      <p>
        ********
      </p>

    </div>

    <button
      className="security-btn"
    >
      Change Password
    </button>

  </div>

</div>
    <div className="profile-section">

  
    </div>
    

</Layout>
);

}

export default Profile;