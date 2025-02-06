import ProfileForm from "~/components/profileForm";
import profileStyle from "../../public/css/profile.module.css";
export default function Profile() {
  return (
    <div className={profileStyle.inner}>
      <ProfileForm />
    </div>
  );
}
