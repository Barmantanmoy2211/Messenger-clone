"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import AuthSocialButtton from "./AuthSocialButton";

import {BsGithub} from 'react-icons/bs';
import {BsGoogle} from 'react-icons/bs';
import axios from 'axios';

type Varient = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVarient] = useState<Varient>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toogleVarient = useCallback(() => {
    if (variant === "LOGIN") {
      setVarient("REGISTER");
    } else {
      setVarient("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      // Axios Register
      axios.post('/api/register',data)
      .catch(()=>)
    }

    if (variant === "LOGIN") {
      // NextAuth SignIn
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    // NextAuth Social Sign In
  };
  return (
    <div
      className="
        mt-8
        sm:mx-auto
        sm:w-full
        sm:max-w-md
        "
    >
      <div
        className="
            bg-white
            px-4
            py-8
            shadpw
            sm:rounded-lg
            sm:px-18
            "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input id="name" label="Name" register={register} errors={errors} disabled={isLoading} />
          )}
          <Input
            id="email"
            label="Email address"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
            <div className="relative">
                <div 
                className="
                absolute 
                inset-0 
                flex 
                items-center
                "
                >
                    <div 
                    className="
                    w-full 
                    border-t 
                    border-gray-300"
                    />   
                </div>
                <div 
                className="
                relative 
                flex 
                justify-center 
                text-sm"
                >
                    <span className="
                    bg-white 
                    px-2 
                    text-gray-500"
                    >
                        Or continue with
                    </span>
                </div>
            </div>

            <div
            className="
            mt-6 flex gap-2
            ">
                <AuthSocialButtton
                icon={BsGithub}
                onClick={()=> socialAction('github')}
                />
                <AuthSocialButtton
                icon={BsGoogle}
                onClick={()=> socialAction('google')}
                />
            </div>
        </div>
        <div className="flex 
        gap-2 
        justify-center 
        text-sm 
        mt-6 
        px-2 
        text-gray-500"
        ><div>

            {variant === 'LOGIN' ? 'New to Messenger?':'Already have an account?'}
        </div>
        <div
        onClick={toogleVarient}
        className="underline cursor-pointer"
        >
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
        </div>
            </div>
      </div>
    </div>
  );
};

export default AuthForm;
