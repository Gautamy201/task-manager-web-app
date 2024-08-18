import ClipLoader from "react-spinners/ClipLoader";

const Loder = () => {
  return (
    <div className="absolute h-full w-full  flex justify-center items-center backdrop-blur-lg">
      <ClipLoader
        color={"green"}
        loading={true}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loder;
