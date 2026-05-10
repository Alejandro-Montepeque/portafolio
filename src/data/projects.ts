export type Project = {
  id: number
  title: string
  desc: string
  tech: string[]
  github: string
  demo: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'AI Agent Platform',
    desc: 'Plataforma de agentes de IA con Python, integración con LLMs y workflows automatizados.',
    tech: ['Python', 'LangChain', 'OpenAI', 'FastAPI', 'Docker'],
    github: '',
    demo: '',
  },
  {
    id: 2,
    title: 'Fullstack SaaS App',
    desc: 'Aplicación SaaS con backend en NestJS y frontend en React + TypeScript, desplegada en GCP.',
    tech: ['NestJS', 'React', 'TypeScript', 'PostgreSQL', 'GCP'],
    github: '',
    demo: '',
  },
  {
    id: 3,
    title: 'Laravel API + Vue Dashboard',
    desc: 'API REST en Laravel y dashboard administrativo en Vue 3 con TailwindCSS y autenticación JWT.',
    tech: ['Laravel', 'Vue 3', 'Tailwind', 'MySQL', 'Axios'],
    github: '',
    demo: '',
  },
  {
    id: 4,
    title: 'Microservices in C#/.NET',
    desc: 'Conjunto de microservicios en .NET con comunicación asíncrona, contenedores Docker y despliegue automatizado.',
    tech: ['C#', '.NET', 'Docker', 'RabbitMQ'],
    github: '',
    demo: '',
  },
]
