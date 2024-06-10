import React, { useEffect, useState } from "react";
import axios from "axios";
import Presentation from "./Presentation";

const Container = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchCharacters = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://akabab.github.io/starwars-api/api/all.json",
      );
      console.log(response);
      setCharacters(response.data);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);
  return (
    <div>
      <Presentation data={characters} isLoading={isLoading} error={error} />
    </div>
  );
};

export default Container;
