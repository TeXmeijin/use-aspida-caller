import { useAspidaCaller } from "@texmeijin/use-aspida-caller";
import aspida from "@aspida/axios";
import api from "./api/$api";
import axios from "axios";
import { useEffect } from "react";

const client = api(aspida(axios));
export const Main = () => {
  const {
    get,
    isGetting,
    isGetSuccessful,
    getError,
    put,
    isPutting,
    isPutSuccessful,
    putError,
  } = useAspidaCaller(client.people._id(1));

  useEffect(() => {
    (async () => {
      const getResponse = await get({
        query: {
          with_detail: true,
        },
      });
      console.log(getResponse.name);
      const putResponse = await put({
        body: {
          name: "string",
        },
      });
      console.log(putResponse.status);
    })();
  }, []);

  return (
    <div>
      <div>{isGetting ? "isGetting" : null}</div>
      <div>{isPutting ? "isPutting" : null}</div>
    </div>
  );
};
