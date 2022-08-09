import { Button } from "@mantine/core";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Main = () => {
  const [registered, setRegistered] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const { login } = useAuth();

  const signupHandle = (success, msg) => {
    if (success) {
      setRegistered(true);
    }
    setStatusMessage(msg);
    setShowStatus(true);
  };

  const loginHandle = (success, msg) => {
    setStatusMessage(msg.message);
    setShowStatus(true);

    if (success) {
      login(msg.user);
      <Navigate to="/dashboard" />;
    }
  };

  return (
    <>
      <div style={{ display: "flex", margin: "2rem" }}>
        <div
          style={{
            flex: "1",
            borderRight: "1px solid #aaa",
            textAlign: "center",
          }}
        >
          <h1 style={{ marginBottom: "4rem" }}>TestCar</h1>
          <h2 style={{ marginBottom: "2rem" }}>Welcome To TestCar</h2>
          <p>The best car registration company</p>
        </div>
        <div style={{ flex: "1" }}>
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                marginBottom: "4rem",
              }}
            >
              <Button
                onClick={() => {
                  setRegistered(!registered);
                  setShowStatus(false);
                }}
              >
                {registered ? "New to TestCar?" : "Already have an account?"}
              </Button>
            </div>
            {registered ? (
              <Login loginHandle={loginHandle} />
            ) : (
              <Signup signupHandle={signupHandle} />
            )}
          </>
        </div>
      </div>
      {showStatus && (
        <div style={{ textAlign: "center" }}>
          <p>{statusMessage}</p>
        </div>
      )}
    </>
  );
};

export default Main;
