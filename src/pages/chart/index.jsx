import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Chart-js</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Chart-js</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body card-outline card-primary">
                    <h5>Bar chart</h5>
                    <ResponsiveContainer width={"100%"} height={300}>
                      <BarChart
                        width={600}
                        height={300}
                        data={data}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 10,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card card-outline card-primary">
                  <div className="card-body">
                    <h5>Bar chart</h5>
                    <ResponsiveContainer width={"100%"} height={300}>
                    <BarChart
                      width={600}
                      height={300}
                      data={data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 10,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="pv" fill="#8884d8" />
                      <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card card-outline card-primary">
                  <div className="card-body">
                    <h5>Line chart</h5>
                    <ResponsiveContainer width={"100%"} height={300}>
                    <LineChart
                      width={600}
                      height={300}
                      data={data}
                      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                    >
                      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                      <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                      <XAxis dataKey="name" />
                      <YAxis />
                    </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card card-outline card-primary">
                  <div className="card-body">
                    <h5>Line chart</h5>
                    <ResponsiveContainer width={"100%"} height={300}>
                    <LineChart
                      width={600}
                      height={300}
                      data={data}
                      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                    >
                      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                      <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                      <XAxis dataKey="name" />
                      <YAxis />
                    </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;
