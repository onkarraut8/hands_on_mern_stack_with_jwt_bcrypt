
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const HomePage = () => {


  const [data, setData] = useState([]);
  const [btn, setBtn] = useState("Save");

  const user = JSON.parse(sessionStorage.getItem("active-user"));

  const token = sessionStorage.getItem("jwtToken");

  // State to manage form fields
  const [formData, setFormData] = useState({
    id: "",
    name: 'ABC',
    price: '', // Default status
    category: '', // Default status
    title: '' // Default status
  });

  // Handle input change
  const handleChange = (event) => {
    //const { name, value } = event.target;
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };


  const fetchData = async () => {
    try {
      //const token = localStorage.getItem('jwtToken'); 
      const response = await axios.get('http://localhost:5000/book/all' ,{
        headers: {
          /* 'Authorization': `Bearer ${token}` */
          'x-access-token': token // Include the token in the header
        }
      });
      setData(response.data);
    } catch (err) {
      alert("Error " + err.message);
      console.log(err.message);
    }
  };


  const deleteTask = async (id) => {
    //e.preventDefault();
    console.log("d " + id);
    try {
      //const token = localStorage.getItem('jwtToken'); 
      const resp = await axios.delete(`http://localhost:5000/book/${id}`,{
        headers: {
          /* 'Authorization': `Bearer ${token}` */
          'x-access-token': token // Include the token in the header
        }
      });
      //navigate(`/item/${id}`); // Redirect to the item detail page or another page
      console.log(resp.data);
      alert("Delete " + resp.data);
      fetchData();
    } catch (err) {
      alert("Delete error" + err.message);

    }
  }



  // Use effect to call fetchData when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchTAskById = async (id) => {
    try {
      //const token = localStorage.getItem('jwtToken'); 
      const response = await axios.get(`http://localhost:5000/book/${id}`,{
        headers: {
          /* 'Authorization': `Bearer ${token}` */
          'x-access-token': token // Include the token in the header
        }
      });
      alert("Result " + response.data);
    } catch (err) {
      alert("Error " + err.message);
    }
  };

  const updateSetTask = (item) => {
    setBtn("Update");
    console.log(JSON.stringify(item) + " q");
    //console.log(formData.taskStatus+" q "+item.taskStatus);
    setFormData({
      id: item._id,
      name: item.name,
      price: item.price,
      category: item.category,
      title: item.title
    });

  };

  const saveTask = (e) => {
    e.preventDefault();
    //const token = localStorage.getItem('jwtToken'); 
    fetch("http://localhost:5000/book/save", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token // Include the token in the header
        /* 'Authorization': `Bearer ${token}` */
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          console.log(response + " 1");
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        alert("Result " + data);
        //setResponse(data);
        setFormData({
          id: "",
          name: "ABC",
          price: "",
          category: "",
          title: ""
        });
        fetchData();

      }).catch(err => {
        alert("Error " + err.message);
        console.error('Error:', err);

      });

  };

  const updateTask = (e) => {
    e.preventDefault();
    //const token = localStorage.getItem('jwtToken'); 
    axios.put(`http://localhost:5000/book/${formData.id}`, formData, {
      headers: {
       /*  'Authorization': `Bearer ${token}`, */
        'x-access-token': token // Include the token in the header
        /* 'Content-Type': 'application/json' // Optional: if your server requires this */
      }
    })
      .then((result) => {
        // Handle success
        alert("Result " + result.data);
        setFormData({
          id: "",
          name: "ABC",
          price: "",
          category: "",
          title: ""
        });
        setBtn('Save');
        fetchData();
        console.error('Error updating data:', result.data);
      })
      .catch((err) => {
        // Handle error
        alert("Error " + err.message);
        console.error('Error updating data:', err);
      });
  }


  const saveORUpdate = (e) => {
    if (btn === "Save") {
      saveTask(e);

    }
    if (btn === "Update") {
      updateTask(e)
    }

  }
  return (

    <div className="container mt-4">
      <h2>Books</h2>
      <form onSubmit={saveORUpdate}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Book Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">price</label>
          <input
            type="text"
            id="price"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Category" className="form-label">Category</label>
          <select
            id="category"
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="SELECT">Select</option>
            <option value="BOOK">Book</option>
            <option value="E-BOOK">E-Book</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="Title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">{btn}</button>
      </form>

      <table class="table" style={{ height: "250px" }}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Book Name</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Title</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>{item.title}</td>
              <td><button className='btn btn-primary' onClick={() => updateSetTask(item)}>edit</button></td>
              <td><button className='btn btn-primary' onClick={() => deleteTask(item._id)}>Delete</button></td>
            </tr>
          ))}



        </tbody>
      </table>
    </div>

  )
};




export default HomePage;
/* export {home}; */

