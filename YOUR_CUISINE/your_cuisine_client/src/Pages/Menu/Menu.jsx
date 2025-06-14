import Breakfast from "../../assets/menu/Breakfast.jpg";
import Desert from "../../assets/menu/Desert.jpg";
import Dinner from "../../assets/menu/Dinner.jpg";
import Drinks from "../../assets/menu/Drinks.jpg";
import Lunch from "../../assets/menu/Lunch.jpg";
import MenuIMG from "../../assets/menu/Menu.jpg";
import Cover from "../Share/Cover";
import SectionTitle from "../Share/SectionTitle";
import ShortMenu from "../Share/ShortMenu";
const Menu = () => {
  return (
    <div className="pt-15">
      <SectionTitle heading={"OUR MENU"}></SectionTitle>
      <Cover img={MenuIMG} title={"OUR MENU"}></Cover>
      <ShortMenu
        heading={"From Our Menu"}
        subHeading={"Popular Items"}
        category={"breakfast"}
        cate={0}
      ></ShortMenu>

      <Cover img={Breakfast} title={"Breakfast"}></Cover>
      <ShortMenu category={"breakfast"} cate={0}></ShortMenu>

      <Cover img={Lunch} title={"Lunch"}></Cover>
      <ShortMenu category={"lunch"} cate={1}></ShortMenu>

      <Cover img={Dinner} title={"Dinner"}></Cover>
      <ShortMenu category={"dinner"} cate={2}></ShortMenu>

      <Cover img={Drinks} title={"Drinks"}></Cover>
      <ShortMenu category={"drinks"} cate={3}></ShortMenu>

      <Cover img={Desert} title={"Desert"}></Cover>
      <ShortMenu category={"dessert"} cate={4}></ShortMenu>
    </div>
  );
};

export default Menu;
