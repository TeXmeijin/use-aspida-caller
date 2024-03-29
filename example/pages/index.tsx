import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import aspida from "@aspida/axios";
import api from "../api/$api";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAspidaCaller } from "use-aspida-caller";
const client = api(
  aspida(axios, {
    baseURL: "https://swapi.dev/api",
  })
);

const Home: NextPage = () => {
  const [getResult, setGetResult] = useState<{ name: string }>();

  const {
    put,
    isPutting,
    isPutSuccessful,
    putError,
    get,
    isGetting,
    isGetSuccessful,
    getError,
  } = useAspidaCaller(client.people._id(1));

  const handleGetClick = async () => {
    setGetResult(await get({ query: { with_detail: true } }));
  };
  const handlePutClick = async () => {
    await put({ body: { name: "hoge" } }).catch((err) => null);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <a href="https://github.com/TeXmeijin/use-aspida-caller">
            useAspidaCaller!
          </a>
        </h1>

        <button onClick={handleGetClick}>Get Value</button>
        {isGetting && <p className={styles.description}>Loading...</p>}

        <p className={styles.description}>
          Result: {getResult?.name} / {isGetSuccessful && "Success!"}
        </p>

        <button onClick={handlePutClick}>Put Value</button>

        {isPutting && <p className={styles.description}>Loading...</p>}
        <p className={styles.description}>
          Error: {putError?.message} / {isPutSuccessful && "Success!"}
        </p>
      </main>
    </div>
  );
};

export default Home;
