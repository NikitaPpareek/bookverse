const BookCard = ({ image, title, author, price }) => {
  return (

    <div className="
    group
    rounded-[32px]
    overflow-hidden

    bg-[#f5efe4]
    dark:bg-zinc-900

    hover:-translate-y-3
    hover:shadow-2xl

    transition-all duration-500">

      {/* Image */}
      <div className="overflow-hidden">

        <img
          src={image}
          alt={title}
          className="
          w-full
          h-80
          object-cover

          group-hover:scale-110

          transition-transform duration-500"
        />

      </div>

      {/* Content */}
      <div className="p-6">

        <h2 className="
        text-2xl
        font-bold

        text-stone-800
        dark:text-white">

          {title}

        </h2>

        <p className="
        mt-2

        text-stone-600
        dark:text-zinc-400">

          {author}

        </p>

        {/* Bottom */}
        <div className="
        mt-6
        flex items-center justify-between">

          <span className="
          text-2xl
          font-bold

          text-orange-600
          dark:text-emerald-400">

            ₹{price}

          </span>

          <button className="
          px-5 py-2.5
          rounded-xl
          text-white

          bg-orange-500
          hover:bg-orange-600

          dark:bg-emerald-500
          dark:hover:bg-emerald-600

          hover:scale-105

          transition-all duration-300">

            Add

          </button>

        </div>

      </div>

    </div>
  );
};

export default BookCard;