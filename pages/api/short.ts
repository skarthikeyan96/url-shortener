// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import shortid from "shortid";
import { v4 as uuidv4 } from "uuid";
import * as setup from "../../lib/db";
import { setUpBaseUrl } from "../../lib/SetupBaseUrl";
import logger from "../../lib/logger";

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { original_url } = req.body;
    const urlId = shortid.generate();
    const connection = setup.setupDb();
    const base = setUpBaseUrl();

    const querySpec = {
      query: "SELECT * FROM c WHERE c.original_url = @value",
      parameters: [
        {
          name: "@value",
          value: original_url,
        },
      ],
    };

    const response: any = await connection?.containerID.items
      .query(querySpec)
      .fetchAll();

    logger.info(response);

    if (response?.resources.length !== 0) {
      return res.status(200).json(response?.resources[0]);
    } else {
      const response: any = await connection?.containerID.items.create({
        id: uuidv4(),
        short_url: `${base}/${urlId}`,
        original_url: original_url,
      });
      return res.status(200).json(response?.resource);
    }
  } catch (e: any) {
    res.end(500).json(e);
  }
}
