"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { SvgIcon, useTheme } from "@mui/material";
import Logo from "./Logo";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import GitHubIcon from "@mui/icons-material/GitHub";

const pages = [
  { title: "Day 1", link: "/solutions/1-calorie-counter" },
  { title: "Day 2", link: "/solutions/2-rock-paper-scissors" },
  { title: "Day 3", link: "/solutions/3-rucksack-reorganization" },
  { title: "Day 4", link: "/solutions/4-camp-cleanup" },
  { title: "Day 5", link: "/solutions/5-supply-stacks" },
  { title: "Day 6", link: "/solutions/6-tuning-trouble" },
];

function MyAppBar() {
  const theme = useTheme();
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (path?: string) => {
    setAnchorElNav(null);
    if (path) {
      router.push(path);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <SvgIcon
          component={NextLink}
          href="/"
          color="primary"
          fontSize="large"
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          <Logo />
        </SvgIcon>
        <Typography
          variant="h6"
          noWrap
          component={NextLink}
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: theme.palette.primary.main,
            textDecoration: "none",
          }}
        >
          aphaël Mitas
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            onClick={handleOpenNavMenu}
            color="inherit"
            sx={{ pl: 0 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={() => handleCloseNavMenu()}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.link}
                LinkComponent={NextLink}
                href={page.link}
                onClick={() => handleCloseNavMenu(page.link)}
              >
                <Typography textAlign="center">{page.title}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <SvgIcon
          component={NextLink}
          href="/"
          color="primary"
          fontSize="large"
          sx={{
            display: { xs: "flex", md: "none" },
          }}
        >
          <Logo />
        </SvgIcon>
        <Typography
          variant="h6"
          noWrap
          component={NextLink}
          href="/"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: theme.palette.primary.main,
            textDecoration: "none",
          }}
        >
          aphaël Mitas
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
          }}
        >
          {pages.map((page) => (
            <MenuItem
              key={page.link}
              LinkComponent={NextLink}
              href={page.link}
              onClick={() => handleCloseNavMenu(page.link)}
            >
              <Typography textAlign="center">{page.title}</Typography>
            </MenuItem>
          ))}
        </Box>
        <Button
          startIcon={<GitHubIcon />}
          color="inherit"
          component={NextLink}
          href="https://github.com/RaphaelMitas/AdventOfCode2022"
          target="_blank"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          View Code on GitHub
        </Button>
        <IconButton
          color="inherit"
          component={NextLink}
          href="https://github.com/RaphaelMitas/AdventOfCode2022"
          target="_blank"
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
export default MyAppBar;
