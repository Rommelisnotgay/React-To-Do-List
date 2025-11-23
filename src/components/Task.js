import "../App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useState } from "react";
import { TodoContext } from "../contexts/todoContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function Task({ todo }) {
  const [showDeleteAlert, setDeleteAlert] = useState(false);
  const [showUpdateAlert, setUpdateAlert] = useState(false);
  const [updatedtodo, setupdated] = useState({
    title: todo.title,
    details: todo.details,
  });
  const { todo: todos, setodo } = useContext(TodoContext);
  function handleCheckClick() {
    const updateToDos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setodo(updateToDos);
    localStorage.setItem("todo", JSON.stringify(updateToDos));
  }
  function handleDeleteClick() {
    setDeleteAlert(true);
  }
  function handleDeleteClose() {
    setDeleteAlert(false);
  }
  function handleDeleteConfirm() {
    const upadatedtodo = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setodo(upadatedtodo);
    localStorage.setItem("todo", JSON.stringify(upadatedtodo));
  }
  function handleUpdateClose() {
    setUpdateAlert(false);
  }
  function handleUpdateConfirm() {
    const updatedtodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updatedtodo.title, details: updatedtodo.details };
      } else {
        return t;
      }
    });
    setodo(updatedtodos);
    setUpdateAlert(false);
    localStorage.setItem("todo", JSON.stringify(updatedtodos));
  }
  function handleUpdateClick() {
    setUpdateAlert(true);
  }
  return (
    <>
      <Dialog open={showUpdateAlert} onClose={handleUpdateClose}>
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
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
            value={updatedtodo.title}
            onChange={(e) => {
              setupdated({ ...updatedtodo, title: e.target.value });
            }}
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
            value={updatedtodo.details}
            onChange={(e) => {
              setupdated({ ...updatedtodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Cancel</Button>
          <Button
            type="submit"
            form="subscription-form"
            onClick={handleUpdateConfirm}
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
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The Task Will Be Permanently Deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Disagree</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Card
        sx={{ minWidth: 500 }}
        style={{ background: "#283593", color: "white", marginTop: "20px" }}
        className="taskCard"
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                gutterBottom
                variant="h5"
                sx={{
                  textAlign: "left",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography gutterBottom variant="h6" sx={{ textAlign: "left" }}>
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                gap: "7px",
                alignItems: "center",
              }}
            >
              <IconButton
                className="btn-grp"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
                onClick={handleCheckClick}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                className="btn-grp"
                aria-label="delete"
                style={{
                  color: "#c34a4aff",
                  background: "white",
                  border: "solid #c34a4aff 3px",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                className="btn-grp"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
                onClick={handleUpdateClick}
              >
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
