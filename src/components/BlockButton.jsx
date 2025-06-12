/* eslint-disable react/prop-types */
const BlockButton = ({ onClick }) => (
  <>
    <button
      onClick={onClick}
      className="bg-[#FEC4E8] text-[#F70076] w-10  h-10 rounded-full focus:outline-none flex items-center justify-center cursor-pointer"
    >
      +
    </button>
  </>
);

export default BlockButton;
