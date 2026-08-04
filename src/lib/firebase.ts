import { initializeApp } from 'firebase/app'
import { getFirestore, collection, onSnapshot, query, orderBy, where } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBOlbYHJdAb1tcEHW-_vT2b8-CnZdYTdtI",
  authDomain: "monster-burger-aac9b.firebaseapp.com",
  projectId: "monster-burger-aac9b",
  storageBucket: "monster-burger-aac9b.firebasestorage.app",
  messagingSenderId: "766220466657",
  appId: "1:766220466657:web:c8c60c05b2ab40cc11faa0",
  measurementId: "G-X62MK80WG1"
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)

export interface Product {
  id: string
  nombre: string
  desc: string
  precio: number
  img?: string
  categoria?: string
  isAvailable?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface Category {
  id: string
  name: string
  order: number
}

const PRODUCTS_COLLECTION = 'products'
const CATEGORIES_COLLECTION = 'categories'

export function subscribeToProducts(
  callback: (products: Product[]) => void,
  categoryId?: string
) {
  let q = query(collection(db, PRODUCTS_COLLECTION), orderBy('createdAt', 'desc'))
  
  if (categoryId) {
    q = query(collection(db, PRODUCTS_COLLECTION), where('category', '==', categoryId), orderBy('createdAt', 'desc'))
  }

  return onSnapshot(q, (snapshot) => {
    const products: Product[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    } as Product))
    callback(products)
  })
}

export function subscribeToCategories(callback: (categories: Category[]) => void) {
  const q = query(collection(db, CATEGORIES_COLLECTION), orderBy('order', 'asc'))
  
  return onSnapshot(q, (snapshot) => {
    const categories: Category[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as Category))
    callback(categories)
  })
}

export async function getProductImageUrl(imagePath: string): Promise<string> {
  try {
    const imageRef = ref(storage, imagePath)
    return await getDownloadURL(imageRef)
  } catch {
    return ''
  }
}

export function formatPrice(price: number, currency = 'USD', locale = 'es-MX'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}