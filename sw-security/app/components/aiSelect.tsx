import mainStyle from "../../public/css/main.module.css";

type Prop = { aiName: string };

export default function AISelect({ aiName }: Prop) {
  return (
    <div className={mainStyle.aiSelect}>
      <div className={mainStyle.imgContainer}>
        <img
          src={`/img/${aiName}.svg`}
          className={mainStyle.img}
          alt={aiName}
        />
      </div>
      <div className={mainStyle.tagContainer}>
        <span className={mainStyle.tag}>{aiName}</span>
      </div>
    </div>
  );
}
