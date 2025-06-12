/* eslint-disable react/prop-types */
const AddButton = ({ onClick }) => (
  <button
    className="bg-[#FEC4E8]  text-[#F70076] w-10  h-10 rounded-full focus:outline-none"
    onClick={onClick}
  >
    +
  </button>
);

export default AddButton;
