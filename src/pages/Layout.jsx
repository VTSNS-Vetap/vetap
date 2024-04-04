import Header from "../components/ui/Header";
import Sidebar from "../components/ui/Sidebar";
import { Outlet} from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header/> 
      <hr/>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  )
};

export default Layout;
