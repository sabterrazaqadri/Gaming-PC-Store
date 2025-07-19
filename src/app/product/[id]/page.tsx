import { sanityClient } from '@/app/lib/sanity'
import { notFound } from 'next/navigation'
import Footer from '@/components/footer'
import ProductDetailClient from '@/components/product-detail-client'

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

async function getProduct(id: string): Promise<Product | null> {
  try {
    const product = await sanityClient.fetch(`
      *[_type == "product" && _id == $id][0] {
        _id,
        title,
        price,
        description,
        category->{title},
        images[]{
          asset->{
            _id,
            url
          }
        }
      }
    `, { id })
    
    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  // Process images on the server to get URLs
  const processedProduct = {
    ...product,
    images: product.images?.map(image => 
      image?.asset?.url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop'
    ) || []
  }

  return (
    <div className="min-h-screen">
      <ProductDetailClient product={processedProduct} />
      <Footer />
    </div>
  )
} 