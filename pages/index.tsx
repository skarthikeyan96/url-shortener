import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import config from "../lib/config";
import * as CosmosClient from "@azure/cosmos";
import { useRef, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

const RenderTable = ({ url }: { url: string }) => {
  const [copySuccess, setCopySuccess] = useState("copy");

  const handleClick = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log(`"${url}" was copied to clipboard.`);
        setCopySuccess("copied");
      })
      .catch((err) => {
        console.error(`Error copying text to clipboard: ${err}`);
      });
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    Link
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {url}
                  </td>

                  <td className="py-4 px-6 text-sm font-medium  whitespace-nowrap flex items-center">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-white border-0 focus:outline-none  rounded text-base mt-4 md:mt-0 dark:bg-gray-700 p-2"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>{" "}
                    </a>
                    <button
                      className="ml-2 inline-flex items-center bg-white border-0 pr-2 focus:outline-none  rounded text-base mt-4 md:mt-0 dark:bg-gray-700 p-2"
                      onClick={handleClick}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        ></path>
                      </svg>
                      <p className="font-light ml-2">{copySuccess} </p>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const [url, setUrl] = useState("");

  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (url.length > 0) {
      try {
        setLoading(true);
        const response = await axios({
          method: "POST",
          url: "/api/short",
          data: {
            original_url: url,
          },
        });

        setShortUrl(response.data.short_url);

        setLoading(false);
      } catch (e) {
        setError("something went wrong !.. 🤔 🤔 🤔");
        setLoading(false);
      }
    } else {
      alert("Please enter a url to continue");
    }
  };
  return (
    <>
      <Head>
        <title>Url Shortener</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="mx-auto container p-5 mt-16">
          <div className="flex items-center justify-center">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="
              mt-1
              block
              w-1/2
              rounded-md
              border-gray-300
              shadow-sm
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
            "
            />
            <button
              className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-8 mt-1 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
              onClick={handleClick}
            >
              Shorten
            </button>
          </div>
          <div className="flex items-center justify-center mt-8">
            {loading ? (
              <p> Loading .... </p>
            ) : (
              shortUrl.length !== 0 && <RenderTable url={shortUrl} />
            )}

            {error.length > 0 && <p> {error}</p>}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
