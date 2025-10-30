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
        overflowX: "auto",       // 👈 enables horizontal scroll if still needed
        wordBreak: "break-word", // 👈 breaks long lines (e.g. file paths)
        whiteSpace: "pre-wrap",  // 👈 keeps original line breaks
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
              whiteSpace: "pre-wrap",  // 👈 keeps multi-line stack trace
              wordBreak: "break-word", // 👈 wraps long words instead of overflowing
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
