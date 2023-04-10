import React, { useState } from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Slider,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import LaunchIcon from "@mui/icons-material/Launch";
import ClearIcon from "@mui/icons-material/Clear";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Header from "../src/reusable/header";
import Footer from "../src/reusable/footer";
import axios from "axios";

const originOptions = [];

const marks = [
  {
    value: 0,
    label: "0%",
  },
  {
    value: 1,
    label: "1%",
  },
  {
    value: 3,
    label: "3%",
  },
  {
    value: 5,
    label: "5%",
  },
  {
    value: 10,
    label: "10%",
  },
  {
    value: 20,
    label: "20%",
  },
];

export default function Index() {
  const [data, setData] = useState({
    origin: "",
    destination: "",
    appraisal: "",
    additionPercent: 0,
  });
  const [additionalVolume, setAdditionalVolume] = useState(0);
  const [additionalCollateral, setAdditionalCollateral] = useState(0);
  const [responseGenerated, setResponseGenerated] = useState(false);

  const initialResponse = {
    contractTo: "Coffee Republic",
    shipTo: "",
    totalVolume: 0,
    totalCollateral: 0,
    reward: 0,
  };
  const [response, setResponse] = useState(initialResponse);
  const [showToast, setShowToast] = useState({
    active: false,
    message: "",
    severity: "",
  });
  const [loading, setLoading] = useState(false);

  const onAppraiseHandler = async () => {
    if (data.appraisal === "") {
      return;
    }
    try {
      setLoading(true);
      const result = await axios.post(
        "https://janice.e-351.com/api/rest/v2/appraisal?market=2&persist=true&compactize=true&pricePercentage=1",
        data.appraisal,
        {
          headers: {
            "x-apikey": publicRuntimeConfig.janice_key,
          },
        }
      );

      if (result.status === 200) {
        //setResponse(result.data);
        setResponseGenerated(true);
      } else {
        setShowToast({
          active: true,
          message: result.data.message,
          severity: "error",
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setShowToast({
        active: true,
        message: err.response?.data?.message || "Something went wrong",
        severity: "error",
      });
    }
  };

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowToast({
      active: false,
      message: "",
      severity: "",
    });
  };
  return (
    <Grid container direction='column' sx={{ background: "#090909" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showToast.active}
        autoHideDuration={2000}
        onClose={handleToastClose}
      >
        <Alert onClose={handleToastClose} severity={showToast.severity}>
          {showToast.message}
        </Alert>
      </Snackbar>
      <Grid item sx={{ width: "100%" }}>
        <Header />
      </Grid>
      <Grid item sx={{ width: "100%", minHeight: "150px" }} />

      {/* form */}
      <Grid item sx={{ width: "100%" }}>
        <Container maxWidth='md'>
          <Grid container gap='16px' direction={{ md: "row", xs: "column" }}>
            <Grid item md xs={12}>
              <Grid
                container
                direction='column'
                component={Paper}
                elevation={0}
                sx={{ p: "16px" }}
              >
                {/* origin */}
                <Grid item sx={{ width: "100%" }}>
                  <TextField
                    variant='outlined'
                    label='Origin'
                    select
                    fullWidth
                    size='small'
                    value={data.origin}
                    onChange={(e) =>
                      setData((d) => {
                        return {
                          ...d,
                          origin: e.target.value,
                        };
                      })
                    }
                  >
                    {originOptions.map((item, i) => (
                      <MenuItem key={i} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {/* destination */}
                <Grid item sx={{ width: "100%", mt: "16px" }}>
                  <TextField
                    variant='outlined'
                    label='Destination'
                    select
                    fullWidth
                    size='small'
                    helperText='350 ISK / m³ + 1% of Total Collateral'
                    value={data.destination}
                    onChange={(e) =>
                      setData((d) => {
                        return {
                          ...d,
                          destination: e.target.value,
                        };
                      })
                    }
                  >
                    {originOptions.map((item, i) => (
                      <MenuItem key={i} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {/* appraisal */}
                <Grid item sx={{ width: "100%", mt: "8px" }}>
                  <TextField
                    variant='outlined'
                    multiline
                    minRows={8}
                    sx={{ ".MuiOutlinedInput-input": { maxHeight: "184px" } }}
                    label='Janice Appraiser'
                    placeholder='Copy in items to appraise'
                    fullWidth
                    size='small'
                    value={data.appraisal}
                    onChange={(e) =>
                      setData((d) => {
                        return {
                          ...d,
                          appraisal: e.target.value,
                        };
                      })
                    }
                  />
                </Grid>
                {/* additionPercent */}
                <Grid item sx={{ width: "100%", mt: "20px" }}>
                  <Box sx={{ px: "8px" }}>
                    <Typography variant='body1' sx={{ fontSize: "12px" }}>
                      Additional Percent Collateral on Appraisal
                    </Typography>
                    <Slider
                      aria-label='Restricted values'
                      //valueLabelFormat={valueLabelFormat}

                      getAriaValueText={data.additionPercent}
                      step={null}
                      min={0}
                      max={20}
                      valueLabelDisplay='auto'
                      marks={marks}
                      sx={{
                        ".MuiSlider-rail,.MuiSlider-mark ": {
                          color: "#ffa000",
                        },
                        ".MuiSlider-markLabel": {
                          fontSize: "11px",
                        },
                        "& .MuiSlider-valueLabel": {
                          background: (muiTheme) =>
                            muiTheme.palette.primary.main,
                          color: "#000",
                          fontWeight: "600",
                          fontSize: "12px",
                        },
                        ".MuiSlider-thumb": {
                          background: "#fff",
                          border: (muiTheme) =>
                            `1px solid ${muiTheme.palette.primary.main}`,
                        },
                      }}
                      disabled={!responseGenerated}
                      value={data.additionPercent}
                      onChange={(e) => {
                        if (responseGenerated) {
                          setData((d) => {
                            return {
                              ...d,
                              additionPercent: e.target.value,
                            };
                          });
                        }
                      }}
                    />
                  </Box>
                </Grid>
                {/* buttons */}
                <Grid item sx={{ width: "100%", mt: "16px" }}>
                  <Grid container sx={{ gap: "8px" }}>
                    {/* appraise */}
                    <Grid item xs>
                      <Button
                        variant='contained'
                        fullWidth
                        sx={{
                          fontSize: "12px",
                          fontWeight: 500,
                          minWidth: "64px",
                          padding: "4px 10px",
                        }}
                        endIcon={<RequestQuoteOutlinedIcon />}
                        disabled={data.appraisal.length === 0}
                        onClick={onAppraiseHandler}
                      >
                        Appraise
                      </Button>
                    </Grid>
                    {/* Janice  */}
                    <Grid item xs>
                      <Button
                        variant='contained'
                        fullWidth
                        component='a'
                        href=''
                        sx={{
                          fontSize: "12px",
                          fontWeight: 500,
                          minWidth: "64px",
                          padding: "4px 10px",
                        }}
                        endIcon={<LaunchIcon />}
                        disabled={!responseGenerated}
                      >
                        Janice link
                      </Button>
                    </Grid>
                    {/* clear */}
                    <Grid item xs>
                      <Button
                        variant='outlined'
                        fullWidth
                        sx={{
                          fontFamily: `Roboto`,
                          fontSize: "12px",
                          fontWeight: 500,
                          minWidth: "64px",
                          padding: "4px 10px",
                        }}
                        endIcon={<ClearIcon />}
                        disabled={data.appraisal.length === 0}
                        onClick={() => {
                          setResponse(initialResponse);
                          setData((d) => {
                            return {
                              ...d,
                              appraisal: "",
                              additionPercent: 0,
                            };
                          });
                          setAdditionalCollateral(0);
                          setAdditionalVolume(0);
                        }}
                      >
                        Clear
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                {/* alert */}
                <Grid item sx={{ width: "100%", mt: "16px" }}>
                  <Grid
                    container
                    component={Paper}
                    elevation={0}
                    sx={{
                      borderRadius: "4px",
                      p: "12px 16px",
                      background: "#adadad",
                      color: "#0f0f0f",
                      fontSize: "12px",
                    }}
                  >
                    <Grid item sx={{ mr: "12px" }}>
                      <ErrorOutlineIcon />
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                      <Typography variant='body2' sx={{ fontSize: "12px" }}>
                        The following will not appraise properly and should be
                        removed and added manually.
                      </Typography>
                      <ul>
                        <li>Blueprint Copies</li>
                        <li>Assembled Containers</li>
                        <li>Abyssal Modules</li>
                      </ul>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md xs={12}>
              <Grid
                container
                direction='column'
                component={Paper}
                elevation={0}
                sx={{ p: "16px" }}
              >
                {/* Additional Volume */}
                <Grid item sx={{ width: "100%" }}>
                  <TextField
                    variant='outlined'
                    label='Additional Volume'
                    fullWidth
                    size='small'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>m³</InputAdornment>
                      ),
                    }}
                    value={additionalVolume}
                    onChange={(e) => {
                      if (!e.target.value) {
                        setAdditionalVolume("");
                      }
                      if (
                        /[0-9]/.test(e.target.value) &&
                        !isNaN(e.target.value)
                      ) {
                        setAdditionalVolume(e.target.value);
                      }
                    }}
                  />
                </Grid>
                {/* Additional Collateral */}
                <Grid item sx={{ width: "100%", mt: "32px" }}>
                  <TextField
                    variant='outlined'
                    label='Additional Collateral'
                    fullWidth
                    size='small'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>ISK</InputAdornment>
                      ),
                    }}
                    value={additionalCollateral}
                    onChange={(e) => {
                      if (!e.target.value) {
                        setAdditionalCollateral("");
                      }
                      if (
                        /[0-9]/.test(e.target.value) &&
                        !isNaN(e.target.value)
                      ) {
                        setAdditionalCollateral(e.target.value);
                      }
                    }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                direction='column'
                component={Paper}
                elevation={0}
                sx={{
                  p: "16px",
                  mt: "16px",
                  background: (muiTheme) => muiTheme.palette.primary.main,
                }}
              >
                {/*Contract To*/}
                <Grid item sx={{ width: "100%" }}>
                  <TextField
                    variant='outlined'
                    label='Contract To'
                    fullWidth
                    size='small'
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            sx={{ p: 0 }}
                            onClick={() => {
                              navigator.clipboard.writeText(
                                response.contractTo
                              );
                              setShowToast({
                                active: true,
                                message: `${response.contractTo} Copied`,
                                severity: "success",
                              });
                            }}
                          >
                            <ContentPasteIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={response.contractTo}
                    sx={{
                      ".MuiOutlinedInput-input": {
                        fontSize: "14px",
                        fontWeight: 700,
                      },
                      ".MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#212121",
                        },
                      ".MuiFormLabel-root": {
                        color: "#212121",
                      },
                    }}
                    onClick={(e) =>
                      typeof e.target?.select === "function"
                        ? e.target?.select()
                        : {}
                    }
                  />
                </Grid>
                {/*Ship To*/}
                <Grid item sx={{ width: "100%", mt: "22px" }}>
                  <TextField
                    variant='outlined'
                    label='Ship To'
                    fullWidth
                    size='small'
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            sx={{ p: 0 }}
                            onClick={() => {
                              navigator.clipboard.writeText(data.destination);
                              setShowToast({
                                active: true,
                                message: `Destination Copied`,
                                severity: "success",
                              });
                            }}
                          >
                            <ContentPasteIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={data.destination}
                    sx={{
                      ".MuiOutlinedInput-input": {
                        fontSize: "14px",
                        fontWeight: 700,
                      },
                      ".MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#212121",
                        },
                      ".MuiFormLabel-root": {
                        color: "#212121",
                      },
                    }}
                    onClick={(e) =>
                      typeof e.target?.select === "function"
                        ? e.target?.select()
                        : {}
                    }
                  />
                </Grid>
                {/*totalVolume*/}
                <Grid item sx={{ width: "100%", mt: "22px" }}>
                  <TextField
                    variant='outlined'
                    label='Total Volume'
                    fullWidth
                    size='small'
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment
                          position='end'
                          style={{ display: "flex", gap: "8px" }}
                        >
                          <Typography variant='body2' sx={{ fontWeight: 600 }}>
                            m³
                          </Typography>
                          <IconButton
                            sx={{ p: 0 }}
                            onClick={() => {
                              navigator.clipboard.writeText(
                                additionalVolume
                                  ? parseFloat(additionalVolume) +
                                      parseFloat(response.totalVolume)
                                  : response.totalVolume
                              );
                              setShowToast({
                                active: true,
                                message: `Volume Copied`,
                                severity: "success",
                              });
                            }}
                          >
                            <ContentPasteIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={
                      additionalVolume
                        ? parseFloat(additionalVolume) +
                          parseFloat(response.totalVolume)
                        : response.totalVolume
                    }
                    sx={{
                      ".MuiOutlinedInput-input": {
                        fontSize: "14px",
                        fontWeight: 700,
                      },
                      ".MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#212121",
                        },
                      ".MuiFormLabel-root": {
                        color: "#212121",
                      },
                    }}
                    onClick={(e) =>
                      typeof e.target?.select === "function"
                        ? e.target?.select()
                        : {}
                    }
                  />
                </Grid>
                {/*totalCollateral*/}
                <Grid item sx={{ width: "100%", mt: "22px" }}>
                  <TextField
                    variant='outlined'
                    label='Total Collateral'
                    fullWidth
                    size='small'
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment
                          position='end'
                          style={{ display: "flex", gap: "8px" }}
                        >
                          <Typography variant='body2' sx={{ fontWeight: 600 }}>
                            ISK
                          </Typography>
                          <IconButton
                            sx={{ p: 0 }}
                            onClick={() => {
                              navigator.clipboard.writeText(
                                additionalCollateral
                                  ? parseFloat(additionalCollateral) +
                                      parseFloat(response.totalCollateral)
                                  : response.totalCollateral
                              );
                              setShowToast({
                                active: true,
                                message: `Collateral Copied`,
                                severity: "success",
                              });
                            }}
                          >
                            <ContentPasteIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={
                      additionalCollateral
                        ? parseFloat(additionalCollateral) +
                          parseFloat(response.totalCollateral)
                        : response.totalCollateral
                    }
                    sx={{
                      ".MuiOutlinedInput-input": {
                        fontSize: "14px",
                        fontWeight: 700,
                      },
                      ".MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#212121",
                        },
                      ".MuiFormLabel-root": {
                        color: "#212121",
                      },
                    }}
                    onClick={(e) =>
                      typeof e.target?.select === "function"
                        ? e.target?.select()
                        : {}
                    }
                  />
                </Grid>
                {/*reward*/}
                <Grid item sx={{ width: "100%", mt: "22px" }}>
                  <TextField
                    variant='outlined'
                    label='Reward'
                    fullWidth
                    size='small'
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment
                          position='end'
                          style={{ display: "flex", gap: "8px" }}
                        >
                          <Typography variant='body2' sx={{ fontWeight: 600 }}>
                            ISK
                          </Typography>
                          <IconButton
                            sx={{ p: 0 }}
                            onClick={() => {
                              navigator.clipboard.writeText(response.reward);
                              setShowToast({
                                active: true,
                                message: `Reward Copied`,
                                severity: "success",
                              });
                            }}
                          >
                            <ContentPasteIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={response.reward}
                    sx={{
                      ".MuiOutlinedInput-input": {
                        fontSize: "14px",
                        fontWeight: 700,
                      },
                      ".MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#212121",
                        },
                      ".MuiFormLabel-root": {
                        color: "#212121",
                      },
                    }}
                    onClick={(e) =>
                      typeof e.target?.select === "function"
                        ? e.target?.select()
                        : {}
                    }
                  />
                </Grid>
                {/* alert */}
                <Grid item sx={{ width: "100%", mt: "16px" }}>
                  <Grid
                    container
                    component={Paper}
                    elevation={0}
                    sx={{
                      borderRadius: "4px",
                      p: "12px 16px",
                      background: "#c67100",
                      color: "#0f0f0f",
                      fontSize: "12px",
                    }}
                  >
                    <Grid item sx={{ mr: "12px" }}>
                      <ErrorOutlineIcon />
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                      <Typography variant='body2' sx={{ fontSize: "12px" }}>
                        Contract privately to the corporation{" "}
                        <span style={{ fontWeight: "bold" }}>
                          Coffee Republic
                        </span>{" "}
                        [CAFE-] with an expiration of 7 days and 3 days to
                        complete.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      {/* footer */}
      <Grid
        item
        sx={{
          width: "100%",
          "@media (min-width: 1536px)": {
            marginTop: "280px",
          },
        }}
      >
        <Footer />
      </Grid>
    </Grid>
  );
}
