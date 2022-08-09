import { useEffect } from "react";
import { Header, Navbar, AppShell } from "@mantine/core";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useStore } from "../hooks/useStore";

import Categories from "./Categories";
import HeaderBar from "./HeaderBar";
import Vehicles from "./Vehicles";

function Dashboard() {
  const { user, logout } = useAuth();
  const { dispatch } = useStore();

  const getCats = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/categories`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${user.token}`,
          },
        }
      );

      dispatch({ type: "setCategories", payload: response.data.data });
    } catch {
      logout();
    }
  };

  useEffect(() => {
    getCats();
  }, []);

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={700} p="xs">
          <Categories />
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <HeaderBar />
        </Header>
      }
    >
      <Vehicles />
    </AppShell>
  );
}

export default Dashboard;
