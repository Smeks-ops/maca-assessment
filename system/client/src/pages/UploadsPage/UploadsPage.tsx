import { useEffect, useState } from "react";
import spinner from "../../assets/spinner.svg";
import notify from "../../helpers/notify";
import "./Upload.css";

// api service
import APIService from "../../utils/apiServices";
type DataType = {
  id: string;
  purchaseName: string;
  date: string;
  amount: string;
  description: string;
  fileURL: string;
}
function UploadsPage() {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<DataType[] | [] >([]);

  // const data = [ 
  //   {
  //     id: 1,
  //     purchasedName: "Samsung",
  //     date: "Mon Oct 24 2022 10:04:11 GMT+0100",
  //     amount: 4500,
  //     description: "A Nice Content",
  //     fileURL:
  //       "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.generalblue.com%2Fpayment-receipt-template%2Fp%2Ft5rd715d8&psig=AOvVaw163iyQSIzz7YB4UntALhPV&ust=1666704423618000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCPiJ7_r7-PoCFQAAAAAdAAAAABAD",
  //   },
  //   {
  //     id: 2,
  //     purchasedName: "Samsung",
  //     date: "Mon Oct 24 2022 10:04:11 GMT+0100",
  //     amount: 4500,
  //     description: "A Nice Content",
  //     fileURL:
  //       "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.generalblue.com%2Fpayment-receipt-template%2Fp%2Ft5rd715d8&psig=AOvVaw163iyQSIzz7YB4UntALhPV&ust=1666704423618000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCPiJ7_r7-PoCFQAAAAAdAAAAABAD",
  //   },
  //   {
  //     id: 3,
  //     purchasedName: "Samsung",
  //     date: "Mon Oct 24 2022 10:04:11 GMT+0100",
  //     amount: 4500,
  //     description: "A Nice Content",
  //     fileURL:
  //       "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.generalblue.com%2Fpayment-receipt-template%2Fp%2Ft5rd715d8&psig=AOvVaw163iyQSIzz7YB4UntALhPV&ust=1666704423618000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCPiJ7_r7-PoCFQAAAAAdAAAAABAD",
  //   },
  //   {
  //     id: 4,
  //     purchasedName: "Samsung",
  //     date: "Mon Oct 24 2022 10:04:11 GMT+0100",
  //     amount: 4500,
  //     description: "A Nice Content",
  //     fileURL:
  //       "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.generalblue.com%2Fpayment-receipt-template%2Fp%2Ft5rd715d8&psig=AOvVaw163iyQSIzz7YB4UntALhPV&ust=1666704423618000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCPiJ7_r7-PoCFQAAAAAdAAAAABAD",
  //   },
  //   {
  //     id: 5,
  //     purchasedName: "Samsung",
  //     date: "Mon Oct 24 2022 10:04:11 GMT+0100",
  //     amount: 4500,
  //     description: "A Nice Content",
  //     fileURL:
  //       "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.generalblue.com%2Fpayment-receipt-template%2Fp%2Ft5rd715d8&psig=AOvVaw163iyQSIzz7YB4UntALhPV&ust=1666704423618000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCPiJ7_r7-PoCFQAAAAAdAAAAABAD",
  //   },
  //   {
  //     id: 6,
  //     purchasedName: "Samsung",
  //     date: "Mon Oct 24 2022 10:04:11 GMT+0100",
  //     amount: 4500,
  //     description: "A Nice Content",
  //     fileURL:
  //       "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.generalblue.com%2Fpayment-receipt-template%2Fp%2Ft5rd715d8&psig=AOvVaw163iyQSIzz7YB4UntALhPV&ust=1666704423618000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCPiJ7_r7-PoCFQAAAAAdAAAAABAD",
  //   },
  // ];

  useEffect(() => {
    APIService.getUploads()
      .then((res) => {
        setLoading(false);
        if (res.status) {
          setData(res.data)
        } else {
          notify("error", res.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        notify("error", "An error occured");
      });
  }, []);

  return loading ? (
    <div className="spinner-wrapper">
      <img className="loader" src={spinner} alt="" />
    </div>
  ) : (
    <div className="uploads-page">
      <h3>Uploads</h3>
      <div className="data-card-wrapper">
        {data.map((singleData) => (
          <div className="data-card" key={singleData.id}>
            <p className="item">
              <span>Item:</span> {singleData.purchaseName}
            </p>
            <p className="amount">
              <span>Amount:</span> {singleData.amount}
            </p>
            <p className="description">
              <span>Description:</span> {singleData.description}
            </p>
            <p className="date">
              <span>Date:</span>{" "}
              {new Date(singleData.date).toLocaleDateString()}
            </p>
            <a href={singleData.fileURL} download>
              <button>Download Receipt</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadsPage;
