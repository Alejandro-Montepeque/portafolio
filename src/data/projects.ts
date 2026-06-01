export type Project = {
  id: number
  title: string
  desc: string
  tech: string[]
  github: string
  demo: string
  live?: boolean
  image?: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'JobMatcher AI',
    desc: 'Agente de IA que analiza un CV en PDF contra una oferta laboral y devuelve un score de coincidencia, brechas específicas y sugerencias accionables para mejorar el CV. Monorepo con backend en FastAPI + Google ADK + Gemini y frontend en Vue 3, base de datos en Neon, desplegado en Cloud Run y Vercel.',
    tech: ['Python', 'FastAPI', 'Gemini', 'Vue 3', 'PostgreSQL', 'Cloud Run'],
    github: 'https://github.com/Alejandro-Montepeque/job-matcher-agent',
    demo: 'https://job-matcher-agent.vercel.app',
    live: true,
    image: '/projects/jobmatcher.png',
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
