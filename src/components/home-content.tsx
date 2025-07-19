"use client"

import { motion } from 'framer-motion'
import Header from '@/components/header'
import Hero from '@/components/hero'
import Categories from '@/components/categories'
import ProductCard from '@/components/product-card'
import Footer from '@/components/footer'

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

interface HomeContentProps {
  products: Product[]
}

export default function HomeContent({ products }: HomeContentProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      
      {/* Products Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Featured</span> Products
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium gaming gear. 
              From high-performance PCs to cutting-edge accessories.
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105">
              Load More Products
            </button>
          </motion.div>
        </div>
      </section>

      <Categories />
      
      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">GamingStore</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We&apos;re committed to providing the best gaming experience with premium products and exceptional service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Quality",
                description: "All our products are carefully selected for their quality and performance.",
                icon: "⭐",
                color: "from-yellow-500 to-orange-500"
              },
              {
                title: "Fast Shipping",
                description: "Get your gaming gear delivered quickly with our express shipping options.",
                icon: "🚀",
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "24/7 Support",
                description: "Our expert team is always here to help you with any questions.",
                icon: "🛡️",
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "Secure Payment",
                description: "Shop with confidence with our secure payment processing.",
                icon: "🔒",
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Warranty Coverage",
                description: "All products come with comprehensive warranty protection.",
                icon: "🛠️",
                color: "from-red-500 to-pink-500"
              },
              {
                title: "Expert Advice",
                description: "Get personalized recommendations from our gaming experts.",
                icon: "🎯",
                color: "from-indigo-500 to-purple-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="glass rounded-2xl p-8 hover-lift"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 