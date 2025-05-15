import type { NextPage } from "next";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SignIn: NextPage = () => {
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleGoogleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
            },
        });
    };

    const handleFacebookSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "facebook",
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Choose your preferred sign in method
                    </p>
                </div>
                <div className="mt-8 space-y-4">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <Image
                            src="/images/google.svg"
                            alt="Google"
                            width={20}
                            height={20}
                            className="mr-2"
                        />
                        Continue with Google
                    </button>
                    <button
                        onClick={handleFacebookSignIn}
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <Image
                            src="/images/facebook.svg"
                            alt="Facebook"
                            width={20}
                            height={20}
                            className="mr-2"
                        />
                        Continue with Facebook
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <button
                        onClick={() => router.back()}
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                        Go back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
