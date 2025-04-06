import RegisterForm from "@/components/modules/auth/register/RegisterForm";

const RegisterPage = () => {
    return (
        <div className="max-w-lg px-4 mx-auto">

            <div className="flex justify-center items-center h-screen ">
                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterPage;