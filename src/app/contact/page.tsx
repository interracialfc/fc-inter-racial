import ContactForm from "../components/contact-form";
import Breadcrumbs from "../components/breadcrumbs";
import Header from "../components/header";
import Footer from "../components/footer";
import { siteTitle } from "@/lib/seo";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `Contact - ${siteTitle}`,
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <section className="scroll-mt-36 px-4 py-20 font-sans md:scroll-mt-20 md:py-36">
        <div className="mx-auto max-w-xl">
          <Breadcrumbs currentPage="Contact Us" />
          <h2 className="mb-8 text-center text-4xl font-black tracking-tight md:text-6xl">
            Contact Us
          </h2>
          <p className="mb-12 text-center text-lg text-gray-600">
            Have questions or want to join the team? Send us a message!
          </p>

          <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-md dark:border-white/10 dark:bg-black/50">
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
