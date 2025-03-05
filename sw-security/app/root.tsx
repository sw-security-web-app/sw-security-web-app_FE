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
        {/* <link rel="stylesheet" href="../css/styles.module.css" /> */}
        <link rel="icon" type="image/ico" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="VERO" />
        <meta
          property="og:url"
          content="https://d1ujq2bm8j3hx9.cloudfront.net/"
        />
        <meta
          property="og:description"
          content="VERO를 통해 안전한 대화를 시작하세요."
        />
        <meta property="og:image" content="/VERO_OG.png" />

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
  return <Outlet />;
}
