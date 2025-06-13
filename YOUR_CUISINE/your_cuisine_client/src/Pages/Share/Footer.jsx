import { useEffect } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    // <footer>
    //   <div className="footer p-10 bg-neutral text-neutral-content">
    //     <div>
    //       <svg
    //         width="50"
    //         height="50"
    //         viewBox="0 0 24 24"
    //         xmlns="http://www.w3.org/2000/svg"
    //         fillRule="evenodd"
    //         clipRule="evenodd"
    //         className="fill-current"
    //       >
    //         <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
    //       </svg>
    //       <p>
    //         ACME Industries Ltd.
    //         <br />
    //         Providing reliable tech since 1992
    //       </p>
    //     </div>
    //     <div>
    //       <span className="footer-title">Social</span>
    //       <div className="grid grid-flow-col gap-4">
    //         <a>
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="24"
    //             height="24"
    //             viewBox="0 0 24 24"
    //             className="fill-current"
    //           >
    //             <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
    //           </svg>
    //         </a>
    //         <a>
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="24"
    //             height="24"
    //             viewBox="0 0 24 24"
    //             className="fill-current"
    //           >
    //             <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
    //           </svg>
    //         </a>
    //         <a>
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="24"
    //             height="24"
    //             viewBox="0 0 24 24"
    //             className="fill-current"
    //           >
    //             <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
    //           </svg>
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="p-4 footer-center bg-base-300 text-base-content">
    //     <div>
    //       <p>Copyright © {currentYear} - All right reserved by ONIK</p>
    //     </div>
    //   </div>
    // </footer>
    // <div className="relative">
    //   {/* Google Map */}
    //   <div className="w-full h-[400px]">
    //     <iframe
    //       title="restaurant-location"
    //       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.448769063367!2d90.40391915322766!3d23.79682030821682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a7ba38543b%3A0x91d5f14ad296d72e!2sGulshan%202%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1749843322419!5m2!1sen!2sbd"
    //       width="100%"
    //       height="100%"
    //       allowFullScreen=""
    //       loading="lazy"
    //       className="border-0"
    //     ></iframe>
    //   </div>

    //   {/* Contact Form */}
    //   <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-10 w-[90%] md:w-1/2 z-20 rounded-lg">
    //     <h2 className="text-center text-3xl font-serif text-orange-500 mb-6">
    //       Contact <span className="text-gray-800">Us</span>
    //     </h2>
    //     <form className="space-y-4">
    //       <input
    //         type="text"
    //         placeholder="Name*"
    //         className="w-full border-b p-2 focus:outline-none text-black"
    //       />
    //       <input
    //         type="email"
    //         placeholder="E-mail*"
    //         className="w-full border-b p-2 focus:outline-none text-black"
    //       />
    //       <textarea
    //         placeholder="Message*"
    //         className="w-full border p-2 h-28 focus:outline-none text-black"
    //       />

    //       <button class="bg-transparent w-full items-center hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
    //         SEND MESSAGE
    //       </button>
    //     </form>
    //   </div>

    //   {/* Footer */}
    //   <footer className="bg-black text-white pt-100 pb-30 relative">
    //     <div className="flex items-center justify-center  mx-auto px-4  gap-8 text-center ">
    //       <div className="bg-blue-500">
    //         <div className=" text-2xl font-bold mb-4 flex items-center justify-center md:justify-start text-white">
    //           <span className="mr-2 text-3xl">🍴</span>
    //           <span className="tracking-wider">YOUR CUISINE</span>
    //         </div>
    //         <div className=" flex flex-col items-start justify-center md:justify-start  text-xl text-white">
    //           <div className="flex space-x-4">
    //             <a href="#" className="hover:text-orange-400">
    //               <i className="fab fa-facebook-f"></i>
    //             </a>
    //             <a href="#" className="hover:text-orange-400">
    //               <i className="fab fa-twitter"></i>
    //             </a>
    //             <a href="#" className="hover:text-orange-400">
    //               <i className="fab fa-instagram"></i>
    //             </a>
    //           </div>
    //           <div className="flex space-x-4">
    //             <a href="#" className="hover:text-orange-400">
    //               <i className="fab fa-google-plus-g"></i>
    //             </a>
    //             <a href="#" className="hover:text-orange-400">
    //               <i className="fab fa-linkedin-in"></i>
    //             </a>
    //             <a href="#" className="hover:text-orange-400">
    //               <i className="fab fa-skype"></i>
    //             </a>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="bg-red-500">
    //         <h3 className="text-lg font-semibold mb-2">Contact</h3>
    //         <p>
    //           1234 Street GULSHAN
    //           <br />
    //           1234 Street Name DHAKA
    //           <br />
    //           BANGLADESH
    //         </p>
    //       </div>
    //       <div className="bg-green-500">
    //         <p>Phone: (415) 124-5678</p>
    //         <p>Fax: (415) 124-5678</p>
    //         <p>Email: support@yourcuisine.com</p>
    //       </div>
    //     </div>

    //     {/* Copyright fixed at bottom */}
    //     <div className="absolute pt-5 bottom-4 left-0 w-full text-center text-gray-500 text-sm">
    //       © {currentYear} YOUR CUISINE BY ONIK. ALL RIGHTS RESERVED
    //     </div>
    //   </footer>
    // </div>

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

          <button class="bg-transparent w-full items-center hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            SEND MESSAGE
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#111] pt-70 lg:pt-10 text-white p-2 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left: Social Icons */}
          <div>
            <h3 className="text-xl font-bold">PICANTE</h3>
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
      </footer>
    </section>
  );
};

export default Footer;
