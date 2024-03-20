
const LoadingDisplay = () => {

  return (
    <>
      <div className="loading-screen">
        <img
          src={`/assets/loading/loadingGup.gif`}
          alt="loading animation"
        />
        <div className="loading">Loading...</div>
      </div>
    </>
  );
};

export default LoadingDisplay;
