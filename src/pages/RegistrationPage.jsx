import SignIn from "../components/ui/SignIn";
import { userService } from "../services/user.service";



const RegistrationPage = () => {
  const user = userService.user()
  return (
    <>
      {!user && <SignIn/>}
      {user && <div>Već ste prijavljeni na sistem</div>}
    </>
  )
};

export default RegistrationPage;
