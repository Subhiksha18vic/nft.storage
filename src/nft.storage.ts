import { NFTStorage, Blob } from "nft.storage";
import { CIDString, StatusResult } from "nft.storage/dist/src/lib/interface";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDEzNDcyRTc5MTkwNTI2MkQyN0VhMjUyMEM4MGFEQmZDNjQxMkNGZDEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2OTg4NjA1Nzk3MCwibmFtZSI6ImRlbW8ifQ.1Gw-qvtXSltPMEnVrhFK6FAiTwAAQbUviMZ8H9IqzEE";

class NFTStorageExample {
  private client: NFTStorage;
  constructor() {
    this.client = new NFTStorage({ token: API_TOKEN });
  }

  async storeToken(files: any): Promise<CIDString> {
    let cid;

    if (files.length > 1) {
      cid = await this.client.storeDirectory(files);
    } else {
      cid = await this.client.storeBlob(new Blob(files));
    }

    return cid;
  }

  async queryStatus(cid: string): Promise<StatusResult> {
    return await this.client.status(cid);
  }

  async delete(cid: string): Promise<void> {
    return await this.client.delete(cid);
  }
}

export default NFTStorageExample;
