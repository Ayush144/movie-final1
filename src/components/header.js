//import tmdb from '../assets/svg/tmdb.svg'
import "./header.css";
import { useState, useEffect } from "react";
import { Details } from "./details";
import { EachMovie } from "./eachMovie";
import { Footer } from "./footer";

export const Header = (props) => {
  let [movieList, setMovieList] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch("https://movie-task.vercel.app/api/popular?page=1")
      .then((result) => result.json())
      .then((resultJSON) => {
        setMovieList(resultJSON.data.results);
        setTotalPages(resultJSON.total_page);
      })
      .catch((e) => console.log(e));
  }, []);

  console.log(movieList);

  return (
    <div>
      <div className="header">
        {movieList.length > 0 ? (
          <h1 className="headerMovieTitle"> Movies </h1>
        ) : (
          <h1 className="headerMovieTitle"> Loading... </h1>
        )}
        <div>
          <select
            value="Sort"
            className="watchLaterBtn"
            onChange={(e) => {
              setMovieList(
                (movieList = movieList.sort(
                  (a, b) =>
                    new Date(...a.release_date) - new Date(...b.release_date)
                ))
              );
            }}
          >
            <option value="dob">Date Of Release</option>
          </select>
        </div>
      </div>
      {movieList.length > 0 ? (
        <div>
          <div className="gridView">
            {movieList.map((movie, index) => {
              return (
                <div>
                  <EachMovie
                    key={movie.id}
                    index={index}
                    bgImage={movieList[index]["backdrop_path"]}
                    moviePoster={movieList[index]["poster_path"]}
                    movieRD={movieList[index]["release_date"]}
                    movieTitle={movieList[index]["title"]}
                    movieDescription={movieList[index]["overview"]}
                    movieRating={movieList[index]["vote_average"]}
                    movieLanguage={movieList[index]["original_language"]}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Details
          bgImage=""
          moviePoster=""
          movieRD="Release Date"
          movieTitle="Movie Title"
        />
      )}

      <span style={{ color: "white", marginRight: "15px" }}>
        {" "}
        Page: {page}{" "}
      </span>

      <Footer />
    </div>
  );
};
