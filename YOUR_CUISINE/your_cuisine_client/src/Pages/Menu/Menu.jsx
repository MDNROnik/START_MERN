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
    <div className="pt-20">
      <Cover img={MenuIMG} title={"OUR MENU"}></Cover>
      <SectionTitle heading={"OUR MENU"}></SectionTitle>
      {/* todo popular or chef's choice */}
      {/* <ShortMenu
        heading={"From Our Menu"}
        subHeading={"Popular Items"}
        category={"breakfast"}
        cate={0}
      ></ShortMenu> */}

      <div className="px-20">
        <Cover img={Breakfast} title={"Breakfast"}></Cover>
      </div>
      <ShortMenu category={"breakfast"} cate={0}></ShortMenu>

      <div className="px-20">
        <Cover img={Lunch} title={"Lunch"}></Cover>
      </div>
      <ShortMenu category={"lunch"} cate={1}></ShortMenu>

      <div className="px-20">
        {" "}
        <Cover img={Dinner} title={"Dinner"}></Cover>
      </div>
      <ShortMenu category={"dinner"} cate={2}></ShortMenu>

      <div className="px-20">
        <Cover img={Drinks} title={"Drinks"}></Cover>
      </div>
      <ShortMenu category={"drinks"} cate={3}></ShortMenu>

      <div className="px-20">
        <Cover img={Desert} title={"Desert"}></Cover>
      </div>
      <ShortMenu category={"dessert"} cate={4}></ShortMenu>
    </div>
  );
};

export default Menu;
