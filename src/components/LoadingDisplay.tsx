
const LoadingDisplay = () => {

  return (
    <>
      <div className="loading-screen">
        <img
          src={`public/assets/loading/loadingGup.gif`}
          alt="loading animation"
        />
        <div className="loading">Loading...</div>
      </div>
    </>
  );
};

export default LoadingDisplay;
