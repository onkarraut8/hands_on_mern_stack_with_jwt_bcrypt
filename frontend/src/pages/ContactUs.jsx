import React from 'react'
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";


const ContactUs = () => {

  const [Contact, setCon] = useState({
    name: "",
    email: "",
    message: "",
  });
  console.log(Contact)
  const handleUserInput = (e) => {
    e.preventDefault();
    setCon({ ...Contact, [e.target.name]: e.target.value });
  };

  const saveCon = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Contact),
    }).then((result) => {
      console.log("near toast thing");

      toast.success("Data recorded successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.warn("result", result);
      result
        .json()
        .then((res) => {
          console.log("response", res);
        })
        .catch((error) => {
          console.log("******", error);
          console.log(error);
        });
    });
  };
  return (
    <div className="container card mt-5 card border-color custom-bg">
      <div className="mb-3 card-header bg-color custom-bg-text">
        <h2 >Contact Form </h2>
      </div>
      <form onSubmit={saveCon}>
        <div className="mb-3 mx-3">
          <label className="form-label fw-bold fs-5" htmlFor="name">
            Name
          </label>
          <input required className="form-control" type="text" id="name" placeholder="Enter Full Name"
            name="name" onChange={handleUserInput} value={Contact.name} />
        </div>
        <div className="mb-3 mx-3">
          <label className="form-label fw-bold fs-5" htmlFor="email"  >
            Email
          </label>
          <input className="form-control" type="email" id="email" placeholder="Enter EmailId" name="email" onChange={handleUserInput} value={Contact.email} required />
        </div>
        <div className="mb-3 mx-3">
          <label className="form-label fw-bold fs-5" htmlFor="message">
            Message
          </label>
          <textarea className="form-control" id="message" name="message" placeholder="Enter Message" onChange={handleUserInput} value={Contact.message} required />
        </div>
        <input className="btn btn-light bg-color text-white mx-3 mb-3" type="submit"
          value="Send"
        />
        <ToastContainer />
      </form>
        {/* <CommentBox/> */} 
        
    </div>
  )
};

export default ContactUs;