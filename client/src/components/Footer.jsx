function Footer() {

  return (

    <footer className="mt-32 bg-white border-t border-[#E8DFC7]">

      <div className="max-w-[95%] mx-auto py-16 grid md:grid-cols-4 gap-12">

        {/* Brand */}
        <div>

          <h2 className="text-4xl font-black mb-4">

            <span className="text-[#7A4A84]">

              Book

            </span>

            <span className="text-[#82BDA8]">

              Verse

            </span>

          </h2>

          <p className="text-[#6B6B6B] leading-relaxed">

            Discover books from all around the world
            with a modern reading experience.

          </p>

        </div>

        {/* Explore */}
        <div>

          <h3 className="font-bold text-xl mb-4">

            Explore

          </h3>

          <ul className="space-y-3 text-[#6B6B6B]">

            <li>Books</li>

            <li>Categories</li>

            <li>Trending</li>

            <li>Authors</li>

          </ul>

        </div>

        {/* Company */}
        <div>

          <h3 className="font-bold text-xl mb-4">

            Company

          </h3>

          <ul className="space-y-3 text-[#6B6B6B]">

            <li>About</li>

            <li>Careers</li>

            <li>Contact</li>

            <li>Support</li>

          </ul>

        </div>

        {/* Newsletter */}
        <div>

          <h3 className="font-bold text-xl mb-4">

            Newsletter

          </h3>

          <div className="flex flex-col gap-4">

            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-4 rounded-2xl border border-[#DDD] outline-none"
            />

            <button className="bg-[#7A4A84] hover:bg-[#693A73] text-white py-4 rounded-2xl font-semibold transition-all duration-300">

              Subscribe

            </button>

          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-[#E8DFC7] py-6 text-center text-[#6B6B6B]">

        © 2026 BookVerse. All rights reserved.

      </div>

    </footer>

  );

}

export default Footer;