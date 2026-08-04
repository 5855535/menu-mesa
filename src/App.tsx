import { useState, useEffect } from 'react'
import { useCategories } from './hooks/useProducts'
import { CategoryTabs } from './components/CategoryTabs'
import { ProductGrid } from './components/ProductGrid'
import { CategorySkeleton } from './components/Skeletons'

function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex-shrink-0 flex items-center justify-center shadow-lg shadow-brand-500/30">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Monster Burger</h1>
              <p className="text-xs text-gray-500 font-medium">Menú Digital</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-50 to-brand-100/50 rounded-full border border-brand-200">
              <svg className="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs font-semibold text-brand-700">Mesa 12</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-100 bg-gradient-to-b from-white via-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase mb-4">Información</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-brand-600 transition-colors font-medium">Política de Alergenos</a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-600 transition-colors font-medium">Contacto</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase mb-4">¿Necesitas Ayuda?</h3>
            <p className="text-sm text-gray-600">Contacta a nuestro personal de meseros para cualquier pregunta.</p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              &copy; 2025 Monster Burger. Todos los derechos reservados.
            </p>
            <p className="text-xs text-gray-400">
              Disfrutando tu experiencia desde la mesa
            </p>
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
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Nuestro Menú
            </h2>
            <p className="text-lg text-gray-600 font-normal max-w-2xl leading-relaxed">
              Descubre nuestras deliciosas hamburguesas preparadas con ingredientes frescos y receta exclusiva.
            </p>
          </div>
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