import { useState } from "react";
import { Button, Input, ActionIcon, Modal } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import { useStore } from "../hooks/useStore";

const Categories = () => {
  const [inputCat, setInputCat] = useState("");
  const [editCat, setEditCat] = useState("");
  const [opened, setOpened] = useState(false);

  const { state, dispatch } = useStore();

  const saveCategory = () => {
    if (inputCat !== "" && !state.categories.find((c) => c.type === inputCat)) {
      dispatch({
        type: "addCategory",
        payload: { type: inputCat, data: [] },
      });
    }
    setInputCat("");
  };

  const editCategory = () => {
    if (
      editCat !== "" &&
      !state.categories.find((c) => c.type === editCat) &&
      editCat !== state.categories[state.current].type
    ) {
      dispatch({
        type: "editCategory",
        payload: { index: state.current, value: editCat },
      });
      setOpened(false);
    }
  };

  const delCategory = (ind) => {
    if (ind >= state.categories.length - 1) {
      dispatch({ type: "setCurrent", payload: ind - 1 });
    }
    dispatch({ type: "deleteCategory", payload: ind });
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Enter New Category Value"
      >
        <div style={{ display: "flex" }}>
          <Input
            style={{ width: "100%", marginRight: "1rem" }}
            value={editCat}
            onChange={(e) => setEditCat(e.target.value)}
          />
          <Button onClick={editCategory}>Done</Button>
        </div>
      </Modal>
      <div style={{ display: "flex" }}>
        <Input
          style={{ marginRight: "0.5rem" }}
          placeholder="Enter new Category"
          value={inputCat}
          onChange={(e) => setInputCat(e.target.value)}
        />
        <Button onClick={saveCategory}>+</Button>
      </div>
      <div style={{ marginTop: "1rem", overflowY: "scroll" }}>
        {state.categories.map((cat, index) => {
          return (
            <div
              key={index}
              onClick={() => dispatch({ type: "setCurrent", payload: index })}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.4rem",
                borderRadius: "4px",
                backgroundColor: index === state.current && "lightgrey",
                cursor: "pointer",
              }}
            >
              <h5>{cat.type}</h5>
              <div style={{ display: "flex" }}>
                <ActionIcon
                  variant="outline"
                  style={{ marginRight: "0.3rem" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: "setCurrent", payload: index });
                    setEditCat(cat.type);
                    setOpened(true);
                  }}
                >
                  <IconEdit size={16} />
                </ActionIcon>
                <ActionIcon
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    delCategory(index);
                  }}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
