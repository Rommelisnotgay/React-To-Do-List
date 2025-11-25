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
import { useContext } from "react";
import { useEffect, useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContext } from "../contexts/toastContext";

import { useTodos } from "../contexts/todoContext";
export default function MainBody() {
  const { todos, dispatch } = useTodos();
  const [todoInput, setinput] = useState({ title: "", details: "" });
  const [displaytodo, setdisplaytodo] = useState("all");
  const [showDeleteAlert, setDeleteAlert] = useState(false);
  const [dialogtodo, setdialogtodo] = useState(null);
  const [showUpdateAlert, setUpdateAlert] = useState(false);
  const { showhidetoast } = useContext(ToastContext);
  const [updatedtodos, setupdateds] = useState({
    title: "",
    details: "",
  });
  const completed = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);
  const noncompleted = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);
  let todoToBeDisplayed = todos;
  if (displaytodo === "completed") {
    todoToBeDisplayed = completed;
  } else if (displaytodo === "non-completed") {
    todoToBeDisplayed = noncompleted;
  } else {
    todoToBeDisplayed = todos;
  }

  function changeDisplayType(e) {
    setdisplaytodo(e.target.value);
  }
  function handleAddClick() {
    dispatch({
      type: "added",
      payload: { title: todoInput.title, details: todoInput.details },
    });

    setinput({ details: "", title: "" });
    showhidetoast("Task Added Successfully");
  }
  //
  useEffect(() => {
    dispatch({ type: "get" });
  }, [dispatch]);
  function handleDeleteClose() {
    setDeleteAlert(false);
    setdialogtodo(null);
  }
  function handleDeleteConfirm() {
    dispatch({ type: "deleted", payload: { id: dialogtodo } });
    setdialogtodo(null);
    setDeleteAlert(false);
    showhidetoast("Task Deleted Successfully");
  }
  function handleDeleteClick(id) {
    setDeleteAlert(true);
    setdialogtodo(id);
  }
  function handleUpdateclick(id, oldData) {
    setdialogtodo(id);
    setupdateds({
      title: oldData.title,
      details: oldData.details,
    });
    setUpdateAlert(true);
  }
  const taskList =
    todos.length === 0 ? (
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
        return (
          <Task
            key={pop.id}
            todo={pop}
            showDelete={handleDeleteClick}
            showAlert={handleUpdateclick}
          />
        );
      })
    );
  function handleUpdateClose() {
    setUpdateAlert(false);
  }
  function handleUpdateConfirm() {
    dispatch({
      type: "updated",
      payload: {
        id: dialogtodo,
        title: updatedtodos.title,
        details: updatedtodos.details,
      },
    });
    setUpdateAlert(false);

    showhidetoast("Task Updated Successfully");
  }
  return (
    <>
      <Dialog
        open={showUpdateAlert}
        onClose={handleUpdateClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: { borderRadius: { xs: "8px", sm: "12px" } },
        }}
      >
        <DialogTitle sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}>
          Update Task
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
            Update the details of your task here.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="text"
            label="Update Task Title"
            type="text"
            fullWidth
            variant="standard"
            value={updatedtodos.title}
            onChange={(e) => {
              setupdateds({ ...updatedtodos, title: e.target.value });
            }}
            size="small"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="text"
            label="Update Task Description"
            type="text"
            fullWidth
            variant="standard"
            value={updatedtodos.details}
            onChange={(e) => {
              setupdateds({ ...updatedtodos, details: e.target.value });
            }}
            size="small"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose} size="small">
            Cancel
          </Button>
          <Button
            type="submit"
            form="subscription-form"
            onClick={handleUpdateConfirm}
            size="small"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        onClose={handleDeleteClose}
        open={showDeleteAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: { borderRadius: { xs: "8px", sm: "12px" } },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontSize: { xs: "1.1rem", sm: "1.3rem" } }}
        >
          {"Are you sure you want to delete this task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            The Task Will Be Permanently Deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} size="small">
            Disagree
          </Button>
          <Button autoFocus onClick={handleDeleteConfirm} size="small">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth="sm" sx={{ px: { xs: 1, sm: 2 } }}>
        <Card
          sx={{
            minWidth: 275,
            maxHeight: "80vh",
            overflow: "auto",
            borderRadius: { xs: "8px", sm: "12px" },
          }}
        >
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "16px",
            }}
          >
            <Typography
              gutterBottom
              sx={{
                color: "black",
                variant: "h2",
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              }}
            >
              My List
            </Typography>
            <Divider style={{ alignSelf: "normal", margin: "10px 0" }} />
            <ToggleButtonGroup
              exclusive
              aria-label="text alignment"
              value={displaytodo}
              onChange={changeDisplayType}
              size="small"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "4px",
                justifyContent: "center",
                "& .MuiToggleButton-root": {
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  padding: { xs: "6px 8px", sm: "6px 12px" },
                },
              }}
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="completed">Done</ToggleButton>
              <ToggleButton value="non-completed" color="primary">
                Not Done
              </ToggleButton>
            </ToggleButtonGroup>
            {taskList}

            <Grid
              container
              sx={{
                marginTop: "20px",
                width: "100%",
                px: { xs: 0, sm: 1 },
              }}
              spacing={{ xs: 0.5, sm: 1 }}
            >
              <Grid
                size={{ xs: 12, sm: 8 }}
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
                  size="small"
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
                  size="small"
                />
              </Grid>
              <Grid
                size={{ xs: 12, sm: 4 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  disabled={todoInput.title.trim() === ""}
                  variant="contained"
                  style={{ width: "100%", height: "40px" }}
                  onClick={() => {
                    handleAddClick();
                  }}
                  size="small"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
