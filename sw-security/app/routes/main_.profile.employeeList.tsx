import api from "~/api/api";
import adminStyle from "../css/admin.module.css";
import { useState, useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function EmployeeList() {
  interface Employees {
    name: string;
    companyPosition: string;
    email: string;
  }

  const [employees, setEmployees] = useState<Employees[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employees[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentEmployees, setCurrentEmployees] = useState<Employees[]>([]);
  const maxRows = 7;
  const [loading, setLoading] = useState(false);

  const fetchList = async (newPage: number) => {
    setLoading(true);
    try {
      const response = await api.get(
        `api/employee-list?page=${newPage}&size=${maxRows}`
      );

      if (response.status === 200) {
        const newList = response.data.content;
        setTotalPages(response.data.totalPages);
        setEmployees(newList);
        setCurrentPage(newPage);
        setCurrentEmployees(newList);
      }
    } catch (error) {
      console.error("이전 메시지 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList(0);
  }, []);

  // 검색 함수
  const searchingEmployee = () => {
    // const filtered = employees.filter((employee) =>
    //   employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    // setFilteredEmployees(filtered);
    // setCurrentPage(0);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      searchingEmployee(); // Enter 키가 눌리면 검색 실행
    }
  };

  const paginate = (pageNumber: number) => {
    fetchList(pageNumber);
    setCurrentPage(pageNumber);
  };

  // 페이지 그룹 범위 상태 추가
  const [pageRange, setPageRange] = useState({ startPage: 1, endPage: 5 });

  // 현재 페이지 그룹 (5개씩 페이지 버튼 보이도록 설정)
  useEffect(() => {
    let pageGroup = Math.ceil(currentPage / 5);
    if (currentPage === 0) {
      pageGroup = 1; // currentPage가 0인 경우 pageGroup을 1로 설정
    }
    const startPage = (pageGroup - 1) * 5 + 1;
    const endPage = Math.min(startPage + 4, totalPages);
    setPageRange({ startPage, endPage });
  }, [currentPage, totalPages]);

  const { startPage, endPage } = pageRange;

  const showNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      paginate(currentPage + 1);
      // fetchList(currentPage + 1);
    }
  };

  const showPrevPage = () => {
    if (currentPage > 0) {
      paginate(currentPage - 1);
      setCurrentPage(currentPage - 1);
      // fetchList(currentPage - 1);
    }
  };

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
                      <td>{employee.companyPosition}</td>
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
              onClick={showPrevPage}
              className={adminStyle.arrowButton}
              disabled={currentPage == 0}
            >
              <img src="../../img/arrow-left.svg" alt="arrow" />
            </button>

            {/* 페이지 버튼 */}
            {Array.from(
              {
                length: totalPages,
              },
              (_, i) => startPage + i
            ).map((page) => (
              <button
                key={page}
                onClick={() => paginate(page - 1)}
                className={
                  currentPage === page - 1
                    ? adminStyle.activePage
                    : adminStyle.page
                }
              >
                {page}
              </button>
            ))}

            <button
              onClick={showNextPage}
              className={adminStyle.arrowButton}
              disabled={currentPage - 1 == totalPages}
            >
              <img src="../../img/arrow-right.svg" alt="arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
