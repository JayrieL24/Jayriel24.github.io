import { useState } from 'react'
import heroImage from '/Assests/img/Jayci_Profile.jpeg'
import { FaCode, FaFilm, FaJava, FaPython, FaReact, FaVideo } from 'react-icons/fa'
import { FaAws } from 'react-icons/fa6'
import { SiCanva, SiDjango, SiFastapi, SiJavascript, SiMysql } from 'react-icons/si'

const certificateFiles = import.meta.glob('../Assests/{certificates,Certificates}/*.{pdf,png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const externalVideos = [
  {
    title: 'LionFish_Trivia',
    href: 'https://drive.google.com/file/d/1LT3efurxX4g1ZZanXhd4k3VegYREou4u/view',
    poster: 'https://drive.google.com/thumbnail?id=1LT3efurxX4g1ZZanXhd4k3VegYREou4u&sz=w1200',
    category: 'Trivia Edits',
    external: true,
  },
  {
    title: 'Ruka Sarashina Edit',
    href: 'https://drive.google.com/file/d/1p5GtfX_zQvrOplUjeEdxlQnHBmM5Ht5k/view',
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

const videos = externalVideos.map((video) => ({
  ...video,
  category: video.category || getVideoCategory(video.title),
}))

const videosByCategory = videoCategories.map((category) => ({
  category,
  items: videos.filter((video) => video.category === category),
}))

const expertiseSegments = [
  {
    title: 'Programming',
    items: [
      { name: 'General Programming', Icon: FaCode, color: 'text-cyan-200' },
      { name: 'Django', Icon: SiDjango, color: 'text-emerald-200' },
      { name: 'React.js', Icon: FaReact, color: 'text-sky-200' },
      { name: 'Python', Icon: FaPython, color: 'text-yellow-200' },
      { name: 'Java', Icon: FaJava, color: 'text-orange-200' },
      { name: 'JavaScript', Icon: SiJavascript, color: 'text-amber-200' },
      { name: 'MySQL', Icon: SiMysql, color: 'text-blue-200' },
      { name: 'FastAPI', Icon: SiFastapi, color: 'text-teal-200' },
      { name: 'AWS Cloud Solutions Architect', Icon: FaAws, color: 'text-amber-200' },
    ],
  },
  {
    title: 'Visual',
    items: [{ name: 'Canva', Icon: SiCanva, color: 'text-cyan-200' }],
  },
  {
    title: 'Video Editing',
    items: [
      { name: 'CapCut', Icon: FaVideo, color: 'text-slate-200' },
      { name: 'DaVinci Resolve', Icon: FaFilm, color: 'text-violet-200' },
    ],
  },
]

function App() {
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navLinks = [
    { href: '#top', label: 'Dashboard' },
    { href: '#certificates-panel', label: 'Certificates' },
    { href: '#projects-panel', label: 'Projects' },
    { href: '#videos-panel', label: 'Video Edits' },
    { href: '#about', label: 'About Me' },
  ]

  return (
    <div id="top" className="min-h-screen bg-app text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <nav className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <a className="text-base font-bold tracking-wide text-slate-100 sm:text-lg" href="#home">
              Jayci Gabriel F. Acuna
            </a>
            <button
              type="button"
              className="rounded-lg border border-slate-600 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200 md:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              Menu
            </button>
            <div className="hidden gap-5 text-sm font-medium text-slate-300 md:flex">
              {navLinks.map((link) => (
                <a key={link.href} className="transition hover:text-cyan-300" href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3 md:hidden">
              {navLinks.map((link) => (
                <a
                  key={`mobile-${link.href}`}
                  className="rounded-lg border border-slate-700 px-3 py-2 text-center text-sm font-medium text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-20 pt-10 sm:gap-24 sm:px-6 sm:pt-14">
        <section className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]" id="home">
          <div className="space-y-6 animate-enter-up">
            <div className="flex flex-wrap gap-2">
              <p className="w-fit rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 sm:tracking-[0.25em]">
                Computer Science 
              </p>
              <p className="w-fit rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
                AWS Cloud Solutions Architect
              </p>
            </div>
            <h1 className="font-display text-3xl leading-tight text-white sm:text-5xl">
              Web Developer & Technical Analyst
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-300"> 
              I am Jayci Gabriel Fernandez Acuna from Davao City, Philippines. Currently a Senior Computer Science student focused on growing as a developer by building practical projects and continuously strengthening my skills in technical analysis and problem-solving. 
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
            <h2 className="font-display text-3xl text-white">Expertise</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {expertiseSegments.map((segment) => (
              <article key={segment.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <h3 className="font-display text-xl text-white">{segment.title}</h3>
                <div className="mt-4 space-y-3">
                  {segment.items.map(({ name, Icon, color }) => (
                    <div
                      key={name}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/50 p-3"
                    >
                      <Icon className={`text-2xl ${color}`} />
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">Tool</p>
                        <p className="font-semibold text-white">{name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
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

            <article id="projects-panel" className="order-1 scroll-mt-28 rounded-2xl border border-white/10 bg-slate-900/70 p-6">
              <h3 className="font-display text-xl text-white">Projects</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {projects.slice(0, 3).map((project) => (
                  <li key={project.title} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                    <p className="font-semibold text-cyan-200">{project.title}</p>
                    <p className="mt-1">{project.description}</p>
                  </li>
                ))}
              </ul>
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
                          {items.map((video) => (
                            <li key={`${category}-${video.title}`} className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
                              <p className="mb-3 font-semibold text-cyan-200">{video.title}</p>
                              {video.external ? (
                                <div className="space-y-3">
                                  <img
                                    src={video.poster}
                                    alt={`${video.title} thumbnail`}
                                    className="w-full rounded-lg border border-white/10 object-cover"
                                  />
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
                          ))}
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
    </div>
  )
}

export default App
