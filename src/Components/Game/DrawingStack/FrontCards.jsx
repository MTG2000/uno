import React from "react";
import Card from "../../Shared/Card/Card";

const FrontCards = React.memo(function () {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, idx) => (
          <div
            className="card-container"
            key={idx}
            style={{
              transform: `translate(${Math.random() * 40 - 20}px,${
                Math.random() * 40 - 20
              }px)`,
            }}
          >
            <Card />
          </div>
        ))}
    </>
  );
});

export default FrontCards;
