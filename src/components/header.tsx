// "use client"

// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Search, ShoppingCart, User, Menu, X, Gamepad2 } from "lucide-react"
// import { Button } from "@/components/ui/button"

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isSearchOpen, setIsSearchOpen] = useState(false)

//   const navItems = [
//     { name: "Home", href: "#", icon: Gamepad2 },
//     { name: "Products", href: "#products", icon: ShoppingCart },
//     { name: "About", href: "#about" },
//     { name: "Contact", href: "#contact" },
//   ]

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="flex items-center space-x-2 flex-shrink-0"
//           >
//             <div className="relative">
//               <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
//                 <Gamepad2 className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
//               </div>
//               <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-accent rounded-full pulse-glow"></div>
//             </div>
//             <div className="hidden sm:block">
//               <h1 className="text-lg sm:text-xl font-bold gradient-text">GamingStore</h1>
//               <p className="text-xs text-muted-foreground">Ultimate Gaming Experience</p>
//             </div>
//             <div className="sm:hidden">
//               <h1 className="text-lg font-bold gradient-text">GS</h1>
//             </div>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
//             {navItems.map((item, index) => (
//               <motion.a
//                 key={item.name}
//                 href={item.href}
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center space-x-1 group"
//               >
//                 {item.icon && <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />}
//                 <span>{item.name}</span>
//               </motion.a>
//             ))}
//           </nav>

//           {/* Actions */}
//           <div className="flex items-center space-x-2 sm:space-x-4">
//             {/* Search - Hidden on mobile */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="hidden sm:block relative"
//             >
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setIsSearchOpen(!isSearchOpen)}
//                 className="hover:bg-primary/10"
//               >
//                 <Search className="w-5 h-5" />
//               </Button>
              
//               <AnimatePresence>
//                 {isSearchOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                     className="absolute top-full right-0 mt-2 w-80"
//                   >
//                     <div className="glass rounded-lg p-4 shadow-lg">
//                       <div className="flex items-center space-x-2">
//                         <Search className="w-4 h-4 text-muted-foreground" />
//                         <input
//                           type="text"
//                           placeholder="Search products..."
//                           className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-muted-foreground"
//                           autoFocus
//                         />
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>

//             {/* Cart */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
//                 <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
//                 <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">
//                   3
//                 </span>
//               </Button>
//             </motion.div>

//             {/* User */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               className="hidden sm:block"
//             >
//               <Button variant="ghost" size="icon" className="hover:bg-primary/10">
//                 <User className="w-4 h-4 sm:w-5 sm:h-5" />
//               </Button>
//             </motion.div>

//             {/* Mobile Menu Button */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="md:hidden"
//             >
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="hover:bg-primary/10"
//               >
//                 {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//               </Button>
//             </motion.div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="md:hidden border-t border-border/40"
//             >
//               <nav className="py-4 space-y-2">
//                 {navItems.map((item, index) => (
//                   <motion.a
//                     key={item.name}
//                     href={item.href}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors duration-200  items-center space-x-2"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     {item.icon && <item.icon className="w-4 h-4" />}
//                     <span>{item.name}</span>
//                   </motion.a>
//                 ))}
                
//                 {/* Mobile Search */}
//                 <div className="px-4 py-2">
//                   <div className="flex items-center space-x-2 bg-card/50 rounded-lg p-3">
//                     <Search className="w-4 h-4 text-muted-foreground" />
//                     <input
//                       type="text"
//                       placeholder="Search products..."
//                       className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-muted-foreground text-sm"
//                     />
//                   </div>
//                 </div>
//               </nav>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </header>
//   )
// }

// export default Header 
