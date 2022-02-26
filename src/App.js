import React, { useState, useEffect } from "react";
import "./App.css";
import SearchInput from "./components/SearchInput";
import Pagination from "./Pagination";
import qs from "qs";

const url = "https://kitsu.io/api/edge";
const LIMIT_ITEMS = 12;

function App() {
  const [text, setText] = useState("");
  const [info, setInfo] = useState({});
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const query = {
      page: {
        limit: LIMIT_ITEMS,
        offset,
      },
    };

    if (text) {
      query.filter = {
        text,
      };
    }
    setInfo({});
    //filter[text]=${text}&page[limit]=${LIMIT_ITEMS}
    fetch(`${url}/anime?${qs.stringify(query)}`)
      .then((response) => response.json())
      .then((data) => {
        setInfo(data);
      });
  }, [text, offset]);

  return (
    <div className="App">
      <h1>Animes</h1>
      <SearchInput value={text} onChange={(search) => setText(search)} />

      {text && !info.data && <h2>Pesquisando...</h2>}

      {info.data && (
        <ul className="animes-list">
          {info.data.map((anime) => (
            <li key={anime.id}>
              <img
                src={anime.attributes.posterImage.small}
                alt={anime.attributes.canonicalTitle}
              />
              {anime.attributes.canonicalTitle}
            </li>
          ))}
        </ul>
      )}
      {info.meta && (
        <Pagination
          limit={LIMIT_ITEMS}
          total={info.meta.count}
          offset={offset}
          setOffset={setOffset}
        />
      )}
    </div>
  );
}

export default App;
