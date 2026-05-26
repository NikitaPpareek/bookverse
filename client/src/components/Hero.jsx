const Hero = () => {
  return (

    <section className="
    w-full
    py-24

    bg-[#f8f3ea]
    dark:bg-zinc-950

    transition-colors duration-500">

      <div className="
      max-w-7xl
      mx-auto
      px-6

      flex flex-col
      md:flex-row

      items-center
      justify-between

      gap-16">

        {/* Left Content */}
        <div className="flex-1">

          <h1 className="
          text-6xl
          md:text-7xl

          font-extrabold
          leading-tight

          text-stone-900
          dark:text-white">

            Discover Your Next{" "}

            <span className="
            bg-gradient-to-r
            from-orange-500
            to-amber-700

            dark:from-emerald-400
            dark:to-teal-500

            text-transparent
            bg-clip-text">

              Favorite Book

            </span>

          </h1>

          <p className="
          mt-8
          text-xl
          max-w-2xl

          text-stone-600
          dark:text-zinc-400">

            Explore thousands of books from different genres,
            authors and categories in one beautiful platform.

          </p>

          {/* Buttons */}
          <div className="mt-10 flex gap-5">

            <button className="
            px-7 py-3.5
            rounded-2xl
            text-white

            bg-gradient-to-r
            from-orange-500
            to-amber-700

            dark:from-emerald-500
            dark:to-teal-500

            hover:scale-105

            transition-all duration-300">

              Explore Books

            </button>

            <button className="
            px-7 py-3.5
            rounded-2xl
            border

            border-orange-500
            text-orange-600

            hover:bg-orange-500
            hover:text-white

            dark:border-emerald-500
            dark:text-emerald-400
            dark:hover:bg-emerald-500

            transition-all duration-300">

              Learn More

            </button>

          </div>

        </div>

        {/* Right Image */}
        <div className="
        flex-1
        flex justify-center">

          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
            alt="Books"
            className="
            w-full
            max-w-xl

            rounded-[40px]
            shadow-2xl
            object-cover"
          />

        </div>

      </div>

    </section>
  );
};

export default Hero;