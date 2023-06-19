"use client";
import { useState, useEffect } from "react";
import "./globals.css";
interface Character {
  id: number;
  name: string;
  image: string;
}

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);

  useEffect(() => {
    const fetchCharacters = async (): Promise<void> => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${page}`
        );
        const data = await response.json();
        const { results, info } = data;
        console.log("results:", results);
        console.log("info:", info);
        setCharacters(results);
        setPages(info.pages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCharacters();
  }, [page]);

  const handlePreviousPage = (): void => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = 1;
      }
      return prevPage;
    });
  };

  const handleNextPage = (): void => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > pages) {
        nextPage = pages;
      }
      return nextPage;
    });
  };

  const handlePageClick = (pageInd: number): void => {
    setPage(pageInd);
  };

  return (
    <div className="">
      <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-center">
        Rick and Morty Characters
      </h1>
      <div className="container">
        {characters.map((character) => (
          <article key={character.id} className="card">
            <img src={character.image} alt={character.name} />
            <p>{character.name}</p>
          </article>
        ))}
      </div>
      <div className="flex justify-center flex-wrap pb-4 gap-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        {Array.from({ length: pages }, (_, index) => {
          const startIndex = Math.max(0, page - 3);
          const endIndex = Math.min(pages - 1, page + 1);

          if (index >= startIndex && index <= endIndex) {
            return (
              <button
                key={index}
                onClick={() => handlePageClick(index + 1)}
                className={`self-center bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ${
                  page === index + 1 ? "active" : ""
                }`}
              >
                {index + 1}
              </button>
            );
          }
        })}

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNextPage}
          disabled={page === pages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
