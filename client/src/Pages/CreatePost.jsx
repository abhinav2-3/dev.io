import axios from "axios";
import { useState } from "react";
import { API_CREATEPOST } from "../Utils/APIs";
import { useDispatch, useSelector } from "react-redux";
import { getAllFeeds } from "../App/feedSlice";
import toast from "react-hot-toast";
import authError from "../Utils/AuthError";
import { useNavigate } from "react-router-dom";
import { fetchUserFeed } from "../App/userSlice";

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [char, setChar] = useState(0);
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.userProfile);

  const inputHandler = (e) => {
    setPost(e.target.value);
    setChar(e.target.value.length);
  };

  const handlePost = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(API_CREATEPOST, {
        username: user?.username,
        post,
      });
      if (response.status === 201) {
        toast.success("Post Created");
        dispatch(getAllFeeds());
        dispatch(fetchUserFeed());
        setPost("");
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      authError(error);
    }
  };
  return (
    <form
      onSubmit={handlePost}
      className="p-4 px-8 h-[84vh] flex flex-col overflow-y-auto feed"
    >
      <h1 className="text-xl font-bold py-8">Create a New Post</h1>
      <textarea
        name="post"
        rows="4"
        cols="50"
        onChange={(e) => inputHandler(e)}
        className="w-full h-32 border rounded p-4 bg-transparent outline-none text-slate-400"
      />
      <span className="text-right text-sm py-2 text-slate-500">
        Characters : {char}
      </span>
      <button
        type="submit"
        className="bg-p_Blue rounded px-10 py-1 mt-2 font-medium hover:bg-p_Blue/45 duration-200"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default CreatePost;
