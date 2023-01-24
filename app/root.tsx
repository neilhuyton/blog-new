import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import highlight from "highlight.js/styles/night-owl.css";
import remixImageStyles from "remix-image/remix-image.css";

import {
  ThemeBody,
  ThemeHead,
  ThemeProvider,
  useTheme,
} from "~/utils/theme-provider";
import { getThemeSession } from "~/utils/theme.server";
import { getPosts, getFeaturedPosts } from "~/models/post.server";
import { getTags } from "~/models/tag.server";

import tailwindStyles from "./styles/tailwind.css";
import globalStyles from "./styles/global.css";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";


export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStyles },
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", href: highlight },
    { rel: "stylesheet", href: remixImageStyles },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Source+Code+Pro:wght@400;600&family=JetBrains+Mono:wght@600;700&display=auto",
    },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  const [posts, featuredPosts, tags, themeSession] = await Promise.all([
    getPosts(),
    getFeaturedPosts(),
    getTags(),
    getThemeSession(request),
  ]);
  const theme = themeSession.getTheme();
  return json({ posts, featuredPosts, tags, theme });
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Neil Huyton: Blog",
  viewport: "width=device-width,initial-scale=1",
});

function App() {
  const data = useLoaderData<typeof loader>();

  const latestPosts = data.posts.slice(0, 3);
  const [theme] = useTheme();

  return (
    <html lang="en" className={theme ?? ""}>
      <head>
        <Meta />
        <Links />
        <ThemeHead ssrTheme={Boolean(data.theme)} />
      </head>
      <body className="bg-body-light dark:bg-body-dark leading-6 text-light dark:text-dark">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          href="http://www.w3.org/1999/xlink"
          id="global-icons"
          style={{ display: "none" }}
          className="text-white"
        >
          <symbol
            id="i-moon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z"></path>
          </symbol>
          <symbol
            id="i-sun"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"></path>
          </symbol>
        </svg>
        <div className="flex flex-col min-h-screen xl:container">
          <Header />

          <div className="flex flex-wrap xl:flex-nowrap">
            <div className="xl:basis-2/3 px-5 w-full">
              <Outlet />
            </div>
            <div className="xl:basis-1/3 px-5 w-full mt-10 xl:mt-0">
              <Sidebar
                featuredPosts={data.featuredPosts}
                latestPosts={latestPosts}
                tags={data.tags}
              />
            </div>
          </div>
        </div>
        <ThemeBody ssrTheme={Boolean(data.theme)} />
        <Footer
          featuredPosts={data.featuredPosts}
          latestPosts={latestPosts}
          tags={data.tags}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}
