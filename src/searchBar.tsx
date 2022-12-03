import SearchBar from "material-ui-search-bar";
import { StatusResult } from "nft.storage/dist/src/lib/interface";
import React, { Component } from "react";
import NFTStorageExample from "./nft.storage";
import CollapsibleTable from "./collapsibleTable";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class SearchBarExample extends Component<
  {},
  {
    value: string;
    status: StatusResult;
    showResults: boolean;
    open: boolean;
    message: string;
  }
> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      value: "",
      status: {
        cid: "",
        size: 0,
        deals: [],
        pin: { cid: "", status: "failed", created: new Date(), name: "" },
        created: new Date(),
      },
      showResults: false,
      open: false,
      message: "",
    };
  }

  async handleSearch(value: string) {
    const client = new NFTStorageExample();
    try {
      const statusResult = await client.queryStatus(value);
      this.setState({ status: statusResult, showResults: true });
    } catch (err) {
      this.setState({ open: true, message: err.message });
    }
  }

  handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <SearchBar
          value={this.state.value}
          onChange={(newValue) => this.setState({ value: newValue })}
          onRequestSearch={() => this.handleSearch(this.state.value)}
          placeholder="Search with a valid CID..."
        />
        <br></br>
        <div>
          {this.state.showResults ? (
            <CollapsibleTable status={this.state.status}></CollapsibleTable>
          ) : null}
        </div>
        <Snackbar
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="error">
            {this.state.message}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
