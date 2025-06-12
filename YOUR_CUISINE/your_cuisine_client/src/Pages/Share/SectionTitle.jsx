const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="mx-auto text-center md:w-4/12 my-8 ">
      <div className="flex items-center text-3xl uppercase ">
        <div className="w-1/3 border-b-4 border-white"></div>
        <div>{heading}</div>
        <div className="w-1/3 border-b-4 border-white"></div>
      </div>
    </div>
  );
};

export default SectionTitle;
