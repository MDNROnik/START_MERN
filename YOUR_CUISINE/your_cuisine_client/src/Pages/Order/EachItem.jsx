import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";
const EachItem = ({ item }) => {
  const { user, setLoading, setCarts } = useContext(AuthContext);
  const { name, image, price, recipe, _id } = item;
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(user);
  const axiosPublic = useAxiosPublic();
  const handleAddToCart = () => {
    if (user && user.email) {
      //send cart item to the database
      const cart = {
        menuId: _id,
        userId: user.uid,
        name,
        image,
        price,
      };
      setLoading(true);
      axiosPublic.post("/cart", cart).then((res) => {
        // console.log(res.data);
        axiosPublic
          .get("/cart", {
            params: { userId: user.uid, status: "active" },
          })
          .then((res) => setCarts(res.data))
          .catch((err) => console.error(err));

        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} added to your cart`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
      setLoading(false);
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add to the cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          //   send the user to the login page
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="relative bg-[#bcaf87] rounded-2xl shadow-lg overflow-hidden w-full max-w-xs mx-auto transition hover:shadow-2xl  p-6 pt-16 flex flex-col items-center text-center space-y-4">
      <p className="absolute top-4 right-4 bg-[#07252d] text-[#bcaf87] text-sm font-semibold px-3 py-1 rounded-full shadow-md">
        ${price.toFixed(2)}
      </p>
      <div className="w-40 h-20">
        {/* <h3 className="text-xl font-semibold text-gray-800">{name}</h3> */}
        {name.split(" ").map((word, index) => (
          <h3 key={index} className="text-xl font-semibold text-[#07252d]">
            {word}
          </h3>
        ))}
        <p className="text-[#07252d] text-sm">{recipe}</p>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-12 px-5 py-2 border-b-4 border-[#07252d] text-[#07252d] font-semibold uppercase hover:bg-[#07252d] hover:text-[#bcaf87] transition duration-300 rounded-md"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default EachItem;
