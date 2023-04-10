import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const discordLink = "https://discord.gg/tpQe3yevdz";

const InstructionsData = [
  {
    title: "1. Highlight items to be contracted. ",
    description:
      "Select all of the items that you would like to contract to move and hit Ctrl + C copy them.",
    img: "/instructions/1.png",
  },
  {
    title: "2. Paste items into the calculator.",
    description:
      'In the appraisal field of the Dark Horse calculator, paste the earlier copied items with Ctrl + V and click the "Appraise" button on the calculator.',
    img: "/instructions/2.png",
  },
  {
    title: "3. Contract the highlighted items.",
    description:
      'In your EVE client, right-click the highlighted items and select "Create Contract".',
    img: "/instructions/3.png",
  },
  {
    title: "4. Set the contract to Courier privately to Coffee Republic.",
    description: `On the first contract screen, set the contract type to "Courier", the availability to "Private" and enter "Coffee Republic" in the text field. Once done, click "Next" at the bottom on the window.`,
    img: "/instructions/4.png",
  },
  {
    title: "5. Confirm that checked items are correct.",
    description: `On the second contract screen, confirm that the check items to be contracted are correct. If you make changes here, you will need to redo the appraisal in the Dark Horse calculator. Once done, click "Next" at the bottom of the window.`,
    img: "/instructions/5.png",
  },
  {
    title: "6. Set the destination for the contract.",
    description: `On the third contract screen, enter the destination structure/station for your contract. Once done, click "Next" at the bottom of the window.\n\nIf you are using a neutral trading toon, you probably will not be able to set a Horde structure as the contract's destination because neutrals cannot see Horde structures.\n\nYou will need to send an in-game link of the Horde structure to your neutral alt via in-game mail. Using your nuetral, drag that link into the destination field.`,
    img: "/instructions/6.png",
  },
  {
    title: "7. Copy the collateral and reward from the calculator.",
    description: `On the fourth contract screen, copy in the Total Collateral from the Dark Horse calculator into the Collateral number field. Similarly copy the Reward from the Dark Horse calculator into the Reward number field. Once done, click "Next" at the bottom of the window.\nThere are copy icons for easy coping on the right side of each field in the Dark Horse calculator.`,
    img: "/instructions/7.png",
  },
  {
    title: "8. Confirm and complete the contract.",
    description: `On the last contract screen, confirm everything is correct and click "Finish" to complete the contract.`,
    img: "/instructions/8.png",
  },
];
const FaqData = [
  {
    title: "Do you accept contracts from neutral Jita alts?",
    description:
      "Yes, but you probably will not be able to set a Horde structure as the contract's destination because neutrals cannot see Horde structures.\n\nYou will need to send an in-game link of the Horde structure to your neutral alt via in-game mail. Using your nuetral, drag that link into the destination field.",
    img: "",
  },
  {
    title: "Do you accept no collateral contracts?",
    description: "Yes, however, I highly highly recommend against it.",
    img: "",
  },
  {
    title: "Are containers allowed in contracts?",
    description:
      'Yes they are but, I ask that you please mention it in the "Description (optional)" section of your contract otherwise you may experience a delay with your delivery.',
    img: "",
  },
  {
    title: "What is the best way to contact you?",
    description: (
      <span>
        Join the Dark Horse Discord{" "}
        <a href={discordLink} target='_blank'>
          {discordLink}
        </a>{" "}
        and message me there.
      </span>
    ),
    img: "",
  },
  {
    title: "My route is not in the calculator!?",
    description: `If you need a custom route, please contact me on Discord and we can easily work one out.`,
    img: "",
  },
  {
    title: "I received a weird message from you?",
    description: `I will only contact you through Discord or with the in-game character "No Creamor Sugar". I will never contact you with any of my 1RFC or Horde characters.`,
    img: "/faq/6.png",
  },
  {
    title: "",
    description: `One of my competitors has been confirmed to be impersonating me and CCP will take whatever action they feel is appropriate once they complete their investigation. Until then, message me if you are unsure.`,
    img: "",
  },
];

