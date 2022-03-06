import { GetServerSidePropsContext } from "next";
import * as setup from "../lib/db";
import { setUpBaseUrl } from "../lib/SetupBaseUrl";
import logger from '../lib/logger';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { slug }: any = context?.params;
  if (slug.length > 0) {
    const connection = setup.setupDb();
    const base = setUpBaseUrl();

    const querySpec = {
      query: "SELECT * FROM c WHERE c.short_url = @value",
      parameters: [
        {
          name: "@value",
          value: `${base}/${slug}`,
        },
      ],
    };

    logger.info(querySpec);
    const res: any = await connection?.containerID.items
      .query(querySpec)
      .fetchAll();

      logger.info(res);
    if (res?.resources.length > 0) {
      return {
        redirect: {
          permanent: false,
          destination: `${res.resources[0].original_url}`,
        },
      };
    }
  }

  return { props: {} };
};

const Redirector = () => {
  return (
  <></>
  );
}

export default Redirector;
