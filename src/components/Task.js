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
  const { dispatch } = useTodos();
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
        sx={{
          minWidth: { xs: "100%", sm: 500 },
          background: "#283593",
          color: "white",
          marginTop: "15px",
          borderRadius: { xs: "8px", sm: "12px" },
          px: { xs: 1, sm: 2 },
        }}
        className="taskCard"
      >
        <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            <Grid size={{ xs: 12, sm: 8 }}>
              <Typography
                gutterBottom
                variant="h5"
                sx={{
                  textAlign: "left",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                  fontSize: { xs: "1rem", sm: "1.5rem" },
                  wordBreak: "break-word",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                sx={{
                  textAlign: "left",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  wordBreak: "break-word",
                }}
              >
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={{ xs: 12, sm: 4 }}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                gap: { xs: "4px", sm: "7px" },
                alignItems: "center",
              }}
            >
              <IconButton
                className="btn-grp"
                aria-label="check"
                size="small"
                sx={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                  padding: { xs: "4px", sm: "8px" },
                }}
                onClick={handleCheckClick}
              >
                <CheckIcon fontSize="small" />
              </IconButton>
              <IconButton
                className="btn-grp"
                aria-label="delete"
                size="small"
                sx={{
                  color: "#c34a4aff",
                  background: "white",
                  border: "solid #c34a4aff 3px",
                  padding: { xs: "4px", sm: "8px" },
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton
                className="btn-grp"
                aria-label="edit"
                size="small"
                sx={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                  padding: { xs: "4px", sm: "8px" },
                }}
                onClick={handleUpdateClick}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
