import { Login } from "../_component/Login";
import Signup from "../_component/Signup";

const Member = () => {
  return (
    <div>
      Member allowed only
      <Login />
      <Signup />
    </div>
  );
};

export default Member;
