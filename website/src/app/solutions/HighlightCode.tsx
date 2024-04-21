import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Box, Button, Collapse, Typography } from "@mui/material";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface HighlightCodeProps {
  code: string;
  language: string;
}

const HighlightCode: React.FC<HighlightCodeProps> = ({ code, language }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const [fileContent, setFileContent] = useState<string | undefined>();

  useEffect(() => {
    fetch(code)
      .then((response) => response.text())
      .then((text) => setFileContent(text as string))
      .catch((error) => console.error("Failed to load the file:", error));
  }, []);

  return (
    <>
      <Button onClick={handleToggleCollapse}>
        {isCollapsed ? (
          <>
            <ExpandMoreIcon /> Show Code
          </>
        ) : (
          <>
            <ExpandLessIcon /> Hide Code
          </>
        )}
      </Button>

      <Collapse in={!isCollapsed}>
        {fileContent === undefined ? (
          <Typography>Loading...</Typography>
        ) : (
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            lineProps={{
              style: {
                wordBreak: "break-all",
                whiteSpace: "pre-wrap",
              },
            }}
            wrapLines={true}
            showLineNumbers={true}
          >
            {fileContent}
          </SyntaxHighlighter>
        )}
      </Collapse>
    </>
  );
};

export default HighlightCode;
