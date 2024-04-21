"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import HighlightCode from "../HighlightCode";
import { Box } from "@mui/material";
import CodeInputViewer from "../CodeInputViewer";
import { simulateMovements, input } from "./input";

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
        <Typography variant="h4">Supply Stacks</Typography>
        <Typography>
          <Link href="https://adventofcode.com/2022/day/5" component={NextLink}>
            Advent of Code 2022: Day 5
          </Link>
        </Typography>
        <CodeInputViewer initialInput={input} fc={simulateMovements} />
        <HighlightCode
          code={"/5-supply-stacks-solution.ts"}
          language="typescript"
        />
      </Box>
    </>
  );
}
