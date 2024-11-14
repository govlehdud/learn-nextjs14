import Link from "next/link";
import { API_URL } from "../app/(home)/page";
import styles from "../stytles/movie-provider.module.css";

interface IProvider {
  link?: string;
  buy?: any[];
  rent?: any[];
  flatrate?: any[];
}

async function getProvider(id: string) {
  const res = await fetch(`${API_URL}/${id}/providers`);
  console.log(id);
  console.log("API_URL : ", API_URL);
  return res.json();
}

export default async function MovieProvider({ id }: { id: string }) {
  const providers = await getProvider(id);
  const { link, ...provider } = {
    ...{ link: "", buy: [], rent: [], flatrate: [] },
    ...providers.KR,
  } as IProvider;
  // providers를 보면 link와 buy[]가 생성되는데 link는 link에 할당
  // 나머지 buy rent flarate는 provider에 할당

  return (
    <div className={styles.container}>
      <Link href={link} className={styles["provider-link"]}>
        <div className={styles["provider-container"]}>
          {Object.entries(provider).map(([key, value]) => {
            // 값이 없으면 return
            if (value.length === 0) return;
            return (
              <div key={key} className={styles["provider-item"]}>
                <span className={styles["provider-category"]}>
                  {key === "flatrate" ? "stream" : key}
                </span>
                {value.map((channel, idx) => {
                  const imgUrl = "https://image.tmdb.org/t/p/w300";
                  const logoPath =
                    (channel.logo_path.includes(imgUrl) ? "" : imgUrl) +
                    channel.logo_path;
                  return (
                    <img
                      key={idx}
                      className={styles["provider-channel"]}
                      src={logoPath}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </Link>
    </div>
  );
}
