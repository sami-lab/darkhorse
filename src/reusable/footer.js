import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  const discordLink = "https://discord.gg/tpQe3yevdz";
  const eveLink = "https://www.eveonline.com/";
  const janiceLink = "https://janice.e-351.com/";
  const pandemicLink = "https://www.pandemic-horde.org/";

  return (
    <Box
      sx={{
        background: "#0f0f0f",

        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        "@media (min-width: 600px)": {
          p: "56px",
        },
        "@media (min-width: 0px)": {
          pl: "24px",
          pr: "24px",
          pt: "40px",
          pb: "40px",
          marginTop: "80px",
        },
      }}
    >
      <Container maxWidth='xl'>
        <Grid container spacing={5}>
          {/* discord */}
          <Grid item md={3} sm={6} xs={12}>
            <Box
              item
              sx={{
                width: "100%",
                borderBottom: "1px solid #fff",
              }}
            />
            {/* image */}
            <Box
              item
              sx={{ width: "100%", maxWidth: "230px", pt: "24px", pl: "8px" }}
            >
              <Grid
                container
                justifyContent='center'
                sx={{
                  p: "6px 8px",
                  ":hover": {
                    background: "rgba(255, 160, 0, 0.04)",
                  },
                }}
                component='a'
                href={discordLink}
                target='_blank'
              >
                <img
                  src='/discordWhite.png'
                  style={{ width: "auto", height: "40px" }}
                />
              </Grid>
              <Typography
                variant='body2'
                sx={{
                  py: "25px",
                  fontSize: "11px",
                  color: "#fff",
                  fontWeight: "600",
                  borderRadius: 0,
                }}
              >
                Join the Dark Horse Discord for notifications about upcoming
                runs.
              </Typography>
            </Box>
          </Grid>
          {/* eve */}
          <Grid item md={3} sm={6} xs={12}>
            <Box
              item
              sx={{
                width: "100%",
                borderBottom: "1px solid #fff",
              }}
            />
            {/* image */}
            <Box
              item
              sx={{ width: "100%", maxWidth: "230px", pt: "24px", pl: "8px" }}
            >
              <Grid
                container
                justifyContent='center'
                sx={{
                  p: "6px 8px",
                  ":hover": {
                    background: "rgba(255, 160, 0, 0.04)",
                  },
                }}
                component='a'
                href={eveLink}
                target='_blank'
              >
                <img src='/eve.png' style={{ width: "auto", height: "40px" }} />
              </Grid>
              <Typography
                variant='body2'
                sx={{
                  py: "25px",
                  fontSize: "11px",
                  color: "#fff",
                  fontWeight: "600",
                  borderRadius: 0,
                }}
              >
                All Eve Related Materials are property of CCP Games.
              </Typography>
            </Box>
          </Grid>
          {/* janice */}
          <Grid item md={3} sm={6} xs={12}>
            <Box
              item
              sx={{
                width: "100%",
                borderBottom: "1px solid #fff",
              }}
            />
            {/* image */}
            <Box
              item
              sx={{ width: "100%", maxWidth: "230px", pt: "24px", pl: "8px" }}
            >
              <Grid
                container
                justifyContent='center'
                sx={{
                  p: "6px 8px",
                  ":hover": {
                    background: "rgba(255, 160, 0, 0.04)",
                  },
                }}
                component='a'
                href={janiceLink}
                target='_blank'
              >
                <img
                  src='/janice.png'
                  style={{ width: "auto", height: "40px" }}
                />
              </Grid>
              <Typography
                variant='body2'
                sx={{
                  py: "25px",
                  fontSize: "11px",
                  color: "#fff",
                  fontWeight: "600",
                  borderRadius: 0,
                }}
              >
                Appraisal API and functionality provided by Janice.{" "}
              </Typography>
            </Box>
          </Grid>
          {/* pandemic */}
          <Grid item md={3} sm={6} xs={12}>
            <Box
              item
              sx={{
                width: "100%",
                borderBottom: "1px solid #fff",
              }}
            />
            {/* image */}
            <Box
              item
              sx={{ width: "100%", maxWidth: "230px", pt: "24px", pl: "8px" }}
            >
              <Grid
                container
                justifyContent='center'
                sx={{
                  p: "6px 8px",
                  ":hover": {
                    background: "rgba(255, 160, 0, 0.04)",
                  },
                }}
                component='a'
                href={pandemicLink}
                target='_blank'
              >
                <img
                  src='/pandemic.png'
                  style={{ width: "auto", height: "40px" }}
                />
              </Grid>
              <Typography
                variant='body2'
                sx={{
                  py: "25px",
                  fontSize: "11px",
                  color: "#fff",
                  fontWeight: "600",
                  borderRadius: 0,
                }}
              >
                Join Pandemic Horde!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
