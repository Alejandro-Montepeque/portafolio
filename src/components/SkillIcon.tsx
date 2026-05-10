import {
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiPython,
  SiPhp,
  SiLaravel,
  SiDotnet,
  SiReact,
  SiVuedotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiDocker,
  SiGooglecloud,
  SiVercel,
  SiGithub,
  SiGit,
  SiOpenai,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiPinia,
  SiJsonwebtokens,
  SiFigma,
  SiFirebase,
  SiScrumalliance,
  SiGooglegemini,
  SiZod,
} from 'react-icons/si'
import { FaJava, FaCode, FaRobot } from 'react-icons/fa'
import { TbBrandCSharp, TbTestPipe, TbBrandGoogle } from 'react-icons/tb'
import type { IconType } from 'react-icons'

const iconMap: Record<string, IconType> = {
  vue: SiVuedotjs,
  react: SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  pinia: SiPinia,
  tailwind: SiTailwindcss,
  html: SiHtml5,
  css: SiCss,
  axios: FaCode,
  zod: SiZod,
  sweetalert: FaCode,

  nodejs: SiNodedotjs,
  nestjs: SiNestjs,
  express: SiExpress,
  jwt: SiJsonwebtokens,
  python: SiPython,
  php: SiPhp,
  laravel: SiLaravel,
  csharp: TbBrandCSharp,
  dotnet: SiDotnet,
  java: FaJava,

  postgres: SiPostgresql,
  mysql: SiMysql,
  mongodb: SiMongodb,
  firebase: SiFirebase,

  agents: FaRobot,
  gemini: SiGooglegemini,
  adk: TbBrandGoogle,
  openai: SiOpenai,
  langchain: FaRobot,

  docker: SiDocker,
  gcp: SiGooglecloud,
  vercel: SiVercel,
  githubpages: SiGithub,

  git: SiGit,
  github: SiGithub,
  figma: SiFigma,
  playwright: TbTestPipe,
  scrum: SiScrumalliance,
}

type Props = {
  skillKey: string
  name: string
  color: string
  className?: string
}

export default function SkillIcon({ skillKey, name, color, className = 'w-5 h-5' }: Props) {
  const Icon = iconMap[skillKey]
  if (Icon) {
    return <Icon className={className} style={{ color }} />
  }
  return (
    <span
      className={`${className} inline-flex items-center justify-center rounded-md text-[10px] font-bold`}
      style={{ background: color, color: '#0a0a0f' }}
    >
      {name?.slice(0, 2).toUpperCase()}
    </span>
  )
}
