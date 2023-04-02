import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export async function getCollection(ids: string[]) {
  try {
    const axiosResponse = await axios.get(
      "https://api.thedogapi.com/v1/images/search?api_key=" + process.env.DOG_API_KEY,
      {
        params: {
          size: "small",

          breed_ids: "18,6",
        },
      }
    );
    return axiosResponse.data;
  } catch (error) {
    console.error("There was an error", error);
  }
}
