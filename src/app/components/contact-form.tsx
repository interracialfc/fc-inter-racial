"use client";

import { useActionState, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { submitContactForm } from "../contact/actions";
import ReCAPTCHA from "react-google-recaptcha";

const initialState = {
  success: false,
  message: "",
};

const labelClass =
  "block text-sm font-medium text-gray-700 dark:text-slate-300";

const fieldClass =
  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm dark:border-white/10 dark:bg-black/50 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-white dark:focus:ring-white";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const defaultSubject = searchParams.get("subject") || "General";
  const defaultProduct = searchParams.get("product") || "";
  const [subject, setSubject] = useState(defaultSubject);
  const [product, setProduct] = useState(defaultProduct);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className={fieldClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className={labelClass}>
          Subject
        </label>
        <select
          name="subject"
          id="subject"
          required
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className={fieldClass}
        >
          <option value="General">General</option>
          <option value="Order">Order</option>
          <option value="I want to join">I want to join</option>
          <option value="Questions">Questions</option>
          <option value="Sponsorship">Sponsorship</option>
          <option value="Other">Other</option>
        </select>
      </div>
      {subject === "Order" && (
        <div>
          <label htmlFor="product" className={labelClass}>
            Product
          </label>
          <input
            type="text"
            name="product"
            id="product"
            required
            value={product}
            onChange={(event) => setProduct(event.target.value)}
            className={fieldClass}
          />
        </div>
      )}
      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          name="message"
          id="message"
          rows={4}
          required
          className={fieldClass}
        />
      </div>

      <div className="flex justify-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={
            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "your_site_key"
          }
          onChange={setCaptchaToken}
        />
      </div>
      <input
        type="hidden"
        name="g-recaptcha-response"
        value={captchaToken || ""}
      />

      <div>
        <button
          type="submit"
          disabled={isPending || !captchaToken}
          className="dark:bg-irOrange dark:hover:bg-irOrange/80 dark:focus:ring-irOrange flex w-full justify-center rounded-md bg-black px-4 py-3 text-sm font-bold tracking-wider text-white uppercase shadow-sm transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none disabled:opacity-50 dark:focus:ring-offset-[#140e2a]"
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </div>

      {state.message && (
        <div
          className={`rounded-md p-4 ${state.success ? "bg-green-50 dark:bg-green-950/45" : "bg-red-50 dark:bg-red-950/45"}`}
        >
          <div className="flex">
            <div className="ml-3">
              <h3
                className={`text-sm font-medium ${state.success ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"}`}
              >
                {state.message}
              </h3>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
