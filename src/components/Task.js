import "../App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import { useTodos } from "../contexts/todoContext";
import { ToastContext } from "../contexts/toastContext";
export default function Task({ todo, showDelete, showAlert }) {
  const { todos, dispatch } = useTodos();
  const { showhidetoast } = useContext(ToastContext);
  function handleCheckClick() {
    dispatch({ type: "check", payload: todo });

    showhidetoast(
      "Task is marked as " + (todo.isCompleted ? "incomplete" : "completed")
    );
  }
  function handleDeleteClick() {
    showDelete(todo.id);
  }

  function handleUpdateClick() {
    showAlert(todo.id, { title: todo.title, details: todo.details });
  }
  return (
    <>
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
