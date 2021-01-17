import Navbar from "../components/Navbar";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { withUrqlClient } from "next-urql";

const Index = () => {
  const [{ data, fetching }] = usePostsQuery();
  return (
    <>
      <Navbar />
      <div> hello</div>
      {!data ? (
        <div>...loading</div>
      ) : (
        data.posts.map((p) => <div key={p.id}>{p.title}</div>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
