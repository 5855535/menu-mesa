import { useState, useEffect } from 'react'
import { useCategories } from './hooks/useProducts'
import { CategoryTabs } from './components/CategoryTabs'
import { ProductGrid } from './components/ProductGrid'
import { CategorySkeleton } from './components/Skeletons'

function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Monster Burger</h1>
              <p className="text-xs text-gray-500">Menú Digital</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
              Mesa 12
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; 2025 Monster Burger. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-orange-600 transition-colors">Alergenos</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const { categories, loading: categoriesLoading } = useCategories()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
            Nuestro Menú
          </h2>
          <p className="text-gray-500">
            Descubre nuestras deliciosas opciones preparadas con ingredientes frescos
          </p>
        </div>

        <div aria-live="polite">
          {categoriesLoading ? (
            <CategorySkeleton />
          ) : (
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          )}
        </div>

        <div id="products-panel" role="region" aria-label="Productos">
          <ProductGrid categoryId={activeCategory} />
        </div>
      </main>

      <Footer />
    </div>
  )
}