import { useState, useEffect } from 'react'
import { useCategories } from './hooks/useProducts'
import { CategoryTabs } from './components/CategoryTabs'
import { ProductGrid } from './components/ProductGrid'
import { CategorySkeleton } from './components/Skeletons'
import { WhatsAppButton } from './components/WhatsAppButton'
import { restaurantConfig } from './config/restaurant'

function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-black/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-brand-600 flex-shrink-0 flex items-center justify-center">
              <span className="text-xl font-black text-white">M</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-baseline gap-1">
                <h1 className="text-xl sm:text-2xl font-black text-white">MONSTER</h1>
                <h1 className="text-xl sm:text-2xl font-black text-brand-600">BURGER</h1>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black rounded-full font-bold text-sm transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 5a2 2 0 012-2h6a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" />
              </svg>
              Instalar App
            </button>
            <button className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m10-8l2 8m-6 0h4" />
              </svg>
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-bold text-amber-400 tracking-wide uppercase mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href={`https://wa.me/${restaurantConfig.whatsapp.phoneNumber}`}
                  className="hover:text-brand-600 transition-colors font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.429.742 4.76 2.147 6.746l-2.257 6.351 6.558-2.113c1.973 1.06 4.209 1.621 6.756 1.621 5.429 0 9.885-4.418 9.912-9.852.0010-2.63-.775-5.095-2.245-7.252-1.47-2.157-3.55-3.711-5.667-4.267-2.117-.556-4.393-.196-6.358 1.041z" />
                  </svg>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-600 transition-colors font-medium">Política de Alergenos</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-400 tracking-wide uppercase mb-4">¿Necesitas Ayuda?</h3>
            <p className="text-sm text-gray-400">
              Llamanos: <a href={`tel:${restaurantConfig.contact.phone}`} className="hover:text-brand-600 font-medium">{restaurantConfig.contact.phone}</a>
            </p>
            <p className="text-sm text-gray-400 mt-2">Horario: {restaurantConfig.contact.hours}</p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              &copy; 2025 {restaurantConfig.name}. Todos los derechos reservados.
            </p>
            <p className="text-xs text-gray-600">
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
    <div className="min-h-screen bg-black flex flex-col">
      <Header />

      {/* Hero Section */}
      <div className="w-full bg-gradient-to-b from-black via-black to-slate-950 py-12 sm:py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            <span className="text-white">CALMA TU</span>
            <span className="block text-amber-400 sm:inline sm:ml-3">HAMBRE</span>
            <span className="block text-brand-600 sm:inline sm:ml-3">DE BESTIA</span>
          </h2>
        </div>
      </div>

      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
        <div className="mb-8"></div>

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
        </div>
      </main>

      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton
        phoneNumber={restaurantConfig.whatsapp.phoneNumber}
        message={restaurantConfig.whatsapp.defaultMessage}
      />
    </div>
  )
}