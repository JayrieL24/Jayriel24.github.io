import { useState } from 'react'
import heroImage from '/Assests/img/Jayci_Profile.jpeg'
import { FaCss3Alt, FaFacebook, FaFilm, FaGithub, FaGlobe, FaHome, FaHtml5, FaJava, FaPython, FaReact, FaVideo, FaVuejs, FaUser, FaBriefcase, FaCertificate, FaProjectDiagram, FaGraduationCap, FaBars } from 'react-icons/fa'
import { FaAws } from 'react-icons/fa6'
import { SiCanva, SiDjango, SiFastapi, SiJavascript, SiMysql } from 'react-icons/si'

const certificateFiles = import.meta.glob('../Assests/{certificates,Certificates}/*.{pdf,png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const externalVideos = [
  {
    title: 'LionFish_Trivia',
    href: 'https://drive.google.com/file/d/1LT3efurxX4g1ZZanXhd4k3VegYREou4u/view?usp=sharing',
    poster: 'https://drive.google.com/thumbnail?id=1LT3efurxX4g1ZZanXhd4k3VegYREou4u&sz=w1200',
    category: 'Trivia Edits',
    external: true,
  },
  {
    title: 'Ruka Sarashina Edit',
    href: 'https://drive.google.com/file/d/1p5GtfX_zQvrOplUjeEdxlQnHBmM5Ht5k/view?usp=sharing',
    poster: 'https://drive.google.com/thumbnail?id=1p5GtfX_zQvrOplUjeEdxlQnHBmM5Ht5k&sz=w1200',
    category: 'Anime Edits',
    external: true,
  },
  {
    title: 'Marin Kitagawa Edit',
    href: 'https://drive.google.com/file/d/10vuEMYyQwSGDi5Ie3pSM2JcJzKi9MgZx/view',
    poster: 'https://drive.google.com/thumbnail?id=10vuEMYyQwSGDi5Ie3pSM2JcJzKi9MgZx&sz=w1200',
    category: 'Anime Edits',
    external: true,
  },
  {
    title: 'Chika Fujiwara (Sunflower)',
    href: 'https://drive.google.com/file/d/1wm7e1GOMKeynhLBCMpwLzk5ZuX37Be6S/view',
    poster: 'https://drive.google.com/thumbnail?id=1wm7e1GOMKeynhLBCMpwLzk5ZuX37Be6S&sz=w1200',
    category: 'Anime Edits',
    external: true,
  },
  {
    title: 'Clip_Edit',
    href: 'https://drive.google.com/file/d/1vo8gI2lhMYlqq8UGXSpQDzSOXl3KfDD7/view',
    poster: 'https://drive.google.com/thumbnail?id=1vo8gI2lhMYlqq8UGXSpQDzSOXl3KfDD7&sz=w1200',
    category: 'Clip Edits',
    external: true,
  },
]

const videoCategories = ['Trivia Edits', 'Anime Edits', 'Business Edits', 'Clip Edits']

