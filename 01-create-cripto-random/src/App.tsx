import "./App.css";
import { useRandom } from "./hooks/useRandom";

function App() {
  const { randomQuery } = useRandom();

  return (
    <>
      <div>{JSON.stringify(randomQuery.error)}</div>
      {randomQuery.isFetching ? <h1>Loading...</h1> : <h1>Number is {randomQuery.data}</h1>}
      {/* <RandomNumber/> */}
      <button disabled={randomQuery.isLoading} onClick={() => randomQuery.refetch()}>
        Click me
      </button>
    </>
  );
}

export default App;
