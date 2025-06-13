import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export async function handleRegister(
    email: string,
    password: string,
): Promise<void> {
    await createUserWithEmailAndPassword(auth, email, password);
}

export async function handleLogin(
    email: string,
    password: string,
): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
}