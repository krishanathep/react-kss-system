import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

export default function Home() {
  const [restuarent, setRestuarent] = useState(0);
  const [blogs, setBlogs] = useState(0);
  const [bookings, setBookings] = useState(0);
  const [results, setResults] = useState(0);

  const getAll = async () => {
    await axios
      .get(
        "https://full-stack-app.com/laravel_restaurant_api/public/api/restaurants"
      )
      .then((res) => {
        setRestuarent(res.data.restaurants.length);
      });

    await axios.get("https://full-stack-app.com/laravel_auth_jwt_api/public/api/events").then((res) => {
      setBookings(res.data.events.length);
    });

    await axios.get("https://full-stack-app.com/laravel_auth_jwt_api/public/api/blogs").then((res) => {
      setBlogs(res.data.blogs.length);
    });
    await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=54cd1af69dd6dc43fcfdfc3a29bef89b&language=en-US')
    .then((res)=>{
      setResults(res.data.results.length)
    })
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
              <h1 className="m-0">Dashboard</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <li className="breadcrumb-item active">Dashboard</li>
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
                  <h3>{restuarent}</h3>
                  <p>All Restaurants</p>
                </div>
                <div className="icon">
                  <i className="fas fa-utensils"></i>
                </div>
                <Link to={'/restaurant'} className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{bookings}</h3>
                  <p>All Bookings</p>
                </div>
                <div className="icon">
                  <i className="fas fa-calendar" />
                </div>
                <Link to={'/meetings'} className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{blogs}</h3>
                  <p>All Post</p>
                </div>
                <div className="icon">
                  <i className="far fa-comment-dots"></i>
                </div>
                <Link to={'/blogs'} className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="small-box bg-primary">
                <div className="inner">
                  <h3>{results}</h3>
                  <p>All Movies</p>
                </div>
                <div className="icon">
                  <i className="fas fa-photo-video"></i>
                </div>
                <Link to={'/movies'} className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
