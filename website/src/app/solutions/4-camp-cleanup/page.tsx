"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import HighlightCode from "../HighlightCode";
import { Box } from "@mui/material";
import CodeInputViewer from "../CodeInputViewer";
import { processAssignments, input } from "./input";

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
        <Typography variant="h4">Camp Cleanup</Typography>
        <Typography>
          <Link href="https://adventofcode.com/2022/day/4" component={NextLink}>
            Advent of Code 2022: Day 4
          </Link>
        </Typography>
        <CodeInputViewer initialInput={input} fc={processAssignments} />
        <HighlightCode
          code={"/4-camp-cleanup-solution.ts"}
          language="typescript"
        />
      </Box>
    </>
  );
}
