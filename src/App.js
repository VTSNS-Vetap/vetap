import Layout from './pages/Layout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import ArticlePage from './pages/ArticlePage';
import CompanyPage from './pages/CompanyPage';
import ContactPage from './pages/ContactPage';
import EmployeesPage from './pages/EmployeesPage';
import OwnerPage from './pages/OwnerPage';
import PatientPage from './pages/PatientPage';
import ServicesPage from './pages/ServicesPage';
import SuppliersPage from './pages/SuppliersPage';
import PatientRecordsPage from './pages/PatientRecordsPage';
import { PrivateRoute } from './components/ui/PrivateRoute';
import { Role } from './constants/role.constants';
import UnauthorizedPage from './pages/UnauthorizedPage';



function App() {

  const createRouter = () => createHashRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      id: 'root',
      children: [
        {
          index: true,
          element: <PrivateRoute role={Role.User}><HomePage/></PrivateRoute> ,
        },
        {
          path: 'artikli',
          element: <PrivateRoute role={Role.User}><ArticlePage /></PrivateRoute>,
        },
        {
          path: 'firme',
          element: <PrivateRoute role={Role.User}><CompanyPage /></PrivateRoute>,
        },
        {
          path: 'kontakti',
          element: <PrivateRoute role={Role.User}><ContactPage /></PrivateRoute>,
        },
        {
          path: 'zaposleni',
          element: <PrivateRoute role={Role.Admin}><EmployeesPage /></PrivateRoute>,
        },
        {
          path: 'vlasnici',
          element: <PrivateRoute role={Role.User}><OwnerPage /></PrivateRoute>,
        },
        {
          path: 'pacijenti',
          element: <PrivateRoute role={Role.User}><PatientPage /></PrivateRoute>,
        },
        {
          path: 'kartoni',
          element: <PrivateRoute role={Role.User}><PatientRecordsPage /></PrivateRoute>,
        },
        {
          path: 'prijava',
          element: <RegistrationPage />,
        },
        {
          path: 'usluge',
          element: <PrivateRoute role={Role.User}><ServicesPage /></PrivateRoute>,
        },
        {
          path: 'dobavljaci',
          element: <PrivateRoute role={Role.User}><SuppliersPage /></PrivateRoute>,
        }
        ,
        {
          path: 'unauthorized',
          element: <UnauthorizedPage/>,
        }
      ],
    }
  ]);

  return (
    <div className="App" style={({ height: "100vh" })}>
       <RouterProvider router={createRouter()} />
    </div>
  );
}

export default App;
