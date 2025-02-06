import { Link } from "@remix-run/react";
import indexStyle from "../../public/css/index.module.css";
import LoginHeader from "~/components/loginHeader";
import defaultStyle from "../../public/css/default.module.css";

export default function Index() {
  return (
    <div className={defaultStyle.container}>
      <LoginHeader />
      <div className={defaultStyle.content}>
        <div className={defaultStyle.inner}>
          <div className={indexStyle.logoContainer}>
            <div className={indexStyle.logo}></div>
          </div>
          <div className={indexStyle.textContainer}>
            <div className={indexStyle.nameContainer}>
              <span className={indexStyle.name}>Vero</span>
            </div>
            <div className={indexStyle.introContainer}>
              <span className={indexStyle.intro}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                pariatur iste sint minima, distinctio nesciunt mollitia
                recusandae hic optio fuga cum quis quae voluptatem eos placeat
                ratione assumenda dolore? Delectus?
              </span>
            </div>
          </div>
          <div className={indexStyle.startPoint}>
            <Link
              to="/join"
              style={{ textDecoration: "none" }}
              className={indexStyle.startBtnContainer}
            >
              <span className={indexStyle.startBtn}>시작하기</span>
            </Link>
            <div className={indexStyle.circle1} />
            <div className={indexStyle.circle2} />
            <div className={indexStyle.eclipseBlur} />
          </div>
          <div className={indexStyle.startBottomPoint}>
            <div className={indexStyle.circle3} />
            <div className={indexStyle.eclipseBlurBlack} />
            <div className={indexStyle.dotContainer}>
              {/* 첫 번째 줄 (2개) */}
              <div className={indexStyle.dotRow}>
                {Array.from({ length: 2 }, (_, index) => (
                  <div key={index} className={indexStyle.dot} />
                ))}
              </div>

              {/* 두 번째 줄 (6개) */}
              <div className={indexStyle.dotRow}>
                {Array.from({ length: 6 }, (_, index) => (
                  <div key={index} className={indexStyle.dot} />
                ))}
              </div>

              {/* 세 번째 줄 (8개) */}
              <div className={indexStyle.dotRow}>
                {Array.from({ length: 8 }, (_, index) => (
                  <div key={index} className={indexStyle.dot} />
                ))}
              </div>

              {/* 네 번째 줄 (8개) */}
              <div className={indexStyle.dotRow}>
                {Array.from({ length: 8 }, (_, index) => (
                  <div key={index} className={indexStyle.dot} />
                ))}
              </div>

              {/* 마지막 줄 (10개) */}
              <div className={indexStyle.dotRow}>
                {Array.from({ length: 10 }, (_, index) => (
                  <div key={index} className={indexStyle.dot} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
