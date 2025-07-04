import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    // console.log(user.uid);

    fetch(`http://localhost:5000/jobs?userId=${encodeURIComponent(user.uid)}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setJobs(data);
      })
      .catch((error) => console.error(error));
  }, [user.uid]);
  return (
    <div>
      <h2 className="text-3xl">My Posted Jobs: {jobs.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Job Title</th>
              <th>Deadline</th>
              <th>Application Count</th>
              <th>Applications</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{job.title}</td>
                <td>{job.applicationDeadline}</td>
                <td>{job.count}</td>
                <td>
                  <Link to={`/viewapplicant/${job._id}`}>
                    <button className="btn btn-link">View Applications</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyJobs;
