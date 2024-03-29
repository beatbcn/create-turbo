"use client";

import { useState } from "react";
import { z } from "zod";

import { signIn, webauthnSignIn } from "@acme/auth/react";
import { Button } from "@acme/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
  zodResolver,
} from "@acme/ui/form";
import { RefreshCcwIcon } from "@acme/ui/icons";
import { Input } from "@acme/ui/input";

const formSchema = z.object({
  email: z.string().email(),
});

export function LoginForm() {
  const [loading, isLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit({ email }: z.infer<typeof formSchema>) {
    isLoading(true);
    await webauthnSignIn("webauthn", { email, callbackUrl: "/" });
    isLoading(false);
  }

  return (
    <div className="grid gap-4">
      <Button
        variant="outline"
        className="w-full"
        disabled
        onClick={() => signIn("apple")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-4 w-4"
          viewBox="0 0 814 1000"
        >
          <path
            fill="#fff"
            d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"
          />
        </svg>
        Inicia Sessió amb Apple
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => signIn("google")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="mr-2 h-4 w-4"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
        Inicia Sessió amb Google
      </Button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((v) => onSubmit(v))}
          className="space-y-8 pt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="username webauthn" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <RefreshCcwIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg
                className="mr-2 h-4 w-4"
                viewBox="0 0 500 500"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
                  fill="currentColor"
                  stroke="none"
                >
                  <path
                    d="M1990 4666 c-341 -71 -626 -350 -713 -696 -30 -120 -30 -320 0 -440
                88 -351 371 -624 721 -696 57 -12 113 -15 227 -12 128 5 162 9 235 33 202 65
                352 169 470 327 75 99 121 190 157 305 25 81 27 101 27 263 0 162 -2 182 -27
                263 -95 308 -316 531 -627 632 -76 25 -102 28 -245 31 -107 2 -181 -1 -225
                -10z"
                  />
                  <path
                    d="M3810 3526 c-143 -30 -268 -100 -375 -211 -198 -203 -258 -512 -150
                -777 55 -136 179 -278 303 -348 l61 -35 1 -560 0 -560 153 -152 153 -153 259
                260 260 260 -155 155 -155 155 153 153 c83 84 152 157 152 162 0 5 -55 65
                -122 132 -67 67 -120 124 -118 126 3 2 41 23 85 48 166 92 299 264 345 445 24
                94 27 269 5 359 -59 252 -263 461 -517 531 -77 21 -259 26 -338 10z m263 -332
                c49 -34 97 -119 97 -173 0 -51 -42 -134 -83 -165 -46 -35 -129 -52 -182 -38
                -86 24 -154 112 -155 200 -1 166 188 269 323 176z"
                  />
                  <path
                    d="M1685 2484 c-462 -71 -850 -401 -996 -847 -50 -154 -59 -232 -59
                -528 l0 -269 1350 0 1350 0 0 570 0 570 -80 76 c-90 86 -161 178 -212 274
                l-34 65 -110 37 c-179 60 -264 68 -720 67 -285 -1 -425 -5 -489 -15z"
                  />
                </g>
              </svg>
            )}
            Sign In With Passkey
          </Button>
        </form>
      </Form>
    </div>
  );
}
