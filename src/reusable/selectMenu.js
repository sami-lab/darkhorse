import {
  Divider,
  Grid,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function TimezoneMenu({
  options,
  value,
  onChange,
  menuId,
  open,
  onClose,
}) {
  const renderMenu = (
    <Menu
      anchorEl={open}
      id={menuId}
      keepMounted
      //MenuListProps={{ onMouseLeave: () => setTimezonePopup(null) }}
      open={Boolean(open)}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      disableScrollLock
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "#fff",
          boxShadow: "2px 4px 25px rgba(0, 0, 0, 0.15)",
          borderRadius: "10px",

          overflowY: "hidden",
        },
      }}
    >
      <div style={{ width: "384px" }}>
        <Paper
          elevation={0}
          style={{
            background: "transparent",

            maxHeight: "200px",
            overflowY: "auto",
            boxShadow: "none",
          }}
        >
          {options.map((z) => (
            <>
              <Typography
                key={z.category}
                variant='subtitle2'
                style={{
                  fontWeight: 700,
                  color: "#030229",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "6px 16px",
                }}
                //   className={classes.roboto}
              >
                <Divider sx={{ width: "10%", borderColor: "#000" }} />
                <span>{z.category}</span>
                <Divider sx={{ flex: 1, borderColor: "#000" }} />
              </Typography>

              {z.options.map((ut) => (
                <MenuItem
                  sx={{
                    "&:hover": {
                      background:
                        ut.value === value
                          ? "rgba(255, 160, 0, 0.08)"
                          : "rgba(0, 0, 0, 0.04)",
                    },
                    background:
                      ut.value === value
                        ? "rgba(255, 160, 0, 0.08)"
                        : "inherit",
                    padding: "6px 16px",
                  }}
                  key={ut.value}
                  onClick={() => {
                    onChange(ut.value);
                    onClose();
                  }}
                >
                  <Grid container justifyContent='space-between'>
                    <Grid item>
                      <Typography
                        variant='body2'
                        style={{
                          fontWeight: 400,
                          color: "#000",
                        }}
                        // className={classes.roboto}
                      >
                        {ut.label}
                      </Typography>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </MenuItem>
              ))}
            </>
          ))}
        </Paper>
      </div>
    </Menu>
  );
  return renderMenu;
}
