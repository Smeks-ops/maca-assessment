import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="Home public-page">
      <h1>Purchase Reimbursement</h1>
      <div className="home-btns">
        <button
          onClick={() => {
            navigate("/form");
          }}
        >
          Submit a Receipt
        </button>
        <button
          onClick={() => {
            navigate("/uploads");
          }}
        >
          Uploads
        </button>
      </div>
    </div>
  );
}

export default Home;
