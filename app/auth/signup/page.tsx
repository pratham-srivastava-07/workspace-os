"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function SignupRedirect() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to signin since signup is not implemented yet
        // and user wants to route signup to signin.
        router.push("/auth/signin");
    }, [router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
            <Loader2 className="w-12 h-12 animate-spin text-indigo-500 mb-4" />
            <p className="text-slate-500 font-medium">Redirecting you to sign in...</p>
        </div>
    );
}
