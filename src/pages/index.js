import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
import Banner from "@/components/UI/Banner";
import AllNews from "@/components/UI/AllNews";
import { useGetNewsesQuery } from "@/redux/api/api";

const HomePage = ({ allNews }) => {
  const { data, isLoading, isError, error } = useGetNewsesQuery();
  console.log(data);
  return (
    <>
      <Head>
        <title>Module-2 News-Portal</title>
        <meta
          name="description"
          content="This is news portal of programming hero made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <AllNews allNews={allNews} />
    </>
  );
};
export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

// export const getStaticProps = async () => {    //! use for SSG
export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:5000/news");
  const data = await res.json();
  return {
    props: { allNews: data },
    // revalidate: 30,  //! use for SSG
  };
};