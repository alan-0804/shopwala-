import Inventory from "../components/Inventory";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import "../shopkeeper.css";
import AIRecommendations from "../components/AIRecommendations";
import LowStockAlerts from "../components/LowStockAlerts";
function Dashboard() {
  
  const [stats, setStats] = useState({
  distributors: 0,
  items: 0,
  savings: 0
});
const userName =
  localStorage.getItem("name");

useEffect(() => {

  loadStats();

}, []);

const loadStats = async () => {

  try {

    // GET ITEMS
    const itemsRes = await axios.get(
      "http://localhost:5000/api/items"
    );

    const items = itemsRes.data;

    let totalSavings = 0;

    const distributors = new Set();

    // GET BEST PRICES
    await Promise.all(

      items.map(async (item) => {

        try {

          const best =
            await axios.get(
              `http://localhost:5000/api/prices/best/${item._id}`
            );

          if (best.data?.price) {

            totalSavings +=
              item.mrp - best.data.price;

          }

          if (
            best.data?.distributorId?._id
          ) {

            distributors.add(
              best.data.distributorId._id
            );

          }

        } catch {}

      })
    );

    setStats({

      distributors:
        distributors.size,

      items:
        items.length,

      savings:
        totalSavings

    });

  } catch (err) {

    console.log(err);

  }
};
  return (

    <Layout>

      {/* TOP */}

      <div className="toprow">

        <div>
          <h1 className="page-title">
            Good morning, {userName}👋
          </h1>

          <p className="page-sub">
            Compare distributor prices and track margins
          </p>
        </div>

        <button
          className="btn-green"
          onClick={() =>
            window.location.href = "/add-item"
          }
        >
          + Add Item
        </button>

      </div>

      {/* CARDS */}

      <div className="stats">

        <div className="stat-card">
          <div className="stat-label">
            Distributors tracked
          </div>

          <div className="stat-val">
            {stats.distributors}
          </div>

          <div className="stat-note muted">
            Across 3 categories
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">
            Items on watchlist
          </div>

          <div className="stat-val">
            {stats.items}
          </div>

          <div className="stat-note up">
            4 price drops today
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">
            Potential savings
          </div>

          <div className="stat-val">
            ₹{stats.savings}
          </div>

          <div className="stat-note up">
            vs current suppliers
          </div>
        </div>

      </div>

      {/* SEARCH */}

      <div className="search-row">

        <input
          type="text"
          placeholder="Search item..."
        />

        <button className="btn-green">
          Search
        </button>

      </div>

      {/* INVENTORY */}

      <Inventory />
      
      <AIRecommendations />
      
      <LowStockAlerts />
    </Layout>
  );
}

export default Dashboard;