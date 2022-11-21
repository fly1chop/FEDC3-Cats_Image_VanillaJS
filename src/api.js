import { API_END_POINT } from "./config.js";

export const request = async (url) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`);

    if (!res.ok) throw new Error("failed to fetch data!!!!! XD");

    return await res.json();
  } catch (e) {
    alert(e.message);
    console.error(e);
  }
};
