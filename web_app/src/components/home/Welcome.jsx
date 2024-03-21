import React, { useEffect, useState } from "react";
import { getSessionItem, isLoggedIn } from "../../helpers/loginSession";

function AllGamesComp() {
  const [loggedInUserName, setLoggedInUserName] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      const username = getSessionItem("username");
      setLoggedInUserName(username);
    }
  }, []);

  return (
    <section>
      {loggedInUserName ? <h5>Hello! {loggedInUserName}</h5> : null}
      <h3>Welcome to the Game Critic</h3>
    </section>
  );
}

export default AllGamesComp;
