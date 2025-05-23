import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
const JobApply = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const submitJobApplication = (event) => {
    event.preventDefault();
    const form = event.target;
    const linkedIn = form.linkedIn.value;
    const github = form.github.value;
    const resume = form.resume.value;

    const jobApplication = {
      jobId: id,
      userId: user.uid,
      userEmail: user.email,
      linkedIn,
      github,
      resume,
    };
    console.log(jobApplication);
    
    fetch("http://localhost:5000/job-application", {
      method: "POST",
      body: JSON.stringify(jobApplication),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          alert("Job application submitted successfully!");
          navigate("/");
        }
      });
  };
  return (
    <div className="card bg-base-100 w-full shadow-2xl">
      <h1 className="text-5xl font-bold text-center">
        Apply Job and Good Luck!
      </h1>
      <form onSubmit={submitJobApplication} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">LinkedIn URL</span>
          </label>
          <input
            type="url"
            name="linkedIn"
            placeholder="LinkedIn URL"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Github URL</span>
          </label>
          <input
            type="url"
            name="github"
            placeholder="Github URL"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Resume URL</span>
          </label>
          <input
            type="url"
            name="resume"
            placeholder="Resume URL"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Apply</button>
        </div>
      </form>
    </div>
  );
};

export default JobApply;
