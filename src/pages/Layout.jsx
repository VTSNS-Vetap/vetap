import Header from "../components/ui/Header";
import Sidebar from "../components/ui/Sidebar";
import { Outlet} from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header/> 
      <Sidebar />
      <main style={{paddingTop: 80, paddingLeft: 56}}>
        <Outlet />
      </main>
    </>
  )
};

export default Layout;
