import { useEffect, useState } from "react";
import axios from "axios";

function AIRecommendations() {

  const [data, setData] = useState([]);

  useEffect(() => {

    loadRecommendations();

  }, []);

  const loadRecommendations =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/ai/recommendations"
          );

        setData(res.data);

      } catch (err) {

        console.log(err);

      }
    };

  return (

    <div className="card">

      <div className="card-hd">

        <span className="card-title">
          AI Recommendations
        </span>

      </div>

      {data.slice(0, 5).map((r, i) => (

        <div
          key={i}
          className="ai-card"
        >

          <h3>
            {r.item}
          </h3>

          <p>
            Buy from:
            <strong>
              {" "}
              {r.distributor}
            </strong>
          </p>

          <p>
            Best Price:
            ₹{r.bestPrice}
          </p>

          <p>
            Expected Profit:
            ₹{r.profit}
          </p>

        </div>
      ))}

    </div>
  );
}

export default AIRecommendations;