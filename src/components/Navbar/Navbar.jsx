import React from 'react';
import logoPng from '../../assets/logo.png';
import { BiSearch } from "react-icons/bi";
import { MdOutlineShoppingCart } from 'react-icons/md';
import { MdMenu } from 'react-icons/md';
import ResponsiveMenu from './ResponsiveMenu';
import { motion } from 'framer-motion';

const NavbarMenu = [
    {
        id: 1,
        title: 'Home',
        link: '/'
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
  return (
    <>
    <nav className="bg-primary p-3 flex items-center justify-between text-gray-500">
      <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
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
                    <a 
                    href={menu.link}
                    className="inline-block py-1 px-3 hover:text-white hover:shadow-[0_3px_0_-1px_#fff] font-semibold"
                    >
                    {menu.title}</a>
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
    <ResponsiveMenu open={open}/>
    </>
  );
};

export default Navbar
