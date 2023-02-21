import React from "react";
import { Client, Account } from "appwrite";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Link from "next/link";
import { FaJenkins } from "react-icons/fa";

const Appwrite = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [fetchedData, setFetchedData] = useState([""]);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: "", message: "" });
    updateData();
  };

  const client = new Client()
    .setEndpoint("http://localhost/v1") // Your API Endpoint
    .setProject("63eb5890d998007694c3"); // Your project ID

  const account = new Account(client);

  const updateData = () => {
    const promise = account.createEmailSession(
      `${formData.email}`,
      `${formData.password}`
    );

    promise.then(
      function (response) {
        if (response.current == true) {
          setIsOpen(true);
          const account = account.getPrefs();
          account.then(
            function (res) {
              setFetchedData((prevData) => [...prevData, res]); //Success
            },
            function (error) {
              console.log(error); // Failure
            }
          );
        }
        setIsOpen(false);
      },
      function (error) {
        console.log(error); //Failure
      }
    );
  };
  return (
    <div>
      {isOpen ? (
        <main className="main-container">
          <div className="title">
            <FaJenkins />
            <div className="header">
              <h2>Bilbo Baggins</h2>
              <h4>date of birth: 22 September T.A. 2890 (131)</h4>
            </div>
          </div>
          {fetchedData.map((value) => {
            const { id, gender, group, weight, height, address, email } = value;
            return (
              <div key={id} className="data">
                <p>gender: {gender}</p>
                <p>blood group: {group}</p>
                <p>weight: {weight}</p>
                <p>height: {height}</p>
                <p>address: {address}</p>
                <p>email: {email}</p>
              </div>
            );
          })}
          <Link href="/" className="log-btn">
            Log out
          </Link>
        </main>
      ) : (
        <div className={styles.AppwriteContainer}>
          <p>Please enter your user credentials to access your bio data.</p>
          <form onSubmit={handleSubmit}>
            <div className={styles.label}>
              <label>email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <label>password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button onClick={() => setIsOpen(true)} className="sub appwrite">
                Sign in
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Appwrite;
