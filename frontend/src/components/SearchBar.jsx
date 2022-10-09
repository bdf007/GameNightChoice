// eslint-disable-next-line react/prop-types
function Search({ searchValue, setSearchValue }) {
  return (
    <div className="searchBar">
      <label htmlFor="search">Search : </label>
      <input
        type="text"
        id="searchBar"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}

export default Search;
