import React, { useState, useEffect } from "react";
import { searchVideoApi } from "../../api/videoApi";
import { useSearchParams } from "../../hooks/useSearchParms";
import Loading from "../../components/Loading/Loading";
import NoResults from "../../components/Shared/NoResults";
import VideoRecommentItem from "../../components/Video/VideoRecommentItem";
import { Link } from "react-router-dom";
import { searchChannelApi } from "../../api/channelApi";
import Title from "../../components/Shared/Title";

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("q");
  const type = searchParams.get("type");

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (type === "video") {
        try {
          const res = await searchVideoApi(searchTerm);
          if (res.data.success) {
            setResults(res.data.results);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const res = await searchChannelApi(searchTerm);
          if (res.data.success) {
            setResults(res.data.results);
          }
        } catch (error) {
          console.log(error);
        }
      }
      setLoading(false);
    })();
  }, [searchTerm, type]);

  if (loading) return <Loading />;

  return (
    <>
      <div style={{ marginTop: "20px", marginBottom: "50px" }}>
        <Link
          to={`/search?type=video&q=${searchTerm}`}
          className={`${type === "video" ? "bg-red" : ""} search-button`}
        >
          Video
        </Link>
        <Link
          to={`/search?type=channel&q=${searchTerm}`}
          className={`${type === "channel" ? "bg-red" : ""} search-button`}
        >
          Channel
        </Link>
      </div>

      {results.length > 0 ? (
        <div>
          <Title title={`${searchTerm} | Youtube`} />
          {results.map((data) =>
            type === "video" ? (
              <VideoRecommentItem key={data?._id} data={data} />
            ) : (
              <>
                <Link to={`/channel/${data?._id}/videos`}>
                  <div className="channel-info-result" key={data?._id}>
                    <img src={data?.avatar} alt={"avatar"} />
                    <div>
                      <span>{data?.name}</span>
                      <span> {data?.email}</span>
                      <span> {data?.description} video</span>
                    </div>
                  </div>
                </Link>
              </>
            )
          )}
        </div>
      ) : (
        <NoResults />
      )}
    </>
  );
};

export default Search;
