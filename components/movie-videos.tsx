import { API_URL } from "../app/(home)/page";
import styles from "../stytles/movie-videos.module.css";

async function getVideos(id: string) {
  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
}

export default async function MovieVideos({ id }: { id: string }) {
  const videos = await getVideos(id);
  return (
    <div className={styles.container}>
      <p className={styles.title}>Video</p>
      {videos.slice(0, 5).map((video) => (
        <iframe
          key={video.id}
          src={`https://youtube.com/embed/${video.key}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gryoscope;"
          allowFullScreen
          title={video.name}
        />
      ))}
    </div>
  );
}
