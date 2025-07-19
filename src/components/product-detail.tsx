"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Star, ArrowLeft, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"

interface ProductDetailProps {
  product: {
    _id: string
    title: string
    price: number
    description: string
    category: {
      title: string
    }
    images: { asset: { _id: string; url: string } }[]
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  urlFor: (image: any) => string
}

const ProductDetail = ({ product, urlFor }: ProductDetailProps) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)

  const rating = 4.5
  const reviewCount = 50 + (product._id.charCodeAt(0) % 150)

  const features = [
    { icon: Truck, text: "Free Shipping", description: "On orders over $1000" },
    { icon: Shield, text: "2 Year Warranty", description: "Full coverage included" },
    { icon: RotateCcw, text: "30 Day Returns", description: "Easy return process" },
  ]

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            href="/" 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-card/50 border border-border/50">
              {product.images && product.images.length > 0 ? (
                <Image
                  key={selectedImage}
                  src={urlFor(product.images[selectedImage].asset)}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  width={600}
                  height={600}
                  style={{ objectFit: 'cover' }}
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-6xl">🎮</div>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === selectedImage 
                        ? 'border-primary scale-105' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Image
                      src={urlFor(image.asset)}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                      width={80}
                      height={80}
                      style={{ objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Category & Title */}
            <div>
              <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                {product.category?.title || 'Gaming'}
              </span>
              <h1 className="text-4xl font-bold text-white mt-4 mb-2">
                {product.title}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-medium">{rating}</span>
                  <span className="text-muted-foreground">({reviewCount} reviews)</span>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">
                {formatPrice(product.price)}
              </div>
              {product.price > 1000 && (
                <div className="text-green-400 text-sm font-medium">
                  ✓ Free Shipping Included
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-white font-medium">Quantity:</label>
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-muted-foreground hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-white font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-muted-foreground hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? 'text-red-500' : 'text-muted-foreground'}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
              </div>

              <div className="flex space-x-4">
                <Button size="lg" variant="gradient" className="flex-1">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="neon" className="flex-1">
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="glass rounded-lg p-4 text-center"
                >
                  <feature.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="text-white font-semibold mb-1">{feature.text}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail 