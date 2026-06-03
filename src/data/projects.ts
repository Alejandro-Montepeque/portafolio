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
    title: 'kanban-live',
    desc: 'Kanban colaborativo con sincronización en tiempo real. Múltiples usuarios editan el mismo board y ven los cambios instantáneamente vía WebSockets — drag & drop accesible, presence indicators con avatars, invitaciones por link. Backend en NestJS + Prisma + Socket.IO con JWT y refresh token rotation, frontend en React + TypeScript con dnd-kit. Desplegado en Cloud Run + Vercel + Neon.',
    tech: ['NestJS', 'React', 'TypeScript', 'Socket.IO', 'PostgreSQL', 'Cloud Run'],
    github: 'https://github.com/Alejandro-Montepeque/kanban-live',
    demo: 'https://kanban-live-ten.vercel.app',
    live: true,
    image: '/projects/kanban.png',
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
    title: 'Gestor Financiero',
    desc: 'Aplicación web de gestión de finanzas personales con autenticación de usuarios, registro de transacciones por categorías y visualización de reportes. Construida con ASP.NET Core, Entity Framework Core y SQL Server. Desarrollada como proyecto académico de equipo, con implementación técnica completa a mi cargo.',
    tech: ['C#', 'ASP.NET Core', 'Entity Framework', 'SQL Server', 'Razor Pages'],
    github: 'https://github.com/DanielGerardoHC/gestorFinanciero',
    demo: 'http://gestor-financiero.runasp.net',
    live: true,
    image: '/projects/gestorFinanciero.png',
  },
  {
    id: 5,
    title: 'Microservices in C#/.NET',
    desc: 'Conjunto de microservicios en .NET con comunicación asíncrona, contenedores Docker y despliegue automatizado.',
    tech: ['C#', '.NET', 'Docker', 'RabbitMQ'],
    github: '',
    demo: '',
  },
]
