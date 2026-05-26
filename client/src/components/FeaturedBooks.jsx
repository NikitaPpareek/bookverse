import BookCard from "./BookCard";

const books = [

  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
  },

  {
    id: 2,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },

  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
  },

];

const FeaturedBooks = () => {
  return (

    <section className="
    py-24

    bg-[#f8f3ea]
    dark:bg-zinc-950

    transition-colors duration-500">

      <div className="
      max-w-7xl
      mx-auto
      px-6">

        {/* Heading */}
        <div className="text-center mb-16">

          <h1 className="
          text-5xl
          font-extrabold

          text-stone-900
          dark:text-white">

            Featured Books

          </h1>

          <p className="
          mt-5
          text-lg

          text-stone-600
          dark:text-zinc-400">

            Explore books readers are loving right now.

          </p>

        </div>

        {/* Grid */}
        <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3

        gap-10">

          {books.map((book) => (

            <BookCard
              key={book.id}
              image={book.image}
              title={book.title}
              author={book.author}
              price={book.price}
            />

          ))}

        </div>

      </div>

    </section>
  );
};

export default FeaturedBooks;