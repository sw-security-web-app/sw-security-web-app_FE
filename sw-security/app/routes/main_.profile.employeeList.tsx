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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyDept, setCompanyDept] = useState("");
  const [totalElements, setTotalElements] = useState(0);
  const maxRows = 7;

  const fetchList = async (newPage: number) => {
    setLoading(true);
    try {
      const url = searchTerm
        ? `api/employee-list?search=${searchTerm}&page=${newPage}&size=${maxRows}`
        : `api/employee-list?page=${newPage}&size=${maxRows}`;
      const response = await api.get(url);

      if (response.status === 200) {
        console.log(response.data.totalPages);
        const newList = response.data.content;
        setTotalPages(response.data.totalPages);
        setEmployees(newList);
        setCurrentPage(newPage);
        setTotalElements(response.data.totalElements);
        // setCurrentEmployees(newList);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const fetchCompnayInfo = async () => {
    setLoading(true);
    try {
      const response = await api.get(`api/company-info`);

      if (response.status === 200) {
        setCompanyName(response.data.companyName);
        setCompanyDept(response.data.companyDept);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchList(0);
    fetchCompnayInfo();
  }, []);

  // 검색 함수
  const searchingEmployee = () => {
    fetchList(0);
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

  const showNextPage = () => {
    if (currentPage < totalPages - 1) {
      paginate(currentPage + 1);
    }
  };

  const showPrevPage = () => {
    if (currentPage > 0) {
      paginate(currentPage - 1);
    }
  };

  if (loading) {
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
                <span className={adminStyle.companyName}>{companyName}</span>
                <span className={adminStyle.deptName}>{companyDept}부서</span>
                <span className={adminStyle.totalCnt}>{totalElements}명</span>
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
                {employees.length > 0 ? (
                  employees.map((employee, index) => (
                    <tr
                      key={index}
                      className={
                        index === employees.length - 1 ? adminStyle.lastRow : ""
                      }
                    >
                      <td>{employee.name}</td>
                      <td>{employee.companyPosition}</td>
                      <td>{employee.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className={adminStyle.noEmployee}>
                      직원 정보가 없습니다.
                    </td>
                  </tr>
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
              (_, i) => 1 + i
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
              disabled={
                currentPage == totalPages - 1 || currentPage == totalPages
              }
            >
              <img src="../../img/arrow-right.svg" alt="arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
