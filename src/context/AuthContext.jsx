import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase.js'

const Ctx = createContext(null)
export const useAuth = () => useContext(Ctx)

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false); }), [])

  const loginGoogle = () => signInWithPopup(auth, googleProvider)
  const loginEmail = (email, password) => signInWithEmailAndPassword(auth, email, password)
  const registerEmail = (name, email, password, photoURL) =>
    createUserWithEmailAndPassword(auth, email, password).then(async ({ user }) => {
      await updateProfile(user, { displayName: name, photoURL }); return user
    })
  const logout = () => signOut(auth)

  return <Ctx.Provider value={{ user, loading, loginGoogle, loginEmail, registerEmail, logout }}>{children}</Ctx.Provider>
}
