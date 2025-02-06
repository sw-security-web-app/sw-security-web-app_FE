import profileStyle from "../../public/css/profile.module.css";

export default function ProfileForm() {
  return (
    <div className={profileStyle.profileContainer}>
      <div className={profileStyle.content}>
        <div className={profileStyle.titleContainer}>
          <span className={profileStyle.title}>마이페이지</span>
        </div>
        <div className={profileStyle.nameContainer}>
          <label>이름</label>
          <div className={profileStyle.nameDiv}>
            <span className={profileStyle.name}>아년석</span>
          </div>
        </div>
        <div className={profileStyle.emailContainer}>
          <label>이메일</label>
          <div className={profileStyle.emailDiv}>
            <span className={profileStyle.email}>vero1234@naver.com</span>
          </div>
        </div>
        <div className={profileStyle.companyContainer}>
          <label>회사명</label>
          <div className={profileStyle.companyDiv}>
            <span className={profileStyle.company}>삼성전자</span>
          </div>
        </div>
        <div className={profileStyle.deptContainer}>
          <label>부서명</label>
          <div className={profileStyle.deptDiv}>
            <span className={profileStyle.dept}>SI</span>
          </div>
        </div>
        <div className={profileStyle.positionContainer}>
          <label>직책</label>
          <div className={profileStyle.positionDiv}>
            <span className={profileStyle.position}>BE-1년차</span>
          </div>
        </div>
      </div>
      <div className={profileStyle.adminOptionsContainer}>
        <div className={profileStyle.showEmployeeListContainer}>
          <img src="../../public/img/folder.svg" className={profileStyle.img} />
          <div className={profileStyle.tagContainer}>
            <span className={profileStyle.tag}>직원 명단 보기</span>
          </div>
        </div>
        <div className={profileStyle.learningAIContainer}>
          <img
            src="../../public/img/learning.svg"
            className={profileStyle.img}
          />
          <div className={profileStyle.tagContainer}>
            <span className={profileStyle.tag}>AI 학습시키기</span>
          </div>
        </div>
      </div>
      <form className={profileStyle.form} method="post">
        <button type="submit" className={profileStyle.exitBtn}>
          탈퇴하기
        </button>
        <button type="submit" className={profileStyle.logOutBtn}>
          로그아웃
        </button>
      </form>
    </div>
  );
}
