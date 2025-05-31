import menuImg from "../../assets/menu/banner3.jpg";
import HomeMenu from "../Home/HomeMenu";
import Cover from "../Share/Cover";
const Menu = () => {
  return (
    <div>
      <Cover img={menuImg}></Cover>
      <HomeMenu></HomeMenu>
      <Cover img={menuImg}></Cover>
      <HomeMenu></HomeMenu>
      <Cover img={menuImg}></Cover>
      <HomeMenu></HomeMenu>
    </div>
  );
};

export default Menu;
