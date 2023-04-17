import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getDogs(req: NextApiRequest, res: NextApiResponse) {
  try {
    const axiosResponse = await axios.get(
      "https://api.thedogapi.com/v1/images/search?api_key=" + process.env.DOG_API_KEY,
      {
        params: {
          size: "small",
          has_breeds: 1,
          limit: 20,
        },
      }
    );
    return res.status(200).send(axiosResponse.data);
  } catch (error) {
    console.log("API CALL ERROR");
    return res.status(500).send(error.message);
  }
}
