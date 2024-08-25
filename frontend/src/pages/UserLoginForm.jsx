import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


const UserLoginFrom = () => {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    email: "",
    password: "",
  });


  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      ///implentation
      // console.log('proceed');
      fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginRequest),
      }).then((res) => {
        return res.json();
      }).then((resp) => {
        console.log(resp);
        console.log(resp.token);
        console.log(resp.user);
        console.log("Email: " + resp.user.email);
        if (resp.user.email === loginRequest.email.toLowerCase()) {
          toast.success('Success');
          if (resp.user.role.toUpperCase() === "ADMIN") {
            console.log("Working fine:");
            sessionStorage.setItem("jwtToken",resp.token);
            sessionStorage.setItem("active-admin", JSON.stringify(resp.user));

            //localStorage.setItem('active-admin', JSON.stringify(resp.user));
            //localStorage.setItem('jwtToken', resp.token );

          } else if (resp.user.role.toUpperCase() === "USER") {
            sessionStorage.setItem("jwtToken", resp.token);
            sessionStorage.setItem("active-user", JSON.stringify(resp.user));

            //localStorage.setItem('active-user', JSON.stringify(resp.user));
            //localStorage.setItem('jwtToken', resp.token );
          }
          navigate('/');
          window.location.reload(false);
        } else {
          toast.error('Please Enter valid credentials');
        }
      }).catch(() => {
        toast.error('Login Failed due to incorrect password :');
      });
    }
  }


  const validate = () => {
    let result = true;
    if (loginRequest.email === '' || loginRequest.email === null) {
      result = false;
      toast.warning('Please Enter Username');
    }
    if (loginRequest.password === '' || loginRequest.password === null) {
      result = false;
      toast.warning('Please Enter Password');
    }
    return result;
  }

  return (
    <div style={{minHeight: "30rem",}}>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card border-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color text-center custom-bg-text">
            <h4 className="card-title">Login</h4>
          </div>
          <div className="card-body">
            <form onSubmit={ProceedLogin}>
              
              <div className="mb-3 text-color">
                <label for="email" class="form-label">
                  <b>Email Id</b><span className="errmsg">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter EmailId"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Enter Valid email"
                  onChange={handleUserInput}
                  value={loginRequest.email}
                />

              </div>
              <div className="mb-3 text-color">
                <label for="password" className="form-label">
                  <b>Password</b><span className="errmsg">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[!@#$%^&*+`~=?\|<>/]).{8,}"
                  title="Must contain at least one  number,at least one special character, one uppercase and lowercase letter, and at least 8 or more characters"
                  onChange={handleUserInput}
                  placeholder="Enter Password"
                  value={loginRequest.password}
                  autoComplete="on"

                />{/* <i id="togglePassword" style={{marginLeft:"-40px", marginTop:"px",fontSize:"20px", cursor: "pointer",}}>&#128065;</i></div> */}

              </div>
              <button
                type="submit"
                className="btn btn-light bg-color custom-bg-text mt-4 mb-4"
              >
                Login
              </button>
              <ToastContainer />
              <div align="justify" class="container-fluid navbar-bar mt-3">
                <ul class="navbar mb-1 me-auto">
                  <li class="nav-link">
                    <Link to="/user/login/forgotpass" class="nav-link active" aria-current="page">
                      <b className="text-color btn btn-light bg-color custom-bg-text ">Forgot Password click here</b>
                    </Link></li>
                  <li class="nav-link">
                    <Link to="/user/register" class="nav-link active" aria-current="page">
                      <b className="text-color btn btn-light bg-color custom-bg-text ">Register</b>
                    </Link></li></ul></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginFrom;
