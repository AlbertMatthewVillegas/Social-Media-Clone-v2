import { Search as SearchIcon } from "lucide-react";
import useSearch from "../../hooks/useSearch/hook";

function SearchBar() {
  const { search, handleSearch } = useSearch();

  return (
    <div className="w-full">
      <label htmlFor="global-search" className="sr-only">
        Search users
      </label>
      <div className="flex items-center gap-2 rounded-2xl border border-[#948D83]/30 bg-[#151918] px-3 py-2 shadow-sm shadow-black/20">
        <SearchIcon size={18} className="text-[#948D83]" />
        <input
          id="global-search"
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search users"
          className="w-full border-0 bg-transparent text-sm text-white outline-none placeholder:text-[#948D83]"
        />
      </div>
    </div>
  );
}

export default SearchBar;
