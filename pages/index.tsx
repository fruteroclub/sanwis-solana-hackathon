import Products from '../components/Products'
import SiteHeading from '../components/SiteHeading'
import { logo_2 } from './assets'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl items-stretch m-auto pt-24">
      <SiteHeading>Sanwis</SiteHeading>
      {/* <img src={logo_2} alt="logo" className='w-[261px] h-[62px]' /> */}

      <Products submitTarget='/checkout' enabled={true} />
    </div>
  )
}
