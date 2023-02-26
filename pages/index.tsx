import Products from '../components/Products'
import SiteHeading from '../components/SiteHeading'
// import { getData } from './api/sheets'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl items-stretch m-auto">
      <SiteHeading>Sanwis</SiteHeading>
      
      <Products submitTarget='/checkout' enabled={true} />


    </div>
  )
}

// export async function getStaticProps() {
//   const products = await getData();
//   return {
//     props: {
//       products,
//     },
//     // Next.js will attempt to re-generate the page:
//     // - When a request comes in
//     // - At most once every second
//     revalidate: 1, // In seconds
//   };
// }