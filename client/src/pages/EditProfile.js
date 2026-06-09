import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import "../shopkeeper.css";

function EditProfile() {

  const navigate = useNavigate();

  const [user, setUser] =
    useState(null);

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
                Authorization: token
              }
            }

          );

        setUser(res.data);

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
              Authorization: token
            }
          }

        );

        alert(
          "Profile Updated"
        );

        navigate("/profile");

      } catch (err) {

        console.log(err);

      }

    };

  if (!user)
    return <p>Loading...</p>;

  return (

    <Layout>

      <div className="edit-profile-page">

        <div className="edit-profile-header">
        
          <h1>
            Edit Profile
          </h1>

          <p>
            Update your profile information
          </p>

        </div>
        <div className="profile-upload-card">

  <img
    src={
      user.profileImage ||
      "https://via.placeholder.com/150"
    }
    alt="Profile"
    className="edit-profile-avatar"
  />

  <div>

    <h2>
      {user.name}
    </h2>

    <p>
      Shopkeeper
    </p>

    <input
      type="text"
      placeholder="Profile Image URL"
      value={
        user.profileImage || ""
      }
      onChange={(e) =>
        setUser({
          ...user,
          profileImage:
            e.target.value
        })
      }
    />

  </div>

</div>

        <div className="two-column-grid">

  <div className="edit-profile-card">

    <h3>
      🏪 Shop Information
    </h3>

    <input
      placeholder="Shop Name"
      value={user.name || ""}
      onChange={(e) =>
        setUser({
          ...user,
          name: e.target.value
        })
      }
    />

    <input
      placeholder="Owner Name"
      value={user.ownerName || ""}
      onChange={(e) =>
        setUser({
          ...user,
          ownerName: e.target.value
        })
      }
    />

    <input
      placeholder="Business Type"
      value={
        user.businessType || ""
      }
      onChange={(e) =>
        setUser({
          ...user,
          businessType:
            e.target.value
        })
      }
    />

  </div>

  <div className="edit-profile-card">

    <h3>
   📞 Contact Information
    </h3>

    <input
      placeholder="Phone"
      value={user.phone || ""}
      onChange={(e) =>
        setUser({
          ...user,
          phone: e.target.value
        })
      }
    />

    <input
      value={user.email || ""}
      disabled
    />

    <input
      placeholder="Location"
      value={
        user.location || ""
      }
      onChange={(e) =>
        setUser({
          ...user,
          location:
            e.target.value
        })
      }
    />

  </div>

</div>
            <div className="two-column-grid">
        <div className="edit-profile-card">

          <h3>
            🏢 Business Information
          </h3>

          

          <input
            placeholder="GST Number"
            value={
              user.gstNumber || ""
            }
            onChange={(e) =>
              setUser({
                ...user,
                gstNumber:
                  e.target.value
              })
            }
          />

          <input
            placeholder="PAN Number"
            value={
              user.panNumber || ""
            }
            onChange={(e) =>
              setUser({
                ...user,
                panNumber:
                  e.target.value
              })
            }
          />

          <textarea
            placeholder="Business Description"
            value={
              user.description || ""
            }
            onChange={(e) =>
              setUser({
                ...user,
                description:
                  e.target.value
              })
            }
          />

        </div>
        
        <div className="edit-profile-card">

          <h3>
           📍 Address Information
          </h3>

          <input
            placeholder="City"
            value={user.city || ""}
            onChange={(e) =>
              setUser({
                ...user,
                city: e.target.value
              })
            }
          />

          <input
            placeholder="State"
            value={user.state || ""}
            onChange={(e) =>
              setUser({
                ...user,
                state: e.target.value
              })
            }
          />

          <input
            placeholder="Pincode"
            value={user.pincode || ""}
            onChange={(e) =>
              setUser({
                ...user,
                pincode: e.target.value
              })
            }
          />
       

  <textarea
    placeholder="Address"
    value={user.address || ""}
    onChange={(e) =>
      setUser({
        ...user,
        address: e.target.value
      })
    }
  />

  

        </div>
        </div>

        <div className="edit-profile-actions">

          <button
            className="cancel-btn"
            onClick={() =>
              navigate("/profile")
            }
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={saveProfile}
          >
            Save Changes
          </button>

        </div>

      </div>

    </Layout>

  );

}

export default EditProfile;