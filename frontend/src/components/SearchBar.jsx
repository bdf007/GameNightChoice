// eslint-disable-next-line react/prop-types
function Search({ searchValue, setSearchValue }) {
  return (
    <div className="searchBar">
      <div htmlFor="search" className="fas fa-search" />
      <input
        type="text"
        className="input"
        id="searchBar"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}

export default Search;
