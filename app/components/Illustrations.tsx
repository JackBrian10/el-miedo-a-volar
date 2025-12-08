export const Illustrations = () => {
  const illustrationItems = [
    "Illustration 1",
    "Illustration 2",
    "Illustration 3",
    "Illustration 4",
    "Illustration 5",
    "Illustration 6",
    "Illustration 7",
    "Illustration 8",
    "Illustration 9",
    "Illustration 10",
    "Illustration 11",
    "Illustration 12",
    "Illustration 13",
    "Illustration 14",
    "Illustration 15",
    "Illustration 16",
    "Illustration 17",
    "Illustration 18",
    "Illustration 19",
    "Illustration 20",
    "Illustration 21",
    "Illustration 22",
    "Illustration 23",
    "Illustration 24",
  ];

  return (
    <div className="w-full h-96 bg-fixed bg-center bg-cover bg-[url('/illustrations-image.jpg')] flex flex-col items-center justify-center gap-2">
      <h1 className="text-black text-4xl font-bold bg-opacity-50 p-4 rounded">
        Illustrations Gallery
      </h1>
      <div className="grid grid-cols-6 gap-4 mt-4 w-full px-8">
        {illustrationItems.map((item) => (
          <div
            key={item}
            className="bg-white bg-opacity-20 border-2 border-amber-950 p-4 rounded "
          >
            {item}
          </div>
        ))}
      </div>
      <button className="border-2 p-2 ">Load More</button>
    </div>
  );
};
