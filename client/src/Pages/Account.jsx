import { useSelector } from "react-redux";
import DisplayProfile from "../Components/DisplayProfile";
import YourPosts from "../Components/YourPosts";
import DisplaySkills from "../Components/DisplaySkills";

const Account = () => {
  const user = useSelector((state) => state.user.userProfile);

  return (
    <div className="pt-16 px-8 h-screen w-full overflow-y-auto feed flex flex-col gap-8">
      <DisplayProfile user={user} />
      <DisplaySkills />
      <YourPosts />
    </div>
  );
};

export default Account;
