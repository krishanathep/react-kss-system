import React, { useState, useEffect } from "react";
import { DataTable } from "mantine-datatable";
import { Modal, Button, Col, Form, Row, Badge } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";

import Swal from "sweetalert2";
import dayjs from "dayjs";
import axios from "axios";

const PAGE_SIZES = [10, 20, 30];

const Suggesions = () => {
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

  //KSS state
  const [title, setTitle] = useState("");
  const [created, setCreated] = useState("");
  const [objective, setobjective] = useState("");
  const [suggest, setsuggest] = useState("");
  const [suggest_type, setsuggest_type] = useState("");
  const [current, setcurrent] = useState("");
  const [improve, setimprove] = useState("");
  const [results, setresults] = useState("");
  const [status, setStatus] = useState("");
  const [cost, setcost] = useState("");
  const [date, setdate] = useState("");

  const getData = async () => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/ksssystems"
      )
      .then((res) => {
        setBlogs(res.data.ksssystems);
        setRecords(res.data.ksssystems.slice(from, to));
        setLoading(false);
      });
  };

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
            "https://full-stack-app.com/laravel_auth_jwt_api/public/api/ksssystem-delete/" +
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
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/ksssystem/" +
          blogs.id
      )
      .then((res) => {
        console.log(res);
        setTitle(res.data.ksssystem.title);
        setobjective(res.data.ksssystem.objective);
        setsuggest(res.data.ksssystem.suggest);
        setsuggest_type(res.data.ksssystem.suggest_type);
        setcurrent(res.data.ksssystem.current);
        setimprove(res.data.ksssystem.improve);
        setresults(res.data.ksssystem.results);
        setcost(res.data.ksssystem.cost);
        setStatus(res.data.ksssystem.status);
        setdate(res.data.ksssystem.date);
        setCreated(res.data.ksssystem.created_at)
      });
  };

  const handleEditShow = async (blogs) => {
    setEditShow(true);
    await axios
      .get(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/ksssystem/" +
          blogs.id
      )
      .then((res) => {
        setEditId(res.data.ksssystem.id);
        console.log(res);
        reset({
          title: res.data.ksssystem.title,
          objective: res.data.ksssystem.objective,
          suggest: res.data.ksssystem.suggest,
          suggest_type: res.data.ksssystem.suggest_type,
          current: res.data.ksssystem.current,
          improve: res.data.ksssystem.improve,
          results: res.data.ksssystem.results,
          cost: res.data.ksssystem.cost,
          date: res.data.ksssystem.date,
        });
      });
  };

  const handleEditSubmit = async (data) => {
    const formData = new FormData();

    formData.append("_method", "put");
    formData.append("title", data.title);
    formData.append("objective", data.objective);
    formData.append("suggest", data.suggest);
    formData.append("suggest_type", data.suggest_type);
    formData.append("current", data.current);
    formData.append("improve", data.improve);
    formData.append("results", data.results);
    formData.append("cost", data.cost);
    formData.append("date", data.date);

    await axios
      .post(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/ksssystem-update/" +
          editid,
        formData
      )
      .then((res) => {
        console.log(res.data);
        getData();
        setEditShow(false);
        Swal.fire({
          icon: "success",
          title: "Your KSS has been edited",
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
    await axios
      .post(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/ksssystem-create",
        data
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
                <h1 className="m-0">ข้อเสนอแนะทั้งหมด</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">หน้าแรก</a>
                  </li>
                  <li className="breadcrumb-item active">ข้อเสนอแนะ</li>
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
                            <i className="fa fa-plus"></i> เพิ่มข้อเสนอแนะ
                          </button>
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
                          title: "หัวข้อเรื่อง",
                        },
                        { accessor: "objective", title: "วัตถุประสงค์" },
                        { accessor: "suggest", title: "ผู้เสนอแนะ" },
                        // { accessor: "suggest_type", title: "ประเภทข้อเสนอแนะ" },
                        // { accessor: "current", title: "สภาพปัจุบัน" },
                        { accessor: "status", title: "สถานะการอนุมัติ",textAlignment: "center",
                          render: ({status}) => (
                            <>
                              <h5><Badge bg="primary">{status}</Badge></h5>
                            </>
                          )
                        },
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
                    {/* Create KSS Madal */}
                    <Modal centered show={createShow}>
                      <Modal.Header>
                        <Modal.Title>เพิ่มเอกสาร</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Row>
                            <Form.Group as={Col} md="12">
                              <Form.Label>หัวข้อเรื่อง</Form.Label>
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
                            <Form.Group as={Col} md="12">
                              <Form.Label>วัตถุประสงค์</Form.Label>
                              <Form.Control
                                placeholder="Enter your objective"
                                {...register("objective", { required: true })}
                              />
                              {errors.objective && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>ผู้เสนอแนะ</Form.Label>
                              <Form.Control
                                placeholder="Enter your suggest"
                                {...register("suggest", { required: true })}
                              />
                              {errors.suggest && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>ประเภทข้อเสนอแนะ</Form.Label>
                              <Form.Control
                                placeholder="Enter your suggest type"
                                {...register("suggest_type", { required: true })}
                              />
                              {errors.suggest_type && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>สภาพปัจุบัน</Form.Label>
                              <Form.Control
                                placeholder="Enter your current"
                                {...register("current", { required: true })}
                              />
                              {errors.current && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>แนวทางการปรับปรุง</Form.Label>
                              <Form.Control
                                placeholder="Enter your improve"
                                {...register("improve", { required: true })}
                              />
                              {errors.improve && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>ผลที่คาดว่าจะได้รับ</Form.Label>
                              <Form.Control
                                placeholder="Enter your results"
                                {...register("results", { required: true })}
                              />
                              {errors.results && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>ค่าใช้จ่าย/การลงทุน</Form.Label>
                              <Form.Control
                                placeholder="Enter your cost"
                                {...register("cost", { required: true })}
                              />
                              {errors.cost && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>กำหนดเสร็จ</Form.Label>
                              <Form.Control
                                placeholder="Enter your date"
                                {...register("date", { required: true })}
                              />
                              {errors.date && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            
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
                            <Form.Group as={Col} md="12">
                              <Form.Label>วัตถุประสงค์</Form.Label>
                              <Form.Control
                                placeholder="Enter your objective"
                                {...register("objective", { required: true })}
                              />
                              {errors.objective && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>ผู้เสนอแนะ</Form.Label>
                              <Form.Control
                                placeholder="Enter your suggest"
                                {...register("suggest", { required: true })}
                              />
                              {errors.suggest && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>ประเภทข้อเสนอแนะ</Form.Label>
                              <Form.Control
                                placeholder="Enter your suggest type"
                                {...register("suggest_type", { required: true })}
                              />
                              {errors.suggest_type && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>สภาพปัจุบัน</Form.Label>
                              <Form.Control
                                placeholder="Enter your current"
                                {...register("current", { required: true })}
                              />
                              {errors.current && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>แนวทางการปรับปรุง</Form.Label>
                              <Form.Control
                                placeholder="Enter your improve"
                                {...register("improve", { required: true })}
                              />
                              {errors.improve && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>ผลที่คาดว่าจะได้รับ</Form.Label>
                              <Form.Control
                                placeholder="Enter your results"
                                {...register("results", { required: true })}
                              />
                              {errors.results && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>ค่าใช้จ่าย/การลงทุน</Form.Label>
                              <Form.Control
                                placeholder="Enter your cost"
                                {...register("cost", { required: true })}
                              />
                              {errors.cost && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>กำหนดเสร็จ</Form.Label>
                              <Form.Control
                                placeholder="Enter your date"
                                {...register("date", { required: true })}
                              />
                              {errors.date && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
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
                          <Form.Label>หัวข้อเรื่อง</Form.Label> : {title}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>วัตถุประสงค์</Form.Label> : {objective}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>ผู้เสนอแนะ</Form.Label> : {suggest}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>ประเภทข้อเสนอแนะ</Form.Label> : {suggest_type}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>สภาพปัจุบัน</Form.Label> : {current}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>แนวทางการปรับปรุง</Form.Label> : {improve}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>ผลที่คาดว่าจะได้รับ</Form.Label> : {results}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>ค่าใช้จ่าย/การลงทุน</Form.Label> : {cost}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>สถานะการอนุมัติ</Form.Label> : <><Badge bg="primary">{status}</Badge></>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>กำหนดเสร็จ</Form.Label> :{" "}
                          {dayjs(date).format("DD-MMM-YYYY")}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>วันที่จัดทำ</Form.Label> :{" "}
                          {dayjs(created).format("DD-MMM-YYYY")}
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

export default Suggesions;
