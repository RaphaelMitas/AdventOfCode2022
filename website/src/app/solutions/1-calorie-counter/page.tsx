"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import HighlightCode from "../HighlightCode";
import { Box } from "@mui/material";
import CodeInputViewer from "../CodeInputViewer";
import { calculateTopThreeCalories, input } from "./input";

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
        <Typography variant="h4">Calorie Counter</Typography>
        <Typography>
          <Link href="https://adventofcode.com/2022/day/1" component={NextLink}>
            Advent of Code 2022: Day 1
          </Link>
        </Typography>
        <CodeInputViewer initialInput={input} fc={calculateTopThreeCalories} />
        <HighlightCode
          code={"/1-calorie-counter-solution.ts"}
          language="typescript"
        />
      </Box>
    </>
  );
}

