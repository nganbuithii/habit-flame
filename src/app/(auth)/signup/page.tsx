import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-primary-light/30 flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-pixel text-cute-gradient mt-6 font-bold">Create Your Account</h1>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border-2 border-neutral-100 p-6 mb-6 relative overflow-hidden">
                    <RegisterForm />
                </div>

                <div className="text-center text-neutral-600 text-sm">
                    Already have an account? <a href="/login" className="text-primary hover:text-primary-hover font-medium">Login</a>
                </div>
            </div>
        </div>
    )
}