function formatFileLabel(path) {
  const filename = path.split('/').pop() || ''
  const withoutExt = filename.replace(/\.[^/.]+$/, '')
  return withoutExt
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function getFileKey(path) {
  const filename = path.split('/').pop() || ''
  return filename.replace(/\.[^/.]+$/, '').toLowerCase()
}

function getVideoCategory(title) {
  const normalizedTitle = title.toLowerCase()

  if (normalizedTitle.includes('trivia')) return 'Trivia Edits'
  if (normalizedTitle.includes('anime')) return 'Anime Edits'
  if (normalizedTitle.includes('business')) return 'Business Edits'
  if (normalizedTitle.includes('tiktok') || normalizedTitle.includes('tik tok')) return 'Clip Edits'

  return 'Trivia Edits'
}

function extractDriveFileId(url) {
  if (!url) return null

  const fromPath = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (fromPath?.[1]) return fromPath[1]

  const fromQuery = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  return fromQuery?.[1] || null
}

const certificateMetaByFile = {
  'aws-cloud-solutions-architect': {
    title: 'AWS Cloud Solutions Architect',
    issuer: 'Amazon Web Services',
    year: 'Highlighted',
    featured: true,
  },
}

const projects = [
  {
    title: 'Wine Festival',
    description: 'A themed event page with visual hierarchy and promotional layout.',
    href: '/Activities/winefestival/winefestival.html',
  },
  {
    title: 'Davies Burger',
    description: 'A restaurant-style website focused on menu presentation and branding.',
    href: '/Activities/daviesburger/daviesburger.html',
  },
  {
    title: 'Fashion',
    description: 'A fashion-focused page experiment using strong imagery and typography.',
    href: '/Activities/fashion/fashion.html',
  },
  {
    title: 'Wireframe (Hi-Fidelity)',
    description: 'High-fidelity wireframe implementation for a cleaner UI workflow.',
    href: '/Activities/WireFrame/WireFrame.html',
  },
  {
    title: 'Wireframe (Low-Fidelity)',
    description: 'Low-fidelity concept in Figma to map structure before final UI polish.',
    href: 'https://www.figma.com/file/bq0O2RdH8ue15mZvAOl8re/Wireframe?type=design&node-id=15%3A97&mode=design&t=742PjUqAjLLAy1cD-1',
    external: true,
  },
]

const certificates = Object.entries(certificateFiles)
  .map(([path, href]) => {
    const fileKey = getFileKey(path)
    const meta = certificateMetaByFile[fileKey]

    return {
      title: meta?.title || formatFileLabel(path),
      issuer: meta?.issuer || 'Uploaded Certificate',
      year: meta?.year || 'Latest',
      href,
      featured: Boolean(meta?.featured) || formatFileLabel(path).toLowerCase().includes('aws cloud solutions architect'),
    }
  })
  .sort((a, b) => Number(b.featured) - Number(a.featured))

const featuredCertificates = certificates.filter((certificate) => certificate.featured)
const regularCertificates = certificates.filter((certificate) => !certificate.featured)

const videos = externalVideos.map((video) => {
  const fileId = extractDriveFileId(video.poster) || extractDriveFileId(video.href)
  const posterCandidates = [
    video.poster,
    fileId ? `https://lh3.googleusercontent.com/d/${fileId}=w1280-h720-p-k-no-nu` : null,
    fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600` : null,
  ].filter((poster, index, all) => poster && all.indexOf(poster) === index)

  return {
    ...video,
    category: video.category || getVideoCategory(video.title),
    posterCandidates,
  }
})

const videosByCategory = videoCategories.map((category) => ({
  category,
  items: videos.filter((video) => video.category === category),
}))

const expertiseSegments = [
  {
    title: 'Programming',
    items: [
      { name: 'Django', Icon: SiDjango, color: 'text-emerald-200', section: 'Backend' },
      { name: 'Python', Icon: FaPython, color: 'text-yellow-200', section: 'Backend' },
      { name: 'Java', Icon: FaJava, color: 'text-orange-200', section: 'Backend' },
      { name: 'FastAPI', Icon: SiFastapi, color: 'text-teal-200', section: 'Backend' },
      { name: 'AWS Cloud Solutions', Icon: FaAws, color: 'text-amber-200', section: 'Backend' },
      { name: 'React.js', Icon: FaReact, color: 'text-sky-200', section: 'Frontend' },
      { name: 'React', Icon: FaReact, color: 'text-cyan-200', section: 'Frontend' },
      { name: 'Vue', Icon: FaVuejs, color: 'text-emerald-200', section: 'Frontend' },
      { name: 'HTML', Icon: FaHtml5, color: 'text-orange-300', section: 'Frontend' },
      { name: 'CSS', Icon: FaCss3Alt, color: 'text-blue-300', section: 'Frontend' },
      { name: 'JavaScript', Icon: SiJavascript, color: 'text-amber-200', section: 'Frontend' },
      { name: 'MySQL', Icon: SiMysql, color: 'text-blue-200', section: 'Database' },
    ],
  },
  {
    title: 'Visual',
    items: [{ name: 'Canva', Icon: SiCanva, color: 'text-cyan-200', category: 'Tool' }],
  },
  {
    title: 'Video Editing',
    items: [
      { name: 'CapCut', Icon: FaVideo, color: 'text-slate-200', category: 'Tool' },
      { name: 'DaVinci Resolve', Icon: FaFilm, color: 'text-violet-200', category: 'Tool' },
    ],
  },
]

function App() {
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [selectedPdf, setSelectedPdf] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [projectMenuOpen, setProjectMenuOpen] = useState(false)
  const [posterAttempts, setPosterAttempts] = useState({})
  
  const projectsList = [
    { id: 'spmc-referral', name: 'SPMC Referral System' },
    { id: 'gearguards', name: 'GearGuards' },
  ]
  
  const scrollToProject = (projectId) => {
    const element = document.getElementById(projectId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setProjectMenuOpen(false)
    }
  }
  const navLinks = [
    { href: '#top', label: 'Dashboard', icon: FaHome },
    { href: '#expertise', label: 'Skills and Tools', icon: FaReact },
    { href: '#education', label: 'Academic Qualifications', icon: FaGraduationCap },
    { href: '#experience', label: 'Experience', icon: FaBriefcase },
    { href: '#projects-panel', label: 'Projects', icon: FaProjectDiagram },
    { href: '#certificates-panel', label: 'Certificates', icon: FaCertificate },
    { href: '#videos-panel', label: 'Video Edits', icon: FaVideo },
    { href: '#about', label: 'About Me', icon: FaUser },
  ]

  return (
    <div id="top" className="min-h-screen bg-app text-slate-100">
      {/* Sidebar Navigation */}
      <aside className="group fixed left-0 top-0 z-40 hidden h-screen w-20 border-r border-white/10 bg-slate-950/90 backdrop-blur transition-all duration-300 hover:w-64 lg:block">
        <div className="flex h-full flex-col p-6">
          {/* Logo/Profile Section */}
          <div className="mb-8">
            {/* Collapsed State - Code Icon */}
            <div className="flex items-center justify-center group-hover:hidden">
              <span className="text-2xl font-bold text-cyan-300">&lt;/&gt;</span>
            </div>
            
            {/* Expanded State - Profile */}
            <div className="hidden group-hover:block">
              <div className="flex items-center gap-3">
                <img
                  src="/Assests/img/Icon_NavBar.jpg"
                  alt="Profile"
                  className="h-16 w-16 rounded-full border-2 border-cyan-300/40 object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-white">Jayci Gabriel Acuña</p>
                  <p className="text-xs text-cyan-200">Web Developer</p>
                </div>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.href}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-cyan-300"
                  href={link.href}
                  title={link.label}
                >
                  <Icon className="min-w-[1.25rem] text-lg" />
                  <span className="overflow-hidden whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">{link.label}</span>
                </a>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur lg:hidden">
        <nav className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <a className="text-base font-bold tracking-wide text-slate-100 sm:text-lg" href="#home">
              Portfolio
            </a>
            <button
              type="button"
              className="rounded-lg border border-slate-600 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              Menu
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={`mobile-${link.href}`}
                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-center text-sm font-medium text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="text-base" />
                    <span className="text-xs">{link.label}</span>
                  </a>
                )
              })}
            </div>
          )}
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-20 pt-10 sm:gap-24 sm:px-6 sm:pt-14 lg:ml-auto lg:mr-auto lg:pl-32">
        <section className="mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1.1fr_0.9fr]" id="home">
          <div className="space-y-6 animate-enter-up">
            <div className="flex flex-wrap gap-2">
              <p className="w-fit rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 sm:tracking-[0.25em]">
                Programmer
              </p>
              <p className="w-fit rounded-full border border-yellow-300/40 bg-yellow-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200 sm:tracking-[0.25em]">
                Computer Enthusiast
              </p>
              <p className="w-fit rounded-full border border-red-300/40 bg-red-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-200 sm:tracking-[0.25em]">
                Video Editor
              </p>
              <p className="w-fit rounded-full border border-orange-300/40 bg-orange-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-200 sm:tracking-[0.25em]">
                Gamer
              </p>
            </div>
            <div>
              <h1 className="font-display text-3xl leading-tight text-white sm:text-5xl">
                Jayci Gabriel Fernandez Acuña
              </h1>
              <p className="mt-3 text-lg font-medium text-cyan-200 sm:text-xl">
                Full Stack Web Developer & Technical Analyst
              </p>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-slate-300"> 
              I am Jayci Gabriel Fernandez Acuña from Davao City, Philippines. Currently a Senior Computer Science student focused on growing as a developer by building practical projects and continuously strengthening my skills in technical analysis and problem-solving. 
              I enjoy applying my analytical skills to understand problems, evaluate solutions, and develop user-focused applications through hands-on practice and continuous learning.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                href="#projects-panel"
              >
                View Projects
              </a>
              <a
                className="rounded-xl border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
                href="#about"
              >
                About Me
              </a>
            </div>
          </div>
          <div className="animate-enter-up-delay relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan-400/30 to-emerald-300/20 blur-2xl" />
            <img
              className="aspect-square w-full rounded-[2rem] border border-white/20 object-cover shadow-2xl shadow-cyan-900/40"
              src={heroImage}
              alt="Decorative koi fish"
            />
          </div>
        </section>

        <section className="space-y-8" id="expertise">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Core Stack</p>
            <h2 className="font-display text-3xl text-white">Skills and Tools</h2>
          </div>
          <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
            {expertiseSegments.map((segment) => (
              <article key={segment.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <h3 className="font-display text-xl text-white">{segment.title}</h3>
                <div className="mt-4 space-y-3">
                  {segment.title === 'Programming' ? (
                    <div className="grid gap-5 lg:grid-cols-2">
                      {['Frontend', 'Backend', 'Database'].map((group) => (
                        <div key={group}>
                          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">{group}</p>
                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                            {segment.items
                              .filter((item) => item.section === group)
                              .map(({ name, Icon, color }) => (
                                <div
                                  key={name}
                                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/50 p-3"
                                >
                                  <Icon className={`text-2xl ${color}`} />
                                  <p className="font-semibold text-white">{name}</p>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    segment.items.map(({ name, Icon, color, category }) => (
                      <div
                        key={name}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/50 p-3"
                      >
                        <Icon className={`text-2xl ${color}`} />
                        <div>
                          <p className="text-xs uppercase tracking-wide text-slate-400">{category || 'Tool'}</p>
                          <p className="font-semibold text-white">{name}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8" id="education">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Academic Background</p>
            <h2 className="font-display text-3xl text-white">Academic Qualifications</h2>
          </div>
          <div className="space-y-6">
            {/* Tertiary Education */}
            <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Tertiary Education</h3>
              <div className="rounded-xl border border-white/10 bg-slate-950/50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                  <img
                    src="/Assests/img/UIC_logo.png"
                    alt="University of the Immaculate Conception Logo"
                    className="h-20 w-20 rounded-lg border border-white/20 object-contain bg-white p-2"
                  />
                  <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <h4 className="font-display text-lg text-white">Bachelor of Science in Computer Science</h4>
                      <p className="mt-1 text-sm font-medium text-cyan-200">University of the Immaculate Conception</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <a
                          href="https://www.facebook.com/uicph"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
                        >
                          <FaFacebook className="text-sm" />
                          Facebook
                        </a>
                        <a
                          href="https://www.uic.edu.ph/"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
                        >
                          <FaGlobe className="text-sm" />
                          Website
                        </a>
                      </div>
                    </div>
                    <div className="text-sm text-slate-400">
                      <p className="font-semibold">2022 - 2026</p>
                      <p className="mt-1">Expected April 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Secondary Education */}
            <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Secondary Education</h3>
              <div className="space-y-4">
                {/* Senior Year - University of Mindanao */}
                <div className="rounded-xl border border-white/10 bg-slate-950/50 p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                    <img
                      src="/Assests/img/UM_logo.jpg"
                      alt="University of Mindanao Logo"
                      className="h-20 w-20 rounded-lg border border-white/20 object-contain bg-white p-2"
                    />
                    <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <h4 className="font-display text-lg text-white">Senior Year - STEM</h4>
                        <p className="mt-1 text-sm text-slate-300">Science, Technology, and Mathematics</p>
                        <p className="mt-1 text-sm font-medium text-cyan-200">University of Mindanao</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <a
                            href="https://www.facebook.com/unimindofficial"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
                          >
                            <FaFacebook className="text-sm" />
                            Facebook
                          </a>
                          <a
                            href="https://umindanao.edu.ph/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
                          >
                            <FaGlobe className="text-sm" />
                            Website
                          </a>
                        </div>
                      </div>
                      <div className="text-sm text-slate-400">
                        <p className="font-semibold">2020 - 2022</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Junior Year - University of the Immaculate Conception */}
                <div className="rounded-xl border border-white/10 bg-slate-950/50 p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                    <img
                      src="/Assests/img/UIC_logo.png"
                      alt="University of the Immaculate Conception Logo"
                      className="h-20 w-20 rounded-lg border border-white/20 object-contain bg-white p-2"
                    />
                    <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <h4 className="font-display text-lg text-white">Junior Year</h4>
                        <p className="mt-1 text-sm font-medium text-cyan-200">University of the Immaculate Conception</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <a
                            href="https://www.facebook.com/uicph"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
                          >
                            <FaFacebook className="text-sm" />
                            Facebook
                          </a>
                          <a
                            href="https://www.uic.edu.ph/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
                          >
                            <FaGlobe className="text-sm" />
                            Website
                          </a>
                        </div>
                      </div>
                      <div className="text-sm text-slate-400">
                        <p className="font-semibold">2016 - 2020</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Primary Education */}
            <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Primary Education</h3>
              <div className="rounded-xl border border-white/10 bg-slate-950/50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                  <img
                    src="/Assests/img/DPLC_logo.jpg"
                    alt="Doña Pilar Learning Center Logo"
                    className="h-20 w-20 rounded-lg border border-white/20 object-contain bg-white p-2"
                  />
                  <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <h4 className="font-display text-lg text-white">Elementary</h4>
                      <p className="mt-1 text-sm font-medium text-cyan-200">Doña Pilar Learning Center Foundation Inc.</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <a
                          href="https://www.facebook.com/dplcfi"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
                        >
                          <FaFacebook className="text-sm" />
                          Facebook
                        </a>
                        <a
                          href="https://ph140379-dona-pilar-learning-center.contact.page/"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
                        >
                          <FaGlobe className="text-sm" />
                          Website
                        </a>
                      </div>
                    </div>
                    <div className="text-sm text-slate-400">
                      <p className="font-semibold">2010 - 2016</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="space-y-8" id="experience">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Professional Journey</p>
            <h2 className="font-display text-3xl text-white">Experience</h2>
          </div>
          <div className="relative space-y-8 pl-8 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-2rem)] before:w-0.5 before:bg-gradient-to-b before:from-cyan-400 before:via-cyan-500 before:to-transparent">
            {/* Internship */}
            <article className="relative">
              <div className="absolute -left-[25px] top-2 h-3 w-3 rounded-full border-2 border-cyan-400 bg-slate-950 ring-4 ring-cyan-400/20" />
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
                <h3 className="font-display text-xl text-white">OJT Intern - Software Developer</h3>
                <p className="mt-1 text-sm font-medium text-cyan-200">
                  SPMC Hospital, Davao City · January 2026 - Current
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-300">
                  Project: Referral System for Emergency Dispatch Communication Center (EDCC)
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  <li className="flex gap-2">
                    <span className="text-cyan-300">▸</span>
                    <span>Developing a Hospital Referral System for all hospitals across Mindanao region</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-300">▸</span>
                    <span>System currently undergoing pilot testing phase (March 2026)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-300">▸</span>
                    <span>Scheduled for 100% deployment and full implementation by April 2026</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Thesis Project */}
            <article className="relative">
              <div className="absolute -left-[25px] top-2 h-3 w-3 rounded-full border-2 border-cyan-400 bg-slate-950 ring-4 ring-cyan-400/20" />
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
                <div className="grid gap-6 md:grid-cols-[320px_1fr]">
                  {/* Thumbnail */}
                  <button
                    type="button"
                    onClick={() => setSelectedPdf({ title: 'HEROCS Thesis Paper', href: '/Assests/documents/HEROCS.pdf' })}
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/50 transition hover:border-cyan-300/60"
                  >
                    <img
                      src="/Assests/img/HEROCS_Thumbnail.jpg"
                      alt="HEROCS Thesis Thumbnail"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 opacity-0 transition group-hover:opacity-100">
                      <div className="text-center">
                        <svg className="mx-auto h-16 w-16 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-cyan-200">View Paper</p>
                      </div>
                    </div>
                  </button>

                  {/* Content */}
                  <div>
                    <h3 className="font-display text-xl text-white">HEROCS - Group Thesis Project</h3>
                    <p className="mt-1 text-sm font-medium text-cyan-200">
                      University of the Immaculate Conception · 2025 - 2026
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-full border border-emerald-300/60 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
                        Accepted
                      </span>
                      <span className="rounded-full border border-cyan-300/60 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
                        Published
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-slate-300">
                      HEROCS (Home Hazard Evaluation and Risk Object Classification System) is a mobile-based computer vision application that detects and assesses household hazards that may endanger children aged 0–3 years. Using YOLOv8 and augmented reality (AR), the system provides real-time hazard detection, risk scoring, and safety recommendations tailored to Filipino household environments.
                    </p>
                    <div className="mt-4 rounded-lg border border-cyan-300/30 bg-cyan-300/5 p-4">
                      <p className="text-sm font-semibold text-cyan-200">Publication and Oral Presentation</p>
                      <p className="mt-1 text-sm text-slate-300">
                        9th International Conference on Information and Computer Technologies (ICICT 2026)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Freelance Web Development */}
            <article className="relative">
              <div className="absolute -left-[25px] top-2 h-3 w-3 rounded-full border-2 border-cyan-400 bg-slate-950 ring-4 ring-cyan-400/20" />
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
                <h3 className="font-display text-xl text-white">Freelance Web Developer</h3>
                <p className="mt-1 text-sm font-medium text-cyan-200">
                  Independent Projects · 2024 - Current
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  <li className="flex gap-2">
                    <span className="text-cyan-300">▸</span>
                    <span>Built multiple web projects including fashion blogs, restaurant websites, and educational resources</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-300">▸</span>
                    <span>Developed responsive designs using HTML, CSS, and modern frameworks like React and Vue</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-300">▸</span>
                    <span>Created wireframes and UI/UX designs for various client projects</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Hardware Services */}
            <article className="relative">
              <div className="absolute -left-[25px] top-2 h-3 w-3 rounded-full border-2 border-cyan-400 bg-slate-950 ring-4 ring-cyan-400/20" />
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
                <h3 className="font-display text-xl text-white">Custom Computer Build & Hardware Services</h3>
                <p className="mt-1 text-sm font-medium text-cyan-200">
                  Technical Support & Consultation · 2022 - Current
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  <li className="flex gap-2">
                    <span className="text-cyan-300">▸</span>
                    <span>Designed and assembled custom PC builds tailored to client needs and budgets</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-300">▸</span>
                    <span>Performed comprehensive system diagnostics to identify and resolve hardware and software issues</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-300">▸</span>
                    <span>Provided hardware troubleshooting, component upgrades, and maintenance services</span>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section id="dashboard" className="space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Dashboard</p>
            <h2 className="font-display text-3xl text-white">Projects, Videos, and Certificates</h2>
          </div>

          <div className="flex flex-col gap-5">
            <article id="certificates-panel" className="order-3 rounded-2xl border border-white/10 bg-slate-900/70 p-6">
              <h3 className="font-display text-xl text-white">Certificates</h3>
              {certificates.length > 0 ? (
                <div className="mt-4 space-y-4 text-sm text-slate-300">
                  {featuredCertificates.map((certificate) => (
                    <article
                      key={certificate.title}
                      className="rounded-xl border border-amber-300/60 bg-amber-300/10 p-3 ring-1 ring-amber-300/40"
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedCertificate(certificate)}
                        className="w-full text-left"
                      >
                        <img
                          src={certificate.href}
                          alt={certificate.title}
                          className="h-56 w-full rounded-lg border border-white/10 object-contain bg-slate-950/50"
                        />
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <p className="font-semibold text-cyan-200 hover:text-cyan-100">{certificate.title}</p>
                          <span className="rounded-full border border-amber-300/70 bg-amber-300/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-100">
                            Featured
                          </span>
                        </div>
                      </button>
                      <p className="mt-1 text-slate-300">{certificate.issuer}</p>
                      <p className="text-xs text-slate-400">{certificate.year}</p>
                    </article>
                  ))}

                  {regularCertificates.length > 0 && (
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {regularCertificates.map((certificate) => (
                        <li key={certificate.title} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                          <button
                            type="button"
                            onClick={() => setSelectedCertificate(certificate)}
                            className="w-full text-left"
                          >
                            <img
                              src={certificate.href}
                              alt={certificate.title}
                              className="h-36 w-full rounded-lg border border-white/10 object-contain bg-slate-950/50"
                            />
                            <p className="mt-2 text-sm font-semibold leading-tight text-cyan-200 hover:text-cyan-100">
                              {certificate.title}
                            </p>
                          </button>
                          <p className="mt-1 text-xs text-slate-300">{certificate.issuer}</p>
                          <p className="text-xs text-slate-400">{certificate.year}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <p className="mt-4 rounded-xl border border-dashed border-white/15 bg-slate-950/40 p-4 text-sm text-slate-400">
                  Add files to <code>Assests/certificates</code> and they will appear here automatically.
                </p>
              )}
            </article>

            <article id="projects-panel" className="order-1 scroll-mt-28 space-y-6">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-display text-xl text-white">Projects</h3>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setProjectMenuOpen(!projectMenuOpen)}
                      className="rounded-lg border border-slate-600 p-2 text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
                      aria-label="Toggle projects menu"
                    >
                      <FaBars className="text-lg" />
                    </button>
                    
                    {projectMenuOpen && (
                      <div className="absolute right-0 top-12 z-10 w-64 rounded-lg border border-white/10 bg-slate-900 p-2 shadow-xl">
                        <p className="mb-2 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
                          Jump to Project
                        </p>
                        <div className="space-y-1">
                          {projectsList.map((project) => (
                            <button
                              key={project.id}
                              onClick={() => scrollToProject(project.id)}
                              className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-cyan-200"
                            >
                              {project.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Scrollable container */}
                <div className="max-h-[800px] space-y-6 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700 hover:scrollbar-thumb-slate-600">

                {/* SPMC Referral System */}
                <div id="spmc-referral" className="mb-6 rounded-xl border border-white/10 bg-slate-950/50 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 className="font-display text-lg text-white">SPMC Referral System</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full border border-amber-300/60 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-200">
                          Under Development
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href="https://github.com/derf567/SPMC-OJT-REFERRAL"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
                      >
                        <FaGithub className="text-sm" />
                        GitHub
                      </a>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    A comprehensive hospital referral management system for Southern Philippines Medical Center (SPMC) that streamlines patient referrals when specialized services, doctors, or equipment are unavailable locally.
                  </p>
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Key Features</p>
                    <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
                      <li className="flex gap-2">
                        <span className="text-cyan-300">▸</span>
                        <span>Drag-and-drop referral assignment (HeadsUp interface)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-300">▸</span>
                        <span>Partner hospital network management</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-300">▸</span>
                        <span>Historical records with filtering and search</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-300">▸</span>
                        <span>Monthly trends and performance analytics</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-300">▸</span>
                        <span>Responsive design with modern Tailwind CSS interface</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Tech Stack</p>
                    <div className="mt-3 space-y-3">
                      <div>
                        <p className="mb-1.5 text-xs font-medium text-slate-400">Frontend</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">React</span>
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">TypeScript</span>
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">Vite</span>
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">Tailwind CSS</span>
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">Radix UI</span>
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">React Router</span>
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">TanStack Query</span>
                        </div>
                      </div>
                      <div>
                        <p className="mb-1.5 text-xs font-medium text-slate-400">Backend</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">Django</span>
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">Django REST Framework</span>
                        </div>
                      </div>
                      <div>
                        <p className="mb-1.5 text-xs font-medium text-slate-400">Database</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">SQLite3</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* GearGuards */}
                <div id="gearguards" className="rounded-xl border border-white/10 bg-slate-950/50 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 className="font-display text-lg text-white">GearGuards</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full border border-emerald-300/60 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
                          Deployed
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href="https://github.com/JayrieL24/GearGuards"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
                      >
                        <FaGithub className="text-sm" />
                        GitHub
                      </a>
                      <a
                        href="https://gearguards.netlify.app/login"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
                      >
                        <FaGlobe className="text-sm" />
                        Website
                      </a>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    GearGuard is a comprehensive equipment tracking and management system designed for educational institutions. It streamlines the process of borrowing, returning, and managing equipment inventory with role-based access control and AI-powered analytics.
                  </p>
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Key Features</p>
                    <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
                      <li className="flex gap-2">
                        <span className="text-cyan-300">▸</span>
                        <span><strong>Role-Based Access Control:</strong> Admin, Handler, and Student/Personnel roles with specific permissions</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-300">▸</span>
                        <span><strong>Equipment Management:</strong> Categorized inventory with barcode tracking and real-time status monitoring</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-300">▸</span>
                        <span><strong>Borrow Workflow:</strong> Request → Approval → RFID & barcode scanning → Transaction processing</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-300">▸</span>
                        <span><strong>AI-Powered Analytics:</strong> Inventory insights, borrow pattern analysis, and predictive maintenance support</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-300">▸</span>
                        <span><strong>Notification System:</strong> Real-time updates, approval alerts, and return reminders</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Tech Stack</p>
                    <div className="mt-3 space-y-3">
                      <div>
                        <p className="mb-1.5 text-xs font-medium text-slate-400">Frontend</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">React</span>
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">Vite</span>
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">PrimeReact</span>
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">React Router</span>
                        </div>
                      </div>
                      <div>
                        <p className="mb-1.5 text-xs font-medium text-slate-400">Backend</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">Django</span>
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">Django REST Framework</span>
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">Google Gemini API</span>
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">Gunicorn</span>
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">WhiteNoise</span>
                        </div>
                      </div>
                      <div>
                        <p className="mb-1.5 text-xs font-medium text-slate-400">Database</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">PostgreSQL</span>
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">Neon(Cloud Database Deployment)</span>
                        </div>
                      </div>
                      <div>
                        <p className="mb-1.5 text-xs font-medium text-slate-400">Deployment</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">Netlify(Frontend Deployment) </span>
                          <span className="rounded-md border border-slate-600 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">Render(Backend Deployment)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                </div>
              </div>
            </article>

            <article id="videos-panel" className="order-2 rounded-2xl border border-white/10 bg-slate-900/70 p-6">
              <h3 className="font-display text-xl text-white">Video Edits</h3>
              {videos.length > 0 ? (
                <div className="mt-4 space-y-6">
                  {videosByCategory.map(({ category, items }) => (
                    <section key={category} className="space-y-3">
                      <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">{category}</h4>
                      {items.length > 0 ? (
                        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {items.map((video) => {
                            const videoKey = `${category}-${video.title}`
                            const posterIndex = posterAttempts[videoKey] || 0
                            const activePoster = video.posterCandidates?.[posterIndex]

                            return (
                            <li key={videoKey} className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
                              <p className="mb-3 font-semibold text-cyan-200">{video.title}</p>
                              {video.external ? (
                                <div className="space-y-3">
                                  {!activePoster ? (
                                    <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-white/20 bg-slate-900/70 text-xs font-medium uppercase tracking-wide text-slate-300">
                                      Thumbnail unavailable
                                    </div>
                                  ) : (
                                    <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-slate-900/60">
                                      <img
                                        src={activePoster}
                                        alt={`${video.title} thumbnail`}
                                        className="h-full w-full object-cover object-center"
                                        loading="lazy"
                                        onError={() =>
                                          setPosterAttempts((current) => ({
                                            ...current,
                                            [videoKey]: (current[videoKey] || 0) + 1,
                                          }))
                                        }
                                      />
                                    </div>
                                  )}
                                  <a
                                    href={video.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex rounded-lg border border-cyan-300/60 px-3 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-200 hover:text-cyan-100"
                                  >
                                    View
                                  </a>
                                </div>
                              ) : (
                                <video className="w-full rounded-lg border border-white/10" controls preload="metadata">
                                  <source src={video.href} />
                                </video>
                              )}
                            </li>
                          )})}
                        </ul>
                      ) : (
                        <p className="rounded-xl border border-dashed border-white/15 bg-slate-950/40 p-3 text-sm text-slate-400">
                          No videos in this category yet.
                        </p>
                      )}
                    </section>
                  ))}
                </div>
              ) : (
                <p className="mt-4 rounded-xl border border-dashed border-white/15 bg-slate-950/40 p-4 text-sm text-slate-400">
                  Add files to <code>Assests/videos</code> and they will appear here automatically.
                </p>
              )}
            </article>
          </div>
        </section>

        <section className="grid gap-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-10 md:grid-cols-[0.9fr_1.1fr]" id="about">
          <div className="mx-auto grid w-full max-w-md gap-4 sm:grid-cols-2 md:grid-cols-1">
            <img
              src="/Assests/img/Jayci_Featured1.jpeg?v=2026-02-14-2200"
              alt="Jayci featured portrait 1"
              className="h-full min-h-[240px] w-full rounded-2xl border border-white/20 object-cover object-top"
            />
            <img
              src="/Assests/img/Jayci_Featured2.jpg?v=2026-02-14-2200"
              alt="Jayci featured portrait 2"
              className="h-full min-h-[240px] w-full rounded-2xl border border-white/20 object-cover object-top"
            />
          </div>
          <div className="space-y-5">
            <h2 className="font-display text-3xl text-white">About Me</h2>
            <p className="leading-relaxed text-slate-300">
              I am a 23-year-old senior Computer Science student at the University of the Immaculate Conception with a
              strong passion for technology, problem-solving, and continuous learning. I was once driven by the dream
              of becoming a professional esports player, and that same competitive mindset and discipline now fuel my
              journey in software development. It taught me focus, adaptability, and the value of consistent
              improvement, qualities I bring into my technical work today.
            </p>
            <p className="leading-relaxed text-slate-300">
              I enjoy building practical and user-focused applications, exploring new frameworks, and refining my
              skills in analysis, design, and coding. I am particularly interested in frontend and full-stack
              development, where I can combine logic and creativity to deliver meaningful digital experiences. I
              actively work on academic and personal projects to strengthen my technical foundation and collaboration
              skills.
            </p>
            <p className="leading-relaxed text-slate-300">
              My goal is to keep growing as a developer, create impactful projects, and contribute to real-world teams
              where I can learn, innovate, and help deliver reliable and accessible software solutions.
            </p>
            <div id="contact" className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://www.facebook.com/Jaysgabri.acna24/"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
              >
                Facebook
              </a>
              <a
                href="https://x.com/jygbrl_acna"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
              >
                Twitter/X
              </a>
            </div>
            <div className="space-y-2 text-sm text-slate-300">
              <p>
                School Email:{' '}
                <a
                  href="mailto:jacuna_220000001342@uic.edu.ph"
                  className="font-medium text-cyan-200 underline-offset-4 hover:underline"
                >
                  jacuna_220000001342@uic.edu.ph
                </a>
              </p>
              <p>
                Personal Email:{' '}
                <a
                  href="mailto:JayGabri24@gmail.com"
                  className="font-medium text-cyan-200 underline-offset-4 hover:underline"
                >
                  JayGabri24@gmail.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4">
          <div className="w-full max-w-5xl rounded-2xl border border-white/15 bg-slate-900 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-xl text-white">{selectedCertificate.title}</h3>
              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="rounded-lg border border-slate-500 px-3 py-1 text-sm font-semibold text-slate-200 hover:border-cyan-300 hover:text-cyan-200"
              >
                Close
              </button>
            </div>
            <img
              src={selectedCertificate.href}
              alt={selectedCertificate.title}
              className="max-h-[78vh] w-full rounded-xl border border-white/10 object-contain"
            />
          </div>
        </div>
      )}

      {selectedPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-2 sm:p-4">
          <div className="flex h-[95vh] w-full max-w-6xl flex-col rounded-2xl border border-white/15 bg-slate-900 p-3 sm:h-[90vh] sm:p-4">
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-display text-base text-white sm:text-xl">{selectedPdf.title}</h3>
              <div className="flex gap-2">
                <a
                  href={selectedPdf.href}
                  download
                  className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/60 bg-cyan-300/10 px-3 py-2 text-xs font-semibold text-cyan-200 transition hover:border-cyan-200 hover:bg-cyan-300/20 sm:text-sm"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="hidden sm:inline">Download</span>
                  <span className="sm:hidden">PDF</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedPdf(null)}
                  className="rounded-lg border border-slate-500 px-3 py-2 text-xs font-semibold text-slate-200 hover:border-cyan-300 hover:text-cyan-200 sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
            <iframe
              src={selectedPdf.href}
              className="h-full w-full rounded-xl border border-white/10 bg-slate-950"
              title={selectedPdf.title}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
