/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { fetchGrievancesAPI, updateStatusAPI } from "../Services/allAPI";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Server_URL } from "../Services/Server_URL";
import "./Dashboard.css";
function Dashboard() {
  const [grievances, setGrievances] = useState([]);
  const [status, setStatus] = useState("");
  console.log(grievances);
  const [filterByType, setFilterByType] = useState("");
  const [filterByStatus, setFilterByStatus] = useState("");
  const [sortByDate, setSortByDate] = useState("Newest");
  useEffect(() => {
    fetchGrievances();
  }, []);
  const fetchGrievances = async () => {
    try {
      const response = await fetchGrievancesAPI();
      if (response.status === 200) {
        setGrievances(response.data);
      } else {
        toast.error("Failed to fetch grievances.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching grievances.");
    }
  };

  const handleStatusChange = async (id, status) => {
    console.log("ghd", id, status);

    try {
      const response = await updateStatusAPI(id, status);
      if (response.status === 200) {
        toast.success("Grievance status changed");
        fetchGrievances();
      } else {
        toast.error("Failed to change status.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Some api error");
    }
  };
  const filteredGrievances = grievances
    .filter((grievance) =>
      filterByType ? grievance.type === filterByType : true
    )
    .filter((grievance) =>
      filterByStatus ? grievance.status == filterByStatus : true
    );

  const sortedGrievance = [...filteredGrievances].sort((a, b) => {
    const date1 = new Date(a.createdAt);
    const date2 = new Date(b.createdAt);
    return sortByDate === "Newest" ? date2 - date1 : date1 - date2;
  });

  return (
    <div style={{ backgroundColor: "black" }}>
      {/* <Header style={{ color: "silver" }} /> */}
      <ToastContainer
        position="top-center"
        transition={Bounce}
        autoClose={3000}
      />
      <h1
        className="heading text-center text-light p-3"
        style={{
          position: "sticky",
          top: "0px",
          zIndex: "3",
          backgroundColor: "black",
          borderBottom: "1px solid silver",
        }}
      >
        {" "}
        <img src="batman-512.png" width={"69px"} alt="" />
        Gotham Citizen Reports
      </h1>

      <div
        className="container-fluid d-flex flex-wrap row p-3 "
        style={{
          backgroundColor: "",
          borderRadius: "20px",
          minHeight: "100vh",
        }}
      >
        <div
          className="filter col-12 col-md-2 mb-3 p-4"
          style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            position: "sticky",
            top: "18vh",
            maxHeight: "70vh",
            backgroundColor: "#333",
            color: "white",
            borderRadius: "15px",
            zIndex: "1",
          }}
        >
          <h4>Filters</h4>
          {/* Filter by Type */}
          <div className="mb-3">
            <div>
              <label className="form-label" style={{textDecoration:"underline"}}>Filter by Type</label>
              <div className="">
                <label>
                  <input
                    type="radio"
                    value=""
                    name="filterByType"
                    checked={filterByType === ""}
                    onChange={(e) => setFilterByType(e.target.value)}
                  />
                  All Types
                </label>{" "}
              </div>
              <div>
                <label className="ms-3">
                  <input
                    type="radio"
                    value="Corruption"
                    name="filterByType"
                    checked={filterByType === "Corruption"}
                    onChange={(e) => setFilterByType(e.target.value)}
                  />
                  Corruption
                </label>
              </div>
              <div>
                <label className="ms-3">
                  <input
                    type="radio"
                    value="Suspicious Activity"
                    name="filterByType"
                    checked={filterByType === "Suspicious Activity"}
                    onChange={(e) => setFilterByType(e.target.value)}
                  />
                  Suspicious Activity
                </label>
              </div>
              <div>
                <label className="ms-3">
                  <input
                    type="radio"
                    value="Most Wanted Sightings"
                    name="filterByType"
                    checked={filterByType === "Most Wanted Sightings"}
                    onChange={(e) => setFilterByType(e.target.value)}
                  />
                  Most Wanted Sightings
                </label>
              </div>
              <div>
                <label className="ms-3">
                  <input
                    type="radio"
                    value="Other"
                    name="filterByType"
                    checked={filterByType === "Other"}
                    onChange={(e) => setFilterByType(e.target.value)}
                  />
                  Other
                </label>
              </div>
            </div>
          </div>

          {/* Filter by Status */}
          <div className="mb-3">
            <label className="form-label" style={{textDecoration:"underline"}}>Filter by Status</label>
            <div>
              <label>
                <input
                  type="radio"
                  value=""
                  name="filterByStatus"
                  checked={filterByStatus === ""}
                  onChange={(e) => setFilterByStatus(e.target.value)}
                />{" "}
                All Statuses
              </label>{" "}
              <br />
              <label className="ms-3">
                <input
                  type="radio"
                  value="Pending"
                  name="filterByStatus"
                  checked={filterByStatus === "Pending"}
                  onChange={(e) => setFilterByStatus(e.target.value)}
                />{" "}
                Pending
              </label>{" "}
              <br />
              <label className="ms-3">
                <input
                  type="radio"
                  value="Resolved"
                  name="filterByStatus"
                  checked={filterByStatus === "Resolved"}
                  onChange={(e) => setFilterByStatus(e.target.value)}
                />{" "}
                Resolved
              </label>
              <div>
                <label className="ms-3">
                  <input
                    type="radio"
                    value="Passed to GCPD"
                    name="filterByStatus"
                    checked={filterByStatus === "Passed to GCPD"}
                    onChange={(e) => setFilterByStatus(e.target.value)}
                  />{" "}
                  Passed to GCPD
                </label>
              </div>
              <label className="ms-3">
                <input
                  type="radio"
                  value="Rejected"
                  name="filterByStatus"
                  checked={filterByStatus === "Rejected"}
                  onChange={(e) => setFilterByStatus(e.target.value)}
                />{" "}
                Rejected
              </label>
            </div>
          </div>

          {/* Sort by Date */}
          <div className="mb-3">
            <label className="form-label"style={{textDecoration:"underline"}}>Sort by Date</label>
            <div>
              {/* <label>
              <input
                type="radio"
                value=""
                name="sortByDate"
                checked={sortByDate === ""}
                onChange={(e) => setSortByDate(e.target.value)}
              />{" "}
              No Sorting
            </label> <div> */}
              <div>
                <label className="ms-3">
                  <input
                    type="radio"
                    value="Newest"
                    name="sortByDate"
                    checked={sortByDate === "Newest"}
                    onChange={(e) => setSortByDate(e.target.value)}
                  />
                  Newest
                </label>
              </div>
              <label className="ms-3">
                <input
                  type="radio"
                  value="Oldest"
                  name="sortByDate"
                  checked={sortByDate === "Oldest"}
                  onChange={(e) => setSortByDate(e.target.value)}
                />{" "}
                Oldest
              </label>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-8 mt-5 mx-auto">
          <div
            className="grievance-list "
            style={{ position: "sticky", left: "30vw" }}
          >
            {sortedGrievance.length ? (
              sortedGrievance.map((grievance) => (
                <div
                  key={grievance._id}
                  className={`card mb-3 ${
                    grievance.type === "Most Wanted Sightings"
                      ? "bg-danger"
                      : "bg-dark"
                  } text-light`}
                  style={{ borderRadius: "15px" }}
                >
                  <div className="card-body text-light p-5">
                  className={`card-text ${grievance.type === "Most Wanted Sightings" ? "text-light" : "text-danger"}`}
                    <h5 className="card-title d-flex justify-content-between align-items-center">
                      {grievance.name} | {grievance.email}{" "}
                      <select
                        defaultValue={grievance.status}
                        onChange={(e) =>
                          handleStatusChange(grievance._id, e.target.value)
                        }
                        className="form-select text-dark w-25"
                      >
                        <option value={grievance.status} disabled>
                          {grievance.status}
                        </option>
                        {["Pending", "Resolved", "Passed to GCPD", "Rejected"]
                          .filter((status) => status !== grievance.status)
                          .map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}{" "}
                      </select>
                    </h5>

                    <p className="card-text pe-5">
                      <strong>Message:</strong> <br />
                      {grievance.message}
                      {grievance.evidence.length > 0 && (
                        <div>
                          <div className="d-flex gap-2 mt-2">
                            {grievance.evidence.map((file, index) => (
                              <a
                                key={index}
                                href={`${Server_URL}/upload/${file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-secondary"
                              >
                                Evidence {index + 1}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-light">
                No grievances to display.
              </p>
            )}
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

export default Dashboard;
