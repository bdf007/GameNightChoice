import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="homepageComponent">
      <p> GAME NIGHT HOMEPAGE COMPONENT</p>
      <button
        type="button"
        onClick={() => setCount((oldCount) => oldCount + 1)}
      >
        count is: {count}
      </button>
    </div>
  );
}
