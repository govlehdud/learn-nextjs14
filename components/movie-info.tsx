import { API_URL } from "../app/(home)/page";
import potato from "../stytles/movie-info.module.css";

export async function getMovie(id: string) {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);
  return (
    <div className={potato.container}>
      <img
        className={potato.poster}
        src={movie.poster_path}
        alt={movie.title}
      />
      <div className={potato.info}>
        <h1 className={potato.title}>{movie.title}</h1>
        <h3>⭐️ {movie?.vote_average?.toFixed(1)}</h3>
        <p>{movie.overview}</p>
        <a href={movie.hompage} target={"_blank"}>
          Home &rarr;
        </a>
        {/* <Link href={`/movies/${id}/similar`} style={{ textDecoration: "none" }}>
          Similar &rarr;
        </Link> */}
      </div>
    </div>
  );
}
