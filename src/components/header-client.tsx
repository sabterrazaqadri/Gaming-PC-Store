"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingCart, User, Menu, X, Gamepad2, Trophy, Zap, ChevronDown, Monitor, Headphones, Mouse, Keyboard, Shield } from "lucide-react"
// Update the import path below if your Button component is located elsewhere
import { Button } from "../components/ui/button"
import { cn } from "@/lib/utils"

interface Category {
  _id: string
  title: string
  icon: string
  subcategories: {
    _id: string
    title: string
  }[]
}

interface HeaderClientProps {
  categories: Category[]
}

const HeaderClient = ({ categories }: HeaderClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Icon mapping for categories
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    'Monitor': Monitor,
    'Headphones': Headphones,
    'Mouse': Mouse,
    'Keyboard': Keyboard,
    'Shield': Shield,
    'Gamepad2': Gamepad2,
    'Trophy': Trophy,
    'Zap': Zap,
  }

  const navItems = [
    { name: "Home", href: "#", icon: Gamepad2 },
    { name: "Products", href: "#products", icon: Zap },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(categoryName)
    }
  }

  const handleSubcategoryClick = (subcategory: string) => {
    // Here you would typically navigate to a filtered products page
    console.log(`Navigating to products in: ${subcategory}`)
    setIsCategoryOpen(false)
    setSelectedCategory(null)
  }

  console.log('HeaderClient categories:', categories)
  console.log('HeaderClient selectedCategory:', selectedCategory)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 flex-shrink-0"
          >
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-accent rounded-full pulse-glow"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold gradient-text">GamingStore</h1>
              <p className="text-xs text-muted-foreground">Ultimate Gaming Experience</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold gradient-text">GS</h1>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center space-x-1 group"
              >
                {item.icon && <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                <span>{item.name}</span>
              </motion.a>
            ))}

            {/* Categories Dropdown */}
            {categories.length > 0 && (
              <div className="relative">
                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center space-x-1 group"
                >
                  <Trophy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Categories</span>
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    isCategoryOpen && "rotate-180"
                  )} />
                </motion.button>

                <AnimatePresence>
                  {isCategoryOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute top-full left-0 mt-2 w-80 bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg"
                    >
                      <div className="p-4">
                        <div className="grid grid-cols-1 gap-2">
                          {/* Only show categories, not subcategories */}
                          {categories.map((category) => {
                            const IconComponent = iconMap[category.icon] || Trophy;
                            return (
                              <div key={category._id} className="relative">
                                <button
                                  onClick={() => handleCategoryClick(category.title)}
                                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary/10 transition-colors duration-200 text-left"
                                >
                                  <div className="flex items-center space-x-3">
                                    <IconComponent className="w-5 h-5 text-primary" />
                                    <span className="text-white font-medium">{category.title}</span>
                                  </div>
                                  {category.subcategories && category.subcategories.length > 0 && (
                                    <ChevronDown className={cn(
                                      "w-4 h-4 transition-transform duration-200",
                                      selectedCategory === category.title && "rotate-180"
                                    )} />
                                  )}
                                </button>

                                {/* Show subcategories indented below the selected category */}
                                {selectedCategory === category.title && category.subcategories && category.subcategories.length > 0 && (
                                  <AnimatePresence>
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="ml-8 mt-1 space-y-1"
                                    >
                                      {category.subcategories.map((subcategory) => (
                                        <motion.button
                                          key={subcategory._id}
                                          onClick={() => handleSubcategoryClick(subcategory.title)}
                                          className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-200"
                                        >
                                          {subcategory.title}
                                        </motion.button>
                                      ))}
                                    </motion.div>
                                  </AnimatePresence>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search - Hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden sm:block relative"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hover:bg-primary/10"
              >
                <Search className="w-5 h-5" />
              </Button>
              
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-80"
                  >
                    <div className="glass rounded-lg p-4 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <Search className="w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search products..."
                          className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-muted-foreground"
                          autoFocus
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Cart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            </motion.div>

            {/* User */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block"
            >
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="md:hidden"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hover:bg-primary/10"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/40"
            >
              <nav className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors duration-200 items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span>{item.name}</span>
                  </motion.a>
                ))}

                {/* Mobile Categories */}
                {categories.length > 0 && (
                  <div className="px-4 py-2">
                    <div className="text-sm font-medium text-muted-foreground mb-2 px-2">Categories</div>
                    {categories.map((category) => {
                      const IconComponent = iconMap[category.icon] || Trophy;
                      return (
                        <div key={category._id} className="mb-2">
                          <button
                            onClick={() => handleCategoryClick(category.title)}
                            className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors duration-200"
                          >
                            <div className="flex items-center space-x-2">
                              <IconComponent className="w-4 h-4" />
                              <span>{category.title}</span>
                            </div>
                            {category.subcategories && category.subcategories.length > 0 && (
                              <ChevronDown className={cn(
                                "w-4 h-4 transition-transform duration-200",
                                selectedCategory === category.title && "rotate-180"
                              )} />
                            )}
                          </button>

                          {/* Only show subcategories if this category is selected */}
                          {selectedCategory === category.title && category.subcategories && (
                            <AnimatePresence>
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="ml-6 mt-1 space-y-1"
                              >
                                {category.subcategories.map((subcategory) => (
                                  <motion.button
                                    key={subcategory._id}
                                    onClick={() => {
                                      handleSubcategoryClick(subcategory.title)
                                      setIsMenuOpen(false)
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-200"
                                  >
                                    {subcategory.title}
                                  </motion.button>
                                ))}
                              </motion.div>
                            </AnimatePresence>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Mobile Search */}
                <div className="px-4 py-2">
                  <div className="flex items-center space-x-2 bg-card/50 rounded-lg p-3">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-muted-foreground text-sm"
                    />
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default HeaderClient 