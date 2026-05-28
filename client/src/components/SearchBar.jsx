import { Search } from "lucide-react";

function SearchBar() {

  return (

    <section className="max-w-[95%] mx-auto py-12">

      <div className="bg-white rounded-[40px] p-4 shadow-md flex items-center gap-4">

        {/* Input */}
        <input
          type="text"
          placeholder="Search books, authors, genres..."
          className="flex-1 px-6 py-5 text-lg outline-none bg-transparent text-[#2D2D2D]"
        />

        {/* Search Button */}
        <button className="group bg-[#7A4A84] hover:bg-[#693A73] text-white px-10 py-5 rounded-3xl font-semibold text-lg transition-all duration-300 flex items-center gap-3 shadow-md hover:shadow-xl">

          Search

          <Search
            size={22}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />

        </button>

      </div>

    </section>

  );

}

export default SearchBar;