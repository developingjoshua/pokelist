import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList'
import axios from 'axios'
import Pagination from './components/Pagination';

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageURL, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageURL, setNextPageUrl] = useState()
  const [previousPageURL, setPreviousPageUrl] = useState()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageURL, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPreviousPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })
    return () => { cancel() }
  }, [currentPageURL])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageURL)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(previousPageURL)
  }


  if (loading) return 'Loading...'


  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextPageURL ?  gotoNextPage : null}
        gotoPrevPage={previousPageURL ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
