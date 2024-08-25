
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div>


      <div className="bod,dev ">
        <div className="about-section">
          <div><h1>About Us</h1></div>
          <p>Some text about who we are and what we do.</p>

        </div>

        <div><h2 className="hea">Our Team</h2></div>
        <div className="row d-flex justify-content-center">
          <div className="column">
            <div className="card">
              <img src="" alt="Abc" className="imge" />
              <div className="container">
                <div><h2>Abc Def</h2></div>
                <p className="title">CEO & Founder</p>
                <p>Some text that describes me.</p>
                <p>abc@example.com</p>
                <p><Link to="/contact"><button className="button custom-bg-text">  Contact</button></Link></p>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <img src=" " alt="Abc" className="imge" />
              <div className="container">
                <div><h2>Abc Def</h2></div>
                <p className="title">Art Director</p>
                <p>Some text that describes me.</p>
                <p>abc@example.com</p>
                <p><Link to="/contact"><button className="button custom-bg-text">  Contact</button></Link></p>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <img src="" alt="Abc" className="imge" />
              <div className="container">
                <div><h2>Abc Def</h2></div>
                <p className="title">Designer</p>
                <p>Some text that describes me.</p>
                <p>abc@example.com</p>
                <p><Link to="/contact"><button className="button custom-bg-text">  Contact</button></Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default AboutUs;
