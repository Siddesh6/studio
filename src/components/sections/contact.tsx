import Link from "next/link";
import { personalData } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  return (
    <section id="contact" className="w-full">
      <div className="container px-4 md:px-6">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Get in Touch</h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Feel free to reach out!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <a href={`mailto:${personalData.contact.email}`}>
                Email Me
              </a>
            </Button>
            <div className="flex items-center gap-4">
              {personalData.socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="h-8 w-8" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
