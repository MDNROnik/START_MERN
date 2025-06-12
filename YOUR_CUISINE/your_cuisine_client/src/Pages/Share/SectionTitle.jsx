const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="mx-auto text-center md:w-4/12 my-8 ">
      <div className="flex items-center text-3xl uppercase border-y-4 p-1">
        <div>{heading}</div>
      </div>
    </div>
  );
};

export default SectionTitle;
