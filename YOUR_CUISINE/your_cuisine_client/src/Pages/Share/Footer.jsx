// import two from "../../assets/icon/logo-bg-black-removebg-preview.png";
import MainLogo from "./MainLogo";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section className="relative h-screen">
      {/* Google Map */}
      <div className="w-full h-[400px]">
        <iframe
          title="restaurant-location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.6666381662662!2d90.39918721089926!3d23.794882486978214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c755d2d173bb%3A0x32911ac549d5a298!2sGushan%202!5e0!3m2!1sen!2sbd!4v1749837717861!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          className="border-0"
        ></iframe>
      </div>
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-10 w-[90%] md:w-1/2 z-20 rounded-lg">
        <h2 className="text-center text-3xl font-serif text-orange-500 mb-6">
          Contact <span className="text-gray-800">Us</span>
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name*"
            className="w-full border-b p-2 focus:outline-none text-black"
          />
          <input
            type="email"
            placeholder="E-mail*"
            className="w-full border-b p-2 focus:outline-none text-black"
          />
          <textarea
            placeholder="Message*"
            className="w-full border p-2 h-28 focus:outline-none text-black"
          />

          <button class="bg-transparent w-full items-center hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">
            SEND MESSAGE
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="w-full  pt-70 md:pt-10 lg:pt-10 text-white p-2 mt-10">
        <div className="flex flex-col md:flex-row  justify-between items-center md:items-center gap-8">
          {/* Left: Social Icons */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex flex-col items-center text-xl" to="/">
              {/* <div className=" w-16">
                <img
                  alt={"logo"}
                  src={two}
                />
              </div> */}
              <MainLogo />
              <div> YOUR CUISINE </div>
            </div>
            <div className="flex space-x-4 text-xl">
              <a href="#" className="hover:text-orange-400">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-orange-400">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-orange-400">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-orange-400">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Right: Address */}
          <div className="text-right md:text-right space-y-1 break-words ">
            <p>1234 GULSHANT 2</p>
            <p>DHAKA</p>
            <p>BANGLADESH</p>
            <p> (415) 124-56781</p>
            <p> support@yourname.com</p>
          </div>
        </div>
        <div className="pt-5 lg:pt-25 md:pt-25 left-0 w-full text-center text-gray-500 text-sm">
          © {currentYear} YOUR CUISINE BY ONIK. ALL RIGHTS RESERVED
        </div>
      </footer>
    </section>
  );
};

export default Footer;
