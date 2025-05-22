
import React from "react";
import { Link } from "react-router-dom";
const SingleJobCard = ({ job }) => {
  const {
    title,
    company,
    company_logo,
    requirements,
    description,
    location,
    salaryRange,
  } = job;
  return (
    <div>
      <div className="card card-compact shadow-xl bg-white text-black h-full">
        <figure>
          <img src={company_logo} alt="Company Logo" className="w-16 h-16 " />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{company}</p>
          <p>{location}</p>
          {/* <p>{salaryRange}</p> */}
          <p>{description}</p>
          {/* <p>
            Requirements:
          </p>
          <ul className="flex flex-row gap-2">
            {requirements.map((req, index) => (
              <li key={index} className="border p-1">{req}</li>
            ))}
          </ul> */}
          <p>
            Salary: {salaryRange.min}- {salaryRange.max} BDT
          </p>

          <button className="btn btn-primary"> <Link to={`/jobdetails/${job._id}`}>Job Details</Link> </button>
        </div>
      </div>
    </div>
  );
};

export default SingleJobCard;
