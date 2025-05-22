import { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
const JobDetails = () => {
  const { user } = useContext(AuthContext);
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
  return (
    <div className="m-10">
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
      {user?.email ? (
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
