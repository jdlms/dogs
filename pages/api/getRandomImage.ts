import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getRandomImage(req: NextApiRequest, res: NextApiResponse) {
  try {
    const axiosResponse = await axios.get(
      "https://api.thedogapi.com/v1/images/search?api_key=" + process.env.DOG_API_KEY,
      {
        params: {
          size: "small",
          has_breeds: 1,
          limit: 25,
        },
      }
    );
    return res.status(200).send(axiosResponse.data);
  } catch (error) {
    return res.status(404).send("error");
  }
}
