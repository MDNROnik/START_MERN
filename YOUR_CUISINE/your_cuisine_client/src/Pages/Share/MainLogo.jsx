import two from "../../assets/icon/logo-bg-black-removebg-preview.png";
const MainLogo = () => {
  return (
    <div className="w-16 rounded-3xl ">
      <img
        className="animate-spin"
        alt="LOGO"
        src={two}
        style={{
          animationDuration: "4s",
          animationTimingFunction: "linear",
        }}
      />
    </div>
  );
};

export default MainLogo;
