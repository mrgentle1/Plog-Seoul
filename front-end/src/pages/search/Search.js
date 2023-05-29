import { useCallback, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import { ReactComponent as Search } from "../../assets/icons/search.svg";
import styled from "styled-components";
import { COLOR } from "../../styles/color";
import axios from "axios";
import { CourseMainCard } from "../../components/common/CourseMainCard";

function SearchPage() {
  const token = localStorage.getItem("key");

  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const popular0 = [
    { id: "1", keyword: "플로깅" },
    { id: "2", keyword: "플로깅" },
    { id: "3", keyword: "플로깅" },
  ];
  const popular1 = [
    { id: "4", keyword: "플로깅" },
    { id: "5", keyword: "플로깅" },
  ];
  const popular2 = [
    { id: "6", keyword: "플로깅" },
    { id: "7", keyword: "플로깅" },
    { id: "8", keyword: "플로깅" },
    { id: "9", keyword: "플로깅" },
    { id: "10", keyword: "플로깅" },
  ];

  const [isFirst, setIsFirst] = useState(true);
  const [courses, setCourses] = useState([]); // 코스
  const [searchTerm, setSearchTerm] = useState(""); // 검색어

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const [searchResults, setSearchResults] = useState([]); // 검색 결과

  // 검색 버튼 클릭 이벤트 핸들러
  const onSearch = () => {
    if (searchTerm) {
      const filteredCourses = courses.filter(
        (data) => data.name && data.name.includes(searchTerm)
      );
      setSearchResults(filteredCourses);
    } else {
      setSearchResults([]); // 검색어가 없을 때는 검색 결과를 초기화
    }
    setIsFirst(false);
  };

  // API request using axios
  const fetchCourses = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_ROOT}/api/roads?pagingIndex=0&pagingSize=150`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setCourses(response.data.result.content);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Fetch courses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <StSearchPage>
      <SearchHeader>
        <BackArrow className="signupBackArrow" onClick={goBack} />
        <SearchInput>
          <SearchInputBox
            placeholder="검색어를 입력해주세요"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <Search className="inputSearch" onClick={onSearch} />
        </SearchInput>
      </SearchHeader>
      {isFirst === true ? (
        <SearchContent>
          <h3>인기 검색</h3>
          <SearchList>
            <SearchLeftList>
              <SearchItemList>
                {popular0.map((item) => (
                  <SearchItem0 key={item.id}>
                    <h2>{item.id}</h2>
                    <h5>{item.keyword}</h5>
                  </SearchItem0>
                ))}
                {popular1.map((item) => (
                  <SearchItem1 key={item.id}>
                    <h2>{item.id}</h2>
                    <h5>{item.keyword}</h5>
                  </SearchItem1>
                ))}
              </SearchItemList>
            </SearchLeftList>
            <SearchRightList>
              <SearchItemList>
                {popular2.map((item) => (
                  <SearchItem1 key={item.id}>
                    <h2>{item.id}</h2>
                    <h5>{item.keyword}</h5>
                  </SearchItem1>
                ))}
              </SearchItemList>
            </SearchRightList>
          </SearchList>
          <SearchLine />
        </SearchContent>
      ) : searchResults.length === 0 ? (
        <SearchContent>
          <h1>관련 검색어가 없습니다.</h1>
        </SearchContent>
      ) : (
        <SearchContent>
          {searchResults.map((data) => (
            <CourseMainCard key={data.routeId} c={data} />
          ))}
          <SearchLine />
        </SearchContent>
      )}
    </StSearchPage>
  );
}

export default SearchPage;

const StSearchPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 88px;
`;
const SearchHeader = styled.div`
  position: fixed;
  top: 0;
  width: 393px;
  height: 118px;
  background: ${COLOR.MAIN_WHITE};
  z-index: 100;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .signupBackArrow {
    margin-top: 50px;
    margin-left: 20px;
  }
`;
const SearchInput = styled.div`
  position: relative;
  width: 80%;
  margin-top: 46px;
  margin-left: 25px;

  .inputSearch {
    position: absolute;
    margin-top: 8px;
    margin-left: -35px;
    width: 25px;
    height: 25px;
  }
`;
const SearchInputBox = styled.input`
  width: 100%;
  height: 41px;
  background: ${COLOR.INPUT_GRAY};
  border: 1px solid ${COLOR.INPUT_BORDER_GRAY};
  border-radius: 8px;
  padding: 12px;
  padding-right: 40px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  ::placeholder {
    color: ${COLOR.INPUT_BORDER_GRAY};
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
  }
`;
const SearchContent = styled.div`
  width: 393px;
  margin: 0;
  padding: 0;
  margin-top: 40px;
  margin-left: 40px;
  h3 {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 21px;
    color: ${COLOR.MAIN_BLACK};
  }
  h1 {
    margin-top: 20px;
    margin-left: -20px;
    text-align: center;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    color: ${COLOR.INPUT_BORDER_GRAY};
  }
`;
const SearchList = styled.div`
  margin-top: 24px;
  width: 353px;
  height: 210px;
`;
const SearchLeftList = styled.div`
  float: left;
  width: 50%;
  height: 210px;
`;
const SearchItemList = styled.div`
  width: 170px;
  height: 30px;
`;
const SearchItem0 = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;

  h2 {
    width: 26px;
    height: 30px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-size: 24px;
    font-weight: 600;
    line-height: 30px;
    text-align: center;
    color: ${COLOR.MAIN_ORANGE};
  }

  h5 {
    margin-top: 4px;
    margin-left: 12px;
    width: 100px;
    height: 25px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 19px;
    color: ${COLOR.MAIN_BLACK};
  }
`;
const SearchItem1 = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;

  h2 {
    width: 26px;
    height: 30px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    color: ${COLOR.MAIN_GREEN};
  }

  h5 {
    margin-top: 4px;
    margin-left: 12px;
    width: 100px;
    height: 25px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 19px;
    color: ${COLOR.MAIN_BLACK};
  }
`;
const SearchRightList = styled.div`
  float: right;
  width: 50%;
  height: 210px;
`;
const SearchLine = styled.div`
  margin-top: 30px;
  width: 353px;
  text-align: center;
  border: 0.35px solid ${COLOR.INPUT_GRAY};

  line-height: 0.1px;
`;
