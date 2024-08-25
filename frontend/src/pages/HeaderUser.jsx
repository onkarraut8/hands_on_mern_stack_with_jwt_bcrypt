import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderUser = () => {
  let navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-user"));
  var nname ="";
  if(user != null){
     nname = user.name
  }

  
  const userLogout = (e) => {
    e.preventDefault();
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-user");
    sessionStorage.removeItem("jwtToken");
    navigate("/home");
    window.location.reload(false);
  };

  return (



    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">

      <li class="nav-item">
        <Link to="/user/mycart" class="nav-link active" aria-current="page">
          <b class="custom-bg-text">My Cart</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link to="/user/myorder" class="nav-link active" aria-current="page">
          <b class="custom-bg-text">My Order</b>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/users/update"
          className="nav-link active"
        >
          <b className="custom-bg-text">Update Profile</b>
        </Link>

      </li>

      <li className="nav-item">
        <Link
          to="/user/changepass"
          className="nav-link active"
        >
          <b className="custom-bg-text"> Change Password </b>
        </Link>
        <ToastContainer />
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={userLogout}
        >
          <b class="custom-bg-text">[{nname}] Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default HeaderUser;
