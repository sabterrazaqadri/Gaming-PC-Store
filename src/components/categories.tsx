"use client"

import { motion } from "framer-motion"
import { Gamepad2, Monitor, Headphones, Mouse, Keyboard, Trophy, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const Categories = () => {
  const categories = [
    {
      name: "Gaming PCs",
      description: "High-performance gaming computers",
      icon: Monitor,
      color: "from-blue-500 to-cyan-500",
      count: "150+ Products",
      featured: true
    },
    {
      name: "Gaming Accessories",
      description: "Mice, keyboards, and more",
      icon: Mouse,
      color: "from-purple-500 to-pink-500",
      count: "200+ Products"
    },
    {
      name: "Gaming Headsets",
      description: "Immersive audio experience",
      icon: Headphones,
      color: "from-green-500 to-emerald-500",
      count: "80+ Products"
    },
    {
      name: "Gaming Controllers",
      description: "Precision control devices",
      icon: Gamepad2,
      color: "from-orange-500 to-red-500",
      count: "120+ Products"
    },
    {
      name: "Gaming Keyboards",
      description: "Mechanical and RGB keyboards",
      icon: Keyboard,
      color: "from-indigo-500 to-purple-500",
      count: "90+ Products"
    },
    {
      name: "Gaming Chairs",
      description: "Ergonomic gaming seats",
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
      count: "60+ Products"
    },
    {
      name: "Gaming Monitors",
      description: "High refresh rate displays",
      icon: Monitor,
      color: "from-teal-500 to-cyan-500",
      count: "75+ Products"
    },
    {
      name: "Gaming Peripherals",
      description: "Complete gaming setup",
      icon: Zap,
      color: "from-pink-500 to-rose-500",
      count: "180+ Products"
    }
  ]

  return (
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
            <span className="gradient-text">Explore</span> Categories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive collection of gaming gear organized by category. 
            Find exactly what you need to level up your gaming experience.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Card className={`relative overflow-hidden neon-border bg-card/50 backdrop-blur-sm border-border/50 ${category.featured ? 'ring-2 ring-primary/50' : ''}`}>
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    {category.featured && (
                      <span className="px-2 py-1 text-xs font-medium bg-primary/90 text-white rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-200">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {category.count}
                      </span>
                      <motion.div
                        className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Can&apos;t find what you&apos;re looking for?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our expert team is here to help you find the perfect gaming gear. 
              Contact us for personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                Contact Support
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-300"
              >
                View All Products
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Categories 