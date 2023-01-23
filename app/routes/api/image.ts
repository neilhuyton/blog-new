import type { LoaderFunction } from "@remix-run/server-runtime";
import { imageLoader, MemoryCache } from "remix-image/server";

const config = {
  selfUrl: "http://localhost:3000",
  cache: new MemoryCache(),
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
