import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Pagination } from "react-bootstrap";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(10); // Number of Pokémon per page

  useEffect(() => {
    axios
      .get("http://localhost:5062/api/Pokemon") 
      .then((response) => {
        setPokemons(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Pagination logic
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Pokémon List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type 💧🔥🌿</th>
            <th>Base Evolution 🐣</th>
            <th>Next Evolution 🔄</th>
            <th>Generation 📅</th>
          </tr>
        </thead>
        <tbody>
          {currentPokemons.map((pokemon) => (
            <tr key={pokemon.id}>
              <td>{pokemon.id}</td>
              <td>{pokemon.name}</td>
              <td>{pokemon.type}</td>
              <td>{pokemon.baseEvolution || "N/A"}</td>
              <td>{pokemon.nextEvolution || "N/A"}</td>
              <td>{pokemon.generation}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-center">
        {Array.from({ length: Math.ceil(pokemons.length / pokemonsPerPage) }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default PokemonList;