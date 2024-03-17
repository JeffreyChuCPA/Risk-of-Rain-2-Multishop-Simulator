import { useState } from "react";
// import "./styles.css"; // Import CSS for styling

const CircleAnimation = () => {
  const [circles, setCircles] = useState([]);

  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newCircle = { x, y, key: circles.length + 1, completed: false };
    setCircles([...circles, newCircle]);

    setTimeout(() => {
      setCircles((prevCircles) =>
        prevCircles.map((circle) =>
          circle.key === newCircle.key ? { ...circle, completed: true } : circle
        )
      );
    }, 1000); // Disappear after 1 second
  };

  return (
    <div className="container" onClick={handleClick}>
      <img
        src="https://via.placeholder.com/150"
        alt="Click Me"
        style={{ position: "relative" }}
      />
      {circles.map(
        (circle) =>
          !circle.completed && (
            <>
              <div
                key={circle.key}
                className="circle "
                style={{ top: `${circle.y}px`, left: `${circle.x}px` }}
              >
                {" "}
              </div>
              <div
                className="line"
                style={{
                  top: `${circle.y + 7}px`,
                  left: `${circle.x + 7}px`,
                }}
              ></div>
            </>
          )
      )}
    </div>
  );
};

export default CircleAnimation;
