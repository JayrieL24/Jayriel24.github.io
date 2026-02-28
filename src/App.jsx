import { useState, useEffect, useRef } from 'react'
import heroImage from '/Assests/img/Icon_NavBar-removebg-preview.png'
import { FaCss3Alt, FaFacebook, FaFilm, FaGithub, FaGlobe, FaHome, FaHtml5, FaJava, FaPython, FaReact, FaVideo, FaVuejs, FaUser, FaBriefcase, FaCertificate, FaProjectDiagram, FaGraduationCap, FaBars, FaFileAlt, FaEnvelope, FaLinkedin } from 'react-icons/fa'
import { FaAws, FaXTwitter } from 'react-icons/fa6'
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
  const [educationModalOpen, setEducationModalOpen] = useState(false)
  const [experienceModalOpen, setExperienceModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedProjectImage, setSelectedProjectImage] = useState(null)
  const [posterAttempts, setPosterAttempts] = useState({})
  const [showEmailDropdown, setShowEmailDropdown] = useState(false)
  const [showWorksDropdown, setShowWorksDropdown] = useState(false)
  const [showNavWorksDropdown, setShowNavWorksDropdown] = useState(false)
  const emailDropdownRef = useRef(null)
  const emailDropdownRef2 = useRef(null)
  const worksDropdownRef = useRef(null)
  const navWorksDropdownRef = useRef(null)
  
  // Project data with images
  const projectsData = [
    {
      id: 'spmc-referral',
      name: 'SPMC Referral System',
      status: 'Under Development',
      statusColor: 'amber',
      thumbnail: '/Assests/img/Projects/SPMC/SPMC_Login.png',
      images: [
        { src: '/Assests/img/Projects/SPMC/SPMC_Login.png', title: 'Login Page' },
        { src: '/Assests/img/Projects/SPMC/SPMC_AdminDash.png', title: 'Admin Dashboard' },
        { src: '/Assests/img/Projects/SPMC/SPMC_highdptDash.png', title: 'Higher Department Dashboard' },
        { src: '/Assests/img/Projects/SPMC/SPMC_lowdptDash.png', title: 'Lower Department Dashboard' },
        { src: '/Assests/img/Projects/SPMC/SPMC_ReferrerDash.png', title: 'Referrer Dashboard' },
      ],
      shortDescription: 'Hospital referral management system for SPMC',
      description: 'A comprehensive hospital referral management system for Southern Philippines Medical Center (SPMC) that streamlines patient referrals when specialized services, doctors, or equipment are unavailable locally & nationally.',
      techStack: {
        frontend: 'React, TypeScript, Vite, Tailwind CSS, Radix UI, React Router, TanStack Query',
        backend: 'Django, Django REST Framework',
        database: 'SQLite3'
      },
      features: [
        'Drag-and-drop referral assignment (HeadsUp interface)',
        'Partner hospital network management',
        'Historical records with filtering and search',
        'Monthly trends and performance analytics',
        'Responsive design with modern Tailwind CSS interface'
      ],
      links: {
        github: 'https://github.com/derf567/SPMC-OJT-REFERRAL',
        website: null
      }
    },
    {
      id: 'gearguards',
      name: 'GearGuards',
      status: 'Deployed',
      statusColor: 'emerald',
      thumbnail: '/Assests/img/Projects/GearGuards/GG_Login.png',
      images: [
        { src: '/Assests/img/Projects/GearGuards/GG_Login.png', title: 'Login Page' },
        { src: '/Assests/img/Projects/GearGuards/GG_StudentDash.png', title: 'Student Dashboard' },
        { src: '/Assests/img/Projects/GearGuards/GG_StudentBor.png', title: 'Student Borrowing' },
        { src: '/Assests/img/Projects/GearGuards/GG_AdminInv.png', title: 'Admin Inventory' },
        { src: '/Assests/img/Projects/GearGuards/GG_AdminRep.png', title: 'Admin Reports' },
      ],
      shortDescription: 'Equipment tracking system for educational institutions',
      description: 'GearGuard is a comprehensive equipment tracking and management system designed for educational institutions. It streamlines the process of borrowing, returning, and managing equipment inventory with role-based access control and AI-powered analytics.',
      techStack: {
        frontend: 'React, Vite, PrimeReact, React Router',
        backend: 'Django, Django REST Framework, Google Gemini API, Gunicorn, WhiteNoise',
        database: 'PostgreSQL (Neon)'
      },
      features: [
        'Role-Based Access Control (Admin, Handler, Student/Personnel)',
        'Equipment Management with barcode tracking',
        'Borrow Workflow: Request â†’ Approval â†’ RFID & barcode scanning',
        'AI-Powered Analytics for inventory insights',
        'Notification System with real-time updates'
      ],
      links: {
        github: 'https://github.com/JayrieL24/GearGuards',
        website: 'https://gearguards.netlify.app/login'
      }
    },
    {
      id: 'herocs',
      name: 'HEROCS',
      status: 'Completed (Deployment Pending)',
      statusColor: 'amber',
      thumbnail: '/Assests/img/Projects/HEROCS/HEROCS_Landing.jpeg',
      images: [
        { src: '/Assests/img/Projects/HEROCS/HEROCS_Landing.jpeg', title: 'Landing Page' },
        { src: '/Assests/img/Projects/HEROCS/HEROCS_Landing2.jpeg', title: 'Landing Page - Alternate View' },
        { src: '/Assests/img/Projects/HEROCS/HEROCS_sample.jpeg', title: 'System Preview 1' },
        { src: '/Assests/img/Projects/HEROCS/HEROCS_sample2.jpeg', title: 'System Preview 2' },
        { src: '/Assests/img/Projects/HEROCS/HEROCS_sample3.jpeg', title: 'System Preview 3' },
        { src: '/Assests/img/Projects/HEROCS/HEROCS_sample4.jpeg', title: 'System Preview 4' },
        { src: '/Assests/img/Projects/HEROCS/HEROCS_sample5.jpeg', title: 'System Preview 5' },
      ],
      shortDescription: 'On-device mobile computer vision system for household hazard detection and risk assessment.',
      description: [
        'HEROCS (Home Hazard Evaluation and Risk Object Classification System) is an on-device mobile computer vision system designed to detect and assess household hazards in Filipino home environments. The system focuses on risks affecting children aged 0â€“3 years by identifying hazardous objects in real time using a fine-tuned YOLOv8s model.',
        'Unlike traditional binary safe/unsafe systems, HEROCS applies a multi-label classification framework that assigns multiple hazard attributes (e.g., sharp, toxic, within reach) to detected objects. These attributes are processed through a structured hazard scoring rubric to compute a Household Danger Index (HDI), providing an overall environmental risk assessment.',
        'The system integrates Augmented Reality (AR) overlays to deliver color-coded bounding boxes, interactive hazard details, and preventive safety recommendations â€” all processed directly on-device without cloud dependency.',
      ],
      techStackSections: [
        {
          heading: 'Frontend',
          items: ['Flutter (Mobile Framework)', 'Dart'],
        },
        {
          heading: 'Computer Vision & AI',
          items: ['YOLOv8s (Ultralytics)', 'TensorFlow Lite (On-device inference)', 'Multi-Label Classification Framework', 'Transfer Learning'],
        },
        {
          heading: 'AR & Mobile Integration',
          items: ['ARCore', 'Real-time Camera Processing', 'Interactive Bounding Box Rendering'],
        },
        {
          heading: 'Model Training & Optimization',
          items: ['Google Colab Pro (NVIDIA Tesla T4)', 'AdamW Optimizer', 'Early Stopping & Class Weighting', 'Custom Data Augmentation Pipeline'],
        },
        {
          heading: 'Dataset',
          items: [
            '5,373 culturally contextualized Filipino household images',
            '24 hazard classes with multi-label annotations',
            'Risk-level categorization (Low, Moderate, High, Highly Dangerous)',
          ],
        },
      ],
      features: [
        'Real-time hazard detection (28â€“32 FPS on mid-range Android devices)',
        'Multi-label risk classification (not limited to safe/unsafe)',
        'Household Danger Index (HDI) environmental scoring system',
        'Color-coded AR hazard visualization',
        'Interactive safety recommendations per detected object',
        'On-device inference (no cloud processing required)',
        'Culturally aware Filipino household hazard dataset',
        'Context-aware risk scoring (categorical, positional, contextual attributes)',
      ],
      links: {
        github: 'https://github.com/JayrieL24/HEROCS-Project',
        website: null
      }
    }
  ]
  
  // Scroll Animation Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    // Observe all elements with scroll-animate classes
    const animatedElements = document.querySelectorAll(
      '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
    )
    
    animatedElements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Close email dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emailDropdownRef.current && !emailDropdownRef.current.contains(event.target) &&
          emailDropdownRef2.current && !emailDropdownRef2.current.contains(event.target)) {
        setShowEmailDropdown(false)
      }
    }

    if (showEmailDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showEmailDropdown])

  // Close works dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (worksDropdownRef.current && !worksDropdownRef.current.contains(event.target)) {
        setShowWorksDropdown(false)
      }
    }

    if (showWorksDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showWorksDropdown])

  // Close nav works dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navWorksDropdownRef.current && !navWorksDropdownRef.current.contains(event.target)) {
        setShowNavWorksDropdown(false)
      }
    }

    if (showNavWorksDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showNavWorksDropdown])
  
  const projectsList = projectsData.map(p => ({ id: p.id, name: p.name }))
  const selectedProjectImages = selectedProject?.images || []
  const selectedProjectImageIndex = selectedProjectImages.findIndex(
    (image) => image.src === selectedProjectImage?.src
  )
  const canNavigateProjectImages = selectedProjectImageIndex !== -1 && selectedProjectImages.length > 1

  const showPreviousProjectImage = () => {
    if (!canNavigateProjectImages) return
    const previousIndex = (selectedProjectImageIndex - 1 + selectedProjectImages.length) % selectedProjectImages.length
    setSelectedProjectImage(selectedProjectImages[previousIndex])
  }

  const showNextProjectImage = () => {
    if (!canNavigateProjectImages) return
    const nextIndex = (selectedProjectImageIndex + 1) % selectedProjectImages.length
    setSelectedProjectImage(selectedProjectImages[nextIndex])
  }
  
  const scrollToProject = (projectId) => {
    const element = document.getElementById(projectId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setProjectMenuOpen(false)
    }
  }
  const navLinks = [
    { 
      href: '#top', 
      label: 'Dashboard', 
      icon: FaHome,
      description: 'Home / Landing page'
    },
    { 
      href: '#projects-panel', 
      label: 'Projects', 
      icon: FaProjectDiagram,
      description: 'Development projects & case studies'
    },
    { 
      href: '#credentials', 
      label: 'Credentials', 
      icon: FaBriefcase,
      description: 'Qualifications, work history, certificates & skills'
    },
    { 
      href: '#about', 
      label: 'About Me', 
      icon: FaUser,
      description: 'Personal background & contact'
    },
  ]

  return (
    <div id="top" className="min-h-screen bg-app text-slate-100">
      {/* Header Navigation */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <nav className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <a className="text-base font-bold tracking-wide text-slate-100 transition-colors hover:text-cyan-300 sm:text-lg" href="#home">
              Portfolio
            </a>
            
            {/* Desktop Navigation - Always Visible */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon
                
                // Special handling for Projects link with dropdown
                if (link.label === 'Projects') {
                  return (
                    <div key={link.href} className="relative" ref={navWorksDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setShowNavWorksDropdown(!showNavWorksDropdown)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-all duration-300 hover:bg-slate-900 hover:text-cyan-300 hover:scale-105"
                      >
                        <Icon className="text-base" />
                        <span>{link.label}</span>
                        <svg className={`h-3 w-3 transition-transform duration-300 ${showNavWorksDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Works Dropdown */}
                      {showNavWorksDropdown && (
                        <div className="absolute top-12 left-0 z-50 w-48 rounded-xl border border-white/20 bg-slate-900/95 backdrop-blur-sm p-2 shadow-xl animate-scale-in">
                          <a
                            href="#projects-panel"
                            onClick={() => setShowNavWorksDropdown(false)}
                            className="block rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:border-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-200 mb-2"
                          >
                            <div className="flex items-center gap-2">
                              <FaProjectDiagram className="text-cyan-400" />
                              <span>Projects</span>
                            </div>
                          </a>
                          <a
                            href="#dashboard"
                            onClick={() => setShowNavWorksDropdown(false)}
                            className="block rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:border-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-200"
                          >
                            <div className="flex items-center gap-2">
                              <FaVideo className="text-cyan-400" />
                              <span>Video Edits</span>
                            </div>
                          </a>
                        </div>
                      )}
                    </div>
                  )
                }
                
                return (
                  <a
                    key={link.href}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-all duration-300 hover:bg-slate-900 hover:text-cyan-300 hover:scale-105"
                    href={link.href}
                  >
                    <Icon className="text-base" />
                    <span>{link.label}</span>
                  </a>
                )
              })}
            </div>

            {/* Mobile/Tablet Menu Button */}
            <button
              type="button"
              className="rounded-lg border border-slate-600 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 transition-all duration-300 hover:border-cyan-300 hover:text-cyan-200 hover:scale-105 lg:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              Menu
            </button>
          </div>
          
          {/* Mobile/Tablet Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3 animate-fade-in lg:hidden">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={`mobile-${link.href}`}
                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-center text-sm font-medium text-slate-200 transition-all duration-300 hover:border-cyan-300 hover:text-cyan-200 hover:scale-105"
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

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-20 pt-10 sm:gap-24 sm:px-6 sm:pt-14">
        <section className="mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1.1fr_0.9fr]" id="home">
          <div className="space-y-6">
            {/* Badges with staggered slide-in animation */}
            <div className="flex flex-wrap gap-2 animate-enter-left">
              <p className="w-fit rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 transition-all duration-300 hover:scale-110 hover:border-cyan-300/60 hover:bg-cyan-300/20 hover:shadow-lg hover:shadow-cyan-400/30 animate-fade-in stagger-1 sm:tracking-[0.25em]">
                Programmer
              </p>
              <p className="w-fit rounded-full border border-yellow-300/40 bg-yellow-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200 transition-all duration-300 hover:scale-110 hover:border-yellow-300/60 hover:bg-yellow-300/20 hover:shadow-lg hover:shadow-yellow-400/30 animate-fade-in stagger-2 sm:tracking-[0.25em]">
                Computer Enthusiast
              </p>
              <p className="w-fit rounded-full border border-red-300/40 bg-red-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-200 transition-all duration-300 hover:scale-110 hover:border-red-300/60 hover:bg-red-300/20 hover:shadow-lg hover:shadow-red-400/30 animate-fade-in stagger-3 sm:tracking-[0.25em]">
                Video Editor
              </p>
              <p className="w-fit rounded-full border border-orange-300/40 bg-orange-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-200 transition-all duration-300 hover:scale-110 hover:border-orange-300/60 hover:bg-orange-300/20 hover:shadow-lg hover:shadow-orange-400/30 animate-fade-in stagger-4 sm:tracking-[0.25em]">
                Gamer
              </p>
            </div>
            
            {/* Name and title with slide-in animation */}
            <div className="animate-enter-left" style={{ animationDelay: '0.2s' }}>
              <h1 className="font-display text-3xl leading-tight text-white sm:text-5xl transition-all duration-300 hover:text-cyan-300">
                Jayci Gabriel Fernandez AcuÃ±a
              </h1>
              <p className="mt-3 text-lg font-medium text-cyan-200 sm:text-xl animate-pulse-slow">
                Full Stack Web Developer & Technical Analyst
              </p>
            </div>
            
            {/* Description with fade-in animation */}
            <p className="max-w-xl text-base leading-relaxed text-slate-300 animate-fade-in" style={{ animationDelay: '0.4s' }}> 
              I am Jayci Gabriel Fernandez AcuÃ±a from Davao City, Philippines. Currently a Senior Computer Science student focused on growing as a developer by building practical projects and continuously strengthening my skills in technical analysis and problem-solving. 
              I enjoy applying my analytical skills to understand problems, evaluate solutions, and develop user-focused applications through hands-on practice and continuous learning.
            </p>
            
            {/* Buttons with staggered slide-up animation */}
            <div className="flex flex-wrap gap-4 animate-enter-up" style={{ animationDelay: '0.6s' }}>
              {/* View Works with Dropdown */}
              <div className="relative" ref={worksDropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowWorksDropdown(!showWorksDropdown)}
                  className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/50 hover:-translate-y-1 active:translate-y-0 flex items-center gap-2"
                >
                  View Works
                  <svg className={`h-4 w-4 transition-transform duration-300 ${showWorksDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Works Dropdown */}
                {showWorksDropdown && (
                  <div className="absolute top-14 left-0 z-50 w-48 rounded-xl border border-white/20 bg-slate-900/95 backdrop-blur-sm p-2 shadow-xl animate-scale-in">
                    <a
                      href="#projects-panel"
                      onClick={() => setShowWorksDropdown(false)}
                      className="block rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:border-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-200 mb-2"
                    >
                      <div className="flex items-center gap-2">
                        <FaProjectDiagram className="text-cyan-400" />
                        <span>Projects</span>
                      </div>
                    </a>
                    <a
                      href="#dashboard"
                      onClick={() => setShowWorksDropdown(false)}
                      className="block rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:border-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-200"
                    >
                      <div className="flex items-center gap-2">
                        <FaVideo className="text-cyan-400" />
                        <span>Video Edits</span>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              <a
                className="rounded-xl border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-cyan-300 hover:text-cyan-200 hover:shadow-lg hover:shadow-cyan-400/30 hover:-translate-y-1 active:translate-y-0"
                href="#credentials"
              >
                Credentials
              </a>
              <button
                type="button"
                onClick={() => setSelectedCertificate({ title: 'Resume - Jayci Gabriel AcuÃ±a', href: '/Assests/img/Resume_Thumbnail.png' })}
                className="rounded-xl border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-cyan-300 hover:text-cyan-200 hover:shadow-lg hover:shadow-cyan-400/30 hover:-translate-y-1 active:translate-y-0"
              > 
                Resume 
              (Outdated)
              </button>
              <a
                className="rounded-xl border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-cyan-300 hover:text-cyan-200 hover:shadow-lg hover:shadow-cyan-400/30 hover:-translate-y-1 active:translate-y-0"
                href="#about"
              >
                About Me
              </a>
            </div>
          </div>
          <div className="animate-enter-up-delay relative mx-auto w-full max-w-md">
            {/* Profile Image with Card Flip Effect and Continuous Animations */}
            <div className="group relative perspective-1000 animate-float-gentle">
              <div className="relative aspect-[5/6] w-full rounded-[2rem] transition-all duration-700 preserve-3d group-hover:rotate-y-180">
                {/* Front - Profile Image with Shimmer Effect */}
                <div className="absolute inset-0 backface-hidden overflow-hidden rounded-[2rem] bg-transparent">
                  <img
                    className="h-full w-full rounded-[2rem] object-contain object-center animate-rotate-subtle"
                    src={heroImage}
                    alt="Jayci Gabriel AcuÃ±a"
                  />
                </div>
                
                {/* Back - Code Symbol */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center rounded-[2rem] border border-cyan-300/40 bg-gradient-to-br from-cyan-900/90 via-slate-900/90 to-slate-950/90 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="mb-4 text-8xl font-bold text-cyan-300 animate-pulse-slow">
                      &lt;/&gt;
                    </div>
                    <p className="text-xl font-semibold text-white">Full Stack Developer</p>
                    <p className="mt-2 text-sm text-cyan-200">Building the future, one line at a time</p>
                  </div>
                </div>
              </div>
                
              {/* Hover Hint */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-slate-400 whitespace-nowrap">Hover to flip</p>
              </div>
            </div>

            {/* Contacts Section */}
            <div className="mt-12 animate-scale-in" style={{ animationDelay: '0.8s' }}>
              <h3 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200 mb-4 animate-fade-in" style={{ animationDelay: '0.9s' }}>Contacts</h3>
              <div className="flex justify-center gap-3">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/Jaysgabri.acna24/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-600 bg-slate-900/50 transition-all duration-300 hover:border-blue-400 hover:bg-blue-400/10 hover:shadow-lg hover:shadow-blue-400/30 hover:-translate-y-1 hover:rotate-6 animate-scale-in"
                  style={{ animationDelay: '1s' }}
                  title="Facebook"
                >
                  <FaFacebook className="text-xl text-slate-300 transition-all duration-300 group-hover:text-blue-400 group-hover:scale-110" />
                </a>

                {/* Twitter/X */}
                <a
                  href="https://x.com/jygbrl_acna"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-600 bg-slate-900/50 transition-all duration-300 hover:border-slate-300 hover:bg-slate-300/10 hover:shadow-lg hover:shadow-slate-300/30 hover:-translate-y-1 hover:rotate-6 animate-scale-in"
                  style={{ animationDelay: '1.1s' }}
                  title="Twitter/X"
                >
                  <FaXTwitter className="text-xl text-slate-300 transition-all duration-300 group-hover:text-slate-100 group-hover:scale-110" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/Jayriel24"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-600 bg-slate-900/50 transition-all duration-300 hover:border-purple-400 hover:bg-purple-400/10 hover:shadow-lg hover:shadow-purple-400/30 hover:-translate-y-1 hover:rotate-6 animate-scale-in"
                  style={{ animationDelay: '1.2s' }}
                  title="GitHub"
                >
                  <FaGithub className="text-xl text-slate-300 transition-all duration-300 group-hover:text-purple-400 group-hover:scale-110" />
                </a>

                {/* Email with Dropdown */}
                <div className="relative animate-scale-in" style={{ animationDelay: '1.3s' }} ref={emailDropdownRef}>
                  <button
                    onClick={() => setShowEmailDropdown(!showEmailDropdown)}
                    className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-600 bg-slate-900/50 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/30 hover:-translate-y-1 hover:rotate-6"
                    title="Email"
                  >
                    <FaEnvelope className="text-xl text-slate-300 transition-all duration-300 group-hover:text-cyan-400 group-hover:scale-110" />
                  </button>

                  {/* Email Dropdown */}
                  {showEmailDropdown && (
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 w-64 rounded-xl border border-white/20 bg-slate-900/95 backdrop-blur-sm p-3 shadow-xl animate-scale-in">
                      <div className="space-y-2">
                        <a
                          href="mailto:jacuna_220000001342@uic.edu.ph"
                          className="block rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-2 text-xs text-slate-300 transition-all hover:border-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-200 hover:scale-105"
                          onClick={() => setShowEmailDropdown(false)}
                        >
                          <div className="font-semibold text-cyan-300 mb-1">School Email</div>
                          jacuna_220000001342@uic.edu.ph
                        </a>
                        <a
                          href="mailto:JayGabri24@gmail.com"
                          className="block rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-2 text-xs text-slate-300 transition-all hover:border-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-200 hover:scale-105"
                          onClick={() => setShowEmailDropdown(false)}
                        >
                          <div className="font-semibold text-cyan-300 mb-1">Personal Email</div>
                          JayGabri24@gmail.com
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowEmailDropdown(false)}
                        className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-1.5 text-xs font-semibold text-slate-400 transition-all hover:border-slate-500 hover:text-slate-300 hover:scale-105"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/jayci-gabriel-acu%C3%B1a-3281953b4"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-600 bg-slate-900/50 transition-all duration-300 hover:border-blue-500 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 hover:rotate-6 animate-scale-in"
                  style={{ animationDelay: '1.4s' }}
                  title="LinkedIn"
                >
                  <FaLinkedin className="text-xl text-slate-300 transition-all duration-300 group-hover:text-blue-500 group-hover:scale-110" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects Section - Moved Up */}
        <section className="space-y-8 scroll-animate" id="projects-panel">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Portfolio</p>
            <h2 className="font-display text-3xl text-white">Featured Projects</h2>
            <p className="mt-2 text-sm text-slate-400">Click on a project to view details and screenshots</p>
          </div>

          {/* Project Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {projectsData.map((project) => {
              const frontendSummary = project.techStack?.frontend?.split(',')[0] || project.techStackSections?.find((section) => section.heading === 'Frontend')?.items?.[0] || 'Not specified'
              const backendSummary = project.techStack?.backend?.split(',')[0] || project.techStackSections?.find((section) => section.heading === 'Computer Vision & AI')?.items?.[0] || 'Not specified'
              const databaseSummary = project.techStack?.database || project.techStackSections?.find((section) => section.heading === 'Dataset')?.items?.[0] || 'Not specified'

              return (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-950/50 p-0 overflow-hidden text-left transition-all duration-300 hover:border-cyan-300/60 hover:shadow-xl hover:shadow-cyan-400/20 hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="relative h-52 overflow-hidden bg-slate-950/80">
                  <img 
                    src={project.thumbnail} 
                    alt={project.name}
                    className="w-full h-full object-contain object-center p-2 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide backdrop-blur-md shadow-lg ${
                      project.statusColor === 'emerald' 
                        ? 'border-emerald-400/80 bg-emerald-500/90 text-white shadow-emerald-500/50' 
                        : 'border-amber-400/80 bg-amber-500/90 text-slate-900 shadow-amber-500/50'
                    }`}>
                      <span className={`h-2 w-2 rounded-full ${
                        project.statusColor === 'emerald' ? 'bg-white animate-pulse' : 'bg-slate-900'
                      }`}></span>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h4 className="font-display text-xl text-white mb-2 group-hover:text-cyan-300 transition-colors">{project.name}</h4>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">{project.shortDescription}</p>
                  
                  {/* Tech Stack Summary */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-cyan-300">Frontend:</span>
                      <span className="text-xs text-slate-400 line-clamp-1">{frontendSummary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-emerald-300">Backend:</span>
                      <span className="text-xs text-slate-400 line-clamp-1">{backendSummary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-blue-300">Database:</span>
                      <span className="text-xs text-slate-400">{databaseSummary}</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-sm font-semibold text-cyan-300 group-hover:text-cyan-200 transition-colors">View Details</span>
                    <svg className="h-5 w-5 text-cyan-300 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
              )
            })}
          </div>
        </section>

        {/* Credentials Section - Entry Point */}
        <section className="space-y-8 scroll-animate" id="credentials">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Professional Profile</p>
            <h2 className="font-display text-3xl text-white">Credentials</h2>
            <p className="mt-2 text-sm text-slate-400">Qualifications, work history, certificates & skills</p>
          </div>

          {/* Skills and Tools */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-2xl text-white mb-2">Skills & Tools</h3>
              <p className="text-sm text-slate-400">Technical expertise and creative capabilities</p>
            </div>
          
            {/* Programming Section - Enhanced Horizontal Layout */}
            <article className="group rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-900/20 via-slate-900/50 to-slate-950/50 p-6 hover-lift scroll-animate-scale relative overflow-hidden transition-all duration-300 hover:border-cyan-300/60 hover:shadow-xl hover:shadow-cyan-400/20">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30">
                  <svg className="h-6 w-6 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-white">Programming</h3>
              </div>
              
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-1 w-1 rounded-full bg-cyan-400"></div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Frontend</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {expertiseSegments[0].items
                      .filter((item) => item.section === 'Frontend')
                      .map(({ name, Icon, color }) => (
                        <div
                          key={name}
                          className="group/skill flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2.5 transition-all duration-300 hover:border-cyan-300/50 hover:bg-slate-900/70 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/20 relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"></div>
                          <Icon className={`relative text-xl ${color} group-hover/skill:scale-110 transition-transform duration-300`} />
                          <p className="relative text-sm font-semibold text-white">{name}</p>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-1 w-1 rounded-full bg-emerald-400"></div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Backend</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {expertiseSegments[0].items
                      .filter((item) => item.section === 'Backend')
                      .map(({ name, Icon, color }) => (
                        <div
                          key={name}
                          className="group/skill flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2.5 transition-all duration-300 hover:border-emerald-300/50 hover:bg-slate-900/70 hover:scale-110 hover:shadow-lg hover:shadow-emerald-400/20 relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"></div>
                          <Icon className={`relative text-xl ${color} group-hover/skill:scale-110 transition-transform duration-300`} />
                          <p className="relative text-sm font-semibold text-white">{name}</p>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-1 w-1 rounded-full bg-blue-400"></div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Database</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {expertiseSegments[0].items
                      .filter((item) => item.section === 'Database')
                      .map(({ name, Icon, color }) => (
                        <div
                          key={name}
                          className="group/skill flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2.5 transition-all duration-300 hover:border-blue-300/50 hover:bg-slate-900/70 hover:scale-110 hover:shadow-lg hover:shadow-blue-400/20 relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"></div>
                          <Icon className={`relative text-xl ${color} group-hover/skill:scale-110 transition-transform duration-300`} />
                          <p className="relative text-sm font-semibold text-white">{name}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Visual and Video Editing - Enhanced Side by Side */}
          <div className="grid gap-5 md:grid-cols-2">
            <article className="group rounded-2xl border border-violet-300/30 bg-gradient-to-br from-violet-900/20 via-slate-900/50 to-slate-950/50 p-6 hover-lift scroll-animate-scale stagger-2 relative overflow-hidden transition-all duration-300 hover:border-violet-300/60 hover:shadow-xl hover:shadow-violet-400/20">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 border border-violet-400/30">
                    <svg className="h-6 w-6 text-violet-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl text-white">Visual</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {expertiseSegments[1].items.map(({ name, Icon, color, category }) => (
                    <div
                      key={name}
                      className="group/skill flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2.5 transition-all duration-300 hover:border-violet-300/50 hover:bg-slate-900/70 hover:scale-110 hover:shadow-lg hover:shadow-violet-400/20 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-transparent opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"></div>
                      <Icon className={`relative text-xl ${color} group-hover/skill:scale-110 transition-transform duration-300`} />
                      <p className="relative text-sm font-semibold text-white">{name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className="group rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-900/20 via-slate-900/50 to-slate-950/50 p-6 hover-lift scroll-animate-scale stagger-3 relative overflow-hidden transition-all duration-300 hover:border-amber-300/60 hover:shadow-xl hover:shadow-amber-400/20">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/30">
                    <svg className="h-6 w-6 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl text-white">Video Editing</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {expertiseSegments[2].items.map(({ name, Icon, color, category }) => (
                    <div
                      key={name}
                      className="group/skill flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2.5 transition-all duration-300 hover:border-amber-300/50 hover:bg-slate-900/70 hover:scale-110 hover:shadow-lg hover:shadow-amber-400/20 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"></div>
                      <Icon className={`relative text-xl ${color} group-hover/skill:scale-110 transition-transform duration-300`} />
                      <p className="relative text-sm font-semibold text-white">{name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
          </div>

          {/* Education & Experience Section */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-2xl text-white mb-2">Education & Experience</h3>
              <p className="text-sm text-slate-400">Academic qualifications and professional work history</p>
            </div>

            {/* Grid Layout for Education and Work Experience Cards */}
            <div className="grid gap-6 md:grid-cols-2">
            {/* Academic Qualifications Card */}
            <button
              onClick={() => setEducationModalOpen(true)}
              className="group w-full rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-900/30 via-slate-900/50 to-slate-950/50 p-6 text-left transition-all duration-300 hover:border-cyan-300/60 hover:shadow-xl hover:shadow-cyan-400/20 hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative">
                <div className="flex flex-col gap-5">
                  <div className="relative">
                    <div className="absolute -inset-3 bg-gradient-to-r from-cyan-400/20 via-emerald-400/20 to-violet-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    
                    <div className="relative flex -space-x-4 justify-center">
                      <div className="relative">
                        <img src="/Assests/img/UIC_logo.png" alt="UIC" className="h-16 w-16 rounded-full border-3 border-slate-900 bg-white object-contain p-2 shadow-lg transition-transform duration-300 hover:scale-125 hover:z-20 hover:rotate-12" />
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-cyan-400 border-2 border-slate-900"></div>
                      </div>
                      <div className="relative">
                        <img src="/Assests/img/UM_logo.jpg" alt="UM" className="h-16 w-16 rounded-full border-3 border-slate-900 bg-white object-contain p-2 shadow-lg transition-transform duration-300 hover:scale-125 hover:z-20 hover:rotate-12" />
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-400 border-2 border-slate-900"></div>
                      </div>
                      <div className="relative">
                        <img src="/Assests/img/DPLC_logo.jpg" alt="DPLC" className="h-16 w-16 rounded-full border-3 border-slate-900 bg-white object-contain p-2 shadow-lg transition-transform duration-300 hover:scale-125 hover:z-20 hover:rotate-12" />
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-violet-400 border-2 border-slate-900"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <FaGraduationCap className="text-cyan-300 text-xl" />
                      <h3 className="font-display text-xl text-white">Academic Qualifications</h3>
                    </div>
                    <p className="text-sm text-slate-400 mb-3">Tertiary, Secondary & Primary Education</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/20 px-3 py-1 text-xs font-bold text-cyan-200 border border-cyan-400/30">
                        <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                        3 Institutions
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold text-emerald-200 border border-emerald-400/30">
                        <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                        2010 - 2026
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-3 mt-4">
                  <span className="text-xs font-semibold text-cyan-300">Click to explore</span>
                  <svg className="h-6 w-6 text-cyan-300 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Work Experience Card */}
            <button
              onClick={() => setExperienceModalOpen(true)}
              className="group w-full rounded-2xl border border-violet-300/30 bg-gradient-to-br from-violet-900/30 via-slate-900/50 to-slate-950/50 p-6 text-left transition-all duration-300 hover:border-violet-300/60 hover:shadow-xl hover:shadow-violet-400/20 hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative">
                <div className="flex flex-col gap-5">
                  <div className="relative flex justify-center">
                    <div className="absolute -inset-3 bg-gradient-to-r from-violet-400/20 via-amber-400/20 to-orange-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-violet-300/40 bg-gradient-to-br from-violet-900/50 to-slate-900 shadow-xl">
                      <FaBriefcase className="text-4xl text-violet-300 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <FaBriefcase className="text-violet-300 text-xl" />
                      <h3 className="font-display text-xl text-white">Work Experience</h3>
                    </div>
                    <p className="text-sm text-slate-400 mb-3">Internship, Thesis, Freelance & Services</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-400/20 px-3 py-1 text-xs font-bold text-violet-200 border border-violet-400/30">
                        <span className="h-2 w-2 rounded-full bg-violet-400"></span>
                        4 Experiences
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold text-emerald-200 border border-emerald-400/30">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        2022 - Present
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-3 mt-4">
                  <span className="text-xs font-semibold text-violet-300">Click to explore</span>
                  <svg className="h-6 w-6 text-violet-300 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
          </div>

          {/* Certificates Section */}
          <div className="space-y-4">
            <div>
              <h3 className="font-display text-2xl text-white mb-2">Certificates</h3>
              <p className="text-sm text-slate-400">Professional certifications and achievements</p>
            </div>
            
            <div id="certificates-panel">
              {certificates.length > 0 ? (
                <div className="space-y-8">
                  {/* Featured Certificates */}
                  {featuredCertificates.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-1 w-1 rounded-full bg-amber-400"></div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Featured</p>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {featuredCertificates.map((certificate) => (
                          <button
                            key={certificate.title}
                            type="button"
                            onClick={() => setSelectedCertificate(certificate)}
                            className="group/cert relative rounded-2xl border border-amber-300/40 bg-gradient-to-br from-amber-900/20 to-slate-950/50 p-4 text-left transition-all duration-300 hover:border-amber-300/60 hover:shadow-xl hover:shadow-amber-400/20 hover:-translate-y-1"
                          >
                            {/* Animated Background */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover/cert:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="relative">
                              <div className="relative overflow-hidden rounded-xl mb-3">
                                <img
                                  src={certificate.href}
                                  alt={certificate.title}
                                  className="h-48 w-full rounded-xl border border-white/10 object-contain bg-white/5 transition-all duration-300 group-hover/cert:scale-105"
                                />
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/70 opacity-0 group-hover/cert:opacity-100 transition-opacity duration-300 backdrop-blur-sm rounded-xl">
                                  <div className="flex flex-col items-center gap-2">
                                    <svg className="h-12 w-12 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <span className="text-sm font-bold text-white uppercase tracking-wide">View Certificate</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className="font-semibold text-white line-clamp-2 leading-tight">{certificate.title}</h4>
                                  <span className="flex-shrink-0 rounded-full border border-amber-400/70 bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-200">
                                    Featured
                                  </span>
                                </div>
                                <p className="text-sm text-slate-300">{certificate.issuer}</p>
                                <p className="text-xs text-slate-500">{certificate.year}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Regular Certificates */}
                  {regularCertificates.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-1 w-1 rounded-full bg-cyan-400"></div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Other Certificates</p>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {regularCertificates.map((certificate) => (
                          <button
                            key={certificate.title}
                            type="button"
                            onClick={() => setSelectedCertificate(certificate)}
                            className="group/cert relative rounded-xl border border-white/10 bg-slate-950/50 p-3 text-left transition-all duration-300 hover:border-cyan-300/50 hover:shadow-lg hover:shadow-cyan-400/10 hover:-translate-y-1"
                          >
                            <div className="relative overflow-hidden rounded-lg mb-2">
                              <img
                                src={certificate.href}
                                alt={certificate.title}
                                className="h-36 w-full rounded-lg border border-white/10 object-contain bg-white/5 transition-all duration-300 group-hover/cert:scale-105"
                              />
                              {/* Hover Overlay */}
                              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/70 opacity-0 group-hover/cert:opacity-100 transition-opacity duration-300 backdrop-blur-sm rounded-lg">
                                <svg className="h-8 w-8 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </div>
                            </div>
                            <h4 className="text-sm font-semibold text-white line-clamp-2 leading-tight mb-1">
                              {certificate.title}
                            </h4>
                            <p className="text-xs text-slate-400 line-clamp-1">{certificate.issuer}</p>
                            <p className="text-xs text-slate-500">{certificate.year}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="rounded-xl border border-dashed border-white/15 bg-slate-950/40 p-4 text-sm text-slate-400">
                  Add files to <code>Assests/certificates</code> and they will appear here automatically.
                </p>
              )}
            </div>
          </div>
        </section>

        <section id="dashboard" className="space-y-8 scroll-animate">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Creative Work</p>
            <h2 className="font-display text-3xl text-white">Video Edits</h2>
          </div>

          {/* Videos Section */}
          <article id="videos-panel" className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 scroll-animate-right hover-glow transition-all duration-300">
              {videos.length > 0 ? (
                <div className="space-y-8">
                  {videosByCategory.map(({ category, items }) => (
                    <section key={category} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-cyan-400"></div>
                        <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">{category}</h4>
                      </div>
                      {items.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {items.map((video) => {
                            const videoKey = `${category}-${video.title}`
                            const posterIndex = posterAttempts[videoKey] || 0
                            const activePoster = video.posterCandidates?.[posterIndex]

                            return (
                            <div key={videoKey} className="group relative rounded-xl border border-white/10 bg-slate-950/50 p-3 transition-all duration-300 hover:border-cyan-300/50 hover:shadow-lg hover:shadow-cyan-400/10 hover:-translate-y-1">
                              {video.external ? (
                                <div>
                                  {!activePoster ? (
                                    <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-white/20 bg-slate-900/70 text-xs font-medium uppercase tracking-wide text-slate-300 mb-2">
                                      Thumbnail unavailable
                                    </div>
                                  ) : (
                                    <a
                                      href={video.href}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="group/video relative block aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-slate-900/60 mb-2"
                                    >
                                      <img
                                        src={activePoster}
                                        alt={`${video.title} thumbnail`}
                                        className="h-full w-full object-cover object-center transition-all duration-300 group-hover/video:scale-110"
                                        loading="lazy"
                                        onError={() =>
                                          setPosterAttempts((current) => ({
                                            ...current,
                                            [videoKey]: (current[videoKey] || 0) + 1,
                                          }))
                                        }
                                      />
                                      {/* Hover Overlay */}
                                      <div className="absolute inset-0 flex items-center justify-center bg-slate-950/70 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                                        <div className="flex flex-col items-center gap-2">
                                          <svg className="h-12 w-12 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                          <span className="text-sm font-bold text-white uppercase tracking-wide">Watch Video</span>
                                        </div>
                                      </div>
                                    </a>
                                  )}
                                  <p className="font-semibold text-white text-sm line-clamp-2 leading-tight">{video.title}</p>
                                </div>
                              ) : (
                                <div>
                                  <video className="w-full rounded-lg border border-white/10 mb-2" controls preload="metadata">
                                    <source src={video.href} />
                                  </video>
                                  <p className="font-semibold text-white text-sm line-clamp-2 leading-tight">{video.title}</p>
                                </div>
                              )}
                            </div>
                          )})}
                        </div>
                      ) : (
                        <p className="rounded-xl border border-dashed border-white/15 bg-slate-950/40 p-3 text-sm text-slate-400">
                          No videos in this category yet.
                        </p>
                      )}
                    </section>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl border border-dashed border-white/15 bg-slate-950/40 p-4 text-sm text-slate-400">
                  Add files to <code>Assests/videos</code> and they will appear here automatically.
                </p>
              )}
            </article>
        </section>

        <section className="grid gap-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-10 md:grid-cols-[0.9fr_1.1fr] scroll-animate hover-glow transition-all duration-300" id="about">
          <div className="mx-auto w-full max-w-md">
            <img
              src="/Assests/img/Jayci's Profile.jpeg"
              alt="Jayci profile portrait"
              className="h-full min-h-[420px] w-full rounded-2xl border border-white/20 object-cover object-top animate-float-gentle transition-transform duration-500 hover:scale-105"
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

            {/* Contacts Section */}
            <div className="pt-4">
              <h3 className="text-lg font-semibold text-white mb-4">Contacts</h3>
              <div className="flex flex-wrap gap-3">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/Jaysgabri.acna24/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-600 bg-slate-900/50 transition-all duration-300 hover:border-blue-400 hover:bg-blue-400/10 hover:shadow-lg hover:shadow-blue-400/30 hover:-translate-y-1"
                  title="Facebook"
                >
                  <FaFacebook className="text-xl text-slate-300 transition-colors group-hover:text-blue-400" />
                </a>

                {/* Twitter/X */}
                <a
                  href="https://x.com/jygbrl_acna"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-600 bg-slate-900/50 transition-all duration-300 hover:border-slate-300 hover:bg-slate-300/10 hover:shadow-lg hover:shadow-slate-300/30 hover:-translate-y-1"
                  title="Twitter/X"
                >
                  <FaXTwitter className="text-xl text-slate-300 transition-colors group-hover:text-slate-100" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/Jayriel24"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-600 bg-slate-900/50 transition-all duration-300 hover:border-purple-400 hover:bg-purple-400/10 hover:shadow-lg hover:shadow-purple-400/30 hover:-translate-y-1"
                  title="GitHub"
                >
                  <FaGithub className="text-xl text-slate-300 transition-colors group-hover:text-purple-400" />
                </a>

                {/* Email with Dropdown */}
                <div className="relative" ref={emailDropdownRef2}>
                  <button
                    onClick={() => setShowEmailDropdown(!showEmailDropdown)}
                    className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-600 bg-slate-900/50 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/30 hover:-translate-y-1"
                    title="Email"
                  >
                    <FaEnvelope className="text-xl text-slate-300 transition-colors group-hover:text-cyan-400" />
                  </button>

                  {/* Email Dropdown */}
                  {showEmailDropdown && (
                    <div className="absolute top-14 left-0 z-50 w-64 rounded-xl border border-white/20 bg-slate-900/95 backdrop-blur-sm p-3 shadow-xl animate-scale-in">
                      <div className="space-y-2">
                        <a
                          href="mailto:jacuna_220000001342@uic.edu.ph"
                          className="block rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-2 text-xs text-slate-300 transition-all hover:border-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-200"
                          onClick={() => setShowEmailDropdown(false)}
                        >
                          <div className="font-semibold text-cyan-300 mb-1">School Email</div>
                          jacuna_220000001342@uic.edu.ph
                        </a>
                        <a
                          href="mailto:JayGabri24@gmail.com"
                          className="block rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-2 text-xs text-slate-300 transition-all hover:border-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-200"
                          onClick={() => setShowEmailDropdown(false)}
                        >
                          <div className="font-semibold text-cyan-300 mb-1">Personal Email</div>
                          JayGabri24@gmail.com
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowEmailDropdown(false)}
                        className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-1.5 text-xs font-semibold text-slate-400 transition-all hover:border-slate-500 hover:text-slate-300"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/jayci-gabriel-acu%C3%B1a-3281953b4"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-600 bg-slate-900/50 transition-all duration-300 hover:border-blue-500 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1"
                  title="LinkedIn"
                >
                  <FaLinkedin className="text-xl text-slate-300 transition-colors group-hover:text-blue-500" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 animate-fade-in">
          <div className="w-full max-w-5xl rounded-2xl border border-white/15 bg-slate-900 p-4 animate-scale-in">
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
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/85 p-2 sm:p-4 animate-fade-in">
          <div className="flex h-[95vh] w-full max-w-6xl flex-col rounded-2xl border border-white/15 bg-slate-900 p-3 sm:h-[90vh] sm:p-4 animate-scale-in">
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

      {/* Education Modal */}
      {educationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 animate-fade-in">
          <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 bg-slate-900 p-6 animate-scale-in">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-2xl text-white">Academic Qualifications</h3>
              <button
                type="button"
                onClick={() => setEducationModalOpen(false)}
                className="rounded-lg border border-slate-500 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-300 hover:text-cyan-200 transition-all duration-300"
              >
                Close
              </button>
            </div>
            
            {/* Timeline Layout */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-emerald-400 to-violet-400 hidden md:block"></div>
              
              <div className="space-y-8">
                {/* Tertiary Education */}
                <div className="relative md:pl-20">
                  <div className="absolute left-6 top-6 hidden md:block">
                    <div className="h-5 w-5 rounded-full border-4 border-cyan-400 bg-slate-900 shadow-lg shadow-cyan-400/50"></div>
                  </div>
                  <article className="group rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-900/20 to-slate-950/50 p-6 hover-lift transition-all duration-300 hover:border-cyan-300/60 hover:shadow-lg hover:shadow-cyan-400/20">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="absolute -inset-2 bg-cyan-400/20 rounded-2xl blur-xl group-hover:bg-cyan-400/30 transition-all duration-300"></div>
                          <img src="/Assests/img/UIC_logo.png" alt="UIC Logo" className="relative h-24 w-24 rounded-2xl border-2 border-cyan-300/40 bg-white object-contain p-3 shadow-xl" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <span className="inline-block rounded-full bg-cyan-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-200 mb-2">Tertiary</span>
                            <h4 className="font-display text-xl text-white mb-1">Bachelor of Science in Computer Science</h4>
                            <p className="text-base font-semibold text-cyan-200">University of the Immaculate Conception</p>
                          </div>
                          <span className="rounded-lg bg-emerald-400/20 px-3 py-1.5 text-sm font-bold text-emerald-200 border border-emerald-400/30">2022 - 2026</span>
                        </div>
                        <p className="text-sm text-slate-400 mb-4">Expected Graduation: April 2026</p>
                        <div className="flex flex-wrap gap-2">
                          <a
                            href="https://www.facebook.com/uicph"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900/50 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all duration-300 hover:border-cyan-300 hover:text-cyan-200 hover:scale-105"
                          >
                            <FaFacebook className="text-sm" />
                            Facebook
                          </a>
                          <a
                            href="https://www.uic.edu.ph/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900/50 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all duration-300 hover:border-cyan-300 hover:text-cyan-200 hover:scale-105"
                          >
                            <FaGlobe className="text-sm" />
                            Website
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>

                {/* Secondary Education - Senior Year */}
                <div className="relative md:pl-20">
                  <div className="absolute left-6 top-6 hidden md:block">
                    <div className="h-5 w-5 rounded-full border-4 border-emerald-400 bg-slate-900 shadow-lg shadow-emerald-400/50"></div>
                  </div>
                  <article className="group rounded-2xl border border-emerald-300/30 bg-gradient-to-br from-emerald-900/20 to-slate-950/50 p-6 hover-lift transition-all duration-300 hover:border-emerald-300/60 hover:shadow-lg hover:shadow-emerald-400/20">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="absolute -inset-2 bg-emerald-400/20 rounded-2xl blur-xl group-hover:bg-emerald-400/30 transition-all duration-300"></div>
                          <img src="/Assests/img/UM_logo.jpg" alt="UM Logo" className="relative h-24 w-24 rounded-2xl border-2 border-emerald-300/40 bg-white object-contain p-3 shadow-xl" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <span className="inline-block rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-200 mb-2">Secondary - Senior</span>
                            <h4 className="font-display text-xl text-white mb-1">STEM (Science, Technology, and Mathematics)</h4>
                            <p className="text-base font-semibold text-emerald-200">University of Mindanao</p>
                          </div>
                          <span className="rounded-lg bg-emerald-400/20 px-3 py-1.5 text-sm font-bold text-emerald-200 border border-emerald-400/30">2020 - 2022</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <a
                            href="https://www.facebook.com/uniminofficial"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900/50 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all duration-300 hover:border-emerald-300 hover:text-emerald-200 hover:scale-105"
                          >
                            <FaFacebook className="text-sm" />
                            Facebook
                          </a>
                          <a
                            href="https://umindanao.edu.ph/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900/50 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all duration-300 hover:border-emerald-300 hover:text-emerald-200 hover:scale-105"
                          >
                            <FaGlobe className="text-sm" />
                            Website
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>

                {/* Secondary Education - Junior Year */}
                <div className="relative md:pl-20">
                  <div className="absolute left-6 top-6 hidden md:block">
                    <div className="h-5 w-5 rounded-full border-4 border-amber-400 bg-slate-900 shadow-lg shadow-amber-400/50"></div>
                  </div>
                  <article className="group rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-900/20 to-slate-950/50 p-6 hover-lift transition-all duration-300 hover:border-amber-300/60 hover:shadow-lg hover:shadow-amber-400/20">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="absolute -inset-2 bg-amber-400/20 rounded-2xl blur-xl group-hover:bg-amber-400/30 transition-all duration-300"></div>
                          <img src="/Assests/img/UIC_logo.png" alt="UIC Logo" className="relative h-24 w-24 rounded-2xl border-2 border-amber-300/40 bg-white object-contain p-3 shadow-xl" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <span className="inline-block rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-200 mb-2">Secondary - Junior</span>
                            <h4 className="font-display text-xl text-white mb-1">Junior High School</h4>
                            <p className="text-base font-semibold text-amber-200">University of the Immaculate Conception</p>
                          </div>
                          <span className="rounded-lg bg-amber-400/20 px-3 py-1.5 text-sm font-bold text-amber-200 border border-amber-400/30">2016 - 2020</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <a
                            href="https://www.facebook.com/uicph"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900/50 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all duration-300 hover:border-amber-300 hover:text-amber-200 hover:scale-105"
                          >
                            <FaFacebook className="text-sm" />
                            Facebook
                          </a>
                          <a
                            href="https://www.uic.edu.ph/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900/50 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all duration-300 hover:border-amber-300 hover:text-amber-200 hover:scale-105"
                          >
                            <FaGlobe className="text-sm" />
                            Website
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>

                {/* Primary Education */}
                <div className="relative md:pl-20">
                  <div className="absolute left-6 top-6 hidden md:block">
                    <div className="h-5 w-5 rounded-full border-4 border-violet-400 bg-slate-900 shadow-lg shadow-violet-400/50"></div>
                  </div>
                  <article className="group rounded-2xl border border-violet-300/30 bg-gradient-to-br from-violet-900/20 to-slate-950/50 p-6 hover-lift transition-all duration-300 hover:border-violet-300/60 hover:shadow-lg hover:shadow-violet-400/20">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="absolute -inset-2 bg-violet-400/20 rounded-2xl blur-xl group-hover:bg-violet-400/30 transition-all duration-300"></div>
                          <img src="/Assests/img/DPLC_logo.jpg" alt="DPLC Logo" className="relative h-24 w-24 rounded-2xl border-2 border-violet-300/40 bg-white object-contain p-3 shadow-xl" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <span className="inline-block rounded-full bg-violet-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-200 mb-2">Primary</span>
                            <h4 className="font-display text-xl text-white mb-1">Elementary Education</h4>
                            <p className="text-base font-semibold text-violet-200">DoÃ±a Pilar Learning Center Foundation Inc.</p>
                          </div>
                          <span className="rounded-lg bg-violet-400/20 px-3 py-1.5 text-sm font-bold text-violet-200 border border-violet-400/30">2010 - 2016</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <a
                            href="https://www.facebook.com/dplcfi"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900/50 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all duration-300 hover:border-violet-300 hover:text-violet-200 hover:scale-105"
                          >
                            <FaFacebook className="text-sm" />
                            Facebook
                          </a>
                          <a
                            href="https://ph140379-dona-pilar-learning-center.contact.page/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900/50 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all duration-300 hover:border-violet-300 hover:text-violet-200 hover:scale-105"
                          >
                            <FaGlobe className="text-sm" />
                            Website
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {experienceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 animate-fade-in">
          <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 bg-slate-900 p-6 animate-scale-in relative z-50">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-2xl text-white">Professional Experience</h3>
              <button
                type="button"
                onClick={() => setExperienceModalOpen(false)}
                className="rounded-lg border border-slate-500 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-300 hover:text-cyan-200 transition-all duration-300"
              >
                Close
              </button>
            </div>
            
            {/* Timeline Layout */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-violet-400 via-amber-400 to-orange-400 hidden md:block"></div>
              
              <div className="space-y-8">
                {/* Internship - SPMC */}
                <div className="relative md:pl-20">
                  <div className="absolute left-6 top-6 hidden md:block">
                    <div className="h-5 w-5 rounded-full border-4 border-cyan-400 bg-slate-900 shadow-lg shadow-cyan-400/50 animate-pulse-slow"></div>
                  </div>
                  <article className="group rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-900/20 to-slate-950/50 p-6 hover-lift transition-all duration-300 hover:border-cyan-300/60 hover:shadow-lg hover:shadow-cyan-400/20">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block rounded-full bg-cyan-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-200">Internship</span>
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/20 px-2 py-1 text-xs font-bold text-emerald-200">
                                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                Current
                              </span>
                            </div>
                            <h4 className="font-display text-xl text-white mb-1">Southern Philippines Medical Center (SPMC)</h4>
                            <p className="text-sm text-slate-400 mb-2">ðŸ“ JP Laurel Avenue, Bajada, Davao City, 8000, Philippines</p>
                            <p className="text-sm text-cyan-200 font-semibold mb-3">Project: Referral System for Emergency Dispatch Communication Center (EDCC)</p>
                            <p className="text-sm text-slate-300 leading-relaxed">Developing a comprehensive hospital referral management system for incoming referrals across neighboring hospitals around the Philippines.</p>
                          </div>
                          <span className="rounded-lg bg-cyan-400/20 px-3 py-1.5 text-sm font-bold text-cyan-200 border border-cyan-400/30">Jan 2026 - Present</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(projectsData.find(p => p.id === 'spmc-referral'))}
                          className="group/thumb relative overflow-hidden rounded-xl border-2 border-cyan-300/40 shadow-xl hover:border-cyan-300/60 transition-all duration-300"
                        >
                          <div className="absolute -inset-2 bg-cyan-400/20 rounded-xl blur-xl group-hover/thumb:bg-cyan-400/30 transition-all duration-300"></div>
                          <img
                            src="/Assests/img/Projects/SPMC/SPMC_Login.png"
                            alt="SPMC Referral System Login"
                            className="relative h-40 w-56 object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 opacity-0 transition-opacity duration-300 group-hover/thumb:opacity-100">
                            <span className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg">
                              ðŸ–¼ï¸ View Project
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </article>
                </div>

                {/* HEROCS Thesis */}
                <div className="relative md:pl-20">
                  <div className="absolute left-6 top-6 hidden md:block">
                    <div className="h-5 w-5 rounded-full border-4 border-violet-400 bg-slate-900 shadow-lg shadow-violet-400/50"></div>
                  </div>
                  <article className="group rounded-2xl border border-violet-300/30 bg-gradient-to-br from-violet-900/20 to-slate-950/50 p-6 hover-lift transition-all duration-300 hover:border-violet-300/60 hover:shadow-lg hover:shadow-violet-400/20">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="inline-block rounded-full bg-violet-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-200">Thesis Project</span>
                              <span className="rounded-full border border-emerald-300/60 bg-emerald-300/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-emerald-200">Accepted</span>
                              <span className="rounded-full border border-cyan-300/60 bg-cyan-300/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-cyan-200">Published</span>
                            </div>
                            <h4 className="font-display text-xl text-white mb-1">HEROCS - On-Device Mobile Assessment System for Hazard Detection in Household Environments</h4>
                            <p className="text-sm text-violet-200 font-semibold mb-2">Group Thesis Project</p>
                            <p className="text-sm text-slate-300 leading-relaxed mb-3"> An on-device mobile computer vision system designed to enhance household safety by detecting and assessing hazards, particularly for toddlers aged 0-3 in Filipino homes.</p>
                            <p className="text-sm text-slate-400">
                              <span className="font-semibold text-slate-300">ðŸ“„ Publication:</span> 9th International Conference on Information and Computer Technologies (ICICT 2026)
                            </p>
                          </div>
                          <span className="rounded-lg bg-violet-400/20 px-3 py-1.5 text-sm font-bold text-violet-200 border border-violet-400/30">2025 - 2026</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => setSelectedPdf({ title: 'HEROCS Thesis Paper', href: '/Assests/documents/HEROCS.pdf' })}
                          className="group/thumb relative overflow-hidden rounded-xl border-2 border-violet-300/40 shadow-xl hover:border-violet-300/60 transition-all duration-300"
                        >
                          <div className="absolute -inset-2 bg-violet-400/20 rounded-xl blur-xl group-hover/thumb:bg-violet-400/30 transition-all duration-300"></div>
                          <img
                            src="/Assests/img/HEROCS_Thumbnail.jpg"
                            alt="HEROCS Thesis Thumbnail"
                            className="relative h-40 w-56 object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 opacity-0 transition-opacity duration-300 group-hover/thumb:opacity-100">
                            <span className="rounded-lg bg-violet-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg">
                              ðŸ“„ View PDF
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </article>
                </div>

                {/* Freelance Web Development */}
                <div className="relative md:pl-20">
                  <div className="absolute left-6 top-6 hidden md:block">
                    <div className="h-5 w-5 rounded-full border-4 border-amber-400 bg-slate-900 shadow-lg shadow-amber-400/50"></div>
                  </div>
                  <article className="group rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-900/20 to-slate-950/50 p-6 hover-lift transition-all duration-300 hover:border-amber-300/60 hover:shadow-lg hover:shadow-amber-400/20">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="absolute -inset-2 bg-amber-400/20 rounded-2xl blur-xl group-hover:bg-amber-400/30 transition-all duration-300"></div>
                          <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-amber-300/40 bg-gradient-to-br from-amber-900/50 to-slate-900 shadow-xl">
                            <FaReact className="text-4xl text-amber-300" />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-200">Freelance</span>
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/20 px-2 py-1 text-xs font-bold text-emerald-200">
                                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                Active
                              </span>
                            </div>
                            <h4 className="font-display text-xl text-white mb-2">Web Development</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">
                              Providing custom web development services including frontend design, full-stack application development, and website optimization. Working with modern frameworks like React, Django, and Vue to deliver responsive and user-friendly web solutions tailored to client needs.
                            </p>
                          </div>
                          <span className="rounded-lg bg-amber-400/20 px-3 py-1.5 text-sm font-bold text-amber-200 border border-amber-400/30">2024 - Present</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>

                {/* Hardware Services */}
                <div className="relative md:pl-20">
                  <div className="absolute left-6 top-6 hidden md:block">
                    <div className="h-5 w-5 rounded-full border-4 border-orange-400 bg-slate-900 shadow-lg shadow-orange-400/50"></div>
                  </div>
                  <article className="group rounded-2xl border border-orange-300/30 bg-gradient-to-br from-orange-900/20 to-slate-950/50 p-6 hover-lift transition-all duration-300 hover:border-orange-300/60 hover:shadow-lg hover:shadow-orange-400/20">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="absolute -inset-2 bg-orange-400/20 rounded-2xl blur-xl group-hover:bg-orange-400/30 transition-all duration-300"></div>
                          <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-orange-300/40 bg-gradient-to-br from-orange-900/50 to-slate-900 shadow-xl">
                            <svg className="h-12 w-12 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block rounded-full bg-orange-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-200">Hardware Services</span>
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/20 px-2 py-1 text-xs font-bold text-emerald-200">
                                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                Active
                              </span>
                            </div>
                            <h4 className="font-display text-xl text-white mb-2">Custom Computer Build, System Diagnostics & Troubleshooting</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">
                              Offering professional PC building services, hardware diagnostics, and troubleshooting solutions. Specializing in custom gaming and workstation builds, component upgrades, system optimization, and resolving hardware-related issues to ensure optimal performance and reliability.
                            </p>
                          </div>
                          <span className="rounded-lg bg-orange-400/20 px-3 py-1.5 text-sm font-bold text-orange-200 border border-orange-400/30">2022 - Present</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/85 p-4 animate-fade-in" onClick={() => setSelectedProject(null)}>
          <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 bg-slate-900 p-6 animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-2xl text-white">{selectedProject.name}</h3>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="rounded-lg border border-slate-500 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-300 hover:text-cyan-200 transition-all duration-300"
              >
                Close
              </button>
            </div>

            {/* Image Gallery */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-cyan-200 mb-3">Screenshots</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedProject.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedProjectImage(image)}
                    className="group relative h-52 rounded-xl overflow-hidden border border-white/10 bg-slate-950/80 hover:border-cyan-300/60 transition-all duration-300"
                  >
                    <img 
                      src={image.src} 
                      alt={image.title}
                      className="w-full h-full object-contain object-center p-2 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">{image.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-6">
              {/* Description */}
              <section>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-cyan-200 mb-2">DESCRIPTION</h4>
                {Array.isArray(selectedProject.description) ? (
                  <div className="space-y-3">
                    {selectedProject.description.map((paragraph, idx) => (
                      <p key={idx} className="text-sm text-slate-300 leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-300 leading-relaxed">{selectedProject.description}</p>
                )}
              </section>

              {/* Tech Stack */}
              <section>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-cyan-200 mb-3">TECH STACK</h4>
                {Array.isArray(selectedProject.techStackSections) ? (
                  <div className="space-y-4">
                    {selectedProject.techStackSections.map((section, idx) => (
                      <div key={idx}>
                        <p className="text-xs font-semibold text-cyan-300 mb-2">{section.heading}</p>
                        <ul className="space-y-1.5">
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex gap-2 text-sm text-slate-300">
                              <span className="text-cyan-300 mt-1">â€¢</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-cyan-300 mb-2">Frontend</p>
                      <p className="text-sm text-slate-400">{selectedProject.techStack.frontend}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-emerald-300 mb-2">Backend</p>
                      <p className="text-sm text-slate-400">{selectedProject.techStack.backend}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-blue-300 mb-2">Database</p>
                      <p className="text-sm text-slate-400">{selectedProject.techStack.database}</p>
                    </div>
                  </div>
                )}
              </section>

              {/* Key Features */}
              <section>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-cyan-200 mb-3">KEY FEATURES</h4>
                <ul className="space-y-2">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-slate-300">
                      <span className="text-cyan-300 mt-1">â€¢</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                {selectedProject.links.github && (
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-2 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-cyan-300 hover:text-cyan-200 hover:scale-105"
                  >
                    <FaGithub className="text-base" />
                    View on GitHub
                  </a>
                )}
                {selectedProject.links.website && (
                  <a
                    href={selectedProject.links.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-cyan-600 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition-all duration-300 hover:bg-cyan-400/20 hover:scale-105"
                  >
                    <FaGlobe className="text-base" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Image Viewer Modal */}
      {selectedProjectImage && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 p-4 animate-fade-in" onClick={() => setSelectedProjectImage(null)}>
          <div className="relative w-full max-w-7xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedProjectImage(null)}
              className="absolute -top-12 right-0 rounded-lg border border-slate-500 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-300 hover:text-cyan-200 transition-all duration-300"
            >
              Close
            </button>
            <div className="rounded-2xl border border-white/15 bg-slate-900 p-4 animate-scale-in">
              <h4 className="text-lg font-semibold text-white mb-3">{selectedProjectImage.title}</h4>
              <div className="relative">
                {canNavigateProjectImages && (
                  <button
                    type="button"
                    onClick={showPreviousProjectImage}
                    className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-lg border border-white/20 bg-slate-900/80 px-3 py-2 text-lg font-semibold text-white hover:border-cyan-300 hover:text-cyan-200"
                    aria-label="Previous image"
                  >
                    {'<'}
                  </button>
                )}
                <img
                  src={selectedProjectImage.src}
                  alt={selectedProjectImage.title}
                  className="mx-auto max-h-[75vh] w-auto max-w-full rounded-xl border border-white/10 object-contain"
                />
                {canNavigateProjectImages && (
                  <button
                    type="button"
                    onClick={showNextProjectImage}
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-lg border border-white/20 bg-slate-900/80 px-3 py-2 text-lg font-semibold text-white hover:border-cyan-300 hover:text-cyan-200"
                    aria-label="Next image"
                  >
                    {'>'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

