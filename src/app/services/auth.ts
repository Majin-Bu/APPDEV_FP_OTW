import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  // -------------------- SIGN UP (GENERAL) --------------------
  async registerUser(email: string, password: string, data: any) {
  const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
  const userId = userCredential.user.uid;

  // Save role + profile info
  await setDoc(doc(this.firestore, 'users', userId), data);

  return userId;
  }

  // -------------------- LOGIN --------------------
  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  // -------------------- GET USER ROLE --------------------
  async getUserRole(userId: string): Promise<string | null> {
    const ref = doc(this.firestore, 'users', userId);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return snap.data()['role'];
  }
}
