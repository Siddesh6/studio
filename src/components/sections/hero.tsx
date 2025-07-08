import Link from "next/link";
import { Button } from "@/components/ui/button";
import { personalData } from "@/lib/data";

export default function HeroSection() {
  return (
    <section id="hero" className="w-full bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                {personalData.name}
              </h1>
              <h2 className="text-xl md:text-2xl text-primary font-semibold">{personalData.title}</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {personalData.professionalSummary}
              </p>
              <p className="max-w-[600px] text-muted-foreground md:text-lg italic">
                {personalData.personalTouch}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row items-start">
              <Button asChild size="lg">
                <Link href="#contact">Get in Touch</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#projects">View My Work</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-4">
              {personalData.socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
          <img
            src="https://placehold.co/600x600.png"
            data-ai-hint="developer portrait"
            alt="Hero"
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
          />
        </div>
      </div>
    </section>
  );
}
