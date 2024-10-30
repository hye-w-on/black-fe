//import styled from "@emotion/styled";
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransitionOutlet from './PageTransitionOutlet';
import HorizonMenu from '../organisms/HorizonMenu';
import HeaderBar from '../organisms/HeaderBar';

const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <nav className="menu"></nav>
      <HeaderBar />
      <HorizonMenu />
      <AnimatePresence>
        <PageTransitionOutlet key={location.pathname} />
      </AnimatePresence>
    </>
  );
};

export default Layout;
