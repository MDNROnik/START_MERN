import { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
const JobDetails = () => {
  const { user, loading } = useContext(AuthContext);
  const {
    _id,
    title,
    company,
    company_logo,
    requirements,
    description,
    location,
    salaryRange,
  } = useLoaderData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="m-10">
      <figure>
        <img src={company_logo} alt="Company Logo" className="w-16 h-16 " />
      </figure>
      <h2 className="text-3xl">Job Details for {title}</h2>
      <p>Company : {company}</p>
      <p>{location}</p>
      <div className="card-body">
        {/* <p>{salaryRange}</p> */}
        <p>{description}</p>
        <p>Requirements:</p>
        <ul className="flex flex-row gap-2">
          {requirements.map((req, index) => (
            <li key={index} className="border p-1">
              {req}
            </li>
          ))}
        </ul>
        <p>
          Salary: {salaryRange.min}- {salaryRange.max} BDT
        </p>
      </div>
      {/* <Link to={`/jobApply/${_id}`}>
        <button className="btn btn-primary">Apply Now</button>
      </Link> */}
      {user ? (
        <Link to={`/jobApply/${_id}`}>
          <button className="btn btn-primary">Apply Now</button>
        </Link>
      ) : (
        <Link to="/signin">
          <button className="btn btn-primary">Login to Apply</button>
        </Link>
      )}
      {/* <button className="btn btn-primary">Apply Now</button> */}
    </div>
  );
};

export default JobDetails;
