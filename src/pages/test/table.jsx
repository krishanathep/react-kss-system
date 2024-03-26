import { useEffect, useState } from "react";
import { DataTable } from "mantine-datatable";
import axios from "axios";
import dayjs from "dayjs";

const PAGE_SIZES = [10, 15, 20];

const Table = () => {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(blogs.slice(0, pageSize));

  const getData = async () => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    
    await axios
      .get("https://full-stack-app.com/laravel_auth_jwt_api/public/api/blogs")
      .then((res) => {
        setBlogs(res.data.blogs);
        setRecords(res.data.blogs.slice(from, to));
      });
  }

  useEffect(() => {
    getData()
  }, [page, pageSize]);

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Table test</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Table</li>
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
                  <h5 className="card-header">Table test</h5>
                  <div className="card-body">
                    <DataTable
                      withBorder
                      records={records}
                      columns={[
                        {
                          accessor: 'index',
                          title: '#',
                          textAlignment: 'center',
                          width: 80,
                          render: (record) => records.indexOf(record) + 1,
                        },
                        { accessor: "title" },
                        { accessor: "content" },
                        { accessor: "author" },
                        {
                          accessor: "created_at",
                          textAlignment: "center",
                          render: ({ created_at }) =>
                            dayjs(created_at).format("DD-MMMM- YYYY"),
                        },
                      ]}
                      minHeight={200}
                      totalRecords={blogs.length}
                      paginationColor="grape"
                      recordsPerPage={pageSize}
                      page={page}
                      onPageChange={(p) => setPage(p)}
                      recordsPerPageOptions={PAGE_SIZES}
                      onRecordsPerPageChange={setPageSize}
                    />
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

export default Table;
