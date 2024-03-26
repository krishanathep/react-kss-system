import React, { useState, useEffect } from "react";
import { DataTable } from "mantine-datatable";
import { Modal, Button, Col, Form, Row, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";

import Swal from "sweetalert2";
import dayjs from "dayjs";
import axios from "axios";

const PAGE_SIZES = [10, 20, 30];

const blogs = () => {
  //user login
  const userDatail = useAuthUser();

  //create popup
  const [createShow, setCreateShow] = useState(false);

  const CreateClose = () => {
    reset({
      title: "",
      content: "",
      category: "",
      department: "",
    });
    setCreateShow(false);
  };

  //edit popup
  const [editShow, setEditShow] = useState(false);
  const EditClose = () => setEditShow(false);

  //view popup
  const [viewShow, setViewShow] = useState(false);

  const ViewClose = () => {
    reset({
      image: "",
      title: "",
      content: "",
      category: "",
      department: "",
    });
    setViewShow(false);
  };

  //id for edit
  const [editid, setEditId] = useState("");

  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState(blogs.slice(0, pageSize));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //blogs state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [author, setAuthor] = useState("");
  const [created, setCreated] = useState("");
  const [path, setPath] = useState("");

  const getData = async () => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/documents"
      )
      .then((res) => {
        setBlogs(res.data.documents);
        setRecords(res.data.documents.slice(from, to));
        setLoading(false);
      });
  };

  //filter function by title
  async function titleFilter(key) {

    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/document-filter-title?data=" +
          key
      )
      .then((res) => {
        setBlogs(res.data.document);
        setRecords(res.data.document.slice(from, to));
        setLoading(false);
      });
  }

  //filter function by content
  async function contentFilter(key) {

    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/document-filter-content?data=" +
          key
      )
      .then((res) => {
        setBlogs(res.data.document);
        setRecords(res.data.document.slice(from, to));
        setLoading(false);
      });
  }

  //filter function by category
  async function categoryFilter(key) {

    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/document-filter-category?data=" +
          key
      )
      .then((res) => {
        setBlogs(res.data.document);
        setRecords(res.data.document.slice(from, to));
        setLoading(false);
      });
  }

  //filter function by department
  async function departmentFilter(key) {

    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/document-filter-department?data=" +
          key
      )
      .then((res) => {
        setBlogs(res.data.document);
        setRecords(res.data.document.slice(from, to));
        setLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, [page, pageSize]);

  const hanldeDelete = (blogs) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Your blog has been deleted",
          showConfirmButton: false,
          timer: 2000,
        });
        axios
          .delete(
            "https://full-stack-app.com/laravel_auth_jwt_api/public/api/document-delete/" +
              blogs.id
          )
          .then((res) => {
            console.log(res);
            getData();
          });
      }
    });
  };

  const handleViewShow = async (blogs) => {
    setViewShow(true);

    await axios
      .get(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/document/" +
          blogs.id
      )
      .then((res) => {
        console.log(res);
        setTitle(res.data.documents.title);
        setContent(res.data.documents.content);
        setCategory(res.data.documents.category);
        setDepartment(res.data.documents.department);
        setAuthor(res.data.documents.author);
        setCreated(res.data.documents.created_at);
        setPath(res.data.documents.path);
      });
  };

  const handleEditShow = async (blogs) => {
    setEditShow(true);
    await axios
      .get(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/document/" +
          blogs.id
      )
      .then((res) => {
        setEditId(res.data.documents.id);
        console.log(res);
        reset({
          title: res.data.documents.title,
          content: res.data.documents.content,
          category: res.data.documents.category,
          department: res.data.documents.department,
          author: res.data.documents.author,
        });
      });
  };

  const handleEditSubmit = async (data) => {
    const formData = new FormData();

    formData.append("_method", "put");
    formData.append("path", data.path[0]);
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("department", data.department);
    formData.append("author", data.author);

    await axios
      .post(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/document-update/" +
          editid,
        formData
      )
      .then((res) => {
        console.log(res.data);
        getData();
        setEditShow(false);
        Swal.fire({
          icon: "success",
          title: "Your blog has been edited",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCreateShow = () => {
    setCreateShow(true);
  };

  const handleCreateSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();

    formData.append("path", data.path[0]);
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("department", data.department);
    formData.append("author", data.author);

    await axios
      .post(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/document-create",
        formData
      )
      .then((res) => {
        console.log(res.data);
        getData();
        reset({
          title: "",
          content: "",
          category: "",
          department: "",
        });
        setCreateShow(false);
        Swal.fire({
          icon: "success",
          title: "Your blog has been created",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">เอกสารทั้งหมด</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">หน้าแรก</a>
                  </li>
                  <li className="breadcrumb-item active">เอกสาร</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card card-outline card-primary">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="float-right">
                          <button
                            className="btn btn-success mb-2"
                            onClick={handleCreateShow}
                          >
                            <i className="fa fa-plus"></i> เพิ่มเอกสาร
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="ชื่อเอกสาร"
                                  onChange={(event) =>
                                    titleFilter(event.target.value)
                                  }
                                />
                              </div>
                              <div className="col-md-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="รายละเอียด"
                                  onChange={(event) =>
                                    contentFilter(event.target.value)
                                  }
                                />
                              </div>
                              <div className="col-md-3">
                                <select
                                  className="form-control"
                                  aria-label="Default select example"
                                  onChange={(event) =>
                                    categoryFilter(event.target.value)
                                  }
                                >
                                  <option selected value="">
                                    เลือกประเภท
                                  </option>
                                  <option value="เอกสารบริษัท">
                                    เอกสารบริษัท
                                  </option>
                                  <option value="เอกสารจัดซื้อ">
                                    เอกสารจัดซื้อ
                                  </option>
                                  <option value="เอกสารประกาศ">
                                    เอกสารประกาศ
                                  </option>
                                  <option value="เอกสารทั่วไป">
                                    เอกสารทั่วไป
                                  </option>
                                </select>
                              </div>
                              <div className="col-md-3">
                                <select
                                  className="form-control"
                                  aria-label="Default select example"
                                  onChange={(event) =>
                                    departmentFilter(event.target.value)
                                  }
                                >
                                  <option selected value="">
                                    เลือกหน่วยงาน
                                  </option>
                                  <option value="การขาย">การขาย</option>
                                  <option value="การตลาด">การตลาด</option>
                                  <option value="ไอที">ไอที</option>
                                  <option value="ฝ่ายบุคคล">ฝ่ายบุคคล</option>
                                  <option value="ฝ่ายวางแผน">ฝ่ายวางแผน</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DataTable
                      style={{
                        fontFamily: "Prompt",
                      }}
                      withBorder
                      highlightOnHover
                      fontSize={"md"}
                      verticalSpacing="md"
                      paginationSize="md"
                      withColumnBorders
                      fetching={loading}
                      idAccessor="_id"
                      columns={[
                        {
                          accessor: "index",
                          title: "#",
                          textAlignment: "center",
                          width: 80,
                          render: (record) => records.indexOf(record) + 1,
                        },
                        {
                          accessor: "title",
                          title: "ชื่อเอกสาร",
                        },
                        { accessor: "content", title: "รายละเอียด" },
                        { accessor: "category", title: "ประเภท" },
                        { accessor: "department", title: "หน่วยงาน" },
                        { accessor: "author", title: "จัดทำโดย" },
                        {
                          accessor: "created_at",
                          title: "วันที่จัดทำ",
                          textAlignment: "center",
                          render: ({ created_at }) =>
                            dayjs(created_at).format("DD-MMM-YYYY"),
                        },
                        {
                          accessor: "actions",
                          textAlignment: "center",
                          title: "Actions",
                          width: 200,
                          render: (blogs) => (
                            <>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleViewShow(blogs)}
                              >
                                <i className="fa fa-eye"></i>
                              </Button>{" "}
                              <a
                                className="btn btn-info btn-sm"
                                target="_blank"
                                href={
                                  "https://full-stack-app.com/laravel_auth_jwt_api/public/uploads/documents/" +
                                  blogs.path
                                }
                              >
                                <i className="fa fa-download"></i>
                              </a>{" "}
                              <Button
                                variant="info"
                                size="sm"
                                onClick={() => handleEditShow(blogs)}
                              >
                                <i className="fa fa-edit"></i>
                              </Button>{" "}
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => hanldeDelete(blogs)}
                              >
                                <i className="fa fa-trash"></i>
                              </Button>
                            </>
                          ),
                        },
                      ]}
                      records={records}
                      minHeight={200}
                      totalRecords={blogs.length}
                      recordsPerPage={pageSize}
                      page={page}
                      onPageChange={(p) => setPage(p)}
                      recordsPerPageOptions={PAGE_SIZES}
                      onRecordsPerPageChange={setPageSize}
                    />
                    {/* Create Blog Madal */}
                    <Modal centered show={createShow}>
                      <Modal.Header>
                        <Modal.Title>เพิ่มเอกสาร</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Row>
                            <Form.Group as={Col} md="12">
                              <Form.Label>ชื่อเอกสาร</Form.Label>
                              <Form.Control
                                placeholder="Enter your title"
                                {...register("title", { required: true })}
                              />
                              {errors.title && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            {/* <Form.Group as={Col} md="12">
                              <Form.Label>รายละเอียด</Form.Label> */}
                            {/* <Form.Control
                                placeholder="Enter your content"
                                {...register("content", { required: true })}
                              /> */}
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="exampleForm.ControlTextarea1"
                            >
                              <Form.Label>รายละเอียด</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter your content"
                                {...register("content", { required: true })}
                              />
                              {errors.content && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>ประเภท</Form.Label>
                              {/* <Form.Control
                                placeholder="Enter your category"
                                {...register("category", { required: true })}
                              /> */}
                              <select
                                className="form-control"
                                aria-label="Default select example"
                                {...register("category", { required: true })}
                              >
                                <option selected value="">
                                  เลือกประเภท
                                </option>
                                <option value="เอกสารบริษัท">
                                  เอกสารบริษัท
                                </option>
                                <option value="เอกสารจัดซื้อ">
                                  เอกสารจัดซื้อ
                                </option>
                                <option value="เอกสารประกาศ">
                                  เอกสารประกาศ
                                </option>
                                <option value="เอกสารทั่วไป">
                                  เอกสารทั่วไป
                                </option>
                              </select>
                              {errors.category && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>หน่วยงาน</Form.Label>
                              {/* <Form.Control
                                placeholder="Enter your department"
                                {...register("department", { required: true })}
                              /> */}
                              <select
                                className="form-control"
                                aria-label="Default select example"
                                {...register("department", { required: true })}
                              >
                                <option selected value="">
                                  เลือกหน่วยงาน
                                </option>
                                <option value="การขาย">การขาย</option>
                                <option value="การตลาด">การตลาด</option>
                                <option value="ไอที">ไอที</option>
                                <option value="ฝ่ายบุคคล">ฝ่ายบุคคล</option>
                                <option value="ฝ่ายวางแผน">ฝ่ายวางแผน</option>
                              </select>
                              {errors.department && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>จัดทำโดย</Form.Label>
                              <Form.Control
                                readOnly
                                value={userDatail().name}
                                {...register("author", { required: true })}
                              />
                              {errors.author && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <div className="form-group ml-2">
                              <label htmlFor="">ไฟล์อัพโหลด</label>
                              <br />
                              <input
                                type="file"
                                {...register("path", { required: true })}
                              />
                              <br />
                              {errors.path && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </Row>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="primary"
                          onClick={handleSubmit(handleCreateSubmit)}
                        >
                          Submit
                        </Button>
                        <Button variant="secondary" onClick={CreateClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    {/* Edit Blog Madal */}
                    <Modal centered show={editShow}>
                      <Modal.Header>
                        <Modal.Title>แก้ไขเอกสาร</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Row>
                            <Form.Group as={Col} md="12">
                              <Form.Label>ชื่อเอกสาร</Form.Label>
                              <Form.Control
                                {...register("title", { required: true })}
                              />
                              {errors.title && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="exampleForm.ControlTextarea1"
                            >
                              <Form.Label>รายละเอียด</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter your content"
                                {...register("content", { required: true })}
                              />
                              {errors.content && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>ประเภท</Form.Label>
                              <select
                                className="form-control"
                                aria-label="Default select example"
                                {...register("category", { required: true })}
                              >
                                <option selected value="">
                                  เลือกประเภท
                                </option>
                                <option value="เอกสารบริษัท">
                                  เอกสารบริษัท
                                </option>
                                <option value="เอกสารจัดซื้อ">
                                  เอกสารจัดซื้อ
                                </option>
                                <option value="เอกสารประกาศ">
                                  เอกสารประกาศ
                                </option>
                                <option value="เอกสารทั่วไป">
                                  เอกสารทั่วไป
                                </option>
                              </select>
                              {errors.category && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>หน่วยงาน</Form.Label>
                              {/* <Form.Control
                                {...register("department", { required: true })}
                              /> */}
                              <select
                                className="form-control"
                                aria-label="Default select example"
                                {...register("department", { required: true })}
                              >
                                <option selected value="">
                                  เลือกหน่วยงาน
                                </option>
                                <option value="การขาย">การขาย</option>
                                <option value="การตลาด">การตลาด</option>
                                <option value="ไอที">ไอที</option>
                                <option value="ฝ่ายบุคคล">ฝ่ายบุคคล</option>
                                <option value="ฝ่ายวางแผน">ฝ่ายวางแผน</option>
                              </select>
                              {errors.department && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>จัดทำโดย</Form.Label>
                              <Form.Control
                                readOnly
                                {...register("author", { required: true })}
                              />
                              {errors.author && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <div className="form-group ml-2">
                              <label htmlFor="">ไฟล์อัพโหลด</label>
                              <br />
                              <input
                                type="file"
                                {...register("path", { required: false })}
                              />
                              <br />
                              {errors.path && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </Row>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="primary"
                          onClick={handleSubmit(handleEditSubmit)}
                        >
                          Submit
                        </Button>
                        <Button variant="secondary" onClick={EditClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    {/* View Blog Madal */}
                    <Modal centered show={viewShow}>
                      <Modal.Header>
                        <Modal.Title>รายละเอียดเอกสาร</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form.Group>
                          <Form.Label>ชื่อเอกสาร</Form.Label> : {title}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>รายละเอียด</Form.Label> : {content}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>ประเภท</Form.Label> : {category}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>หน่วยงาน</Form.Label> : {department}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>จัดทำโดย</Form.Label> : {author}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>ไฟล์เอกสาร</Form.Label> :{" "}
                          <a
                            href={
                              "https://full-stack-app.com/laravel_auth_jwt_api/public/uploads/documents/" +
                              path
                            }
                            target="_blank"
                          >
                            ดาวน์โหลด
                          </a>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>วันที่จัดทำ</Form.Label> :{" "}
                          {dayjs(created).format("DD-MMMM-YYYY")}
                        </Form.Group>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={ViewClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
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

export default blogs;
