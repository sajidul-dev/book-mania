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
    <div className="flex justify-between items-center p-5 gap-4  text-black">
      <div className="w-[20%] tracking-widest font-bold text-2xl bg-emerald-500 text-center py-2 rounded">
        Book <span className="text-white">House</span>
      </div>
      <ul className="w-[60%] flex items-center justify-around bg-emerald-500 py-2 rounded">
        <li className="border-2 text-white border-black px-5 py-1 rounded-md">
          <button>
            <Link className="font-semibold" to="/">
              Home
            </Link>
          </button>
        </li>
        <li className="border-2 text-white border-black px-5 py-1 rounded-md">
          <button>
            <Link className="font-semibold" to="/all-books">
              All Books
            </Link>
          </button>
        </li>
        <li className="border-2 text-white border-black px-5 py-1 rounded-md">
          <button>
            <Link className="font-semibold" to="/add-new-book">
              Add New
            </Link>
          </button>
        </li>
      </ul>
      <div
        className="w-[20%] cursor-pointer bg-emerald-500 text-center py-3 rounded "
        onClick={handleLogout}>
        <span className="border-2 border-red-600 rounded text-white font-semibold px-3 py-2">
          {user.email ? "Log Out" : "Log In"}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
