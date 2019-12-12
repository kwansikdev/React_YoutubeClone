import React from 'react';
import './SearchBar.css';

const SearchBar = props => {
  const handleEnter = search => e => {
    if(e.key === 'Enter') {
      search(e.target.value.trim())
    }
  }

  // input에 대해 참조값을 할당하기 위한 변수 설정
  let input;

  return (
    <div className="search-bar">
      <input
        // ref라는 참조값을 input에 할당한다.
        ref={ref => input = ref}
        className="search-box"
        type="search"
        placeholder=" 검색어를 입력하시오."
        onChange={e => props.setInput(e.target.value)}
        onKeyPress={handleEnter(props.onSearchData)}
      />
      <button className="search-icon" onClick={() => props.onSearchData(input.value)}>
        <svg
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          className="style-scope yt-icon"
          style={{
            pointerEvents: "none",
            display: "block",
            width: "100%",
            height: "100%"
          }}
          >
          <g className="style-scope yt-icon">
            <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              className="style-scope yt-icon"
            />
          </g>
        </svg>
      </button>
    </div>
  )
}

export default SearchBar;