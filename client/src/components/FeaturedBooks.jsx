import BookCard from "./BookCard";

const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Growth",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
  },

  {
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },

  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
  },
];

function FeaturedBooks() {

  return (

    <section className="max-w-[95%] mx-auto py-24">

      {/* Heading */}
      <div className="text-center mb-16">

        <p className="uppercase tracking-[8px] text-[#82BDA8] font-semibold mb-4">

          Featured Collection

        </p>

        <h2 className="text-6xl font-black text-[#2D2D2D]">

          Books Readers Love

        </h2>

      </div>

      {/* Books Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

        {books.map((book, index) => (

          <BookCard
            key={index}
            book={book}
          />

        ))}

      </div>

    </section>

  );

}

export default FeaturedBooks;