import { ref, type Ref } from 'vue'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  type DocumentData,
  type QueryConstraint,
  type WithFieldValue,
  onSnapshot,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface FirestoreOptions {
  collection: string
  id?: string
}

export interface QueryOptions {
  where?: Array<{ field: string; operator: any; value: any }>
  orderBy?: Array<{ field: string; direction?: 'asc' | 'desc' }>
  limit?: number
}

export function useFirestore<T = DocumentData>(collectionName: string) {
  const loading = ref(false)
  const error: Ref<Error | null> = ref(null)
  const data: Ref<T[]> = ref([])
  const single: Ref<T | null> = ref(null)

  /**
   * Get all documents from a collection
   */
  async function getAll(options?: QueryOptions): Promise<T[]> {
    loading.value = true
    error.value = null
    try {
      const collectionRef = collection(db, collectionName)
      const constraints: QueryConstraint[] = []

      // Add where clauses
      if (options?.where) {
        options.where.forEach(({ field, operator, value }) => {
          constraints.push(where(field, operator, value))
        })
      }

      // Add orderBy clauses
      if (options?.orderBy) {
        options.orderBy.forEach(({ field, direction = 'asc' }) => {
          constraints.push(orderBy(field, direction))
        })
      }

      // Add limit
      if (options?.limit) {
        constraints.push(limit(options.limit))
      }

      const q = constraints.length > 0 ? query(collectionRef, ...constraints) : collectionRef
      const querySnapshot = await getDocs(q)

      data.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[]

      return data.value
    } catch (e) {
      error.value = e as Error
      throw e
    } finally {
      loading.value = false
    }
  }

  /**
   * Get a single document by ID
   */
  async function getById(id: string): Promise<T | null> {
    loading.value = true
    error.value = null
    try {
      const docRef = doc(db, collectionName, id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        single.value = {
          id: docSnap.id,
          ...docSnap.data(),
        } as T
        return single.value
      } else {
        single.value = null
        return null
      }
    } catch (e) {
      error.value = e as Error
      throw e
    } finally {
      loading.value = false
    }
  }

  /**
   * Create a new document with auto-generated ID
   */
  async function create(data: WithFieldValue<Partial<T>>): Promise<string> {
    loading.value = true
    error.value = null
    try {
      const collectionRef = collection(db, collectionName)
      const docRef = await addDoc(collectionRef, {
        ...(data as any),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      return docRef.id
    } catch (e) {
      error.value = e as Error
      throw e
    } finally {
      loading.value = false
    }
  }

  /**
   * Create or overwrite a document with a specific ID
   */
  async function set(id: string, data: WithFieldValue<Partial<T>>): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const docRef = doc(db, collectionName, id)
      await setDoc(docRef, {
        ...(data as any),
        updatedAt: new Date().toISOString(),
      })
    } catch (e) {
      error.value = e as Error
      throw e
    } finally {
      loading.value = false
    }
  }

  /**
   * Update an existing document
   */
  async function update(id: string, data: Partial<T>): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const docRef = doc(db, collectionName, id)
      await updateDoc(docRef, {
        ...(data as any),
        updatedAt: new Date().toISOString(),
      })
    } catch (e) {
      error.value = e as Error
      throw e
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete a document
   */
  async function remove(id: string): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const docRef = doc(db, collectionName, id)
      await deleteDoc(docRef)
      
      // Remove from local data array if present
      data.value = data.value.filter((item: any) => item.id !== id)
    } catch (e) {
      error.value = e as Error
      throw e
    } finally {
      loading.value = false
    }
  }

  /**
   * Subscribe to real-time updates for a collection
   */
  function subscribe(options?: QueryOptions, callback?: (data: T[]) => void): Unsubscribe {
    const collectionRef = collection(db, collectionName)
    const constraints: QueryConstraint[] = []

    // Add where clauses
    if (options?.where) {
      options.where.forEach(({ field, operator, value }) => {
        constraints.push(where(field, operator, value))
      })
    }

    // Add orderBy clauses
    if (options?.orderBy) {
      options.orderBy.forEach(({ field, direction = 'asc' }) => {
        constraints.push(orderBy(field, direction))
      })
    }

    // Add limit
    if (options?.limit) {
      constraints.push(limit(options.limit))
    }

    const q = constraints.length > 0 ? query(collectionRef, ...constraints) : collectionRef

    return onSnapshot(q, (querySnapshot) => {
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[]

      data.value = results
      
      if (callback) {
        callback(results)
      }
    }, (e) => {
      error.value = e as Error
    })
  }

  /**
   * Subscribe to real-time updates for a single document
   */
  function subscribeToDoc(id: string, callback?: (data: T | null) => void): Unsubscribe {
    const docRef = doc(db, collectionName, id)

    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const result = {
          id: docSnap.id,
          ...docSnap.data(),
        } as T

        single.value = result
        
        if (callback) {
          callback(result)
        }
      } else {
        single.value = null
        if (callback) {
          callback(null)
        }
      }
    }, (e) => {
      error.value = e as Error
    })
  }

  return {
    loading,
    error,
    data,
    single,
    getAll,
    getById,
    create,
    set,
    update,
    remove,
    subscribe,
    subscribeToDoc,
  }
}
