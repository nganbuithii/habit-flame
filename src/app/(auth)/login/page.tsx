import LoginForm from "./LoginForm";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-primary-light/30 flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-4">
                    <h1 className="text-3xl font-pixel text-cute-gradient mt-6 font-bold">Welcome Back!</h1>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border-2 border-neutral-100 p-6 mb-6 relative overflow-hidden">
                    <LoginForm />
                </div>

                <div className="text-center text-neutral-600 text-sm">
                    Dont have an account? <a href="/signup" className="text-primary hover:text-primary-hover font-medium">Sign up</a>
                </div>
            </div>
        </div>
    )
}
