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
      className="flex flex-wrap gap-2 pb-6" 
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
            relative px-4 py-2.5 text-sm font-medium rounded-full
            transition-all duration-200 ease-out
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
            ${activeCategory === category.id
              ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
            }
          `}
        >
          {category.name}
        </button>
      ))}
    </nav>
  )
}