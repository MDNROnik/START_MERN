const Cover = ({ img, title }) => {
  return (
    <div
      className="bg-fixed h-[400px] text-white 
          bg-center bg-cover  transition-all duration-2000 ease-in-out"
      style={{ backgroundImage: `url(${img})` }}
    ></div>
  );
};

export default Cover;
