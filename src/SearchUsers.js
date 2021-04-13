import axios from "axios";
import React, { useState, useEffect } from "react";

export default function () {
  // TODO : fetch the github user list matching the search query
  // (a new API call should be made every time the query changes)
  // (errors should be logged in the console or/and printed to the UI)
  // one state to handle the input
  // one state to handle the list

  const [ query, setQuery ] = useState('')
  const [ results, setResults ] = useState([])
  
  

  useEffect(() => {
    // console.log("Did mount")

  }, [])

  useEffect(() => {
    console.log("Query did update...")
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    console.log(source.token)
    axios.get(`https://api.github.com/search/users?q="${query}"`, {
      cancelToken: source.token
    })
        .then((res) => {
          console.log(res.data.items)
          setResults(res.data.items)

        })
        .catch((error) => {
          console.log(error)
        })

    return () => {
      console.log("I am unmounted")
      source.cancel("Now the source is canceled")
    }

  }, [query])

  return (
    <div>
      <h2>Search for github users</h2>
      <input 
        type="text"
        value={query}
        onChange={(e) => {
          console.log("It is an input controlled by the state")
          console.log(e.target.value)
          setQuery(e.target.value)
        }}
      />
        {results.map((result) => {
          return(<div>{result.login}</div>)
        })}


    </div>
  );
}
