import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const Profile = () => {
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/posts/1",
    fetcher
  );
  console.log(data);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return <div>hello {data.title}!</div>;
};
