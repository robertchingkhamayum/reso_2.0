import { helix } from "ldrs";
const Loading = () => {
    helix.register();
  return (
    <div className="flex justify-center items-center h-screen bg-black ">
      <div>
        <l-helix size="140" speed="1.75" color="green"></l-helix>
      </div>
    </div>
  );
};
export default Loading;
