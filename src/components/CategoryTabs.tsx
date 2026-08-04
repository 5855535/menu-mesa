import { Category } from '../lib/firebase'

interface CategoryTabsProps {
  categories: Category[]
  activeCategory: string | null
  onCategoryChange: (categoryId: string | null) => void
  loading?: boolean
}

export function CategoryTabs({ categories, activeCategory, onCategoryChange, loading }: CategoryTabsProps) {
  const allCategories = [
    { id: null, name: 'Todos', order: -1 },
    ...categories,
  ]

  return (
    <nav
      className="flex flex-wrap gap-2.5 pb-6 sm:pb-8 overflow-x-auto scrollbar-hide"
      role="tablist"
      aria-label="Categorías del menú"
    >
      {allCategories.map((category) => (
        <button
          key={category.id ?? 'all'}
          role="tab"
          aria-selected={activeCategory === category.id}
          aria-controls={`panel-${category.id ?? 'all'}`}
          id={`tab-${category.id ?? 'all'}`}
          onClick={() => onCategoryChange(category.id)}
          disabled={loading}
          className={`
            relative px-5 sm:px-6 py-2.5 text-sm font-bold rounded-full
            transition-all duration-200 ease-out
            focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-black
            disabled:opacity-50 disabled:cursor-not-allowed
            whitespace-nowrap flex-shrink-0
            ${activeCategory === category.id
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30 hover:bg-amber-300 uppercase tracking-wide'
              : 'bg-slate-900 text-gray-300 border border-slate-700 hover:bg-slate-800 hover:border-brand-600 hover:shadow-sm'
            }
          `}
        >
          {category.name}
        </button>
      ))}
    </nav>
  )
}