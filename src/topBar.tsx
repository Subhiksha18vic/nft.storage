import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import { Box, Tab, Tabs } from "@material-ui/core";
import DropzoneAreaExample from "./upload";
import SearchBarExample from "./searchBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
    tabs: {
      flexGrow: 50,
      height: "100%",
    },
  })
);

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function SearchAppBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography className={classes.title} variant="h6" noWrap>
            nft.storage
          </Typography>
          <Tabs
            className={classes.tabs}
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
            indicatorColor="primary"
          >
            <Tab label={"Upload"} {...a11yProps(0)} />
            <Tab label={"Status"} {...a11yProps(1)} />
            {/* <Tab label={"Collections"} {...a11yProps(2)} /> */}
            <Tab label={"Buidl"} {...a11yProps(2)} />
          </Tabs>
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={0}>
        <h1> Save your NFT to Filecoin & IPFS NFT Storage</h1>
        <DropzoneAreaExample></DropzoneAreaExample>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1> View your NFT status and progress on NFT Storage</h1>
        <SearchBarExample></SearchBarExample>
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
      <TabPanel value={value} index={2}>
        <h1>NFT.Storage</h1>
        <h2>
          The buidl of NFT.Storage is based on the community edition of{" "}
          <a
            href="https://github.com/ipfs-shipyard/nft.storage"
            target="_blank"
            rel="noreferrer"
          >
            ipfs-shipyard/nft.storage
          </a>
          .
        </h2>
        <h2>
          Currently, every client who uploads their NFT to{" "}
          <a href="https://nft.storage" target="_blank" rel="noreferrer">
            nft.storage
          </a>{" "}
          must have API key to perform this action. This website provides a
          convenient way to upload your NFT with a predefined API key to
          IPFS/Filecoin.
        </h2>
        <h2>
          If you prefer to use your key, go to nft.storage to create one and
          upload via https://nft.storage/files. If you prefer to have your own
          NFT server for storage and client to upload NFT, like this website,
          please send your request to the email for solution: contact@loinv.com.
        </h2>
      </TabPanel>
    </div>
  );
}
