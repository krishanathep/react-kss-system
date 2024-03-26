import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import moment from "moment";
import dayjs from "dayjs";

export default function meeting() {
  const localizer = momentLocalizer(moment);
  const userDatail = useAuthUser();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [id, setEditId] = useState("");

  //create popup
  const [createShow, setCreateShow] = useState(false);
  const CreateClose = () => setCreateShow(false);
  //view popup
  const [viewShow, setViewShow] = useState(false);
  const ViewClose = () => setViewShow(false);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm();

  const getData = async () => {
    try {
      await axios
        .get(
          "https://full-stack-app.com/laravel_auth_jwt_api/public/api/events"
        )
        .then((res) => {
          console.log(res.data.events);
          setEvents(res.data.events);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDeleteEvent = () => {
    axios
      .delete(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/event-delete/" +
          id
      )
      .then((res) => {
        console.log(res.data.event);
        setViewShow(false);
        toast.success('Deleted Successfully!',{duration: 3000})
        getData();
      });
  };

  const handleSelectMeeting = async (event) => {
    setViewShow(true);
    await axios
      .get(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/event/" +
          event.id
      )
      .then((res) => {
        console.log(res);
        setEditId(res.data.event.id);
        reset({
          title: res.data.event.title,
          detail: res.data.event.detail,
          user: res.data.event.user,
          start: res.data.event.start,
          end: res.data.event.end,
        });
      });
  };

  const handleSelectEvent = ({ start, end }) => {
    setCreateShow(true);
    setStart(dayjs(start).format("YYYY-MM-DD"));
    setEnd(dayjs(end).format("YYYY-MM-DD"));
    resetField("start");
    resetField("end");
  };

  const handleUpdateEvent = async (data) => {
    await axios
      .put(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/event-update/" +
          id,
        data
      )
      .then((res) => {
        console.log(res.data.event);
        reset({
          title: "",
          detail: "",
        });
        setViewShow(false);
        toast.success('Updated Successfully!',{duration: 3000})
        getData();
      });
  };

  const handleCreateEvent = async (data) => {
    await axios
      .post(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/event-create",
        data
      )
      .then((res) => {
        console.log(res.data.event);
        reset({
          title: "",
          detail: "",
        });
        setCreateShow(false);
        toast.success('Created Successfully!',{duration: 3000})
        getData();
      });
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Meeting rooms</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Mettings-rooms</li>
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
              <Toaster position="top-right" reverseOrder={false} />
                <div className="card-body">
                  <Calendar
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600 }}
                    events={events}
                    onSelectEvent={handleSelectMeeting}
                    onSelectSlot={handleSelectEvent}
                    selectable
                  />
                  {/* Create Blog Madal */}
                  <Modal centered show={createShow}>
                    <Modal.Header>
                      <Modal.Title>Create Meeting</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Row>
                          <Form.Group as={Col} md="12">
                            {/* <Form.Label>User</Form.Label> */}
                            <Form.Control
                              hidden
                              value={userDatail().name}
                              {...register("user", { required: true })}
                            />
                            {errors.user && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </Form.Group>
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
                            <Form.Label>Detail</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              {...register("detail", { required: true })}
                            />
                            {errors.detail && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </Form.Group>
                          <Form.Group as={Col} md="12">
                            {/* <Form.Label>Start</Form.Label> */}
                            <Form.Control
                              hidden
                              value={start}
                              {...register("start", { required: true })}
                            />
                          </Form.Group>
                          <Form.Group as={Col} md="12">
                            {/* <Form.Label>End</Form.Label> */}
                            <Form.Control
                              hidden
                              value={end}
                              {...register("end", { required: true })}
                            />
                          </Form.Group>
                        </Row>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={handleSubmit(handleCreateEvent)}
                      >
                        Submit
                      </Button>
                      <Button variant="secondary" onClick={CreateClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  {/* Update Meeting Madal */}
                  <Modal centered show={viewShow}>
                    <Modal.Header>
                      <Modal.Title>Update Meeting</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Row>
                          <Form.Group as={Col} md="12">
                            {/* <Form.Label>User</Form.Label> */}
                            <Form.Control
                              hidden
                              value={userDatail().name}
                              {...register("user", { required: true })}
                            />
                            {errors.user && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </Form.Group>
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
                            <Form.Label>Detail</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              {...register("detail", { required: true })}
                            />
                            {errors.detail && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </Form.Group>
                          <Form.Group as={Col} md="12">
                            {/* <Form.Label>Start</Form.Label> */}
                            <Form.Control
                              hidden
                              value={start}
                              {...register("start", { required: true })}
                            />
                          </Form.Group>
                          <Form.Group as={Col} md="12">
                            {/* <Form.Label>End</Form.Label> */}
                            <Form.Control
                              hidden
                              value={end}
                              {...register("end", { required: true })}
                            />
                          </Form.Group>
                        </Row>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={handleSubmit(handleUpdateEvent)}
                      >
                        Submit
                      </Button>
                      <Button variant="danger" onClick={handleDeleteEvent}>
                        Delete
                      </Button>
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
  );
}
