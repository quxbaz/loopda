const VERSION = 3

const {indexedDB} = window
let db

const create = () => {

  const request = indexedDB.open('samples', VERSION)

  request.onerror = (event) => {
    throw new Error(event.target.errorCode)
  }

  request.onupgradeneeded = (event) => {
    var db = event.target.result
    db.createObjectStore('samples', {autoIncrement: true})
  }

  return new Promise((resolve) => {
    request.onsuccess = (event) => {
      db = event.target.result
      resolve()
    }
  })

}

const getSamples = () => {
  const samples = []
  const transaction = db.transaction('samples', 'readonly')
  transaction.objectStore('samples').openCursor().onsuccess = (event) => {
    const cursor = event.target.result
    if (cursor) {
      samples.push(cursor.value)
      cursor.continue()
    }
  }
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve(samples)
    transaction.onerror = reject
  })
}

const addSample = (sample) => {
  const transaction = db.transaction('samples', 'readwrite')
  transaction.objectStore('samples').put(sample)
  return new Promise((resolve, reject) => {
    transaction.oncomplete = resolve
    transaction.onerror = reject
  })
}

export default {create, getSamples, addSample}
