const categories = [
  "Fiction",
  "Fantasy",
  "Technology",
  "Self Growth",
  "Romance",
  "Business",
  "Science",
];

function CategoryPills() {

  return (

    <section className="max-w-[95%] mx-auto py-6 flex flex-wrap gap-4">

      {categories.map((category, index) => (

        <button
          key={index}
          className="px-6 py-3 rounded-full bg-[#A8C89A] text-[#2D2D2D] font-medium hover:bg-[#82BDA8] transition-all duration-300"
        >

          {category}

        </button>

      ))}

    </section>

  );

}

export default CategoryPills;