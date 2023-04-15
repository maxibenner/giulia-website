import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "jjb62inr",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: false,
});
const builder = imageUrlBuilder(client);

function urlFor(source: string) {
  return builder.image(source);
}

export default function Home({ images }: { images: any[] }) {
  return (
    <div>
      <Head>
        <title>Giulia B Nagle</title>
        <meta name="description" content="Photogtaphy portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.pageWrapper}>
        <h1>Giulia B Nagle</h1>
        <div className={styles.imageContainer}>
          {images.map((image) => (
            <img key={image.title} className={styles.image} src={urlFor(image.src).url()} />
          ))}
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export async function getStaticProps() {
  const images = await client.fetch(`*[_type == "photo"]`);

  return {
    props: {
      images,
    },
  };
}
