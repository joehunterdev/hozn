"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Image from "next/image";

import OpenEye from "@/assets/images/icon/icon_68.svg";

interface FormData {
   email: string;
   password: string;
}

const LoginForm = () => {
   const router = useRouter(); 
   const schema = yup
      .object({
         email: yup.string().required().email().label("Email"),
         password: yup.string().required().label("Password"),
      })
      .required();

   const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) });

   const onSubmit = async (data: FormData) => {
      try {
         const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://hozn-topaz.vercel.app/api';
         const apiUrl = `${baseUrl}/auth/login`;
         
         // Log the URL being used
         console.log('🔑 Attempting login to:', apiUrl);
         console.log('🌍 Current environment:', process.env.NODE_ENV);
         console.log('📊 NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
         console.log('📝 Login data:', { email: data.email, password: '[HIDDEN]' });
         
         const response = await fetch(apiUrl, { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
         });

         const result = await response.json();
         console.log('📨 Login response:', result);

         if (response.ok) {
            // Store the token if provided
            if (result.token) {
               localStorage.setItem("token", result.token);
            }
            toast.success("Login successfully", { position: "top-center" });
            reset();
            router.push("/dashboard/dashboard-index"); 
         } else {
            toast.error(result.message || "Invalid email or password");
         }
      } catch (error) {
         console.error('❌ Login error:', error);
         toast.error("An error occurred. Please try again.");
      }
   };

   const [isPasswordVisible, setPasswordVisibility] = useState(false);
   const togglePasswordVisibility = () => setPasswordVisibility(!isPasswordVisible);

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="row">
            <div className="col-12">
               <div className="input-group-meta position-relative mb-25">
                  <label>Email*</label>
                  <input type="email" {...register("email")} placeholder="Youremail@gmail.com" />
                  <p className="form_error">{errors.email?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="input-group-meta position-relative mb-20">
                  <label>Password*</label>
                  <input type={isPasswordVisible ? "text" : "password"} {...register("password")} placeholder="Enter Password" className="pass_log_id" />
                  <span className="placeholder_icon">
                     <span className={`passVicon ${isPasswordVisible ? "eye-slash" : ""}`}>
                        <Image onClick={togglePasswordVisibility} src={OpenEye} alt="" />
                     </span>
                  </span>
                  <p className="form_error">{errors.password?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="agreement-checkbox d-flex justify-content-between align-items-center">
                  <div>
                     <input type="checkbox" id="remember" />
                     <label htmlFor="remember">Keep me logged in</label>
                  </div>
                  <Link href="#">Forget Password?</Link>
               </div>
            </div>
            <div className="col-12">
               <button type="submit" className="btn-two w-100 text-uppercase d-block mt-20">Login</button>
            </div>
         </div>
      </form>
   )
}

export default LoginForm;
