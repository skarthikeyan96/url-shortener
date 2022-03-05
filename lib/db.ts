import config from "../lib/config";
import * as CosmosClient from "@azure/cosmos";

export const setupDb = () => {
  const { endpoint, key, db, ct } = config;

  try {
    const client = new CosmosClient.CosmosClient({ endpoint, key });
    const databaseID = client.database(db);
    const containerID = databaseID.container(ct);
    
    return {client,databaseID,containerID};
  } catch (e: any) {
    console.error(e);
  }
};
