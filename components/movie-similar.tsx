import { API_URL } from "../app/(home)/page";
import styles from "../stytles/movie-similar.module.css";

async function getSimilar(id: string) {
  const res = await fetch(`${API_URL}/${id}/similar`);
  return res.json();
}

interface ISimilar {
  id?: string;
}

export default async function similar({ id }: ISimilar) {
  const similars = await getSimilar(id);
  console.log(similars);
  return (
    <div className={styles.container}>
      <p className={styles.title}>Simil</p>
      {similars.slice(0, 9).map((similar, key) => (
        <div className={styles.similar_container} key={key}>
          <img className={styles.similar_img} src={similar.poster_path} />
          <span className={styles.similar_name}>{similar.original_title}</span>
        </div>
      ))}
    </div>
  );
}
