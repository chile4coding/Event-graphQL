import React, { useRef, useState } from "react";
import Layout from "../components/Navigation/MainNavigation";
import "./Auth.css";

export default function AuthPage() {
  const email = useRef();
  const password = useRef();
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const setMessageHanlder = (mssg, state) => {
    setMessage(mssg);
    setIsSuccess(state);
    setTimeout(() => {
      setMessage(false);
      setIsSuccess(state);
    }, 3000);
  };

  const submitHanlder = async (e) => {
    e.preventDefault();
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    let requestBody;
    if (isLoggedIn) {
      requestBody = {
        query: `
      query {
        login(email: "${emailValue}", password: "${passwordValue}") {
       userId
       token
       tokenExpiration

        }
      }`,
      };
    } else {
      requestBody = {
        query: `
   mutation {
     createUser(userInput: {email: "${emailValue}", password: "${passwordValue}"}) {
    _id
       email

     }
   }`,
      };
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed");
      }

      const data = await res.json();
      if (data?.errors) {
        setMessageHanlder(data.errors[0].message, false);
      } else {
        if (isLoggedIn) {
          localStorage.setItem("userId", data.data.login.userId);
          localStorage.setItem("token", data.data.login.token);
          localStorage.setItem(
            "tokenExpiration",
            data.data.login.tokenExpiration
          );
          setMessageHanlder("user login successfully", true);
        } else {
          setMessageHanlder(
            "user created successfully" + data.data.createUser.email,
            true
          );
        }
      }
    } catch (error) {
      setMessageHanlder("Error occurred, please try again", false);
    }

    setLoading(false);
  };

  const switchHandler = () => {
    setIsLoggedIn((prev) => !prev);
  };
  return (
    <Layout>
      <div>
        <form className="auth-form" onSubmit={submitHanlder}>
          <div>
            <p
              className={`${isSuccess ? "success" : "error"} ${
                message ? "show" : "hide"
              }`}>
              {" "}
              {message}.
            </p>
          </div>
          <div className=" form-control">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={email} />
          </div>
          <div className=" form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id="passwordl" ref={password} />
          </div>

          <div className="form-actions">
            <button type="button" onClick={switchHandler}>
              Switch to {isLoggedIn ? "Signup" : "Login"}
            </button>
            <button type="submit">{loading ? "Submittting" : "Submit"}</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
