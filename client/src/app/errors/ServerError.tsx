import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function ServerError() {
  const { state } = useLocation();

  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: "background.paper",
        color: "error.main",
        maxWidth: "100%",
        overflowX: "auto",
        wordBreak: "break-word",
        whiteSpace: "pre-wrap",
      }}
    >
      {state?.error ? (
        <>
          <Typography
            gutterBottom
            variant="h3"
            sx={{ px: 4, pt: 2 }}
            color="secondary"
          >
            {state.error.title}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Typography
            variant="body1"
            sx={{
              px: 4,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {state.error.detail}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server error
        </Typography>
      )}
    </Paper>
  );
}
