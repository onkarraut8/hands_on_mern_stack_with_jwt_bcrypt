import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

const AddUserForm = () => {

  const [data, setData] = useState([]);
  


  useEffect(() => {

  }, [])


  const [user, setUser] = useState({
    name: "",
    role: "USER",
    email: "",
    password: ""
  });

  const [cpass, setCpass] = useState({
    confirmpassword: "",
  });

  const [error, setError] = useState({
    err: "",
  });

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const saveUser = () => {
    fetch("http://localhost:5000/user/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((result) => {
      
      //console.warn("result", result);
      result
        .json()
        .then((res) => {
          console.log("response", res);

           if(res.status !== 400){
            toast.success("Registered Successfully!!!", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
           }else{
            toast.success(res.message, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
           }

        })
        .catch((error) => {
          alert("Enter Another Email and Mobile No.");
          console.log("******", error);
          alert("Registered UnSuccessfully!!! emailId or mobile no. already register:"); 
        });
    });

  };

  const pass = (e) => {
    e.preventDefault();
    let inputError = {
      err: ""
    };
    if (cpass.confirmpassword === user.password) {
      saveUser();
    }
    else {
      console.log("pasword: " + user.password + " Conp: " + cpass.Conpass);
      setError({ ...inputError, err: "Password and confirm pasword should be same" })
      e.preventDefault();
      return
    }
  };

  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          class="card border-color text-color custom-bg"
          style={{ width: "50rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 class="card-title">Registration</h5>
          </div>
          <div class="card-body">
            <form onSubmit={pass}>
              <div class="d-flex justify-content-end m-0 p-0"><h8 className="mt-0 p-0" style={{color:"red"}}>Note: All * Mark fields are mandetory</h8></div>

              <div class="mb-3 text-color">
                <label for="title" class="form-label">
                  <b> Full Name</b><b style={{ color: "red" }}>*</b>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter full name"
                  onChange={handleUserInput}
                  value={user.name}
                  required
                />
              </div>
              

              <div className="mb-3 text-color">
                <b>
                  <label className="form-label">Email Id</label><b style={{ color: "red" }}>*</b>
                </b>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  name="email"
                  onChange={handleUserInput}
                  placeholder="Enter EmailId"
                  value={user.email}
                  required
                />
              </div>

              <div class="mb-3 text-color">
                <b>
                  <label for="Password" class="form-label ">
                    Password <b style={{ color: "red" }}>*</b>
                  </label>
                </b>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one  number,at least one special character, one uppercase and lowercase letter, and at least 8 or more characters"
                  onChange={handleUserInput}
                  value={user.password}
                  placeholder="Enter Password"
                  required
                />
              </div>

              <div class="mb-3 text-color">
                <b>
                  <label for="CPassword" class="form-label ">
                    Confirm Password <b style={{ color: "red" }}>*</b>
                  </label>
                </b>
                <input
                  type="password"
                  class="form-control"
                  id="confirmpassword"
                  name="confirmpassword"
                  onChange={e => setCpass({ ...cpass, [e.target.name]: e.target.value })}
                  placeholder="Confirm Password"
                  required
                />
                <p className="error-message"style={{ color: "red" }}>{error.err}</p>
              </div>

              <div class="mb-3 text-color">
                <label for="description" class="form-label">
                  <b><input type="checkbox" class="" id="check" title="Please aceept term and condition to proceed" name="check" required style={{ color: "red", width: "15px", height: "15px" }} /><a href="/about" target="blank" style={{ color: "red", marginLeft: "5px" }}>accept term & condition</a></b>
                </label>
              </div>

              <input
                type="submit"
                class="btn btn-light bg-color custom-bg-text"
                value="Register"
              />
              <div className="d-flex justify-content-end">
                 <a href="/user/login">Already Registered? Click here</a>
              </div>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
