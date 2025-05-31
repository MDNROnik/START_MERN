import menuImg from "../../assets/menu/banner3.jpg";
import dessertImg from "../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../assets/menu/pizza-bg.jpg";
import saladImg from "../../assets/menu/salad-bg.jpg";
import soupImg from "../../assets/menu/soup-bg.jpg";
import Cover from "../Share/Cover";
import ShortMenu from "../Share/ShortMenu";

const Menu = () => {
  return (
    <div>
      <Cover img={menuImg} title={"OUR MENU"}></Cover>
      <ShortMenu
        heading={"From Our Menu"}
        subHeading={"Popular Items"}
        category={"popular"}
      ></ShortMenu>

      <Cover img={saladImg} title={"SALAD"}></Cover>
      <ShortMenu category={"salad"}></ShortMenu>

      <Cover img={soupImg} title={"SOUP"}></Cover>
      <ShortMenu category={"soup"}></ShortMenu>

      <Cover img={pizzaImg} title={"PIZZA"}></Cover>
      <ShortMenu category={"pizza"}></ShortMenu>

      <Cover img={dessertImg} title={"DESSERT"}></Cover>
      <ShortMenu category={"dessert"}></ShortMenu>
    </div>
  );
};

export default Menu;
