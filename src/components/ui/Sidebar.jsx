import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>  
      <Link to="/">Home</Link>
      <br/>
      <Link to="/artikli">Artikli</Link>
      <br/>
      <Link to="/firme">Firme</Link>
      <br/>
      <Link to="/kontakti">Kontakti</Link>
      <br/>
      <Link to="/zaposleni">Zaposleni</Link>
      <br/>
      <Link to="/vlasnici">Vlasnici</Link>
      <br/>
      <Link to="/pacijenti">Pacijenti</Link>
      <br/>
      <Link to="/kartoni">kartoni</Link>
      <br/>
      <Link to="/registration">Registration</Link>
      <br/>
      <Link to="/usluge">Usluge</Link>
      <br/>
      <Link to="/dobavljaci">Dobavljaci</Link>
    </>
  )
};

export default Sidebar;
