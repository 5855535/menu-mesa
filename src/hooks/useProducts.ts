import { useEffect, useState, useCallback } from 'react'
import { subscribeToProducts, subscribeToCategories, Product, Category } from '../lib/firebase'

export function useProducts(categoryId?: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    const unsubscribe = subscribeToProducts(
      (data) => {
        setProducts(data)
        setLoading(false)
      },
      categoryId
    )

    return () => unsubscribe()
  }, [categoryId])

  return { products, loading, error }
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    const unsubscribe = subscribeToCategories(
      (data) => {
        setCategories(data)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return { categories, loading, error }
}

export function useProductImage(imagePath?: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!imagePath) {
      setImageUrl(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    import('../lib/firebase').then(({ getProductImageUrl }) => {
      getProductImageUrl(imagePath)
        .then((url) => {
          setImageUrl(url)
          setLoading(false)
        })
        .catch((err) => {
          setError(err)
          setLoading(false)
        })
    })
  }, [imagePath])

  return { imageUrl, loading, error }
}