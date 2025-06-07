import "./App.css";
import { useQuery } from "@tanstack/react-query";

const getCryptoNumber = async (): Promise<number> => {
  throw "This is an error";
  const resp = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new"
  ).then((response) => response.json());
  return Number(resp);
};

function App() {
  const {
    isLoading,
    isFetching,
    data: number,
    error,
    refetch,
  } = useQuery({
    queryKey: ["random-number"],
    queryFn: getCryptoNumber,
    staleTime: 1000 * 60, // 5 minutes
    retry: 2,
    retryDelay: 1000, // 1 second
  });

  return (
    <>
      <div>{JSON.stringify(error)}</div>
      {isFetching ? <h1>Loading...</h1> : <h1>Number is {number}</h1>}
      {/* <RandomNumber/> */}
      <button disabled={isLoading} onClick={() => refetch()}>
        Click me
      </button>
    </>
  );
}

export default App;
