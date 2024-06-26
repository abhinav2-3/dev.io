import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { API_LOGIN } from "../Utils/APIs";
import useAPICalls from "../Hooks/useAPICalls";
import { getUser } from "../Utils/Authentication";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useAPICalls();
  const navigate = useNavigate();

  const user = getUser();
  user && navigate("/");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    await handleLogin(e, formData, API_LOGIN, 200);
    setLoading(false);
  };

  const handleValue = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="w-full h-screen py-16 bg-p_black text-white p-8 ">
      <h1 className="px-14 text-2xl font-bold text-center my-8">
        Welcome again to Developers Community.
      </h1>
      <div className="flex gap-5 w-full items-center">
        <form
          onSubmit={handleSubmit}
          className="p-4 w-full flex gap-5 flex-col items-center justify-center"
        >
          <div className="flex flex-col items-start w-2/3">
            <label className="text-lg font-medium">UserName</label>
            <input
              type="text"
              name="username"
              onChange={(e) => handleValue(e)}
              placeholder="username"
              className="outline-none border-none rounded py-2 px-4 text-p_black w-full"
            />
          </div>
          <div className="flex flex-col items-start w-2/3">
            <label className="text-lg font-medium">Password</label>
            <div className="flex justify-between rounded bg-white border w-full items-center">
              <input
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                onChange={(e) => handleValue(e)}
                placeholder="password"
                className="outline-none border-none rounded py-2 px-4 text-p_black w-full"
              />
              {showPassword ? (
                <FaRegEyeSlash
                  size={25}
                  color="black"
                  className="mx-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <IoEyeOutline
                  size={25}
                  color="black"
                  className="mx-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
          <button
            disabled={loading}
            className="bg-p_Blue mt-4 px-8 py-2 rounded w-2/3 hover:bg-s_blue duration-200 uppercase font-medium text-lg"
          >
            {loading ? "Login..." : "Login"}
          </button>
          <div className="flex gap-4">
            <span>New User ?</span>
            <Link
              to="/signup"
              className="text-p_text hover:text-p_text/70 duration-200"
            >
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
