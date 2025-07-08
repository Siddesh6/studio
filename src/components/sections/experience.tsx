import { experienceData } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="w-full">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Work Experience</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My professional journey and the roles I've undertaken.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border" aria-hidden="true" />
          <div className="space-y-8">
            {experienceData.map((exp, index) => (
              <div key={index} className="flex items-center w-full">
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <Card className={`text-left shadow-md transition-shadow hover:shadow-lg ${index % 2 === 0 ? '' : 'lg:translate-x-[calc(100%_+_4rem)]'} ${index % 2 !== 0 ? '' : 'lg:-translate-x-[calc(0%_-_0rem)]'}`}>
                    <CardHeader>
                      <CardTitle className="font-headline text-xl">{exp.title}</CardTitle>
                      <CardDescription>{exp.company} &bull; {exp.dates}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 list-disc pl-5 text-sm text-muted-foreground">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 bg-background p-1 rounded-full border">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
