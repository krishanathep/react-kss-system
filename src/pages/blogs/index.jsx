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
      author: "",
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
  const [author, setAuthor] = useState("");
  const [created, setCreated] = useState("");
  const [image, setImage] = useState("");

  const getData = async () => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get("https://full-stack-app.com/laravel_auth_jwt_api/public/api/blogs")
      .then((res) => {
        setBlogs(res.data.blogs);
        setRecords(res.data.blogs.slice(from, to));
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
            "https://full-stack-app.com/laravel_auth_jwt_api/public/api/blog-delete/" +
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
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/blog/" +
          blogs.id
      )
      .then((res) => {
        console.log(res);
        setTitle(res.data.blog.title);
        setContent(res.data.blog.content);
        setAuthor(res.data.blog.author);
        setCreated(res.data.blog.created_at);
        setImage(res.data.blog.image);
      });
  };

  const handleEditShow = async (blogs) => {
    setEditShow(true);
    await axios
      .get(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/blog/" +
          blogs.id
      )
      .then((res) => {
        setEditId(res.data.blog.id);
        console.log(res);
        reset({
          title: res.data.blog.title,
          content: res.data.blog.content,
          author: res.data.blog.author,
        });
      });
  };

  const handleEditSubmit = async (data) => {
    const formData = new FormData();

    formData.append("_method", "put");
    formData.append("image", data.image[0]);
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("author", data.author);

    await axios
      .post(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/blog-update/" +
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

    formData.append("image", data.image[0]);
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("author", data.author);

    await axios
      .post(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/blog-create",
        formData
      )
      .then((res) => {
        console.log(res.data);
        getData();
        reset({
          title: "",
          content: "",
          author: "",
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
                <h1 className="m-0">Webboard list</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Webboard</li>
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
                            <i className="fa fa-plus"></i> Webboard
                          </button>
                        </div>
                      </div>
                    </div>
                    <DataTable
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
                          accessor: "image",
                          title: "Image",
                          textAlignment: "center",
                          render: ({ image }) => (
                            <>
                              <Image
                                src={
                                  "https://full-stack-app.com/laravel_auth_jwt_api/public/uploads/" +
                                  image
                                }
                                width={"100"}
                                thumbnail
                              />
                            </>
                          ),
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
                    {/* Create Blog Madal */}
                    <Modal centered show={createShow}>
                      <Modal.Header>
                        <Modal.Title>Webboard create</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Row>
                            <Form.Group as={Col} md="12">
                              <Form.Label>Title</Form.Label>
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
                              <Form.Label>Content</Form.Label>
                              <Form.Control
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
                              <Form.Label>Author</Form.Label>
                              <Form.Control
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
                              <label htmlFor="">File upload</label>
                              <br />
                              <input
                                type="file"
                                {...register("image", { required: true })}
                              />
                              <br />
                              {errors.image && (
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
                          Save Changes
                        </Button>
                        <Button variant="secondary" onClick={CreateClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    {/* Edit Blog Madal */}
                    <Modal centered show={editShow}>
                      <Modal.Header>
                        <Modal.Title>Webboard update</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Row>
                            <Form.Group as={Col} md="12">
                              <Form.Label>Title</Form.Label>
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
                              <Form.Label>Content</Form.Label>
                              <Form.Control
                                {...register("content", { required: true })}
                              />
                              {errors.content && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>Author</Form.Label>
                              <Form.Control
                                {...register("author", { required: true })}
                              />
                              {errors.author && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <div className="form-group ml-2">
                              <label htmlFor="">File upload</label>
                              <br />
                              <input
                                type="file"
                                {...register("image", { required: false })}
                              />
                              <br />
                              {errors.image && (
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
                          Save Changes
                        </Button>
                        <Button variant="secondary" onClick={EditClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    {/* View Blog Madal */}
                    <Modal centered show={viewShow}>
                      <Modal.Header>
                        <Modal.Title>Webboard view</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Image
                          className="mb-3"
                          src={
                            "https://full-stack-app.com/laravel_auth_jwt_api/public/uploads/" +
                            image
                          }
                          width={"500"}
                          thumbnail
                        />
                        <Form.Group>
                          <Form.Label>Title</Form.Label> : {title}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Content</Form.Label> : {content}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Author</Form.Label> : {author}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Created</Form.Label> :{" "}
                          {dayjs(created).format("DD-MMMM- YYYY")}
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
