import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { useLocalStorage } from "./store/store";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://cdn.jsdelivr.net" },
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/gh/orioncactus/Pretendard/dist/web/static/pretendard.css",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      style={{ margin: 0, padding: 0, height: "100vh", fontSize: "18px" }}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          body {
            font-family: 'Pretendard', sans-serif;
          }
        `}</style>
        <Meta />
        <Links />
      </head>
      <body style={{ margin: 0, padding: 0, height: "100vh" }}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useLocalStorage(); // 여기서 한 번만 호출
  return <Outlet />;
}
