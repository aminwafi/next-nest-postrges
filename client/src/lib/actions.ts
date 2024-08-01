"use server";
import { signIn } from "../auth";
import { AuthError } from "next-auth";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (err) {
        if (err instanceof AuthError) {
            return 'Log in failed';
        }
        throw err;
    }
}

export async function googleAuthenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn('google');
    } catch (err) {
        if (err instanceof AuthError) {
            return 'Google Sign In Failed';
        }
        throw err;
    }
}