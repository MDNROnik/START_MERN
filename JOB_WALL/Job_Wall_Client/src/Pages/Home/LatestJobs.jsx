import { useEffect, useState } from "react";
import SingleJobCard from "./SingleJobCard";
const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* <div>{jobs.length}</div> */}
      {jobs.map((job) => (
        <SingleJobCard key={job._id} job={job}></SingleJobCard>
        // <div key={job._id} className="border-2 border-gray-300 p-4 mb-4">
        //   <h3 className="text-xl font-bold">{job.title}</h3>
        //   <p className="text-gray-700">{job.description}</p>
        //   <p className="text-gray-500">Location: {job.location}</p>
        //   <p className="text-gray-500">Salary: {job.salary}</p>
        // </div>
      ))}
    </div>
  );
};

export default LatestJobs;
