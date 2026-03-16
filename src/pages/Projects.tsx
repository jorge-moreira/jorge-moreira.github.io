import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDataSource } from "@/repositories/DataSourceFactory";
import type { Project } from "@/models/Project";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const dataSource = getDataSource();
        const data = await dataSource.getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      {/* Header */}
      <div className="mb-12 space-y-4">
        <p className="text-3xl font-normal text-muted-foreground tracking-tight">
          A selection of projects I've built or contributed to
        </p>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects to display yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const card = (
              <Card
                className={`flex flex-col h-full transition-all duration-200 group-hover:shadow-lg group-hover:-translate-y-1 ${!project.link ? "hover:shadow-lg hover:-translate-y-1" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    {project.link && (
                      <ExternalLink className="h-4 w-4 shrink-0 mt-1 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  {project.company && (
                    <p className="text-base font-light dark:text-blue-200">{project.company}</p>
                  )}
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.purpose}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.map((tech, index) => (
                      <Badge key={index} className="text-xs font-normal border-0 !bg-slate-200 !text-slate-700 dark:!bg-slate-600 dark:!text-slate-100">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );

            return project.link ? (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group h-full"
                aria-label={`View ${project.title}`}
              >
                {card}
              </a>
            ) : (
              <div key={project.id} className="h-full">{card}</div>
            );
          })}
        </div>
      )}
    </div>
  );
}
