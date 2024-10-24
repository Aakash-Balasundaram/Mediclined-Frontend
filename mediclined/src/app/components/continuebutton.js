export default function Continue({handleClick}) {

  return (
    <div className="flex justify-center mt-4">
      <button
        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md text-[18px] transition-opacity duration-200"
        onClick={handleClick}
      >
        Continue
      </button>
    </div>
  );
}
