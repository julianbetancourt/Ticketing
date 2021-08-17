import axios from "axios"

export default function buildClient({ req }) {
  if (typeof window === "undefined") {
    // We are on the server

    return axios.create({
      baseURL: "http://www.jobtalks.co/",
      headers: req.headers,
    })
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: "/",
    })
  }
}
