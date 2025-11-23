import "../App.css";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Task from "./Task";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { v4 as idud } from "uuid";
import { useContext } from "react";
import { TodoContext } from "../contexts/todoContext";
import { useEffect } from "react";
export default function MainBody() {
  const [todoInput, setinput] = useState({ title: "", details: "" });
  const { todo, setodo } = useContext(TodoContext);
  const [displaytodo, setdisplaytodo] = useState("all");

  const completed = todo.filter((t) => {
    return t.isCompleted;
  });
  const noncompleted = todo.filter((t) => {
    return !t.isCompleted;
  });
  let todoToBeDisplayed = todo;
  if (displaytodo === "completed") {
    todoToBeDisplayed = completed;
  } else if (displaytodo === "non-completed") {
    todoToBeDisplayed = noncompleted;
  } else {
    todoToBeDisplayed = todo;
  }
  const taskList =
    todo.length === 0 ? (
      <h1
        style={{
          fontFamily: "A",
          fontWeight: "bold",
          border: "1px solid black ",
          padding: "5px",
        }}
      >
        No Tasks Yet
      </h1>
    ) : (
      todoToBeDisplayed.map((pop) => {
        return <Task key={pop.id} todo={pop} />;
      })
    );

  function changeDisplayType(e) {
    setdisplaytodo(e.target.value);
  }
  function handleAddClick() {
    const newToDo = {
      id: idud(),
      title: todoInput.title,
      details: todoInput.details,
      isCompleted: false,
    };
    const updatedtodos = [...(Array.isArray(todo) ? todo : []), newToDo];
    setodo(updatedtodos);
    localStorage.setItem("todo", JSON.stringify(updatedtodos));
    setinput({ details: "", title: "" });
  }
  //
  useEffect(() => {
    try {
      const storagetodos = JSON.parse(localStorage.getItem("todo"));
      setodo(Array.isArray(storagetodos) ? storagetodos : []);
    } catch (e) {
      setodo([]);
    }
  }, [setodo]);
  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{ maxHeight: "80vh", overflow: "scroll" }}
      >
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom sx={{ color: "black" }} variant="h2">
            My List
          </Typography>
          <Divider style={{ alignSelf: "normal" }} />
          <ToggleButtonGroup
            exclusive
            aria-label="text alignment"
            value={displaytodo}
            onChange={changeDisplayType}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="completed">Done</ToggleButton>
            <ToggleButton value="non-completed" color="primary">
              Not Done
            </ToggleButton>
          </ToggleButtonGroup>
          {taskList}

          <Grid container sx={{ marginTop: "20px", width: "96%" }} spacing={1}>
            <Grid
              size={8}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              flexDirection="column"
              gap={1}
            >
              <TextField
                id="outlined-basic"
                label="Task Title"
                variant="outlined"
                style={{ width: "100%" }}
                value={todoInput.title}
                onChange={(e) => {
                  setinput({ ...todoInput, title: e.target.value });
                }}
              />
              <TextField
                id="outlined-basic"
                label="Task Description"
                variant="outlined"
                style={{ width: "100%" }}
                value={todoInput.details}
                onChange={(e) => {
                  setinput({ ...todoInput, details: e.target.value });
                }}
              />
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                disabled={todoInput.title.trim() === ""}
                variant="contained"
                style={{ width: "100%", height: "55px" }}
                onClick={() => {
                  handleAddClick();
                }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
