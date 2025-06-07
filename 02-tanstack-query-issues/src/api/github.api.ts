import axios from "axios";

console.log(import.meta.env.VITE_GITHUB_TOKEN);

export const githubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/vnd.github.v3+json",
    "Authorization": `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
}); 