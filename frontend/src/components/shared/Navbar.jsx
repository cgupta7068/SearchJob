import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { useState } from "react";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="shadow-sm sticky top-0 z-50">
      
      {/* NAVBAR */}
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-3 sm:px-4 md:px-6">

        {/* LOGO */}
        <h1 className="text-xl sm:text-2xl font-bold">
          Hire<span className="text-[#6A38C2]">Hub</span>
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-12">

          <ul className="flex font-medium items-center gap-4 lg:gap-6">
            {user && user.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {/* AUTH */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] text-white">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-72">
                <div className="flex gap-3 items-center">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                  </div>
                </div>

                <div className="flex flex-col my-3 text-gray-600">
                  {user?.role === "student" && (
                    <Link to="/profile">
                      <Button variant="link" className="justify-start">
                        <User2 size={18} className="mr-2" />
                        View Profile
                      </Button>
                    </Link>
                  )}

                  <Button onClick={logoutHandler} variant="link" className="justify-start">
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            ☰
          </button>
        </div>
      </div>

      {/* ================= FLOATING MOBILE MENU ================= */}

      {isOpen && (
        <>
          {/* BACKDROP */}
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* FLOATING MENU */}
          <div
            className="
              fixed top-16 left-15 right-3
              z-50
              bg-gray-500
              rounded-xl
              shadow-2xl
              p-4 space-y-3
            "
          >
            {/* LINKS */}
            <ul className="flex flex-col gap-2 font-medium text-sm">
              {user && user.role === "recruiter" ? (
                <>
                  <li><Link to="/admin/companies">Companies</Link></li>
                  <li><Link to="/admin/jobs">Jobs</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/jobs">Jobs</Link></li>
                  <li><Link to="/browse">Browse</Link></li>
                </>
              )}
            </ul>

            {/* AUTH */}
            {!user ? (
              <div className="flex flex-col gap-2">
                <Link to="/login">
                  <Button className="w-full h-8 text-xs">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full h-8 text-xs bg-[#6A38C2] text-white">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <Button
                onClick={logoutHandler}
                className="w-full h-8 text-xs"
              >
                Logout
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;