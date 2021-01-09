import axios from "axios";
import { API_BASE_URL } from "../config";

export const getTopTweets = async (): Promise<any> => {
  const TOP_TWEETS_URL = `${API_BASE_URL}/twitter/top-tweets`;
  try {
    const response = await axios.get<any>(TOP_TWEETS_URL);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};
