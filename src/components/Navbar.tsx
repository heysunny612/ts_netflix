import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useScroll, useTransform, motion, Variants } from 'framer-motion';
import { useState } from 'react';
import { BiDownArrow } from 'react-icons/bi';
import Search from './Search';

const Header = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  position: fixed;
  width: 100%;
  height: 80px;
  z-index: 30;  

  @media (max-width: 968px) {
    padding: 0 15px;
  }
`;
const Nav = styled.nav`
  display: flex;
  align-items: center;
  position: relative;
`;

const Logo = styled(motion.svg)`
  height: 40px;
  margin-right: 30px;
  fill: ${(props) => props.theme.red};
  @media (max-width: 968px) {
    height: 20px;
    margin-right: 0;
  }
`;

const MobileBtn = styled.button`
  display: none;
  margin-left: 10px;
  color: #fff;
  font-size: 1rem;

  @media (max-width: 968px) {
    display: flex;
    align-items: center;
  }
`;

const Ul = styled.ul<{ mobilenav: string }>`
  display: flex;
  align-items: center;

  @media (max-width: 968px) {
    position: absolute;
    top: 35px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.5);
    flex-direction: column;
    width: 200px;
    border-top: 2px solid #fff;
    text-align: center;
    display: ${(props) => (props.mobilenav === 'open' ? 'block' : 'none')};
  }
  li {
    margin-right: 30px;
    color: #fff;
    position: relative;
    @media (max-width: 968px) {
      margin: 20px 0;
    }
  }
`;
const Circle = styled(motion.span)`
  width: 10px;
  height: 10px;
  display: block;
  background-color: ${(props) => props.theme.red};
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -15px;
  border-radius: 10px;

  @media (max-width: 968px) {
    display: none;
  }
`;
//로고 애니메이션
const logoVariants: Variants = {
  normal: { fillOpacity: 1, pathLength: 0 },
  active: {
    pathLength: 1,
    fillOpacity: [0, 1, 0],
    scale: [1, 0.9, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};

const navigation = [
  { title: 'HOME', path: '/main' },
  { title: 'TV Shows', path: '/tv' },
];

export default function Navbar() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 80],
    ['rgba(0,0,0,1)', 'rgba(0,0,0,0.5)']
  );

  const [mobilenav, setMobileNav] = useState(false);
  const toggleMobileNav = () => setMobileNav((prev) => !prev);

  return (
    <Header style={{ background: bg }}>
      <Nav>
        <Link to='/'>
          <Logo xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 276.742'>
            <motion.path
              variants={logoVariants}
              initial='normal'
              whileHover='active'
              stroke='white'
              strokeWidth='5'
              d='M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z'
            />
          </Logo>
        </Link>
        <MobileBtn onClick={toggleMobileNav}>
          메뉴
          <BiDownArrow />
        </MobileBtn>
        <Ul mobilenav={mobilenav ? 'open' : 'close'}>
          {navigation.map((nav, idx) => (
            <li key={idx} onClick={() => setMobileNav(false)}>
              <Link to={nav.path}>
                {nav.title}
                {location.pathname === nav.path ? (
                  <Circle layoutId='circle' />
                ) : null}
              </Link>
            </li>
          ))}
        </Ul>
      </Nav>
      <Search />
    </Header>
  );
}
