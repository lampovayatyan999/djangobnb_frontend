'use client';

import Modal from "./Modal";
import { useState } from "react";
import { useRouter } from "next/navigation"
import useSignupModal from "../../hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

const SignupModal = () => {
    const router = useRouter();
    const signupModal = useSignupModal();
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState(''); 
    const [password2, setPassword2] = useState(''); 
    const [errors, setErrors] = useState<string[]>([]);

    // Submit functionality

   const submitSignup = async () => {
        const formData = {
            email,
            password1,
            password2
        };

        const response = await apiService.postWithoutToken('/api/auth/register/', formData);

        if (response.access) {
            handleLogin(response.user.pk, response.access, response.refresh);
            signupModal.close();
            router.push('/');
        } else {
            const tmpErrors: string[] = Object.values(response).map((error: any) => {
                if (typeof error === 'object') {
                    return error.message || JSON.stringify(error);
                }
                return String(error);
            });

            setErrors(tmpErrors);
        }
    };


    const content = (
        <>
            <h2 className="mb-6 text-2xl">Welcome to Djangobnb, please log in</h2>

            <form onSubmit={(e) => { e.preventDefault(); submitSignup(); }} className="space-y-4">
                <input onChange={(e) => setEmail(e.target.value)} placeholder="  Your email address" type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

                <input onChange={(e) => setPassword1(e.target.value)} placeholder="  Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

                <input onChange={(e) => setPassword2(e.target.value)} placeholder=" Repeat Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

                {errors.map((error, index) => (
                    <div key={`error_${index}`} className="p-4 bg-red-500 text-white rounded-xl opacity-80">
                        {error}
                    </div>
                ))}

                <CustomButton
                    label="Submit"
                    onClick={submitSignup}
                />
            </form>

        </>
    )

    return ( 
        <Modal
            isOpen={signupModal.isOpen}
            close={signupModal.close}
            label="Sign up"
            content={content}
        />
    );
}
 
export default SignupModal;