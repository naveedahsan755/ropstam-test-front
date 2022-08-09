import { Button } from "@mantine/core";
import { useAuth } from "../hooks/useAuth";
import { useStore } from "../hooks/useStore";
import axios from "axios";

const HeaderBar = () => {
  const { user, logout } = useAuth();
  const { state, dispatch } = useStore();

  const saveCats = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/categories`,
        state.categories,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${user.token}`,
          },
        }
      );
      if (response.status === 201)
        dispatch({ type: "setDirty", payload: false });
    } catch {
      console.log("Error: Could not save the changes");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.2rem",
      }}
    >
      <h3 style={{ cursor: "pointer" }}>TestCar</h3>
      <div>
        <Button
          style={{ marginRight: "1rem" }}
          onClick={saveCats}
          disabled={!state.dirty}
        >
          Save
        </Button>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
};

export default HeaderBar;
