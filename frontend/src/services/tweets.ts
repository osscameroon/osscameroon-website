import axios from "axios";
import { API_BASE_URL } from "../config";
import { Response, TweetList } from "../utils/types";

export const getTopTweets = async (): Promise<Response<TweetList>> => {
  const TOP_TWEETS_URL = `${API_BASE_URL}/twitter/top-tweets`;
  try {
    const response = await axios.get<any>(TOP_TWEETS_URL);
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
};
