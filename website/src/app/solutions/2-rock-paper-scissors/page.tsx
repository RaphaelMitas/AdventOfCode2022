"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import HighlightCode from "../HighlightCode";
import { Box } from "@mui/material";
import CodeInputViewer from "../CodeInputViewer";
import { combinedScoreOutput, input } from "./input";

export default function Page() {
  return (
    <>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Rock Paper Scissors</Typography>
        <Typography>
          <Link href="https://adventofcode.com/2022/day/2" component={NextLink}>
            Advent of Code 2022: Day 2
          </Link>
        </Typography>
        <CodeInputViewer initialInput={input} fc={combinedScoreOutput} />
        <HighlightCode
          code={"/2-rock-paper-scissors-solution.ts"}
          language="typescript"
        />
      </Box>
    </>
  );
}

