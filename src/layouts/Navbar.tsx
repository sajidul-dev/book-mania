import { Link, useNavigate } from "react-router-dom";
import { resetUser } from "../redux/feature/user/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(resetUser());
    navigate("/auth/#login");
  };

  return (
    <div className="flex justify-between p-5 bg-[#2a70f3] text-white">
      <Link to="/" className="font-bold cursor-pointer tex-xl">
        Book Mania
      </Link>
      <div className="flex  space-x-2">
        <ul className="flex items-end  space-x-2">
          <li>
            <button>
              <Link to="/">Home</Link>
            </button>
          </li>
          <li>
            <button>
              <Link to="/all-books">All Books</Link>
            </button>
          </li>
          <li>
            <button>
              <Link to="/add-new-book">Add New</Link>
            </button>
          </li>
        </ul>
        <div className="cursor-pointer" onClick={handleLogout}>
          {user.email ? "Log Out" : "Log In"}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
