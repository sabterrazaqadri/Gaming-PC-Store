import { sanityClient } from '@/app/lib/sanity'
import { productsQuery } from '@/app/lib/queries'
import HomeContent from '@/components/home-content'

interface Product {
  _id: string
  title: string
  price: number
  description: string
  category: {
    title: string
  }
  images: { asset: { _id: string; url: string } }[]
}

export default async function HomePage() {
  const products: Product[] = await sanityClient.fetch(productsQuery)

  return <HomeContent products={products} />
}
