import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PopularJSRepos() {
  const [repos, setRepos] = useState([])

  useEffect(() => {
      console.log("Coponent did mount")
      let url = `https://api.github.com/search/repositories?q=language:javascript&sort=stars`
      axios.get(url)
              .then((res) => {
                console.log(res.data.items)
                setRepos(res.data.items)
              })
  }, [])

  return (
    <div>
      <h2>Popular JS repos</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Stars</th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo) => {
            console.log("I am in the loop of the .map")
            console.log(repo)
            return(
              <tr key={repo.id}>
                <td>
                 {repo.name} 
                </td>
              </tr>
            )
          })}

        </tbody>
      </table>
    </div>
  );
}


// 1 - Design your state
// 2 - "Link" your state to a piece of jsx within the component
// 3 - Wait for the componenent to be mounted
// 4 - Call the API
// 5 - Change state with the value of the response
// 6 - It trigers a re-rendering
// 7 - Check your .map to see the value of each element of the map!
