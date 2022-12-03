import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Deal, Pin, StatusResult } from "nft.storage/dist/src/lib/interface";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(
  cid: string,
  created: Date,
  pin: Pin,
  deals: Deal[],
  size: number
) {
  return {
    cid,
    size,
    created,
    pin: {
      cid: pin.cid,
      name: pin.name,
      status: pin.status,
      created: pin.created,
    },
    deals: deals.length === 0 ? null : deals,
  };
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function dateTransform(date: Date): string {
  return date.toLocaleString();
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.cid}
        </TableCell>
        <TableCell align="right">{formatBytes(row.size)}</TableCell>
        <TableCell align="right">{dateTransform(row.created)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                IPFS Pinning State
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>CID</TableCell>
                    {row.pin.name ? <TableCell>Name</TableCell> : null}
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.pin.cid}>
                    <TableCell component="th" scope="row">
                      {row.pin.cid}
                    </TableCell>
                    {row.pin.name ? (
                      <TableCell>{row.pin.name}</TableCell>
                    ) : null}
                    <TableCell align="right">{row.pin.status}</TableCell>
                    <TableCell align="right">{row.pin.created} (UTC)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Filecoin Deal State
              </Typography>
              {row.deals ? ( // TODO Deals
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={row.deals[0].status}>
                      <TableCell component="th" scope="row">
                        {row.deals[0].status}
                      </TableCell>
                      <TableCell align="right">
                        {row.deals[0].lastChanged}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ) : null}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

type ComponentProps = {
  status: StatusResult;
};

export default function CollapsibleTable(props: ComponentProps): JSX.Element {
  const rows = [
    createData(
      props.status.cid,
      props.status.created,
      props.status.pin,
      props.status.deals,
      props.status.size
    ),
  ];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>CID</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.cid} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
