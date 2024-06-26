import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Suspense, lazy, useState } from "react";
import Loader from "./Loader";
import useAPICalls from "../Hooks/useAPICalls";
const PostButtons = lazy(() => import("./PostButtons"));
const ActionButton = lazy(() => import("./ActionButton"));

const Card = (data) => {
  const { name, username, post, _id } = data;
  const { handlePostUpdate } = useAPICalls();
  const [isEdit, setIsEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(data.post);

  const user = useSelector((state) => state.user.userProfile);

  const updateHandle = async (id) => {
    setLoading(true);
    await handlePostUpdate(id, input, setIsEdit);
    setLoading(false);
  };

  return (
    <div className="py-2 md:py-4 flex px-5 md:px-10 bg-s_blue/30 rounded mb-7 tracking-tight overflow-hidden">
      <aside className="w-[95%] h-full flex flex-col">
        <h1 className="font-bold text-white">{name}</h1>
        <span className="lowercase text-sm text-p_text/50">@{username}</span>
        {isEdit ? (
          <>
            <input
              name="post"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="my-2 rounded border border-p_Blue p-4 outline-none text-wrap text-justify leading-tight text-ellipsis text-slate-200 bg-transparent"
            />
            <div className="w-full gap-8 flex">
              <button
                disabled={loading}
                className="hover:bg-p_Blue hover:text-p_text px-4 py-1 w-32 rounded font-semibold bg-p_text text-p_Blue duration-200"
                onClick={() => updateHandle(data._id)}
              >
                {loading ? "Updating..." : "Update"}
              </button>
              <button
                className="bg-p_Blue px-4 py-1 w-32 rounded font-semibold hover:bg-p_text hover:text-p_Blue duration-200"
                onClick={() => setIsEdit(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <article className="my-2 text-wrap text-justify leading-tight text-ellipsis text-slate-200">
            {post}
          </article>
        )}
        <Suspense fallback={<Loader />}>
          <PostButtons data={data} user={user} />
        </Suspense>
      </aside>
      <aside className="w-4 h-8">
        {user?._id === data?.postedBy && (
          <Suspense fallback={<Loader />}>
            <ActionButton
              postId={_id}
              onData={(data) => {
                setIsEdit(data);
              }}
            />
          </Suspense>
        )}
      </aside>
    </div>
  );
};

// Handling Props Warnings
Card.propTypes = {
  data: PropTypes.object,
};

export default Card;
