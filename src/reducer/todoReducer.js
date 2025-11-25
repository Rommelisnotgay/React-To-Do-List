import { v4 as idud } from "uuid";

export default function reducer(current, action) {
  switch (action.type) {
    case "added": {
      const newToDo = {
        id: idud(),
        title: action.payload.title,
        details: action.payload.details,
        isCompleted: false,
      };
      const updatedtodos = [
        ...(Array.isArray(current) ? current : []),
        newToDo,
      ];
      localStorage.setItem("todo", JSON.stringify(updatedtodos));

      return updatedtodos;
    }
    case "deleted": {
      const upadatedtodo = current.filter((t) => {
        return t.id !== action.payload.id;
      });

      localStorage.setItem("todo", JSON.stringify(upadatedtodo));
      return upadatedtodo;
    }
    case "updated": {
      const updatedList = current.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
          };
        } else {
          return t;
        }
      });

      localStorage.setItem("todo", JSON.stringify(updatedList));
      return updatedList;
    }
    case "get": {
      const storagetodos = JSON.parse(localStorage.getItem("todo"));
      return Array.isArray(storagetodos) ? storagetodos : [];
    }
    case "check": {
      const updateToDos = current.map((t) => {
        if (t.id === action.payload.id) {
          return { ...t, isCompleted: !t.isCompleted };
        }
        return t;
      });

      localStorage.setItem("todo", JSON.stringify(updateToDos));
      return updateToDos;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
