import axios from "axios";

type NorrisResponse = {
  categories: [];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

export const getFrase = async () => {
  const { data } = await axios.get<NorrisResponse>(
    "https://api.chucknorris.io/jokes/random"
  );
  return data.value;
};
