import React, { useEffect, useState } from "react";
import './App.css'
import searchIcon from './search.svg'
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com/?apikey=31ba67cc';

const App = () => {

    const [movies,setMovies] = useState([]);
    const [searchTerm,setSearchTerm] = useState('');

    const searchMovie = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovie('ironman')
    }, [])

    return (
        <div className="app">
            <h1>Movie Land</h1>

            <div className="search">
                <input placeholder="search movie name" value={searchTerm} onChange={(e) => {
                    setSearchTerm(e.target.value)
                 }} />
                <img src={searchIcon} alt="search Icon" onClick={() => searchMovie(searchTerm)}/>
            </div>

            {
                movies?.length > 0 ? 
                (
                    <div className="container">
                    {
                        movies.map((movie)=>(
                            <MovieCard movie={movie}/>
                        ))
                    }
                    </div>
                ):
                <div className="empty">
                    <h1>no movies found </h1>
                </div>
            }
            
        </div>
    );
}

export default App;