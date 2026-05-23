import { useState } from "react";
import axios from "axios";

function BestPrice() {
  const [itemId, setItemId] = useState("");
  const [result, setResult] = useState(null);

  const getBest = async () => {
    const res = await axios.get(`http://localhost:5000/api/best-price/${itemId}`);
    setResult(res.data);
  };

  return (
    <div>
      <h2>Best Price</h2>

      <input
        placeholder="Enter Item ID"
        onChange={e => setItemId(e.target.value)}
      />

      <button onClick={getBest}>Check</button>

      {result && (
        <div>
          <h3>Best Price: ₹{result.price}</h3>
          <p>Distributor: {result.distributorId?.name}</p>
        </div>
      )}
    </div>
  );
}

export default BestPrice;