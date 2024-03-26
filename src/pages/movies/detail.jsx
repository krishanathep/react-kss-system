import React,{useState,useEffect} from 'react'
import Preloader from "../../components/Preloader";
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const Detail = () => {

  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    try {
      setLoading(true)
      await axios.get(`https://api.themoviedb.org/3/movie/${id}}?api_key=54cd1af69dd6dc43fcfdfc3a29bef89b&language=en-US&page=1`)
      .then((res)=>{
        console.log(res.data)
        setDetail(res.data)
      })
    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

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
              <h1 className="m-0">Movies detail</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Movies</a>
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
            <div className="card mb-5 mt-5">
                  <img
                    className="card-img-top"
                    src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2'+ detail.poster_path}
                    height={'500'}
                    alt="Card image"
                  />
                  <div className="card-body">
                    <h4 className="card-title">{detail.title}</h4>
                    <p className="card-text text-muted">
                      {detail.overview}
                    </p>
                   <div className='float-right'>
                   <Link to={'/movies'} className='btn btn-primary'>Go back</Link>
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
  )
}

export default Detail