import React, { useState, useEffect } from "react";
import { searchVideoApi } from "../../api/videoApi";
import { useSearchParams } from "../../hooks/useSearchParms";
import Loading from "../../components/Loading/Loading";
import NoResults from "../../components/Shared/NoResults";
import VideoRecommentItem from "../../components/Video/VideoRecommentItem";

const Search = () => {
  const [results, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q");
  console.log("searchTerm", searchTerm);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await searchVideoApi(searchTerm);
        if (res.data.success) {
          setResult(res.data.results);
        }
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [searchTerm]);

  if (loading) return <Loading />;

  return (
    <div>
      {results.length > 0 ? (
        <>
          {results.map((data) => (
            <VideoRecommentItem key={data?._id} data={data} />
          ))}
        </>
      ) : (
        <NoResults />
      )}
    </div>
  );
};

export default Search;
