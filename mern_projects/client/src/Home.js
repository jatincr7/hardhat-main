//import { Link } from 'react-router-dom'
import React, { useState } from "react";
import axios from 'axios';

function Home() {
  const [selectedFile, setSelectedFile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitForm = () => {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profileImg", selectedFile);

        console.log("formdata : ", formData)
        axios
          .post("http://localhost:8080/auth/sign-up", formData)
            .then((res) => {
            alert("File Upload success");
          })
            .catch((err) =>
 
                alert("File Upload Error",err));
      };

    return (
        <div className="text-center m-5-auto">
            <h5>Create your personal account</h5>
            <form>
                <p>
                    <label>Email address</label><br/>
                    <input
                        type="email"
                        value={email}
                        name="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input
                        type="password"
                        value={password}
                        name="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                </p>
                <p>
                {/* <input type="file" ref={this.fileInput} /> */}
                <input
                    type="file"
                    value={ ""}
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    />                
                </p>
                <p>
                    <button id="sub_btn" type="button"  onClick={submitForm} >Register</button>
                </p>
            </form>
            {/* <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer> */}
        </div>
    )
}

export default Home;
