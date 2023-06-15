import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function Routes() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Routes;
