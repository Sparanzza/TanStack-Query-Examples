import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    fetch(
      "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new"
    )
      .then((response) => response.json())
      .then((data) => {
        setNumber(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [refreshCount]);

  return (
    <>
      <div>{error}</div>
      {isLoading ? <h1>Loading...</h1> : <h1>Number is {number}</h1>}
      <button
        disabled={isLoading}
        onClick={() => setRefreshCount(refreshCount + 1)}
      >
        Click me
      </button>
    </>
  );
}

export default App;
