import React, { useMemo, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";

interface CodeInputViewerProps {
  initialInput: string;
  fc(input: string): string;
}

const CodeInputViewer: React.FC<CodeInputViewerProps> = ({
  initialInput,
  fc,
}) => {
  const [inputValue, setInputValue] = useState(initialInput);
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Input</Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
            multiline
            minRows={16}
            maxRows={16}
            placeholder="Enter text here..."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ textAlign: "right" }}>
            Output
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={fc(inputValue)}
            multiline
            minRows={isMobileView ? 2 : 16}
            maxRows={16}
            InputProps={{
              readOnly: true,
            }}
            placeholder="Output will appear here..."
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CodeInputViewer;
