import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Preloader from "../../components/Preloader";

const Detail = () => {
  const { id } = useParams();
  const [rest, setRest] = useState([]);
  const [loading, setLoading] = useState(false)

  const getData = async () => {
   try {
    setLoading(true)
    await axios
    .get(
      "https://full-stack-app.com/laravel_auth_jwt_api/public/api/restaurant/" + id
    )
    .then((res) => {
      console.log(res.data.restaurant);
      setRest(res.data.restaurant);
    });
   } catch (error) {
    console.log(error)
   } finally {
    setLoading(false)
   }
  };

  useEffect(()=>{
    getData()
  },[])

   if(loading === true) {
    return(
      <Preloader/>
    )
  }
  
  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Restaurant search detail</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Restaurant</a>
                  </li>
                  <li className="breadcrumb-item active">Detail</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <div className="card mb-5 mt-3">
                  <img
                    className="card-img-top"
                    src={
                      rest.image
                    }
                    height={"400"}
                    alt="Card image"
                  />
                  <div className="card-body">
                    <h4 className="card-title">{rest.title}</h4>
                    <p className="card-text text-muted">{rest.description}</p>
                    <div className="float-right">
                      <Link className="btn btn-outline-primary" to={'/restaurant/map/'+ rest.id}>
                      Go to map
                      </Link>{' '}
                      <Link to={"/restaurant"} className="btn btn-danger">
                        Go back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
