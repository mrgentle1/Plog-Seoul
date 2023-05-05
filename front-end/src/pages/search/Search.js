import { useCallback, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import { ReactComponent as Search } from "../../assets/icons/search.svg";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

function SearchPage() {
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

  return (
    <StSearchPage>
      <SearchHeader>
        <BackArrow className="signupBackArrow" onClick={goBack} />
        <SearchInput>
          <SearchInputBox placeholder="검색어를 입력해주세요" />
          <Search className="inputSearch" />
        </SearchInput>
      </SearchHeader>
      <SearchContent>
        <h3>인기 검색</h3>
        <SearchList>
          <SearchLeftList>
            <SearchItemList>
              {popular0.map((item) => (
                <SearchItem0>
                  <h2>{item.id}</h2>
                  <h5>{item.keyword}</h5>
                </SearchItem0>
              ))}
              {popular1.map((item) => (
                <SearchItem1>
                  <h2>{item.id}</h2>
                  <h5>{item.keyword}</h5>
                </SearchItem1>
              ))}
            </SearchItemList>
          </SearchLeftList>
          <SearchRightList>
            <SearchItemList>
              {popular2.map((item) => (
                <SearchItem1>
                  <h2>{item.id}</h2>
                  <h5>{item.keyword}</h5>
                </SearchItem1>
              ))}
            </SearchItemList>
          </SearchRightList>
        </SearchList>
        <SearchLine />
      </SearchContent>
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
  height: 88px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  z-index: 100;

  .signupBackArrow {
    margin-top: 70px;
    margin-left: 20px;
  }
`;
const SearchInput = styled.div`
  position: relative;
  width: 80%;
  margin-top: 66px;
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
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  ::placeholder {
    color: ${COLOR.INPUT_BORDER_GRAY};
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
    font-weight: 700;
    font-size: 17px;
    line-height: 21px;
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
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    color: ${COLOR.MAIN_ORANGE};
  }

  h5 {
    margin-top: 4px;
    margin-left: 12px;
    width: 40px;
    height: 19px;
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
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    color: ${COLOR.MAIN_GREEN};
  }

  h5 {
    margin-top: 4px;
    margin-left: 12px;
    width: 40px;
    height: 19px;
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
