import { projects } from "@/lib/content";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="02"
          label="Selected work"
          title="Three systems,"
          accent="three architectural questions."
          intro="Each project is built to explore a different shape of backend system — an AI pipeline over real data, an event-driven cloud workflow, and an API taken all the way to a monitored deployment."
        />
        <div className="space-y-8 md:space-y-10">
          {projects.map((p, i) => (
            <Reveal key={p.slug}>
              <ProjectCard project={p} figure={i + 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
