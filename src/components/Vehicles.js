import { useState, useEffect } from "react";
import { Input, Button, Select, ActionIcon, Pagination } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import { useStore } from "../hooks/useStore";

const Vehicles = () => {
  const [vehicle, setVehicle] = useState({
    make: "",
    model: "",
    regNo: "",
    color: "",
  });
  const [filterData, setFilterData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [activePage, setPage] = useState(1);
  const [paginatedFilterData, setPaginatedFilterData] = useState([]);

  const { state, dispatch } = useStore();

  useEffect(() => {
    setFilterData(state.categories[state.current]?.data || []);
  }, [state]);

  useEffect(() => {
    let pgData = filterData.slice((activePage - 1) * 5, activePage * 5);
    setPaginatedFilterData(pgData);
  }, [activePage, filterData]);

  const applyFilters = () => {
    let newFilterData = state.categories[state.current]?.data.filter((item) => {
      return (
        item.make.includes(vehicle.make) &&
        item.model.includes(vehicle.model) &&
        item.regNo.includes(vehicle.regNo) &&
        item.color.includes(vehicle.color)
      );
    });

    setFilterData(newFilterData);
  };

  const addVehicle = () => {
    if ((vehicle.make !== "" && vehicle.model !== "", vehicle.regNo !== "")) {
      if (currentIndex >= 0) {
        dispatch({
          type: "editVehicle",
          payload: { index: currentIndex, value: vehicle },
        });
        setCurrentIndex(-1);
      } else {
        dispatch({ type: "addVehicle", payload: vehicle });
      }
      setVehicle({
        make: "",
        model: "",
        regNo: "",
        color: "",
      });
    }
  };

  const editVehicle = (ind) => {
    setCurrentIndex(ind);
    setVehicle(state.categories[state.current].data[ind]);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Input
          placeholder="Enter Make"
          value={vehicle.make}
          onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })}
        />
        <Input
          placeholder="Enter Model"
          value={vehicle.model}
          onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
        />
        <Input
          placeholder="Enter Registration No"
          value={vehicle.regNo}
          onChange={(e) => setVehicle({ ...vehicle, regNo: e.target.value })}
        />
        <Select
          placeholder="Select a color"
          data={[
            { value: "white", label: "White" },
            { value: "black", label: "Black" },
            { value: "gray", label: "Gray" },
            { value: "silver", label: "Silver" },
            { value: "red", label: "Red" },
            { value: "blue", label: "Blue" },
            { value: "brown", label: "Brown" },
            { value: "green", label: "Green" },
            { value: "beige", label: "Beige" },
            { value: "orange", label: "Orange" },
            { value: "gold", label: "Gold" },
            { value: "yellow", label: "Yellow" },
            { value: "purple", label: "Purple" },
          ]}
          value={vehicle.color}
          onChange={(e) => setVehicle({ ...vehicle, color: e })}
        />
        <Button onClick={addVehicle}>
          {currentIndex === -1 ? "Add" : "Save"}
        </Button>
        <Button onClick={applyFilters}>Filter</Button>
      </div>

      <div
        style={{
          marginTop: "1rem",
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "5px",
        }}
      >
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Make</th>
              <th style={{ textAlign: "left" }}>Model</th>
              <th style={{ textAlign: "left" }}>Registration No</th>
              <th style={{ textAlign: "left" }}>Color</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFilterData.map((v, index) => {
              return (
                <tr key={index}>
                  <td style={{ paddingTop: "0.5rem" }}>{v.make}</td>
                  <td style={{ paddingTop: "0.5rem" }}>{v.model}</td>
                  <td style={{ paddingTop: "0.5rem" }}>{v.regNo}</td>
                  <td style={{ paddingTop: "0.5rem" }}>{v.color}</td>
                  <td style={{ paddingTop: "0.5rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <ActionIcon
                        variant="outline"
                        onClick={() => {
                          editVehicle(index);
                        }}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="outline"
                        onClick={() =>
                          dispatch({ type: "deleteVehicle", payload: index })
                        }
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <Pagination
            page={activePage}
            onChange={setPage}
            total={Math.ceil(filterData.length / 5)}
          />
        </div>
      </div>
    </>
  );
};

export default Vehicles;
