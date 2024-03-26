import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import WithNavbar from "./layouts/WithNavbar";
import WithOutnavbar from "./layouts/WithOutnavbar";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Home from "./pages/home";
import Meeting from "./pages/meeting";
import Blogs from "./pages/blogs";
import Restaurant from "./pages/restaurant";
import RestDetail from './pages/restaurant/detail'
import RestMapDetail from "./pages/restaurant/mapDetail";
import ChartJS from './pages/chart'
import Movies from './pages/movies'
import MovieDetail from './pages/movies/detail'
import TableTest from './pages/test/table'
import FoodsEasy from './pages/foods'
import FoodDetail from './pages/foods/detail'

const RoutesPage = () => {
  return (
    <Router>
      <Routes>
        <Route element={<WithOutnavbar />}>
          <Route exact  path="/auth/signin" element={<Signin />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Route>
        <Route
          element={
            <RequireAuth loginPath={"/auth/signin"}>
              <WithNavbar />
            </RequireAuth>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/meetings/" element={<Meeting />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/restaurant" element={<Restaurant/>}/>
          <Route path="/chart" element={<ChartJS/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/movies/detail/:id" element={<MovieDetail />}/>
          <Route path="/restaurant/detail/:id" element={<RestDetail/>}/>
          <Route path="/restaurant/map/:id" element={<RestMapDetail/>}/>
          <Route path="/test/table" element={<TableTest/>}/>
          <Route path="/foods" element={<FoodsEasy />}/>
          <Route path="/food/detail/:id" element={<FoodDetail/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutesPage;
