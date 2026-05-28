function BookCard({ book }) {

  return (

    <div className="bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">

      {/* Book Image */}
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-[320px] object-cover"
      />

      {/* Content */}
      <div className="p-6">

        {/* Category */}
        <span className="inline-block px-4 py-2 rounded-full bg-[#A8C89A] text-sm font-medium mb-4">

          {book.category}

        </span>

        {/* Title */}
        <h3 className="text-2xl font-bold text-[#2D2D2D] mb-2 line-clamp-2">

          {book.title}

        </h3>

        {/* Author */}
        <p className="text-[#6B6B6B] mb-4">

          {book.author}

        </p>

        {/* Price + Rating */}
        <div className="flex items-center justify-between mb-6">

          <span className="text-3xl font-black text-[#7A4A84]">

            ₹499

          </span>

          <span className="text-[#F4B400] font-semibold">

            ⭐ 4.5

          </span>

        </div>

        {/* Buttons */}
        <div className="flex gap-4">

          {/* Add Cart */}
          <button className="flex-1 bg-[#7A4A84] hover:bg-[#693A73] text-white py-3 rounded-2xl font-semibold transition-all duration-300">

            Add to Cart

          </button>

          {/* Details */}
          <button className="flex-1 border border-[#7A4A84] text-[#7A4A84] hover:bg-[#7A4A84] hover:text-white py-3 rounded-2xl font-semibold transition-all duration-300">

            Details

          </button>

        </div>

      </div>

    </div>

  );

}

export default BookCard;