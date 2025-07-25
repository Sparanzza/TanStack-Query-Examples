
import { useQuery } from "@tanstack/react-query";

const getCryptoNumber = async (): Promise<number> => {
  const resp = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new"
  ).then((response) => response.json());
  return Number(resp);
};

function RandomNumber() {
  const {
    data,
  } = useQuery({
    queryKey: ["random-number"],
    queryFn: getCryptoNumber,
    staleTime: 1000 * 60, // 5 minutes
  });

  return (
    <>
      <h1>Random number: {data}</h1>
    </>
  );
}

export default RandomNumber;
