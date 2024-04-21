import { Container, Box } from "@mui/material";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container maxWidth="xl">
        {children}
    </Container>
  );
};

export default Layout;
