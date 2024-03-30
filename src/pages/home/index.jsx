import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {

  const [succestion, setSuggestion] = useState(0);

  const getAll = async () => {
    await axios
      .get(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/ksssystems"
      )
      .then((res) => {
        setSuggestion(res.data.ksssystems.length);
      });
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">หน้าแรก</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <li className="breadcrumb-item active">หน้าแรก</li>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{succestion}</h3>
                  <p>All Suggestion</p>
                </div>
                <div className="icon">
                <i className="fas fa-chalkboard-teacher"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="small-box bg-primary">
                <div className="inner">
                  <h3>7</h3>
                  <p>In Progress</p>
                </div>
                <div className="icon">
                <i className="far fa-clock"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>8</h3>
                  <p>Approved</p>
                </div>
                <div className="icon">
                <i className="far fa-check-circle"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>5</h3>
                  <p>Rejected</p>
                </div>
                <div className="icon">
                <i className="far fa-times-circle"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
