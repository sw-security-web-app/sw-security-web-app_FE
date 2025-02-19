import api from "~/api/api";
import adminStyle from "../css/admin.module.css";
import { useState, useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function EmployeeList() {
  interface Employees {
    name: string;
    position: string;
    email: string;
  }

  const [employees, setEmployees] = useState<Employees[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employees[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const maxRows = 7;

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await api.get("엔드포인트");
    //     if (response.status === 200) {
    //       const data = await response.data;
    //       setEmployees(data);
    //     } else {
    //       const error = await response.data;
    //       alert(error.message);
    //     }
    //   } catch (error) {
    //     console.error("API 호출 오류:", error);
    //   }
    // };
    // fetchData();
    // 임시 직원 데이터
    const employeeData = [
      { name: "김도연", position: "BE-1년차", email: "kimdoyeon1@company.com" },
      { name: "김도연", position: "BE-1년차", email: "kimdoyeon1@company.com" },
      { name: "김도연", position: "BE-1년차", email: "kimdoyeon1@company.com" },
      { name: "김도연", position: "BE-1년차", email: "kimdoyeon1@company.com" },
      {
        name: "이승민",
        position: "FE-2년차",
        email: "leeseungmin@company.com",
      },
      { name: "박재희", position: "디자이너", email: "parkjaehee@company.com" },
      { name: "조한나", position: "PM", email: "chohanana@company.com" },
      {
        name: "김동현",
        position: "BE-3년차",
        email: "kimdonghyun@company.com",
      },
      {
        name: "최현수",
        position: "FE-1년차",
        email: "choihyeonsu@company.com",
      },
      { name: "김도연", position: "BE-1년차", email: "kimdoyeon1@company.com" },
      {
        name: "이승민",
        position: "FE-2년차",
        email: "leeseungmin@company.com",
      },
      { name: "박재희", position: "디자이너", email: "parkjaehee@company.com" },
      { name: "조한나", position: "PM", email: "chohanana@company.com" },
      {
        name: "김동현",
        position: "BE-3년차",
        email: "kimdonghyun@company.com",
      },
      {
        name: "최현수",
        position: "FE-1년차",
        email: "choihyeonsu@company.com",
      },
      { name: "김도연", position: "BE-1년차", email: "kimdoyeon1@company.com" },
      {
        name: "이승민",
        position: "FE-2년차",
        email: "leeseungmin@company.com",
      },
      { name: "박재희", position: "디자이너", email: "parkjaehee@company.com" },
      { name: "조한나", position: "PM", email: "chohanana@company.com" },
      {
        name: "김동현",
        position: "BE-3년차",
        email: "kimdonghyun@company.com",
      },
      {
        name: "최현수",
        position: "FE-1년차",
        email: "choihyeonsu@company.com",
      },
      { name: "김도연", position: "BE-1년차", email: "kimdoyeon1@company.com" },
      {
        name: "이승민",
        position: "FE-2년차",
        email: "leeseungmin@company.com",
      },
      { name: "박재희", position: "디자이너", email: "parkjaehee@company.com" },
      { name: "조한나", position: "PM", email: "chohanana@company.com" },
      {
        name: "김동현",
        position: "BE-3년차",
        email: "kimdonghyun@company.com",
      },
      { name: "김도연", position: "BE-1년차", email: "kimdoyeon1@company.com" },
      {
        name: "이승민",
        position: "FE-2년차",
        email: "leeseungmin@company.com",
      },
      { name: "박재희", position: "디자이너", email: "parkjaehee@company.com" },
      { name: "조한나", position: "PM", email: "chohanana@company.com" },
      {
        name: "김동현",
        position: "BE-3년차",
        email: "kimdonghyun@company.com",
      },
      {
        name: "최현수",
        position: "FE-1년차",
        email: "choihyeonsu@company.com",
      },
      {
        name: "최현수",
        position: "FE-1년차",
        email: "choihyeonsu@company.com",
      },
      { name: "홍지은", position: "기획자", email: "hongjieun@company.com" },
      { name: "오세훈", position: "PM", email: "ohsehoon@company.com" },
      { name: "이은지", position: "디자이너", email: "leeunji@company.com" },
      { name: "송민호", position: "BE-2년차", email: "songminho@company.com" },
      { name: "윤서진", position: "FE-3년차", email: "yunseojin@company.com" },
      { name: "김영수", position: "PM", email: "kimyoungsoo@company.com" },
      { name: "배유진", position: "기획자", email: "baeyujin@company.com" },
      { name: "김도연", position: "BE-2년차", email: "kimdoyeon1@company.com" },
      {
        name: "전수경",
        position: "디자이너",
        email: "jeonsookyung@company.com",
      },
      {
        name: "차영준",
        position: "BE-1년차",
        email: "chayoungjun@company.com",
      },
      { name: "강지민", position: "FE-2년차", email: "kangjimin@company.com" },
    ];
    setEmployees(employeeData);
    setFilteredEmployees(employeeData); // Initialize filtered employees
  }, []);

  // 검색 함수
  const searchingEmployee = () => {
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
    setCurrentPage(1);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      searchingEmployee(); // Enter 키가 눌리면 검색 실행
    }
  };

  // 현재 페이지에 해당하는 직원 목록 가져오기
  const indexOfLastEmployee = currentPage * maxRows;
  const indexOfFirstEmployee = indexOfLastEmployee - maxRows;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // 페이지 변경 함수
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 총 페이지 수
  const totalPages = Math.ceil(filteredEmployees.length / maxRows);

  // 페이지 그룹 범위 상태 추가
  const [pageRange, setPageRange] = useState({ startPage: 1, endPage: 5 });

  // 현재 페이지 그룹 (5개씩 페이지 버튼 보이도록 설정)
  useEffect(() => {
    const pageGroup = Math.ceil(currentPage / 5);
    const startPage = (pageGroup - 1) * 5 + 1;
    const endPage = Math.min(startPage + 4, totalPages);
    setPageRange({ startPage, endPage });
  }, [currentPage, totalPages]);

  const { startPage, endPage } = pageRange;

  if (employees.length === 0) {
    return (
      <div className={adminStyle.content}>
        <div className={adminStyle.inner}>
          <div className={adminStyle.iconContainer}>
            <AiOutlineLoading className={adminStyle.loadingIcon} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={adminStyle.content}>
      <div className={adminStyle.inner}>
        <div className={adminStyle.listContainer}>
          <div className={adminStyle.noBtnConatainer}>
            <div className={adminStyle.listTop}>
              <div className={adminStyle.leftDiv}>
                <span className={adminStyle.companyName}>삼성전자</span>
                <span className={adminStyle.deptName}>00부서</span>
                <span className={adminStyle.totalCnt}>00명</span>
              </div>
              <div className={adminStyle.rightDiv}>
                <input
                  type="text"
                  placeholder="이름을 입력해주세요"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <img
                  onClick={searchingEmployee}
                  className={adminStyle.searchIcon}
                  src="../../img/search.svg"
                  alt="search"
                />
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>직책</th>
                  <th>이메일</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.length > 0 ? (
                  currentEmployees.map((employee, index) => (
                    <tr
                      key={index}
                      className={
                        index === currentEmployees.length - 1
                          ? adminStyle.lastRow
                          : ""
                      }
                    >
                      <td>{employee.name}</td>
                      <td>{employee.position}</td>
                      <td>{employee.email}</td>
                    </tr>
                  ))
                ) : (
                  <div className={adminStyle.noEmployee}>
                    직원 정보가 없습니다.
                  </div>
                )}
              </tbody>
            </table>
          </div>
          <div className={adminStyle.paginationContainer}>
            <button
              onClick={() => paginate(currentPage - 1)}
              className={adminStyle.arrowButton}
              disabled={1 === currentPage || currentEmployees.length === 0}
            >
              <img src="../../img/arrow-left.svg" alt="arrow" />
            </button>

            {/* 페이지 버튼 */}
            {Array.from(
              {
                length: Math.min(
                  endPage - startPage + 1,
                  totalPages - startPage + 1
                ),
              },
              (_, i) => startPage + i
            ).map((page) => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={
                  currentPage === page ? adminStyle.activePage : adminStyle.page
                }
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                totalPages === currentPage || currentEmployees.length === 0
              }
              className={adminStyle.arrowButton}
            >
              <img src="../../img/arrow-right.svg" alt="arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
