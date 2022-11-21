import { Box, Container } from "@mui/material";

const Confirmed = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2>Congratulations, Chuck!</h2>
        <p>
          We've created a NEAR account for you:
          <br />
          <b>chucklam.g-cash.near</b>
        </p>
        <p>
          Sending NEAR USDC tokens to this account will be cashed out
          to your GCash wallet associated with your phone number:
          <br />
          <b>+639493578500</b>
        </p>
      </Box>
    </Container>
  );
};

export default Confirmed;