# Firestore Integration

This project includes Firebase Firestore integration for CRUD operations with real-time updates.

## Setup

### 1. Install Firebase (already done)
```bash
yarn add firebase
```

### 2. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Firestore Database
4. Get your Firebase configuration

### 3. Configure Environment Variables
Add to `.env.local`:
```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Usage

### Basic CRUD Operations

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { useFirestore } from '@/composables/useFirestore'

interface Form {
  id?: string
  title: string
  description: string
  fields: any[]
  status: 'draft' | 'published'
  createdAt?: string
  updatedAt?: string
}

const { loading, error, data, single, getAll, getById, create, update, remove } = useFirestore<Form>('forms')

onMounted(async () => {
  // Get all forms
  await getAll()
})

// Create a new form
async function createForm() {
  const id = await create({
    title: 'New Form',
    description: 'Form description',
    fields: [],
    status: 'draft'
  })
  console.log('Created form with ID:', id)
}

// Update a form
async function updateForm(id: string) {
  await update(id, {
    title: 'Updated Form Title',
    status: 'published'
  })
}

// Delete a form
async function deleteForm(id: string) {
  await remove(id)
}

// Get single form
async function loadForm(id: string) {
  const form = await getById(id)
  console.log('Loaded form:', form)
}
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error.message }}</div>
    
    <div v-else>
      <div v-for="form in data" :key="form.id">
        <h3>{{ form.title }}</h3>
        <p>{{ form.description }}</p>
        <button @click="updateForm(form.id!)">Edit</button>
        <button @click="deleteForm(form.id!)">Delete</button>
      </div>
      
      <button @click="createForm">Create New Form</button>
    </div>
  </div>
</template>
```

### Query with Filters and Sorting

```typescript
// Get published forms, sorted by creation date
await getAll({
  where: [
    { field: 'status', operator: '==', value: 'published' }
  ],
  orderBy: [
    { field: 'createdAt', direction: 'desc' }
  ],
  limit: 10
})

// Multiple filters
await getAll({
  where: [
    { field: 'status', operator: '==', value: 'published' },
    { field: 'userId', operator: '==', value: 'user123' }
  ]
})
```

### Real-time Updates

```vue
<script setup lang="ts">
import { onUnmounted } from 'vue'
import { useFirestore } from '@/composables/useFirestore'

const { data, subscribe } = useFirestore('forms')

// Subscribe to real-time updates
const unsubscribe = subscribe({
  orderBy: [{ field: 'createdAt', direction: 'desc' }]
}, (forms) => {
  console.log('Forms updated:', forms)
})

// Cleanup subscription
onUnmounted(() => {
  unsubscribe()
})
</script>

<template>
  <div>
    <!-- data automatically updates in real-time -->
    <div v-for="form in data" :key="form.id">
      {{ form.title }}
    </div>
  </div>
</template>
```

### Subscribe to Single Document

```typescript
import { onUnmounted } from 'vue'

const { single, subscribeToDoc } = useFirestore('forms')

const unsubscribe = subscribeToDoc('form-id-here', (form) => {
  console.log('Form updated:', form)
})

onUnmounted(() => {
  unsubscribe()
})
```

### Set Document with Specific ID

```typescript
// Create or overwrite a document with specific ID
await set('custom-form-id', {
  title: 'Form with Custom ID',
  description: 'This form has a custom ID',
  fields: [],
  status: 'draft'
})
```

## API Reference

### Composable: `useFirestore<T>(collectionName: string)`

Returns an object with:

#### State
- `loading: Ref<boolean>` - Loading state
- `error: Ref<Error | null>` - Error state
- `data: Ref<T[]>` - Array of documents
- `single: Ref<T | null>` - Single document

#### Methods

##### `getAll(options?: QueryOptions): Promise<T[]>`
Get all documents with optional filtering and sorting.

**QueryOptions:**
```typescript
{
  where?: Array<{ field: string; operator: any; value: any }>
  orderBy?: Array<{ field: string; direction?: 'asc' | 'desc' }>
  limit?: number
}
```

##### `getById(id: string): Promise<T | null>`
Get a single document by ID.

##### `create(data: Partial<T>): Promise<string>`
Create a new document with auto-generated ID. Returns the new document ID.
Automatically adds `createdAt` and `updatedAt` timestamps.

##### `set(id: string, data: Partial<T>): Promise<void>`
Create or overwrite a document with a specific ID.
Automatically adds/updates `updatedAt` timestamp.

##### `update(id: string, data: Partial<T>): Promise<void>`
Update an existing document (merges with existing data).
Automatically updates `updatedAt` timestamp.

##### `remove(id: string): Promise<void>`
Delete a document from Firestore and remove from local `data` array.

##### `subscribe(options?: QueryOptions, callback?: (data: T[]) => void): Unsubscribe`
Subscribe to real-time updates for a collection. Returns unsubscribe function.

##### `subscribeToDoc(id: string, callback?: (data: T | null) => void): Unsubscribe`
Subscribe to real-time updates for a single document. Returns unsubscribe function.

## Firestore Operators

Common operators for `where` queries:
- `==` - Equal to
- `!=` - Not equal to
- `<` - Less than
- `<=` - Less than or equal to
- `>` - Greater than
- `>=` - Greater than or equal to
- `array-contains` - Array contains value
- `array-contains-any` - Array contains any value
- `in` - Value in array
- `not-in` - Value not in array

## Examples

### Form Management

```typescript
interface Form {
  title: string
  description: string
  fields: any[]
  status: 'draft' | 'published'
}

const forms = useFirestore<Form>('forms')

// Create
const formId = await forms.create({
  title: 'Contact Form',
  description: 'A simple contact form',
  fields: [],
  status: 'draft'
})

// Update
await forms.update(formId, { status: 'published' })

// Delete
await forms.remove(formId)

// Query
await forms.getAll({
  where: [{ field: 'status', operator: '==', value: 'published' }],
  orderBy: [{ field: 'createdAt', direction: 'desc' }],
  limit: 10
})
```

### Real-time Dashboard

```vue
<script setup lang="ts">
import { onUnmounted } from 'vue'
import { useFirestore } from '@/composables/useFirestore'

const { data, loading, error, subscribe } = useFirestore('forms')

const unsubscribe = subscribe({
  orderBy: [{ field: 'updatedAt', direction: 'desc' }]
})

onUnmounted(unsubscribe)
</script>

<template>
  <div>
    <h1>Forms Dashboard (Real-time)</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <div v-for="form in data" :key="form.id">
        {{ form.title }} - {{ form.status }}
      </div>
    </div>
  </div>
</template>
```

## Security Rules

Remember to set up Firestore security rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /forms/{formId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
