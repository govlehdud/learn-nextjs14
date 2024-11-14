import { API_URL } from "../app/(home)/page";
import styles from "../stytles/movie-credits.module.css";

async function getCredit(id: string) {
  const res = await fetch(`${API_URL}/${id}/credits`);
  return res.json();
}

export default async function MovieCredits({ id }: { id: string }) {
  const credits = await getCredit(id);

  return (
    <div className={styles.container}>
      <p className={styles.title}>Actor</p>
      {credits.slice(0, 9).map((credit, key) => (
        <div className={styles.credit_container} key={key}>
          <img src={credit.profile_path} className={styles.credit_img} />
          <span className={styles.credit_name}>{credit.name}</span>
        </div>
      ))}
    </div>
  );
}
