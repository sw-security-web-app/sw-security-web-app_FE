import ChangePwForm from "~/components/changePwForm";
import changePwStyle from "../css/changePw.module.css";
export default function ChangePw() {
  return (
    <div className={changePwStyle.inner}>
      <ChangePwForm />
    </div>
  );
}
