import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Preloader from "../../components/Preloader";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false)
  const [meal, setmeal] = useState([]);

  const getData = async () => {
    try {
      setLoading(true)
      await axios
        .get("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
        .then((res) => {
          console.log(res.data.meals);
          setmeal(res.data.meals);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
                <h1 className="m-0">Foods detail</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Detail</a>
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
              {meal.map((item) => (
                <div className="col-md-12" key={item.idMeal}>
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={item.strMealThumb}
                      alt=""
                      height={"700"}
                    />
                    <div className="card-body">
                      <h4 className="card-title">{item.strMeal}</h4>
                      <p className="card-text text-muted">{item.strInstructions}</p>
                      <div className="float-right">
                        <Link to={"/foods"} className="btn btn-danger">
                          Go back
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
