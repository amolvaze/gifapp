import React, { useState, useEffect } from 'react';
//import { Link } from "react-router-dom";
import './App.css';

function useGiphy(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=OfReL2iJQrk8Uj2cyHSwDXNOdICuDu9G&q=${query}&limit=100&offset=0&rating=G&lang=en`
        );
        const json = await response.json();
        //console.log(json.data.map(item => {return item.images.preview_gif.url} ))
        setResults(
            json.data.map(item => {
            return item.images.preview.mp4;
          })
        );
      } finally {
        setLoading(false);
      }
    }

    if (query !== '') {
      fetchData();
    }
  }, [query]);


  return [results, loading];
}

const imageClick = (url) => {
  //console.log('clicked ' +id);
  //window.location = url;
  window.open(url,'_blank');
}

export default function AsyncHooks() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, loading] = useGiphy(query);
  
  const searchBtnStyle = {
    color: "white",
    backgroundColor: "blue",
    padding: "10px",
    margin: "10px",
    font: " 50px",
    fontFamily: "verdana",
    fontWeight: "bold",
    height: "50px",
    width: "250px",
    cursor: "pointer"
  };

  const videoStyle = {
    cursor: "pointer",
    width:  "200px",
    backgroundColor: "violet",
    height: "200px",
    padding:"10px 20px 10px 1em",
    marginLeft: "5px",
    border: "2px dotted blue",
    display: "inline-block",
    align: "center"
  };

  return (
   
    <div>
      <h1 align= "center">Search Your Gifs Now!</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          setQuery(search);
          setSearch('');
        }}
      >
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Please search gifys here....."
          required
        />
        <button style = {searchBtnStyle} type="submit">Search</button>
      </form>
      <br />
      {
        results.length === 0 &&  (
          <h1><center>No gifs are found!</center></h1>
        ) 
      }
      {
          loading ? (
         <h1>Please wait...loading gifs!</h1>
       ) : (
      results.map((item, id) => <video style = {videoStyle} autoPlay loop key={item} src={item} onClick={()=> imageClick(item.id)}/>)
      )}
    </div>
  );
}
