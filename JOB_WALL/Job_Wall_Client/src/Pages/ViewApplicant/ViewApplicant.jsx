import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewApplicant = () => {
  const jobId = useParams();
  const [allApplication, setAllApplication] = useState([]);
  //   console.log(jobId.id);
  useEffect(() => {
    // fetch(
    //   `http://localhost:5000/job-application?jobId=${encodeURIComponent(
    //     jobId.id
    //   )}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);

    //     setAllApplication(data);
    //   })
    //   .catch((error) => console.error(error));

    axios
      .get(
        `http://localhost:5000/job-application?jobId=${encodeURIComponent(
          jobId.id
        )}`,
        {
          withCredentials: true, // 🔥
        }
      )
      .then((res) => {
        // console.log("from jwt ", res.data);
        setAllApplication(res.data);
        // setAllApplication(data);
      });
  }, [jobId.id]);

  const handleStatusUpdate = (e, id) => {
    // console.log(e.target.value, id);

    const statusNow = {
      data: e.target.value,
    };
    fetch(`http://localhost:5000/job-application/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(statusNow),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          alert("updated");
          // 🔄 Update local state
          setAllApplication((prev) =>
            prev.map((app) =>
              app._id === id ? { ...app, status: e.target.value } : app
            )
          );
        }
      });
  };

  return (
    <div>
      {/* <h2 className="text-3xl">
        Applications for this job: {allApplication.length}
      </h2> */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {allApplication?.map((app, index) => (
              <tr key={app._id}>
                <th>{index + 1}</th>
                <td>{app.userEmail}</td>
                <td>{app.status}</td>
                <td>
                  <select
                    onChange={(e) => handleStatusUpdate(e, app._id, index)}
                    defaultValue={app.status || "Change Status"}
                    className="select select-bordered select-xs w-full max-w-xs"
                  >
                    <option disabled>Change Status</option>
                    <option>applied</option>
                    <option>Under Review</option>
                    <option>Set Interview</option>
                    <option>Hired</option>
                    <option>Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplicant;
