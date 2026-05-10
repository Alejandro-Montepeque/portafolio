export type Skill = {
  key: string
  name: string
  color: string
}

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'databases'
  | 'ai'
  | 'devops'
  | 'tools'

export const skills: Record<SkillCategory, Skill[]> = {
  frontend: [
    { key: 'vue', name: 'Vue.js', color: '#4FC08D' },
    { key: 'react', name: 'React', color: '#61DAFB' },
    { key: 'typescript', name: 'TypeScript', color: '#3178C6' },
    { key: 'javascript', name: 'JavaScript', color: '#F7DF1E' },
    { key: 'pinia', name: 'Pinia', color: '#FFD43B' },
    { key: 'tailwind', name: 'TailwindCSS', color: '#06B6D4' },
    { key: 'html', name: 'HTML5', color: '#E34F26' },
    { key: 'css', name: 'CSS3', color: '#1572B6' },
    { key: 'axios', name: 'Axios', color: '#5A29E4' },
    { key: 'zod', name: 'Zod', color: '#3068B7' },
    { key: 'sweetalert', name: 'SweetAlert2', color: '#F27474' },
  ],
  backend: [
    { key: 'nodejs', name: 'Node.js', color: '#5FA04E' },
    { key: 'nestjs', name: 'NestJS', color: '#E0234E' },
    { key: 'express', name: 'Express', color: '#FFFFFF' },
    { key: 'jwt', name: 'JWT', color: '#FB015B' },
    { key: 'python', name: 'Python', color: '#3776AB' },
    { key: 'php', name: 'PHP', color: '#777BB4' },
    { key: 'laravel', name: 'Laravel', color: '#FF2D20' },
    { key: 'csharp', name: 'C#', color: '#9B4F96' },
    { key: 'dotnet', name: '.NET', color: '#512BD4' },
    { key: 'java', name: 'Java', color: '#E76F00' },
  ],
  databases: [
    { key: 'postgres', name: 'PostgreSQL', color: '#4169E1' },
    { key: 'mysql', name: 'MySQL', color: '#4479A1' },
    { key: 'mongodb', name: 'MongoDB', color: '#47A248' },
    { key: 'firebase', name: 'Firebase', color: '#FFCA28' },
  ],
  ai: [
    { key: 'agents', name: 'AI Agents', color: '#a855f7' },
    { key: 'gemini', name: 'Gemini', color: '#4285F4' },
    { key: 'adk', name: 'Google ADK', color: '#34A853' },
    { key: 'openai', name: 'OpenAI', color: '#10A37F' },
    { key: 'langchain', name: 'LangChain', color: '#1C3C3C' },
  ],
  devops: [
    { key: 'docker', name: 'Docker', color: '#2496ED' },
    { key: 'gcp', name: 'Google Cloud', color: '#4285F4' },
    { key: 'vercel', name: 'Vercel', color: '#FFFFFF' },
    { key: 'githubpages', name: 'GitHub Pages', color: '#FFFFFF' },
  ],
  tools: [
    { key: 'git', name: 'Git', color: '#F05032' },
    { key: 'github', name: 'GitHub', color: '#FFFFFF' },
    { key: 'figma', name: 'Figma', color: '#F24E1E' },
    { key: 'playwright', name: 'Playwright', color: '#2EAD33' },
    { key: 'scrum', name: 'Scrum', color: '#22d3ee' },
  ],
}
