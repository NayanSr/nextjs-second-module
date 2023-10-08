import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
// import Banner from "@/components/UI/Banner";
import AllNews from "@/components/UI/AllNews";
import { useGetNewsesQuery } from "@/redux/api/apiSlice";
import dynamic from "next/dynamic";

const HomePage = ({ allNews }) => {
  //! Redux
  // const { data, isLoading, isError, error } = useGetNewsesQuery();

  const DynamicBanner = dynamic(() => import("@/components/UI/Banner"), {
    loading: () => <h2>Loading...</h2>,
    ssr: false, //! become ssg(server site generation)
  });

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
      <DynamicBanner />
      {/* //! Resux */}
      <AllNews allNews={allNews} />
    </>
  );
};
export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

// export const getServerSideProps = async () => {    //! use for SSR
export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/news");
  const data = await res.json();
  return {
    props: { allNews: data.data },
    revalidate: 30, //! use for SSG
  };
};
