import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";

const UserInfo = () => {
  const { user } = useContext(AuthContext);
  const [allApplication, setAllApplication] = useState([]);
  useEffect(() => {
    fetch(
      `http://localhost:5000/job-application?userId=${encodeURIComponent(
        user.uid
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data), setAllApplication(data);
        console.log(allApplication);
      })
      .catch((error) => console.error(error));

    
  }, [user.uid]);
  return (
    <div>
      <p>{allApplication.length}</p>
      <div>
        <h2 className="text-3xl">My Applications: {allApplication.length}</h2>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Name</th>
                <th>Job</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {allApplication.map((application) => (
                <tr key={application._id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={application.job.company_logo}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{application.job.company}</div>
                        <div className="text-sm opacity-50">{application.job.location}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {application.job.title}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {application.job.description}
                    </span>
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">X</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
