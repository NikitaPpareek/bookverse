function Hero() {

  return (

    <section className="max-w-[95%] mx-auto py-20 grid md:grid-cols-2 gap-16 items-center transition-all duration-300">

      {/* Left */}
      <div>

        <p className="uppercase tracking-[8px] text-[#82BDA8] font-semibold mb-6">

          Discover

        </p>

        <h1 className="text-7xl font-black leading-tight text-[#2D2D2D] dark:text-white mb-8">

          Find Your
          <br />

          Next Favorite

          <span className="text-[#7A4A84]">

            {" "}Book

          </span>

        </h1>

        <p className="text-[#5E5E5E] dark:text-[#B8B8B8] text-xl leading-relaxed max-w-xl mb-10">

          Explore thousands of books from different genres,
          authors and categories in one beautiful platform.

        </p>

        <div className="flex gap-6">

          <button className="px-8 py-4 rounded-2xl bg-[#7A4A84] text-white font-semibold text-lg hover:bg-[#693A73] transition-all duration-300 shadow-lg">

            Explore Books

          </button>

          <button className="px-8 py-4 rounded-2xl border border-[#7A4A84] text-[#7A4A84] dark:text-white font-semibold text-lg hover:bg-[#7A4A84] hover:text-white transition-all duration-300">

            Learn More

          </button>

        </div>

      </div>

      {/* Right */}
      <div>

        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
          alt="Books"
          className="rounded-[40px] shadow-2xl object-cover h-[550px] w-full"
        />

      </div>

    </section>

  );

}

export default Hero;