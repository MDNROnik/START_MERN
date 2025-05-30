import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SingleJobCard from "../Home/SingleJobCard";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState(false);
  const [search , setSearch ] = useState("");

  // console.log(sort);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`http://localhost:5000/jobs?sort=${sort}&search=${search}`);
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [sort, search]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>AllJobs</div>
      <div className=" flex w-11/12 mx-auto bg-base-200 py-5 p-3 items-center gap-5">
        <button onClick={() => setSort(!sort)} className="btn btn-neutral">
          {sort == true ? "Sorted By Salary" : "Sort By Salary"}
        </button>
        <div className="flex">
          <FaSearch />
          <input
            onKeyUp={(e)=>setSearch(e.target.value)}
            className="input w-full max-w-2xl"
            type="text"
            placeholder="Search Job By Location"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {jobs.map((job) => (
          <SingleJobCard key={job._id} job={job}></SingleJobCard>
        ))}
      </div>
    </>
  );
};

export default AllJobs;
