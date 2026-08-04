import { useState, useEffect } from 'react'
import { useCategories } from './hooks/useProducts'
import { CategoryTabs } from './components/CategoryTabs'
import { ProductGrid } from './components/ProductGrid'
import { CategorySkeleton } from './components/Skeletons'
import { WhatsAppButton } from './components/WhatsAppButton'
import { restaurantConfig } from './config/restaurant'

function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-600 to-brand-700 flex-shrink-0 flex items-center justify-center shadow-lg shadow-brand-600/40">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Monster Burger</h1>
              <p className="text-xs text-gray-500 font-medium">🍔 Menú Digital</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 rounded-full border border-brand-200">
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
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-gray-600">
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
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase mb-4">¿Necesitas Ayuda?</h3>
            <p className="text-sm text-gray-600">
              Llamanos: <a href={`tel:${restaurantConfig.contact.phone}`} className="hover:text-brand-600 font-medium">{restaurantConfig.contact.phone}</a>
            </p>
            <p className="text-sm text-gray-600 mt-2">Horario: {restaurantConfig.contact.hours}</p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              &copy; 2025 {restaurantConfig.name}. Todos los derechos reservados.
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

      {/* WhatsApp Button */}
      <WhatsAppButton
        phoneNumber={restaurantConfig.whatsapp.phoneNumber}
        message={restaurantConfig.whatsapp.defaultMessage}
      />
    </div>
  )
}