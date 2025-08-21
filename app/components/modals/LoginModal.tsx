'use client';

import Modal from "./Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";
import { handleLogin } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const normalizeErrors = (errData: any): string[] => {
        const tmpErrors: string[] = [];

        if (!errData) return tmpErrors;

        if (Array.isArray(errData)) {
            errData.forEach(err => {
                tmpErrors.push(typeof err === 'string' ? err : JSON.stringify(err));
            });
        } else if (typeof errData === 'object') {
            Object.values(errData).forEach(err => {
                if (Array.isArray(err)) {
                    err.forEach(e => tmpErrors.push(typeof e === 'string' ? e : JSON.stringify(e)));
                } else {
                    tmpErrors.push(typeof err === 'string' ? err : JSON.stringify(err));
                }
            });
        } else {
            tmpErrors.push(String(errData));
        }

        return tmpErrors;
    };

    const submitLogin = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        const formData = {
            email: email,
            password: password 
        };

        const response = await apiService.postWithoutToken('/api/auth/login/', formData);

        if (response.access) {
            handleLogin(response.user.pk, response.access, response.refresh);
            loginModal.close();
            router.push('/');
        } else {
            setErrors(normalizeErrors(response.non_field_errors || response));
        }
    };

    const content = (
        <>
            <h2 className="mb-6 text-2xl">Welcome to Djangobnb, please log in</h2>

            <form 
                onSubmit={submitLogin}
                className="space-y-4 "
            >
                <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Your email address" 
                    type="email" 
                    className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" 
                />

                <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Your password" 
                    type="password" 
                    className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" 
                />

                {errors.map((error, index) => (
                    <div key={`error_${index}`} className="p-4 bg-red-500 text-white rounded-xl opacity-80">
                        {error}
                    </div>
                ))}

                <CustomButton
                    label="Submit"
                    onClick={submitLogin}
                />
            </form>
        </>
    );

    return ( 
        <Modal
            isOpen={loginModal.isOpen}
            close={loginModal.close}
            label="Log in"
            content={content}
        />
    );
};
 
export default LoginModal;
