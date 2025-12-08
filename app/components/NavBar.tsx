export const NavBar = () => {
  const barItems = ["About Me", "Portfolio", "Commissions", "Contact"];

  return (
    <nav className="w-full h-16 bg-gray-800 text-white flex items-center justify-center px-4 gap-8">
      {barItems.map((item) => (
        <a key={item}>{item}</a>
      ))}
    </nav>
  );
};
