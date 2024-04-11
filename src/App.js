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
          element: <HomePage />,
        },
        {
          path: 'artikli',
          element: <ArticlePage />,
        },
        {
          path: 'firme',
          element: <CompanyPage />,
        },
        {
          path: 'kontakti',
          element: <ContactPage />,
        },
        {
          path: 'zaposleni',
          element: <EmployeesPage />,
        },
        {
          path: 'vlasnici',
          element: <OwnerPage />,
        },
        {
          path: 'pacijenti',
          element: <PatientPage />,
        },
        {
          path: 'kartoni',
          element: <PatientRecordsPage />,
        },
        {
          path: 'registration',
          element: <RegistrationPage />,
        },
        {
          path: 'usluge',
          element: <ServicesPage />,
        },
        {
          path: 'dobavljaci',
          element: <SuppliersPage />,
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
