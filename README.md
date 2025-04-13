# ![VERO](https://github.com/user-attachments/assets/fe4ad2f6-5c53-482b-8a90-3582d45878af) VERO

> **VERO**의 프론트엔드 레포지토리입니다.  
> 정보 보안을 실현하며,  **Remix** 기반으로 사용자 친화적인 UI/UX를 통해 효과적인 솔루션을 제공합니다.
---

## 📌 목차

- 소개
- 기술 스택
- 설치 및 실행
- 폴더 구조
- 주요 기능
- 팀원
- 시연영상

---

## 🧾 소개

이 프로젝트는 정보 보안 솔루션을 위한 웹 애플리케이션의 프론트엔드입니다. 
사용자들은 생성형 AI와 보안이 보장된 환경에서 대화할 수 있습니다.

---



## 🛠️ 기술 스택

- **프레임워크**: [Remix](https://remix.run/)
- **언어**: TypeScript
- **스타일링**: CSS Modules
- **상태 관리**: Zustand, Custom Hook
- **라우팅**:  Remix File-based Routing
- **번들러**: esbuild
- **패키지 매니저**: npm

---

## 🚀 설치 및 실행

```bash
# 레포지토리 클론
git clone https://github.com/sw-security-web-app/sw-security-web-app_FE.git

# 디렉토리 이동
cd sw-security-web-app_FE

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```
---

## 📁 폴더 구조
```bash
app/
├── api/              # axios의 interceptor 구현
├── components/       # 재사용 가능한 컴포넌트
├── css/              # CSS Modules
├── routes/           # Remix의 페이지 라우팅 (파일 기반)
├── store/            # 전역 상태 관련 로직
├── entry.client.tsx  # 클라이언트 진입점
├── entry.server.tsx  # 서버 진입점
├── root.tsx          # Remix 루트 컴포넌트
└── setProxy.js       # 프록시 설정 (CORS 설정)
```

---

## 💡 주요 기능

- **보안 중심**의 대화 인터페이스: 생성형 AI와의 대화 내용이 안전하게 관리되며, 외부 접근으로부터 보호됩니다. 
- **검열 AI**: 개인은 기본 검열 AI를 통해, 관리자/직원은 고유한 검열 AI를 사용 가능.
- **관리자**로 이용 시, 해당 부서별 검열 AI 학습 기능
- **다양한 회원가입 경로**: 관리자/개인/직원용 폼 분기 처리 
- **비밀번호 변경 및 찾기 기능** 내장  
- 사용자 친화적인 **모달 및 알림 시스템**  
- **Zustand + Custom Hooks** 기반 상태관리로 **예측 가능한 UX** 제공  
- **파일 기반 라우팅**으로 명확한 URL 구조 설계  

---

## 🧠 개발 고민 & 코드 품질

> 좋은 코드보다 **깊은 고민**이 담긴 코드!

- **모듈화**: 컴포넌트 재사용성을 높이기 위해 각 기능별로 독립적인 컴포넌트를 작성하여 유지보수를 용이하게 만듦.
- **디렉토리 구조**: 프로젝트 내 `routes`와 `components`등의 구분을 통해 각 기능 흐름에 따라 파일 구조를 설계하여 효율적인 탐색이 가능.
- **라우팅**: Flat Routing을 통해 중복되는 레이아웃 기반으로 라우팅 설정  
- **TypeScript 사용**:  
  - 불필요한 `any` 지양  
  - 명확한 타입 선언으로 유지보수 용이성 강화  
- **Custom Hook & Zustand**: 반복되는 상태 로직을 커스텀 훅으로 추상화해 가독성 향상  
- **접근성 & UX 개선**: 마우스 포커스 처리, 키보드 접근성, 로딩 상태 등 사용자 경험 세심하게 설계  

---

## 🧑‍🤝‍🧑 팀원

| 이름   | 역할              | GitHub                                 |
|--------|-------------------|----------------------------------------|
| 김도연 | 백엔드 개발   | [@tkv00](https://github.com/tkv00) |
| 박재성 | 백엔드 개발 | [@pjs1710](https://github.com/pjs1710) |
| 안현석 |프론트엔드 개발| [@nyeonseok](https://github.com/nyeonseok)   |
| 이형준 |검열AI 개발| [@lhj010217](https://github.com/lhj010217)   |

---

## 🎥 시연 영상

프로젝트의 시연 영상을 아래 링크에서 확인할 수 있습니다.  

[시연 영상 보기](https://youtu.be/s5xHGf2D68M)

