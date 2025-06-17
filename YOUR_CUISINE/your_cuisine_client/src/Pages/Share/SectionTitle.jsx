const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="mx-auto text-center md:w-4/12 my-4 ">
      <div className="flex items-center text-3xl uppercase ">
        <div className="w-1/3 border-b-4  border-[#bcaf87]"></div>
        <div className="text-[#bcaf87]">{heading}</div>
        <div className="w-1/3 border-b-4 border-[#bcaf87]"></div>
      </div>
    </div>
  );
};

export default SectionTitle;
