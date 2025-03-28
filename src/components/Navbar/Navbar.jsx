import React from 'react';
import logoPng from '../../assets/logo.png';
import { BiSearch } from "react-icons/bi";
import { MdMenu } from 'react-icons/md';
import ResponsiveMenu from './Responsive';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const NavbarMenu = [
    {
        id: 1,
        title: 'Home',
        link: '#home'
    },
    {
        id: 2,
        title: 'Product',
        link: '/product'
    },
    {
        id: 3,
        title: 'Contact',
        link: '/contact'
    },
    {
        id: 4,
        title: 'About',
        link: '/about'
    },
]

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigation = (menu) => {
      if (menu.link.startsWith("#")) {
          const sectionId = menu.link.substring(1);
  
          if (location.pathname === "/") {
              setTimeout(() => {
                  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
              }, 100);
          } else {
              navigate("/", { replace: true });
  
              const checkSection = setInterval(() => {
                  const element = document.getElementById(sectionId);
                  if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                      clearInterval(checkSection);
                  }
              }, 100);
          }
      } else {
          navigate(menu.link);
      }
  
      setOpen(false);
  };  

  return (
    <>
    <nav className="bg-primary p-3 flex items-center justify-between text-gray-500 fixed top-0 left-0 w-full z-50">
      <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      className="container flex justify-between items-center py-4 md:pt-4"
      >
        {/* Logo section */}
        <div className="flex items-center gap-2 w-16 h-auto">
            <img src={logoPng} alt="Logo"/>
        </div>
        {/* Search Bar section */}
        <div className="relative w-8/12">
        <input
          type="text"
          placeholder="Cari di Penaku"
          className="w-full p-2 pl-10 rounded-full bg-[#9BBFBC] text-white placeholder-gray-500 outline-none"
        />
        <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-xl"/>
      </div>
        {/* Menu section */}
        <div className="hidden md:block">
            <ul className="flex items-center gap-6">
            {NavbarMenu.map((menu) => (
                <li key={menu.id}>
                    <button
                      onClick={() => handleNavigation(menu)}
                      className="inline-block py-1 px-3 hover:text-white hover:shadow-[0_3px_0_-1px_#fff] font-semibold"
                    >
                    {menu.title}
                  </button>
                </li>
            ))}
            </ul>
        </div>
        {/* Mobile Products Menu section */}
        <div className="md:hidden" onClick={() => setOpen(!open)}>
            <MdMenu className="text-4xl" />
        </div>
      </motion.div>
    </nav>
    {/* Mobile Menu section */}
    <ResponsiveMenu open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar
