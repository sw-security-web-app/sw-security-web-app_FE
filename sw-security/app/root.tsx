import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { useLocalStorage } from "./store/store";

// export const links: LinksFunction = () => [
//   { rel: "preconnect", href: "https://cdn.jsdelivr.net" },
//   {
//     rel: "stylesheet",
//     href: "https://cdn.jsdelivr.net/gh/orioncactus/Pretendard/dist/web/static/pretendard.css",
//     as: "style",
//     crossOrigin: "anonymous",
//   },
// ];
export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      style={{ margin: 0, padding: 0, height: "100%", fontSize: "18px" }}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <Meta />
        <Links />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          height: "100%",
          fontFamily: "'Pretendard', sans-serif",
        }}
      >
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
