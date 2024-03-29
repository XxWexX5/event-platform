import { gql, useQuery } from "@apollo/client";
import Head from "next/head";

import { Header } from "../components/Header";
import { Lesson } from "../components/Lesson";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";
import { Subscribe } from "../components/Subscribe";

const GET_LESSONS_QUERY = gql`
  query {
    lessons {
      id
      slug
      title
      teacher {
        name
        bio
        avatarURL
      }
    }
  }
`;

interface Lesson {
  id: string;
  title: string;
}

export default function Home() {
  const { data } = useQuery<{ lessons: Lesson[] }>(GET_LESSONS_QUERY);

  console.log(data);

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Subscribe />
    </>
  );
}
