"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Star, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"

interface ProductCardProps {
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
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const rating = 4.5
  // Use a deterministic approach based on product ID for review count
  const reviewCount = 50 + (product._id.charCodeAt(0) % 150)

  // Get the current image URL from Sanity
  const getCurrentImageUrl = () => {
    if (product.images && product.images.length > 0) {
      const currentImage = product.images[currentImageIndex]
      if (currentImage && currentImage.asset && currentImage.asset.url) {
        return currentImage.asset.url
      }
    }
    // Fallback to placeholder if no image
    return 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Link href={`/product/${product._id}`} className="block">
        <Card className="relative overflow-hidden neon-border bg-card/50 backdrop-blur-sm border-border/50 cursor-pointer">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            <motion.img
              src={getCurrentImageUrl()}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            />

            {/* Image Navigation */}
            {product.images && product.images.length > 1 && (
              <div className="absolute bottom-2 left-2 flex space-x-1">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setCurrentImageIndex(index)
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex ? 'bg-primary' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Quick Actions */}
            <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 bg-black/50 hover:bg-black/70 text-white"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsLiked(!isLiked)
                }}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 bg-black/50 hover:bg-black/70 text-white"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>

            {/* Category Badge */}
            <div className="absolute top-2 left-2">
              <span className="px-2 py-1 text-xs font-medium bg-primary/90 text-white rounded-full">
                {product.category?.title || 'Gaming'}
              </span>
            </div>

            {/* Rating */}
            <div className="absolute bottom-2 right-2 flex items-center space-x-1 bg-black/50 px-2 py-1 rounded-full">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-white font-medium">{rating}</span>
              <span className="text-xs text-white/70">({reviewCount})</span>
            </div>
          </div>

          <CardContent className="p-4">
            {/* Title */}
            <motion.h3
              className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200"
              animate={isHovered ? { color: "hsl(var(--primary))" } : {}}
            >
              {product.title}
            </motion.h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold gradient-text">
                  {formatPrice(product.price)}
                </span>
                {product.price > 1000 && (
                  <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
                    Free Shipping
                  </span>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button
              variant="gradient"
              className="w-full group"
              size="lg"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Add to Cart
            </Button>
          </CardFooter>

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          />
        </Card>
      </Link>
    </motion.div>
  )
}

export default ProductCard 