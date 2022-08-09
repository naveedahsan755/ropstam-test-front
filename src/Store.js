import { createContext, useReducer } from "react";

export const storeContext = createContext();

const defaultState = {
  categories: [],
  oldCats: "",
  dirty: false,
  current: 0,
};

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "setCategories": {
      return {
        ...state,
        categories: action.payload,
        oldCats: JSON.stringify(action.payload),
      };
    }

    case "addCategory": {
      let newState = {
        ...state,
        categories: [...state.categories, action.payload],
      };
      if (JSON.stringify(newState.categories) !== state.oldCats)
        newState.dirty = true;
      else newState.dirty = false;
      return newState;
    }

    case "editCategory": {
      let newState = { ...state };
      newState.categories[action.payload.index].type = action.payload.value;
      if (JSON.stringify(newState.categories) !== state.oldCats)
        newState.dirty = true;
      else newState.dirty = false;
      return newState;
    }

    case "deleteCategory": {
      let newState = { ...state };
      newState.categories.splice(action.payload, 1);
      if (JSON.stringify(newState.categories) !== state.oldCats)
        newState.dirty = true;
      else newState.dirty = false;
      return newState;
    }

    case "setDirty": {
      return {
        ...state,
        dirty: action.payload,
        oldCats: JSON.stringify(state.categories),
      };
    }

    case "setCurrent": {
      return { ...state, current: action.payload };
    }

    case "addVehicle": {
      let newState = { ...state };
      newState.categories[state.current].data.push(action.payload);
      if (JSON.stringify(newState.categories) !== state.oldCats)
        newState.dirty = true;
      else newState.dirty = false;
      return newState;
    }

    case "editVehicle": {
      let newState = { ...state };
      newState.categories[state.current].data[action.payload.index] =
        action.payload.value;
      if (JSON.stringify(newState.categories) !== state.oldCats)
        newState.dirty = true;
      else newState.dirty = false;
      return newState;
    }

    case "deleteVehicle": {
      let newState = { ...state };
      newState.categories[state.current].data.splice(action.payload, 1);
      if (JSON.stringify(newState.categories) !== state.oldCats)
        newState.dirty = true;
      else newState.dirty = false;
      return newState;
    }

    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunction, defaultState);
  return (
    <storeContext.Provider value={{ state, dispatch }}>
      {children}
    </storeContext.Provider>
  );
};
