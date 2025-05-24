import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewApplicant = () => {
  const jobId = useParams();
  const [allApplication, setAllApplication] = useState([]);
  console.log(jobId.id);
  useEffect(() => {
    fetch(
      `http://localhost:5000/job-application?jobId=${encodeURIComponent(
        jobId.id
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllApplication(data)
        // console.log(allApplication);
      })
      .catch((error) => console.error(error));
  }, [jobId.id]);

  return  <div>
            <h2 className="text-3xl">Applications for this job: {allApplication.length}</h2>
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
                        {
                            allApplication.map((app, index) => <tr key={app._id}>
                                <th>{index + 1}</th>
                                <td>{app.userEmail}</td>
                                <td>{app.status}</td>
                                <td>
                                    <select
                                        // onChange={(e) => handleStatusUpdate(e, app._id)}
                                        defaultValue={app.status || 'Change Status'}
                                        className="select select-bordered select-xs w-full max-w-xs">
                                        <option disabled>Change Status</option>
                                        <option>Under Review</option>
                                        <option>Set Interview</option>
                                        <option>Hired</option>
                                        <option>Rejected</option>
                                    </select>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>;
};

export default ViewApplicant;
