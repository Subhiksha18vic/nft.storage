import React, { Component, useState } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import {
  CircularProgress,
  Link,
  Snackbar,
  Avatar,
  TextField,
} from "@material-ui/core";
import NFTStorageExample from "./nft.storage";
import { Alert } from "@material-ui/lab";

export default class DropzoneDialogExample extends Component<
  {},
  {
    open: boolean;
    files: [];
    cid: string;
    showResults: boolean;
    loading: boolean;
    openBar: boolean;
    message: string;
    name: string;
  }
> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      open: false,
      files: [],
      cid: "",
      showResults: false,
      loading: false,
      openBar: false,
      message: "",
      name: "",
    };
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleCloseBar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openBar: false });
  };

  async handleSave(files: any) {
    //Saving files to state for further use and closing Modal.
    this.setState({
      files: files,
      open: false,
      loading: true,
    });
    try {
      const client = new NFTStorageExample();
      const cid = await client.storeToken(files);
      this.setState({ cid: cid, showResults: true });
    } catch (err) {
      this.setState({ openBar: true, message: err.message });
    }
    this.setState({ loading: false });
  }
  async handleText(files: any) {
    //Saving files to state for further use and closing Modal.
    this.setState({
      loading: true,
    });
    try {
      const client = new NFTStorageExample();
      const cid = await client.storeToken(this.state.name);
      // const cid = await client.storeBlob(someData);
      this.setState({ cid: cid, showResults: true });
    } catch (err) {
      this.setState({ openBar: true, message: err.message });
    }
    this.setState({ loading: false });
  }
  handleOpen() {
    this.setState({
      open: true,
    });
  }

  render() {
    return (
      <div>
        <div>
          <TextField
            id="time"
            type="string"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={this.handleText.bind(this)}
          >
            {this.state.loading ? (
              <CircularProgress color="inherit" size={25} disableShrink />
            ) : (
              "Upload text to NFT Storage"
            )}
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={this.handleOpen.bind(this)}
          >
            {this.state.loading ? (
              <CircularProgress color="inherit" size={25} disableShrink />
            ) : (
              "Upload to NFT Storage"
            )}
          </Button>
          <DropzoneDialog
            open={this.state.open}
            onSave={this.handleSave.bind(this)}
            acceptedFiles={["image/*", "application/pdf", "video/*", "audio/*"]}
            filesLimit={100}
            showPreviews={true}
            maxFileSize={104857600}
            onClose={this.handleClose.bind(this)}
          />
        </div>
        <div>
          {this.state.showResults ? (
            <h3>
              Your CID for NFTs on Filecoin & IPFS NFT Storage is on{" "}
              <Avatar
                src={` https://cloudflare-ipfs.com/ipfs/${this.state.cid}`}
              />
              <div className="py-2 btn btn-primary btn-lg h1 fw-bold text-white">
                Download Assets{" "}
              </div>
              <a
                href={` https://cloudflare-ipfs.com/ipfs/${this.state.cid}`}
                download="w3logo"
              >
                <Avatar
                  src={` https://cloudflare-ipfs.com/ipfs/${this.state.cid}`}
                />
              </a>
              <Link
                href={`https://${this.state.cid}.ipfs.dweb.link`}
                target="_blank"
                rel="noopener"
              >
                https://{this.state.cid}.ipfs.dweb.link
              </Link>
            </h3>
          ) : null}
        </div>
        <img
          className="card card-body"
          style={{ height: "400px" }}
          // src={logoUrl}
          alt=""
        />
        <Snackbar
          open={this.state.openBar}
          autoHideDuration={3000}
          onClose={this.handleCloseBar}
        >
          <Alert onClose={this.handleCloseBar} severity="error">
            {this.state.message}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

function makeStorageClient() {
  throw new Error("Function not implemented.");
}

function setLogoUrl(url: string) {
  throw new Error("Function not implemented.");
}
function setname(value: string): void {
  throw new Error("Function not implemented.");
}
