import { FC } from "react";
import { motion } from "framer-motion";

interface MenuProps {
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export const Menu: FC<MenuProps> = ({ setIsMenuOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed flex md:justify-center md:items-center top-0 left-0 w-full h-full bg-menu z-10"
    >
      <div
        className="absolute bottom-4 right-4 w-10 h-10 bg-red-50"
        onClick={() => setIsMenuOpen(false)}
      ></div>
      <div className="w-full flex flex-col gap-20 md:gap-0 md:flex-row max-w-[960px] mx-4 md:mx-6">
        <div className="md:flex-1 pt-8 md:pt-0">
          <h1 className="font-semibold text-white text-6xl md:text-7xl max-w-md">
            Let&apos;s work together.
          </h1>
        </div>
        <div className="mr-12">
          <div className="text-menu-title text-xl mb-2">New business</div>
          <a className="text-white text-xl" href="mailto:hello@movingdots.xyz">
            hello@movingdots.xyz
          </a>
          <div className="text-menu-title mt-12 mb-2 text-xl">Join us</div>
          <a
            className="text-white text-xl"
            href="mailto:careers@movingdots.xyz"
          >
            careers@movingdots.xyz
          </a>
        </div>
      </div>
    </motion.div>
  );
};
