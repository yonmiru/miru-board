export default function Header() {

  return (
    <header className="flex justify-center items-center p-12 gap-4">
      <h1
        className="text-6xl lg:text-7xl font-black font-raleway tracking-[1px] text-transparent text-center"
        style={{
          WebkitTextStroke: "2px #3B82F6", // Blue stroke
          filter: `
      drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))
      drop-shadow(0px 0px 4px rgba(59, 130, 246, 0.5))
      drop-shadow(0px 0px 10px rgba(59, 130, 246, 0.5))
      drop-shadow(0px 0px 50px rgba(59, 130, 246, 1))
    `,
        fontFamily: "Raleway",
        }}
      >
        YonMiru's Birthday
      </h1>
    </header>
  );
}
