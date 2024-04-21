"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import NextLink from "next/link";

const list_of_solutions = [
  {
    link: "1-calorie-counter",
    title: "Calorie Counter",
  },
  {
    link: "2-rock-paper-scissors",
    title: "Rock Paper Scissors",
  },
  {
    link: "3-rucksack-reorganization",
    title: "Rucksack Reorganization",
  },
  {
    link: "4-camp-cleanup",
    title: "Camp Cleanup",
  },
  {
    link: "5-supply-stacks",
    title: "Supply Stacks",
  },
  {
    link: "6-tuning-trouble",
    title: "Tuning Trouble",
  },
];

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Advent of Code 2022
        </Typography>
        <Typography variant="h5" component="h1" sx={{ mb: 1 }}>
          Here are some of my solutions:
        </Typography>
        {list_of_solutions.map((solution, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Link component={NextLink} href={`/solutions/${solution.link}`}>
              Day {index + 1}: {solution.title}
            </Link>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
