import React from "react";

/* 
DATA FETCHING:

1. Server Side Rendering (SSR)
2. Static Site Generation (SSG)
3. Incremental Static Generation (ISR)
*/

// const page = async ({params}: {params: {id: string}}) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${params.id}`,
//     {cache: 'no-store'} // With this: server side rendering (SSR). Without: Static site generation (SSG)
//   );
//   const data = await res.json()

//   return (
//     <>
//       <h1>Title: {data.title}</h1>
//       <div>Body: {data.body}</div>
//     </>
//   )
// }

// export default page

const page = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    { next: { revalidate: 10 } } // With this: server side rendering (SSR). Without: Static site generation (SSG)
  );
  const data = await res.json();

  return (
    <>
      <h1>Title: {data.title}</h1>
      <div>Body: {data.body}</div>
    </>
  );
};

export default page;