const changeLogData = [
  {
    title: "1.007.000",
    description: [
      "Restructured routes by separating origin and destinations.",
      "Added the ability to copy destinations to clipboard.",
    ],
    img: "/changelog/1.png",
  },
  {
    title: "1.006.001",
    description: ["Added dividers to route pulldown for readability."],
    img: "/changelog/2.png",
  },
  {
    title: "1.006.000",
    description: ["Added instructions to navigation bar."],
    img: "/changelog/3.png",
  },
  {
    title: "1.005.001",
    description: [
      "Re-styled percent collateral slider and copy tooltips for readability.",
    ],
    img: "",
  },
  {
    title: "1.005.000",
    description: [
      "Added navigation bar as well as sections for FAQ and Change Log.",
      "Added tooltips for the copy buttons.",
    ],
    img: "/changelog/5.png",
  },
  {
    title: "1.004.000",
    description: [
      `Added "Copied" toasts for user feedback.`,
      "Increased the contrast of the contract summary section.",
    ],
    img: "/changelog/6.png",
  },
  {
    title: "1.003.000",
    description: [
      `Added precent collateral slider functionality`,
      "Regional formatting for the manual entry fields.",
    ],
    img: "/changelog/7.png",
  },
  {
    title: "1.002.001",
    description: [
      `Reformatted contract summary section to be bold for readability.`,
    ],
    img: "",
  },
  {
    title: "1.002.000",
    description: [`Added loading wheel on appraisal button for user feedback.`],
    img: "/changelog/9.png",
  },
  {
    title: "1.001.000",
    description: [`Added a copy function for "Coffee Republic".`],
    img: "/changelog/10.png",
  },
  {
    title: "1.000.001",
    description: [`Added link to Horde home page.`],
    img: "",
  },
];
const RenderDialog = ({ open, onClose, title, children }) => (
  <Dialog open={open} maxWidth='sm' fullWidth onClose={onClose}>
    <DialogTitle sx={{ fontWeight: "bold" }}>{title}</DialogTitle>
    <Divider />
    <DialogContent>{children}</DialogContent>
    <Divider />
    <DialogActions>
      <Button variant='plain' sx={{ fontWeight: "bold" }} onClick={onClose}>
        Close
      </Button>
    </DialogActions>
  </Dialog>
);
export default function header() {
  const [instructionsDialog, setInstructionsDialog] = useState(false);
  const [faqDialog, setFaqDialog] = useState(false);
  const [changeLogDialog, setChangeLogDialog] = useState(false);

  const menuSX = {
    fontSize: "11px",
    color: "#fff",
    fontWeight: "600",
    borderRadius: 0,
    "&:hover": {
      color: "#ffa000",
      background: "transparent",
      borderBottom: "1px solid",
    },
  };
  return (
    <AppBar
      position='static'
      sx={{
        background: "#0f0f0f",
        color: "rgba(0, 0, 0, 0.87)",
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <RenderDialog
        open={instructionsDialog}
        onClose={() => setInstructionsDialog(false)}
        title='Instructions'
      >
        <Grid container direction='column' gap='25px'>
          {InstructionsData.map((item, i) => (
            <Grid item key={i} sx={{ width: "100%" }}>
              <Typography variant='body2' sx={{ fontWeight: 700 }}>
                {item.title}
              </Typography>
              <Typography
                variant='body2'
                sx={{ whiteSpace: "pre-line", mt: "2px" }}
              >
                {item.description}
              </Typography>
              {item.img && (
                <Grid container justifyContent='center' sx={{ mt: "20px" }}>
                  <img
                    src={item.img}
                    style={{ width: "auto", height: "auto" }}
                  />
                </Grid>
              )}
            </Grid>
          ))}
        </Grid>
      </RenderDialog>
      <RenderDialog
        open={faqDialog}
        onClose={() => setFaqDialog(false)}
        title='FAQ'
      >
        <Grid container direction='column' gap='25px'>
          {FaqData.map((item, i) => (
            <Grid item key={i} sx={{ width: "100%" }}>
              {item.title && (
                <Typography variant='body2' sx={{ fontWeight: 700 }}>
                  {item.title}
                </Typography>
              )}
              <Typography
                variant='body2'
                sx={{ whiteSpace: "pre-line", mt: "2px" }}
              >
                {item.description}
              </Typography>
              {item.img && (
                <Grid container justifyContent='center' sx={{ mt: "20px" }}>
                  <img
                    src={item.img}
                    style={{ width: "auto", height: "auto" }}
                  />
                </Grid>
              )}
            </Grid>
          ))}
        </Grid>
      </RenderDialog>
      <RenderDialog
        open={changeLogDialog}
        onClose={() => setChangeLogDialog(false)}
        title='FAQ'
      >
        <Grid container direction='column' gap='25px'>
          {changeLogData.map((item, i) => (
            <Grid item key={i} sx={{ width: "100%" }}>
              {item.title && (
                <Typography
                  variant='body2'
                  sx={{ fontSize: "12px", fontWeight: 700 }}
                >
                  {item.title}
                </Typography>
              )}
              <ul>
                {item.description.map((d, ind) => (
                  <li key={`${i}-${ind}`}>
                    <Typography
                      variant='body2'
                      sx={{
                        fontSize: "12px",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {d}
                    </Typography>
                  </li>
                ))}
              </ul>
              {item.img && (
                <Grid container justifyContent='center' sx={{ mt: "20px" }}>
                  <img
                    src={item.img}
                    style={{ width: "auto", height: "auto" }}
                  />
                </Grid>
              )}
            </Grid>
          ))}
        </Grid>
      </RenderDialog>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          "&.MuiToolbar-root": {
            minHeight: "40px",
          },
        }}
      >
        <Grid item sx={{ flex: 1 }}>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant='plain'
                sx={menuSX}
                onClick={() => setInstructionsDialog(true)}
              >
                Instructions
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='plain'
                sx={menuSX}
                onClick={() => setFaqDialog(true)}
              >
                FAQ
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='plain'
                sx={menuSX}
                onClick={() => setChangeLogDialog(true)}
              >
                Change Log
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant='plain'
                component='a'
                href={discordLink}
                target='_blank'
                sx={menuSX}
              >
                Discord
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
