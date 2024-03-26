import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import Preloader from "../../components/Preloader";
import axios from "axios";

const Foods = () => {
  const [loading, setLoading] = useState(false)
  const [meals, setMeals] = useState([]);
  const [food, setFood] = useState("");
  const [dataFilter] = useState(["strMeal"]);

  const getData = async () => {
    try {
      setLoading(true)
      await axios
        .get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
        .then((res) => {
          console.log(res.data.meals);
          setMeals(res.data.meals)
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  const searchMeals =(meals)=>{
    return meals.filter((item)=>{
      return dataFilter.some((filter)=>{
       return item[filter].toString().toLowerCase().indexOf(food.toLowerCase())>-1
      })
    })
  }

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
                <h1 className="m-0">Foods search easy</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Foods</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <input
                        type="search"
                        value={food}
                        onChange={(e)=>setFood(e.target.value)}
                        className="form-control"
                        placeholder="Search foods"
                      />
                    </div>
                  </div>
                <div className="row">
                {searchMeals(meals).map((meal)=>(
                    <div className="col-md-3" key={meal.idMeal}>
                    <div className="card">
                      <Link to={'/food/detail/'+meal.idMeal}>
                      <img
                        className="card-img-top"
                        src={meal.strMealThumb}
                        alt="Card image"
                      />
                      </Link>
                      <div className="card-body">
                      <h4 className="card-title">{meal.strMeal.substring(0, 25)}</h4>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Foods;
