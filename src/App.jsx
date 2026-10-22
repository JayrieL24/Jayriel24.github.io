import { useState, useEffect, useRef } from 'react'
import heroImage from '/Assests/img/Barong Pic.jpg'
import { FaCss3Alt, FaFacebook, FaFilm, FaGithub, FaGlobe, FaHome, FaHtml5, FaJava, FaPython, FaReact, FaVideo, FaVuejs, FaUser, FaBriefcase, FaCertificate, FaProjectDiagram, FaGraduationCap, FaBars, FaFileAlt, FaEnvelope, FaLinkedin, FaDesktop } from 'react-icons/fa'
import { FaAws, FaXTwitter } from 'react-icons/fa6'
import { SiCanva, SiDjango, SiFastapi, SiFigma, SiJavascript, SiMake, SiMysql, SiN8N } from 'react-icons/si'

const certificateFiles = import.meta.glob('../Assests/{certificates,Certificates}/*.{pdf,png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const externalVideos = [
  {
    title: 'LionFish_Trivia',
    href: 'https://drive.google.com/file/d/1LT3efurxX4g1ZZanXhd4k3VegYREou4u/view?usp=sharing',
    poster: '/Assests/img/video-thumbs/lionfish_trivia.jpg',
    category: 'Trivia Edits',
    external: true,
  },
  {
    title: 'Ruka Sarashina Edit',
    href: 'https://drive.google.com/file/d/1p5GtfX_zQvrOplUjeEdxlQnHBmM5Ht5k/view?usp=sharing',
    poster: '/Assests/img/video-thumbs/ruka_sarashina_edit.jpg',
    category: 'Anime Edits',
    external: true,
  },
  {
    title: 'Marin Kitagawa Edit',
    href: 'https://drive.google.com/file/d/10vuEMYyQwSGDi5Ie3pSM2JcJzKi9MgZx/view',
    poster: '/Assests/img/video-thumbs/marin_kitagawa_edit.jpg',
    category: 'Anime Edits',
    external: true,
  },
  {
    title: 'Chika Fujiwara (Sunflower)',
    href: 'https://drive.google.com/file/d/1wm7e1GOMKeynhLBCMpwLzk5ZuX37Be6S/view',
    poster: '/Assests/img/video-thumbs/chika_fujiwara_sunflower.jpg',
    category: 'Anime Edits',
    external: true,
  },
  {
    title: 'Clip_Edit',
    href: 'https://drive.google.com/file/d/1vo8gI2lhMYlqq8UGXSpQDzSOXl3KfDD7/view',
    poster: '/Assests/img/video-thumbs/clip_edit.jpg',
    category: 'Clip Edits',
    external: true,
  },
  {
    title: 'Business Edit',
    href: 'https://drive.google.com/file/d/1nCbSF3IdO0wdjk6X_rod3R6XFaGkiWDm/view?usp=sharing',
    poster: '/Assests/img/video-thumbs/business_edit.jpg',
    category: 'Business Edits',
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
    items: [
      { name: 'Canva', Icon: SiCanva, color: 'text-cyan-200', category: 'Tool' },
      { name: 'Figma', Icon: SiFigma, color: 'text-violet-200', category: 'Tool' },
    ],
  },
  {
    title: 'AI Automation Tools',
    items: [
      { name: 'n8n', Icon: SiN8N, color: 'text-orange-200', category: 'Tool' },
      { name: 'Make', Icon: SiMake, color: 'text-violet-200', category: 'Tool' },
    ],
  },
  {
    title: 'Video Editing',
    items: [
      { name: 'CapCut', Icon: FaVideo, color: 'text-slate-200', category: 'Tool' },
      { name: 'DaVinci Resolve', Icon: FaFilm, color: 'text-violet-200', category: 'Tool' },
    ],
  },
]

const tabIds = ['home', 'about', 'projects-panel', 'dashboard', 'credentials', 'contact']
function readTab() {
  const hash = window.location.hash.slice(1)
  return tabIds.includes(hash) ? hash : hash === 'videos-panel' ? 'dashboard' : 'home'
}

function App() {
  const [activeTab, setActiveTab] = useState(readTab)
  const contentRef = useRef(null)
  const headingRef = useRef(null)
  useEffect(() => {
    const changeTab = () => {
      setActiveTab(readTab())
      setMobileMenuOpen(false)
      setShowWorksDropdown(false)
      setShowEmailDropdown(false)
      if (contentRef.current) contentRef.current.scrollTop = 0
      headingRef.current?.focus({ preventScroll: true })
    }
    const closeMenu = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
        document.querySelector('.mobile-toggle')?.focus()
      }
    }
    window.addEventListener('hashchange', changeTab)
    window.addEventListener('keydown', closeMenu)
    return () => {
      window.removeEventListener('hashchange', changeTab)
      window.removeEventListener('keydown', closeMenu)
    }
  }, [])
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [selectedPdf, setSelectedPdf] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [compactNavigation, setCompactNavigation] = useState(() => window.matchMedia('(max-width: 1024px)').matches)
  const [educationModalOpen, setEducationModalOpen] = useState(false)
  const [experienceModalOpen, setExperienceModalOpen] = useState(false)
  const [projectFilter, setProjectFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedProjectImage, setSelectedProjectImage] = useState(null)
  const [posterAttempts, setPosterAttempts] = useState({})
  const [showEmailDropdown, setShowEmailDropdown] = useState(false)
  const [showWorksDropdown, setShowWorksDropdown] = useState(false)
  const emailDropdownRef = useRef(null)
  const emailDropdownRef2 = useRef(null)
  const worksDropdownRef = useRef(null)
  
  useEffect(() => {
    if (!compactNavigation) return
    contentRef.current?.scrollTo({ top: 0 })
    document.querySelector('.workspace-body')?.scrollTo({ top: 0 })
  }, [activeTab, compactNavigation])

  const modalOpen = Boolean(selectedCertificate || selectedPdf || educationModalOpen || experienceModalOpen || selectedProject || selectedProjectImage)
  useEffect(() => {
    const query = window.matchMedia('(max-width: 1024px)')
    const updateNavigation = () => {
      setCompactNavigation(query.matches)
      if (!query.matches) setMobileMenuOpen(false)
    }
    query.addEventListener('change', updateNavigation)
    return () => query.removeEventListener('change', updateNavigation)
  }, [])

  useEffect(() => {
    if (!compactNavigation || (!mobileMenuOpen && !modalOpen)) return
    const previousFocus = document.activeElement
    const sidebar = document.getElementById('portfolio-navigation')
    const dialogs = document.querySelectorAll('[role="dialog"]')
    const surface = modalOpen ? dialogs[dialogs.length - 1] : sidebar
    const focusable = () => [...surface.querySelectorAll('a[href], button:not([disabled]), iframe, [tabindex="0"]')].filter((element) => element.getClientRects().length)
    focusable()[0]?.focus({ preventScroll: true })
    const trapFocus = (event) => {
      if (event.key === 'Escape' && modalOpen) {
        event.preventDefault()
        if (selectedProjectImage) setSelectedProjectImage(null)
        else if (selectedPdf) setSelectedPdf(null)
        else if (selectedProject) setSelectedProject(null)
        else if (selectedCertificate) setSelectedCertificate(null)
        else if (experienceModalOpen) setExperienceModalOpen(false)
        else setEducationModalOpen(false)
      }
      if (event.key !== 'Tab') return
      const elements = focusable()
      const first = elements[0]
      const last = elements[elements.length - 1]
      if (event.shiftKey && (document.activeElement === first || !surface.contains(document.activeElement))) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && (document.activeElement === last || !surface.contains(document.activeElement))) {
        event.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener('keydown', trapFocus)
    return () => {
      document.removeEventListener('keydown', trapFocus)
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true })
    }
  }, [compactNavigation, mobileMenuOpen, modalOpen, selectedCertificate, selectedPdf, educationModalOpen, experienceModalOpen, selectedProject, selectedProjectImage])

  // Project data with images
  const projectsData = [
    {
      id: 'spmc-referral',
      projectType: 'system',
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
      projectType: 'system',
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
        'Borrow Workflow: Request -> Approval -> RFID & barcode scanning',
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
      projectType: 'system',
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
        'HEROCS (Home Hazard Evaluation and Risk Object Classification System) is an on-device mobile computer vision system designed to detect and assess household hazards in Filipino home environments. The system focuses on risks affecting children aged 0-3 years by identifying hazardous objects in real time using a fine-tuned YOLOv8s model.',
        'Unlike traditional binary safe/unsafe systems, HEROCS applies a multi-label classification framework that assigns multiple hazard attributes (e.g., sharp, toxic, within reach) to detected objects. These attributes are processed through a structured hazard scoring rubric to compute a Household Danger Index (HDI), providing an overall environmental risk assessment.',
        'The system integrates Augmented Reality (AR) overlays to deliver color-coded bounding boxes, interactive hazard details, and preventive safety recommendations - all processed directly on-device without cloud dependency.',
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
        'Real-time hazard detection (28-32 FPS on mid-range Android devices)',
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
    },
    {
      id: 'ai-transcribing-automation',
      projectType: 'automation',
      name: 'AI Transcribing Automation',
      status: 'Completed',
      statusColor: 'emerald',
      hideStatusBadge: true,
      thumbnail: '/Assests/img/Projects/Ai_Transcribing_Automation/Automation_Sample.png',
      images: [
        { src: '/Assests/img/Projects/Ai_Transcribing_Automation/Automation_Sample.png', title: 'Workflow Preview' },
      ],
      shortDescription: 'Automates long audio transcription into structured Google Docs meeting notes.',
      disclaimer:
        'Note: The original concept required a paid subscription I currently cannot afford, so I implemented a local API to handle audio splitting and transcription instead.',
      techStack: {
        frontend: 'n8n Cloud, Google Drive API, Google Docs API',
        backend: 'Python FastAPI, ffmpeg, faster-whisper + CTranslate2, Cloudflare Tunnel, NVIDIA CUDA Toolkit 12.x',
        database: 'Windows + NVIDIA GTX 1650 Ti (Local Runtime)'
      },
      contentSections: [
        {
          title: '1. Project Overview',
          type: 'paragraph',
          content:
            'This automation turns long audio recordings into clean, structured meeting notes. It solves the problem of manual transcription by automatically converting audio into organized documentation.'
        },
        {
          title: '2. How It Works (Step-by-Step Flow)',
          type: 'list',
          items: [
            'Audio file uploaded to Google Drive',
            'File made publicly accessible',
            'n8n sends file ID to my local server',
            'Local Python FastAPI server downloads the file',
            'ffmpeg optimizes and splits large audio files',
            'GPU-accelerated Whisper (faster-whisper + CUDA) transcribes the audio',
            'Transcript is returned to n8n',
            'AI node cleans and structures the transcript',
            'Google Docs automatically created with formatted notes'
          ]
        },
        {
          title: '3. Tech Stack',
          type: 'list',
          items: [
            'n8n Cloud: workflow automation platform that connects each step.',
            'Python FastAPI: local API server that receives file IDs and handles processing.',
            'ffmpeg: processes audio and splits large files into manageable parts.',
            'faster-whisper + CTranslate2: fast local transcription engine.',
            'NVIDIA CUDA Toolkit 12.x: enables GPU acceleration for faster processing.',
            'Cloudflare Tunnel: secure public access path to the local server.',
            'Google Drive API: handles audio file storage and retrieval.',
            'Google Docs API: generates the final formatted notes document.',
            'Windows + NVIDIA GTX 1650 Ti: local environment running the inference pipeline.'
          ]
        },
        {
          title: '4. Key Technical Highlights',
          type: 'list',
          items: [
            'Large file handling (350MB+ / 1.5 hour audio)',
            'Automatic chunk splitting under 25MB',
            'GPU acceleration for faster transcription',
            'Zero OpenAI API cost (fully local inference)',
            'Stable named tunnel option vs temporary tunnel'
          ]
        },
        {
          title: '5. Challenges & Lessons Learned',
          type: 'list',
          items: [
            'I resolved CUDA setup issues, including missing DLL errors such as cublas64_12.dll.',
            'I made sure ffmpeg was installed and accessible system-wide.',
            'I adjusted Google Drive file-sharing so automation could access files securely.',
            'I set up Cloudflare Tunnel as a secure bridge between my local machine and n8n Cloud.',
            'I learned that quick tunnels can disconnect, while named tunnels are better for stable long-running workflows.'
          ]
        },
        {
          title: '6. Why This Project Matters',
          type: 'list',
          items: [
            'Automates long-form meeting documentation',
            'Saves hours of manual transcription work',
            'Uses local GPU instead of paid APIs',
            'Shows full-stack AI automation capability'
          ]
        }
      ],
      links: {
        github: 'https://github.com/JayrieL24/Automation_Transcriber',
        website: null
      }
    }
  ]
  
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



  // Best-effort protection for sensitive PDF views (resume)
  useEffect(() => {
    if (!selectedPdf?.protected) return

    const preventContextMenu = (event) => {
      event.preventDefault()
    }

    const preventShortcuts = (event) => {
      const key = event.key?.toLowerCase()
      const blockedCombos = ['s', 'p', 'c', 'u', 'a']

      if ((event.ctrlKey || event.metaKey) && blockedCombos.includes(key)) {
        event.preventDefault()
      }

      if (key === 'printscreen') {
        event.preventDefault()
      }
    }

    const previousUserSelect = document.body.style.userSelect
    document.body.style.userSelect = 'none'
    document.addEventListener('contextmenu', preventContextMenu)
    document.addEventListener('keydown', preventShortcuts)

    return () => {
      document.body.style.userSelect = previousUserSelect
      document.removeEventListener('contextmenu', preventContextMenu)
      document.removeEventListener('keydown', preventShortcuts)
    }
  }, [selectedPdf])
  
  const projectsList = projectsData.map(p => ({ id: p.id, name: p.name }))
  const visibleProjects = projectsData.filter((project) => projectFilter === 'all' || project.projectType === projectFilter)
  const isProtectedPdf = Boolean(selectedPdf?.protected)
  const protectedResumePreviewImages = ['/Assests/img/resume-preview/resume-2026-10-23-c604ce91-page-1.png']
  const selectedPdfViewerHref = selectedPdf?.protected
    ? `${selectedPdf.href}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`
    : selectedPdf?.href
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

  const renderProjectCard = (project) => {
    const frontendSummary =
      project.techStack?.frontend?.split(',')[0] ||
      project.techStackSections?.find((section) => section.heading === 'Frontend')?.items?.[0] ||
      'Not specified'
    const backendSummary =
      project.techStack?.backend?.split(',')[0] ||
      project.techStackSections?.find((section) => section.heading === 'Computer Vision & AI')?.items?.[0] ||
      'Not specified'
    const databaseSummary =
      project.techStack?.database ||
      project.techStackSections?.find((section) => section.heading === 'Dataset')?.items?.[0] ||
      'Not specified'

    return (
      <button type="button" key={project.id} onClick={() => setSelectedProject(project)} className="project-preview" aria-label={`View details for ${project.name}`}>
        <div className="project-preview-image"><img src={project.thumbnail} alt={project.name} loading="lazy" /><span className="project-type-badge">{project.projectType === 'automation' ? 'Automation' : 'System'}</span></div>
        <div className="project-preview-body">
          <div className="project-preview-meta">{!project.hideStatusBadge && <span className="project-preview-status">{project.status}</span>}</div>
          <h3>{project.name}</h3>
          <p>{project.shortDescription}</p>
          <div className="project-preview-stack">{[frontendSummary, backendSummary, databaseSummary].filter((item) => item !== 'Not specified').map((item, index) => <span key={index}>{item}</span>)}</div>
          <div className="project-preview-footer"><span>View details</span><span aria-hidden="true">&#8599;</span></div>
        </div>
      </button>
    )
  }

  const navLinks = [
    { href: '#home', label: 'Home', icon: FaHome, description: 'An introduction to my work and skills' },
    { href: '#about', label: 'About', icon: FaUser, description: 'My story, education and experience' },
    { href: '#projects-panel', label: 'Projects', icon: FaProjectDiagram, description: 'Systems, applications and automation' },
    { href: '#dashboard', label: 'Video Editing', icon: FaVideo, description: 'A collection of my creative work' },
    { href: '#credentials', label: 'Certificates', icon: FaCertificate, description: 'Learning, qualifications and milestones' },
    { href: '#contact', label: 'Contact', icon: FaEnvelope, description: "Let’s start a conversation" },
  ]
  const currentTab = navLinks.find((link) => link.href.slice(1) === activeTab) || navLinks[0]

  return (
    <div id="top" className="min-h-screen bg-app text-slate-100">
      <a className="skip-link" href="#main-content" onClick={(event) => { event.preventDefault(); contentRef.current?.focus() }}>Skip to content</a>
      {mobileMenuOpen && <button className="sidebar-backdrop" aria-label="Close navigation" onClick={() => setMobileMenuOpen(false)} />}
      <aside inert={compactNavigation && (modalOpen || !mobileMenuOpen)} aria-hidden={compactNavigation && !mobileMenuOpen ? true : undefined} id="portfolio-navigation" className={`portfolio-sidebar ${mobileMenuOpen ? 'is-open' : ''}`}>
        <button type="button" className="sidebar-close" aria-label="Close navigation" onClick={() => setMobileMenuOpen(false)}>&#215;</button>
        <a href="#home" className="sidebar-brand" onClick={() => setMobileMenuOpen(false)}><span className="brand-monogram">J.</span><span>Jayci Acuña<span className="brand-caption">PERSONAL PORTFOLIO</span></span></a>
        <div className="sidebar-profile"><img src={heroImage} alt="" /><div><strong>Jayci Gabriel</strong><span>Developer & creative</span></div><span className="profile-dot" /></div>
        <p className="sidebar-label">EXPLORE</p>
        <nav aria-label="Main navigation">
          {navLinks.map(({ href, label, icon: Icon }, index) => <a key={href} href={href} aria-current={currentTab.href === href ? 'page' : undefined} onClick={() => setMobileMenuOpen(false)}><Icon aria-hidden="true" /><span>{label}</span><small>{String(index + 1).padStart(2, '0')}</small></a>)}
        </nav>
        <div className="sidebar-bottom"><p>Based in Davao City,<br />Philippines <span>&#8599;</span></p><div><a href="https://github.com/Jayriel24" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a><a href="https://www.linkedin.com/in/jayci-gabriel-acu%C3%B1a-3281953b4" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a><a href="mailto:JayGabri24@gmail.com" aria-label="Email"><FaEnvelope /></a></div><small>Built with curiosity. Always learning.</small></div>
      </aside>
      <div className="portfolio-workspace" inert={compactNavigation && (modalOpen || mobileMenuOpen)}>
        <header className="workspace-header">
          <div className="workspace-breadcrumb"><button className="mobile-toggle" aria-label="Toggle navigation" aria-controls="portfolio-navigation" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><FaBars /></button><span>Portfolio</span><span>/</span><strong>{currentTab.label}</strong></div>
          {compactNavigation ? <a href="#contact" className="header-contact"><span className="header-contact-long">Let's connect</span><span className="header-contact-short">Contact</span><span aria-hidden="true">&#8599;</span></a> : <a href="#contact" className="header-contact">Let's connect <span>&#8599;</span></a>}
        </header>
        <div className={`workspace-body ${activeTab === 'home' ? 'is-home' : ''}`}>
        <main id="main-content" className="portfolio-content" data-tab={activeTab} ref={contentRef} tabIndex={-1}>
          <div className="page-heading"><div><p>THE PORTFOLIO OF JAYCI ACUÑA</p><h2 ref={headingRef} tabIndex={-1}>{currentTab.label === 'Home' ? 'A little about me.' : currentTab.label}</h2><span>{currentTab.description}</span></div><span className="page-index">/ {String(navLinks.indexOf(currentTab) + 1).padStart(2, '0')}</span></div>
          <div className="compact-home-hero">
            <div className="compact-home-copy">
              <p className="compact-home-eyebrow">DEVELOPER & CREATIVE</p>
              <h1><span>Jayci Gabriel</span><span>Fernandez Acuña</span></h1>
              <p className="compact-home-role">Full Stack Web Developer & Technical Analyst</p>
            </div>
            <div className="compact-home-portrait"><img src="/Assests/img/barong-mobile-transparent.png" alt="Jayci Gabriel Acuña" /></div>
          </div>
        <section className="mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1.1fr_0.9fr]" id="home">
          <div className="home-introduction space-y-6">
            {/* Badges with staggered slide-in animation */}
            <div className="flex flex-wrap gap-2 animate-enter-left">
              <p className="w-fit rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 transition-all duration-300 hover:scale-110 hover:border-cyan-300/60 hover:bg-cyan-300/20 hover:shadow-lg hover:shadow-cyan-400/30 animate-fade-in stagger-1 sm:tracking-[0.25em]">
                Programmer
              </p>
              <p className="w-fit rounded-full border border-yellow-300/40 bg-yellow-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-700 transition-all duration-300 hover:scale-110 hover:border-yellow-300/60 hover:bg-yellow-300/20 hover:shadow-lg hover:shadow-yellow-400/30 animate-fade-in stagger-2 sm:tracking-[0.25em]">
                Computer Enthusiast
              </p>
              <p className="w-fit rounded-full border border-red-300/40 bg-red-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-700 transition-all duration-300 hover:scale-110 hover:border-red-300/60 hover:bg-red-300/20 hover:shadow-lg hover:shadow-red-400/30 animate-fade-in stagger-3 sm:tracking-[0.25em]">
                Video Editor
              </p>
              <p className="w-fit rounded-full border border-orange-300/40 bg-orange-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-700 transition-all duration-300 hover:scale-110 hover:border-orange-300/60 hover:bg-orange-300/20 hover:shadow-lg hover:shadow-orange-400/30 animate-fade-in stagger-4 sm:tracking-[0.25em]">
                Gamer
              </p>
            </div>
            
            {/* Name and title with slide-in animation */}
            <div className="home-desktop-heading animate-enter-left" style={{ animationDelay: '0.2s' }}>
              <h1 className="font-display text-3xl leading-tight text-slate-900 sm:text-5xl transition-all duration-300 hover:text-cyan-700">
                Jayci Gabriel Fernandez Acuña
              </h1>
              <p className="mt-3 text-lg font-medium text-cyan-700 sm:text-xl animate-pulse-slow">
                Full Stack Web Developer & Technical Analyst
              </p>
            </div>
            
            {/* Description with fade-in animation */}
            <p className="max-w-xl text-base leading-relaxed text-slate-600 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              I am Jayci Gabriel Fernandez Acuña from Davao City, Philippines. I am now a Computer Science graduate focused on growing as a developer by building practical projects and continuously strengthening my skills in technical analysis and problem-solving. 
              I enjoy applying my analytical skills to understand problems, evaluate solutions, and develop user-focused applications through hands-on practice and continuous learning.
            </p>
            
            {/* Buttons with staggered slide-up animation */}
            <div className="home-actions flex flex-wrap gap-4 animate-enter-up" style={{ animationDelay: '0.6s' }}>
              {/* View Works with Dropdown */}
              <div className="relative" ref={worksDropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowWorksDropdown(!showWorksDropdown)}
                  aria-expanded={showWorksDropdown}
                  aria-controls="home-works-menu"
                  className="home-works-trigger flex items-center gap-2"
                >
                  View Works
                  <svg className={`h-4 w-4 transition-transform duration-300 ${showWorksDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Works Dropdown */}
                {showWorksDropdown && (
                  <div id="home-works-menu" className="home-works-menu">
                    <a
                      href="#projects-panel"
                      onClick={() => setShowWorksDropdown(false)}
                      className="home-works-link"
                    >
                      <div className="flex items-center gap-2">
                        <FaProjectDiagram className="home-works-icon" />
                        <span>Projects</span>
                      </div>
                    </a>
                    <a
                      href="#dashboard"
                      onClick={() => setShowWorksDropdown(false)}
                      className="home-works-link"
                    >
                      <div className="flex items-center gap-2">
                        <FaVideo className="home-works-icon" />
                        <span>Video Edits</span>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              <a
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-cyan-300 hover:text-cyan-700 hover:shadow-lg hover:shadow-cyan-400/30 hover:-translate-y-1 active:translate-y-0"
                href="#credentials"
              >
                Credentials
              </a>
              <button
                type="button"
                onClick={() =>
                  setSelectedPdf({
                    title: 'Resume - Jayci Gabriel F. Acuña',
                    href: '/Assests/documents/Resume-Jayci Gabriel F. Acuña.pdf',
                    protected: true,
                    watermarkText: 'PROPERTY OF JAYCI GABRIEL F. ACUÑA',
                    previewImages: protectedResumePreviewImages,
                  })
                }
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-cyan-300 hover:text-cyan-700 hover:shadow-lg hover:shadow-cyan-400/30 hover:-translate-y-1 active:translate-y-0"
              >
                Resume
              </button>
              <a
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-cyan-300 hover:text-cyan-700 hover:shadow-lg hover:shadow-cyan-400/30 hover:-translate-y-1 active:translate-y-0"
                href="#about"
              >
                About Me
              </a>
            </div>
            {/* Contacts Section */}
            <div className="home-socials" style={{ animationDelay: '0.8s' }}>
              <h3 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700 mb-4 animate-fade-in" style={{ animationDelay: '0.9s' }}>Contacts</h3>
              <div className="flex flex-wrap gap-3">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/Jaysgabri.acna24/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white transition-all duration-300 hover:border-blue-400 hover:bg-blue-400/10 hover:shadow-lg hover:shadow-blue-400/30 hover:-translate-y-1 hover:rotate-6 animate-scale-in"
                  style={{ animationDelay: '1s' }}
                  title="Facebook"
                >
                  <FaFacebook className="text-xl text-slate-600 transition-all duration-300 group-hover:text-blue-400 group-hover:scale-110" />
                </a>

                {/* Twitter/X */}
                <a
                  href="https://x.com/jygbrl_acna"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white transition-all duration-300 hover:border-slate-300 hover:bg-slate-300/10 hover:shadow-lg hover:shadow-slate-300/30 hover:-translate-y-1 hover:rotate-6 animate-scale-in"
                  style={{ animationDelay: '1.1s' }}
                  title="Twitter/X"
                >
                  <FaXTwitter className="text-xl text-slate-600 transition-all duration-300 group-hover:text-slate-900 group-hover:scale-110" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/Jayriel24"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white transition-all duration-300 hover:border-purple-400 hover:bg-purple-400/10 hover:shadow-lg hover:shadow-purple-400/30 hover:-translate-y-1 hover:rotate-6 animate-scale-in"
                  style={{ animationDelay: '1.2s' }}
                  title="GitHub"
                >
                  <FaGithub className="text-xl text-slate-600 transition-all duration-300 group-hover:text-purple-400 group-hover:scale-110" />
                </a>

                {/* Email with Dropdown */}
                <div className="relative animate-scale-in" style={{ animationDelay: '1.3s' }} ref={emailDropdownRef}>
                  <button
                    onClick={() => setShowEmailDropdown(!showEmailDropdown)}
                    className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/30 hover:-translate-y-1 hover:rotate-6"
                    title="Email" aria-label="Show email addresses" aria-expanded={showEmailDropdown}
                  >
                    <FaEnvelope className="text-xl text-slate-600 transition-all duration-300 group-hover:text-cyan-400 group-hover:scale-110" />
                  </button>

                  {/* Email Dropdown */}
                  {showEmailDropdown && (
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 w-64 rounded-xl border border-slate-200 bg-white backdrop-blur-sm p-3 shadow-xl animate-scale-in">
                      <div className="space-y-2">
                        <a
                          href="mailto:jacuna_220000001342@uic.edu.ph"
                          className="block rounded-lg border border-slate-300 bg-slate-800/50 px-3 py-2 text-xs text-slate-600 transition-all hover:border-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-700 hover:scale-105"
                          onClick={() => setShowEmailDropdown(false)}
                        >
                          <div className="font-semibold text-cyan-700 mb-1">School Email</div>
                          jacuna_220000001342@uic.edu.ph
                        </a>
                        <a
                          href="mailto:JayGabri24@gmail.com"
                          className="block rounded-lg border border-slate-300 bg-slate-800/50 px-3 py-2 text-xs text-slate-600 transition-all hover:border-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-700 hover:scale-105"
                          onClick={() => setShowEmailDropdown(false)}
                        >
                          <div className="font-semibold text-cyan-700 mb-1">Personal Email</div>
                          JayGabri24@gmail.com
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowEmailDropdown(false)}
                        className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-800/50 px-3 py-1.5 text-xs font-semibold text-slate-500 transition-all hover:border-slate-500 hover:text-slate-600 hover:scale-105"
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
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white transition-all duration-300 hover:border-blue-500 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 hover:rotate-6 animate-scale-in"
                  style={{ animationDelay: '1.4s' }}
                  title="LinkedIn"
                >
                  <FaLinkedin className="text-xl text-slate-600 transition-all duration-300 group-hover:text-blue-500 group-hover:scale-110" />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section id="home-skills" className="home-skills">
          <div className="skills-heading"><div><p>WHAT I WORK WITH</p><h2>Skills & tech stack</h2></div><span>Development meets creativity.</span></div>
          <div className="skills-showcase">
            {expertiseSegments.map(({ title, items }, index) => {
              const CategoryIcon = [FaProjectDiagram, SiCanva, SiN8N, FaFilm][index]
              const descriptions = ['From interface to infrastructure.', 'Design & visual storytelling.', 'Connecting tools. Simplifying work.', 'Turning footage into stories.']
              const toolColors = { Django: '#4ade80', Python: '#facc15', Java: '#fb923c', FastAPI: '#2dd4bf', 'AWS Cloud Solutions': '#fbbf24', 'React.js': '#67e8f9', Vue: '#4ade80', HTML: '#fb923c', CSS: '#60a5fa', JavaScript: '#fde047', MySQL: '#7dd3fc', Canva: '#0891b2', Figma: '#a259ff', n8n: '#fb7185', Make: '#c084fc', CapCut: '#0f172a', 'DaVinci Resolve': '#2563eb' }
              return <article key={title} className={`skill-category skill-category-${index}`}>
                <header><div className="skill-category-icon"><CategoryIcon aria-hidden="true" /></div><div><p>{['DEVELOPMENT', 'CREATIVE', 'WORKFLOWS', 'POST-PRODUCTION'][index]}</p><h3>{title}</h3></div><span className="skill-category-number">0{index + 1}</span></header>
                <p className="skill-category-description">{descriptions[index]}</p>
                <div className="skill-tiles">{items.filter((item) => item.name !== 'React').map(({ name, Icon, section }) => <div key={name} className="skill-tile" style={{ '--tool-color': toolColors[name] || '#22d3ee' }}><Icon aria-hidden="true" /><strong>{name}</strong>{section && <small>{section}</small>}</div>)}</div>
              </article>
            })}
          </div>
          <div className="home-next"><span>Explore what I've been building.</span><a href="#projects-panel">View projects <span>&#8599;</span></a></div>
        </section>


        <section id="projects-panel" className="projects-collection">
          <div className="project-filter-bar"><div className="project-filters" role="group" aria-label="Filter projects">
            {[['all', 'All projects'], ['system', 'Systems'], ['automation', 'Automation']].map(([value, label]) => <button type="button" key={value} aria-pressed={projectFilter === value} onClick={() => setProjectFilter(value)}>{label}<span>{projectsData.filter((project) => value === 'all' || project.projectType === value).length}</span></button>)}
          </div><p aria-live="polite">{visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'}</p></div>
          <div className="project-preview-grid">{visibleProjects.map(renderProjectCard)}</div>
        </section>

        {/* Credentials Section - Entry Point */}
        <section className="space-y-8 scroll-animate" id="credentials">
          {/* Certificates Section */}
          <div className="space-y-4">
            
            <div id="certificates-panel">
              {certificates.length > 0 ? (
                <div className="space-y-8">
                  {/* Featured Certificates */}
                  {featuredCertificates.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-1 w-1 rounded-full bg-amber-400"></div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Featured</p>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {featuredCertificates.map((certificate) => (
                          <button
                            key={certificate.title}
                            type="button"
                            onClick={() => setSelectedCertificate(certificate)}
                            className="group/cert relative rounded-2xl border border-amber-300/40 bg-none from-amber-900/20 to-slate-950/50 p-4 text-left transition-all duration-300 hover:border-amber-300/60 hover:shadow-xl hover:shadow-amber-400/20 hover:-translate-y-1"
                          >
                            {/* Animated Background */}
                            <div className="absolute inset-0 rounded-2xl bg-none from-amber-500/5 to-transparent opacity-0 group-hover/cert:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="relative">
                              <div className="relative overflow-hidden rounded-xl mb-3">
                                <img
                                  src={certificate.href}
                                  alt={certificate.title}
                                  className="h-48 w-full rounded-xl border border-slate-200 object-contain bg-white/5 transition-all duration-300 group-hover/cert:scale-105"
                                />
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-white opacity-0 group-hover/cert:opacity-100 transition-opacity duration-300 backdrop-blur-sm rounded-xl">
                                  <div className="flex flex-col items-center gap-2">
                                    <svg className="h-12 w-12 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <span className="text-sm font-bold text-slate-900 uppercase tracking-wide">View Certificate</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className="font-semibold text-slate-900 line-clamp-2 leading-tight">{certificate.title}</h4>
                                  <span className="flex-shrink-0 rounded-full border border-amber-400/70 bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                                    Featured
                                  </span>
                                </div>
                                <p className="text-sm text-slate-600">{certificate.issuer}</p>
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
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Other Certificates</p>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {regularCertificates.map((certificate) => (
                          <button
                            key={certificate.title}
                            type="button"
                            onClick={() => setSelectedCertificate(certificate)}
                            className="group/cert relative rounded-xl border border-slate-200 bg-white p-3 text-left transition-all duration-300 hover:border-cyan-300/50 hover:shadow-lg hover:shadow-cyan-400/10 hover:-translate-y-1"
                          >
                            <div className="relative overflow-hidden rounded-lg mb-2">
                              <img
                                src={certificate.href}
                                alt={certificate.title}
                                className="h-36 w-full rounded-lg border border-slate-200 object-contain bg-white/5 transition-all duration-300 group-hover/cert:scale-105"
                              />
                              {/* Hover Overlay */}
                              <div className="absolute inset-0 flex items-center justify-center bg-white opacity-0 group-hover/cert:opacity-100 transition-opacity duration-300 backdrop-blur-sm rounded-lg">
                                <svg className="h-8 w-8 text-cyan-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </div>
                            </div>
                            <h4 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-tight mb-1">
                              {certificate.title}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-1">{certificate.issuer}</p>
                            <p className="text-xs text-slate-500">{certificate.year}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="rounded-xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-500">
                  Add files to <code>Assests/certificates</code> and they will appear here automatically.
                </p>
              )}
            </div>
          </div>
        </section>

        <section id="dashboard" className="video-categories">
          <div id="videos-panel">
            {videoCategories.map((category) => <section key={category} className="video-category">
              <h3>{category}</h3>
              <div className="video-category-grid">{videos.filter((video) => video.category === category).map((video) => {
                const videoKey = `${category}-${video.title}`
                const activePoster = video.posterCandidates?.[posterAttempts[videoKey] || 0]
                return <a key={videoKey} href={video.href} target="_blank" rel="noreferrer" className="video-card" aria-label={`Watch ${video.title.replaceAll('_', ' ')} (opens in a new tab)`}>
                  <div className="video-card-thumbnail">{activePoster ? <img src={activePoster} alt={`${video.title} thumbnail`} loading="lazy" onError={() => setPosterAttempts((current) => ({ ...current, [videoKey]: (current[videoKey] || 0) + 1 }))} /> : <span>Thumbnail unavailable</span>}<span className="video-card-play" aria-hidden="true">&#9654;</span></div>
                  <h4>{video.title.replaceAll('_', ' ')}</h4>
                </a>
              })}</div>
            </section>)}
          </div>
        </section>

        <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 md:grid-cols-[0.9fr_1.1fr] scroll-animate hover-glow transition-all duration-300" id="about">
          <div className="about-photo">
            <img
              src="/Assests/img/Toga Pic.jpg"
              alt="Jayci profile portrait"
              className="h-full min-h-[420px] w-full rounded-2xl border border-slate-200 object-cover object-top animate-float-gentle transition-transform duration-500 hover:scale-105"
            />
            {/* Contacts Section */}
            <div className="about-contacts">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Contacts</h3>
              <div className="flex flex-wrap gap-3">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/Jaysgabri.acna24/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white transition-all duration-300 hover:border-blue-400 hover:bg-blue-400/10 hover:shadow-lg hover:shadow-blue-400/30 hover:-translate-y-1"
                  title="Facebook"
                >
                  <FaFacebook className="text-xl text-slate-600 transition-colors group-hover:text-blue-400" />
                </a>

                {/* Twitter/X */}
                <a
                  href="https://x.com/jygbrl_acna"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white transition-all duration-300 hover:border-slate-300 hover:bg-slate-300/10 hover:shadow-lg hover:shadow-slate-300/30 hover:-translate-y-1"
                  title="Twitter/X"
                >
                  <FaXTwitter className="text-xl text-slate-600 transition-colors group-hover:text-slate-900" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/Jayriel24"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white transition-all duration-300 hover:border-purple-400 hover:bg-purple-400/10 hover:shadow-lg hover:shadow-purple-400/30 hover:-translate-y-1"
                  title="GitHub"
                >
                  <FaGithub className="text-xl text-slate-600 transition-colors group-hover:text-purple-400" />
                </a>

                {/* Email with Dropdown */}
                <div className="relative" ref={emailDropdownRef2}>
                  <button
                    onClick={() => setShowEmailDropdown(!showEmailDropdown)}
                    className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/30 hover:-translate-y-1"
                    title="Email" aria-label="Show email addresses" aria-expanded={showEmailDropdown}
                  >
                    <FaEnvelope className="text-xl text-slate-600 transition-colors group-hover:text-cyan-400" />
                  </button>

                  {/* Email Dropdown */}
                  {showEmailDropdown && (
                    <div className="absolute top-14 left-0 z-50 w-64 rounded-xl border border-slate-200 bg-white backdrop-blur-sm p-3 shadow-xl animate-scale-in">
                      <div className="space-y-2">
                        <a
                          href="mailto:jacuna_220000001342@uic.edu.ph"
                          className="block rounded-lg border border-slate-300 bg-slate-800/50 px-3 py-2 text-xs text-slate-600 transition-all hover:border-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-700"
                          onClick={() => setShowEmailDropdown(false)}
                        >
                          <div className="font-semibold text-cyan-700 mb-1">School Email</div>
                          jacuna_220000001342@uic.edu.ph
                        </a>
                        <a
                          href="mailto:JayGabri24@gmail.com"
                          className="block rounded-lg border border-slate-300 bg-slate-800/50 px-3 py-2 text-xs text-slate-600 transition-all hover:border-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-700"
                          onClick={() => setShowEmailDropdown(false)}
                        >
                          <div className="font-semibold text-cyan-700 mb-1">Personal Email</div>
                          JayGabri24@gmail.com
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowEmailDropdown(false)}
                        className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-800/50 px-3 py-1.5 text-xs font-semibold text-slate-500 transition-all hover:border-slate-500 hover:text-slate-600"
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
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white transition-all duration-300 hover:border-blue-500 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1"
                  title="LinkedIn"
                >
                  <FaLinkedin className="text-xl text-slate-600 transition-colors group-hover:text-blue-500" />
                </a>
              </div>
            </div>
          </div>
          <div className="about-content">
            <div className="about-copy">
              <h2 className="font-display text-3xl text-slate-900">About Me</h2>
              <p>I’m a Computer Science graduate from the University of the Immaculate Conception with a passion for technology, problem-solving, and continuous learning. I’m particularly interested in frontend and full-stack development, where I can combine logic and creativity to build practical, user-focused applications.</p>
              <p>Before pursuing software development, I dreamed of becoming a professional esports player. That experience shaped my focus, adaptability, and discipline, qualities I now bring to understanding technical problems, exploring solutions, and improving my work through consistent practice.</p>
              <p>Through academic and personal projects, I continue to strengthen my skills in analysis, design, coding, and collaboration. I enjoy exploring new frameworks and turning ideas into working applications. My goal is to grow as a developer and contribute to a team where I can keep learning while helping deliver reliable and accessible software.</p>
            </div>
            <div className="about-modal-actions" aria-label="Education and experience">
              <button type="button" className="about-modal-button" onClick={() => setEducationModalOpen(true)} aria-haspopup="dialog">
                <FaGraduationCap className="about-modal-icon" aria-hidden="true" />
                <span><strong>Academic Qualifications</strong><small>Explore my education</small></span>
                <span className="about-modal-arrow" aria-hidden="true">&#8599;</span>
              </button>
              <button type="button" className="about-modal-button" onClick={() => setExperienceModalOpen(true)} aria-haspopup="dialog">
                <FaBriefcase className="about-modal-icon" aria-hidden="true" />
                <span><strong>Work Experience</strong><small>Internship, projects & freelance work</small></span>
                <span className="about-modal-arrow" aria-hidden="true">&#8599;</span>
              </button>
            </div>
            <section className="about-interests" aria-labelledby="about-interests-title">
              <h3 id="about-interests-title">Beyond the code</h3>
              <div className="about-interest-row"><SiN8N aria-hidden="true" /><div><h4>Workflow automation</h4><p>Exploring connected workflows and AI-assisted tools, including my audio transcription automation project.</p></div></div>
              <div className="about-interest-row"><FaFilm aria-hidden="true" /><div><h4>Video & visual storytelling</h4><p>Creating trivia, anime, and business edits with CapCut and DaVinci Resolve.</p></div></div>
              <div className="about-interest-row"><FaDesktop aria-hidden="true" /><div><h4>PC building & troubleshooting</h4><p>Building gaming and workstation PCs, diagnosing hardware issues, and helping with upgrades and system optimization.</p></div></div>
            </section>
          </div>
        </section>
        <section id="contact" className="contact-panel">
          <div className="contact-intro"><p>LET'S CONNECT</p><h1>Good work starts with<br />a conversation.</h1><p>Have a project in mind or an opportunity to share? Get in touch through email or find me online.</p></div>
          <div className="contact-grid">
            <a href="mailto:JayGabri24@gmail.com"><FaEnvelope /><span><small>PERSONAL EMAIL</small><strong>JayGabri24@gmail.com</strong></span><span>&#8599;</span></a>
            <a href="mailto:jacuna_220000001342@uic.edu.ph"><FaGraduationCap /><span><small>SCHOOL EMAIL</small><strong>jacuna_220000001342@uic.edu.ph</strong></span><span>&#8599;</span></a>
            <a href="https://github.com/Jayriel24" target="_blank" rel="noreferrer"><FaGithub /><span><small>CODE & PROJECTS</small><strong>GitHub</strong></span><span>&#8599;</span></a>
            <a href="https://www.linkedin.com/in/jayci-gabriel-acu%C3%B1a-3281953b4" target="_blank" rel="noreferrer"><FaLinkedin /><span><small>PROFESSIONAL PROFILE</small><strong>LinkedIn</strong></span><span>&#8599;</span></a>
          </div>
          <div className="contact-socials"><a href="https://www.facebook.com/Jaysgabri.acna24/" target="_blank" rel="noreferrer">Facebook &#8599;</a><a href="https://x.com/jygbrl_acna" target="_blank" rel="noreferrer">Twitter / X &#8599;</a><span>Davao City, Philippines</span></div>
        </section>
      </main>
          <div className="home-portrait">
            <img src="/Assests/img/barong-portrait-studio-lit.png" alt="Jayci Gabriel Acuña" />
          </div>
        </div>
      </div>

      {selectedCertificate && (
        <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 animate-fade-in">
          <div role="dialog" aria-modal="true" aria-label={selectedCertificate.title} className="certificate-dialog w-full max-w-5xl rounded-2xl border border-white/15 bg-slate-900 p-4 animate-scale-in">
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
        <div className="modal-overlay fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/85 p-2 sm:p-4 animate-fade-in">
          <div role="dialog" aria-modal="true" aria-label={selectedPdf.title} className={`pdf-dialog flex h-[95vh] w-full max-w-6xl flex-col rounded-2xl border border-white/15 bg-slate-900 p-3 sm:h-[90vh] sm:p-4 animate-scale-in ${isProtectedPdf ? 'select-none' : ''}`}>
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-display text-base text-white sm:text-xl">{selectedPdf.title}</h3>
              <div className="flex gap-2">
                {!isProtectedPdf && (
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
                )}
                {isProtectedPdf && (
                  <span className="inline-flex items-center rounded-lg border border-amber-300/50 bg-amber-300/10 px-3 py-2 text-xs font-semibold text-amber-200 sm:text-sm">
                    Protected View
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedPdf(null)}
                  className="rounded-lg border border-slate-500 px-3 py-2 text-xs font-semibold text-slate-200 hover:border-cyan-300 hover:text-cyan-200 sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950">
              {isProtectedPdf ? (
                <div className="h-full overflow-y-auto p-2 sm:p-4">
                  <div className="mx-auto max-w-3xl space-y-4">
                    {(selectedPdf.previewImages || []).map((image, index) => (
                      <img
                        key={`protected-resume-page-${index + 1}`}
                        src={image}
                        alt={`Resume preview page ${index + 1}`}
                        className="w-full rounded-lg border border-white/10 shadow-xl"
                        draggable={false}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <iframe
                  src={selectedPdfViewerHref}
                  className="h-full w-full bg-slate-950"
                  title={selectedPdf.title}
                />
              )}

              {isProtectedPdf && (
                <div className="pointer-events-none absolute inset-0 z-10 grid grid-cols-2 gap-2 p-3 opacity-25 sm:grid-cols-3">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <div key={`resume-watermark-${index}`} className="flex items-center justify-center overflow-hidden">
                      <span className="rotate-[-28deg] whitespace-nowrap text-[10px] font-semibold tracking-[0.2em] text-cyan-200 sm:text-xs">
                        {selectedPdf.watermarkText}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Education Modal */}
      {educationModalOpen && (
        <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4">
          <div className="education-dialog" role="dialog" aria-modal="true" aria-labelledby="education-title">
            <header className="education-dialog-header"><div><p>MY ACADEMIC JOURNEY</p><h3 id="education-title">Academic Qualifications</h3></div><button type="button" onClick={() => setEducationModalOpen(false)}>Close</button></header>
            <ol className="education-timeline">
              {[
                { stage: 'Elementary', title: 'Elementary Education', school: 'Doña Pilar Learning Center Foundation Inc.', years: '2010 - 2016', logo: '/Assests/img/DPLC_logo.jpg', facebook: 'https://www.facebook.com/dplcfi', website: 'https://ph140379-dona-pilar-learning-center.contact.page/' },
                { stage: 'Junior High', title: 'Junior High School', school: 'University of the Immaculate Conception', years: '2016 - 2020', logo: '/Assests/img/UIC_logo.png', facebook: 'https://www.facebook.com/uicph', website: 'https://www.uic.edu.ph/' },
                { stage: 'Senior High', title: 'STEM (Science, Technology, and Mathematics)', school: 'University of Mindanao', years: '2020 - 2022', logo: '/Assests/img/UM_logo.jpg', facebook: 'https://www.facebook.com/uniminofficial', website: 'https://umindanao.edu.ph/' },
                { stage: 'Bachelor’s Degree', title: 'Bachelor of Science in Computer Science', school: 'University of the Immaculate Conception', years: '2022 - 2026', logo: '/Assests/img/UIC_logo.png', facebook: 'https://www.facebook.com/uicph', website: 'https://www.uic.edu.ph/' },
              ].map((item,index) => <li key={item.stage} className={index === 3 ? 'education-stage education-degree' : 'education-stage'}>
                <span className="education-step">{String(index + 1).padStart(2,'0')}</span>
                <article><img src={item.logo} alt={item.school + ' logo'} /><div className="education-stage-copy"><div className="education-stage-meta"><span>{item.stage}</span><span>{item.years}</span></div><h4>{item.title}</h4><p>{item.school}</p><div className="education-links"><a href={item.facebook} target="_blank" rel="noreferrer"><FaFacebook aria-hidden="true" />Facebook</a><a href={item.website} target="_blank" rel="noreferrer"><FaGlobe aria-hidden="true" />Website</a></div></div></article>
              </li>)}
            </ol>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {experienceModalOpen && (
        <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4">
          <div className="education-dialog experience-dialog" role="dialog" aria-modal="true" aria-labelledby="experience-title">
            <header className="education-dialog-header"><div><p>MY PROFESSIONAL JOURNEY</p><h3 id="experience-title">Professional Experience</h3></div><button type="button" onClick={() => setExperienceModalOpen(false)}>Close</button></header>
            <ol className="education-timeline experience-timeline">
              <li className="education-stage "><span className="education-step">01</span><article className="experience-entry">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="relative">

                          <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-slate-600">
                            <svg className="h-12 w-12 text-slate-300" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block rounded-full bg-slate-700/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-300">Hardware Services</span>
                              <span className="inline-flex items-center gap-1 rounded-full bg-slate-700/40 px-2 py-1 text-xs font-bold text-slate-300">
                                <span className="h-2 w-2 rounded-full bg-slate-700/40"></span>
                                Active
                              </span>
                            </div>
                            <h4 className="font-display text-xl text-white mb-2">Custom Computer Build, System Diagnostics & Troubleshooting</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">
                              Offering professional PC building services, hardware diagnostics, and troubleshooting solutions. Specializing in custom gaming and workstation builds, component upgrades, system optimization, and resolving hardware-related issues to ensure optimal performance and reliability.
                            </p>
                          </div>
                          <span className="rounded-lg bg-slate-700/40 px-3 py-1.5 text-sm font-bold text-slate-300 border border-slate-600">2022 - Present</span>
                        </div>
                      </div>
                    </div>
                  </article></li>
              <li className="education-stage "><span className="education-step">02</span><article className="experience-entry">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="relative">

                          <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-slate-600">
                            <FaReact className="text-4xl text-slate-300" />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block rounded-full bg-slate-700/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-300">Freelance</span>
                              <span className="inline-flex items-center gap-1 rounded-full bg-slate-700/40 px-2 py-1 text-xs font-bold text-slate-300">
                                <span className="h-2 w-2 rounded-full bg-slate-700/40"></span>
                                Active
                              </span>
                            </div>
                            <h4 className="font-display text-xl text-white mb-2">Web Development</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">
                              Providing custom web development services including frontend design, full-stack application development, and website optimization. Working with modern frameworks like React, Django, and Vue to deliver responsive and user-friendly web solutions tailored to client needs.
                            </p>
                          </div>
                          <span className="rounded-lg bg-slate-700/40 px-3 py-1.5 text-sm font-bold text-slate-300 border border-slate-600">2024 - Present</span>
                        </div>
                      </div>
                    </div>
                  </article></li>
              <li className="education-stage "><span className="education-step">03</span><article className="experience-entry">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="inline-block rounded-full bg-slate-700/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-300">Thesis Project</span>
                              <span className="rounded-full border border-slate-600 bg-slate-700/40 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-slate-300">Accepted</span>
                              <span className="rounded-full border border-slate-600 bg-slate-700/40 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-slate-300">Published</span>
                            </div>
                            <h4 className="font-display text-xl text-white mb-1">HEROCS - On-Device Mobile Assessment System for Hazard Detection in Household Environments</h4>
                            <p className="text-sm text-slate-300 font-semibold mb-2">Group Thesis Project</p>
                            <p className="text-sm text-slate-300 leading-relaxed mb-3"> An on-device mobile computer vision system designed to enhance household safety by detecting and assessing hazards, particularly for toddlers aged 0-3 in Filipino homes.</p>
                            <p className="text-sm text-slate-400">
                              <span className="font-semibold text-slate-300">Publication:</span> 9th International Conference on Information and Computer Technologies (ICICT 2026)
                            </p>
                          </div>
                          <span className="rounded-lg bg-slate-700/40 px-3 py-1.5 text-sm font-bold text-slate-300 border border-slate-600">2025 - 2026</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => setSelectedPdf({ title: 'HEROCS Thesis Paper', href: '/Assests/documents/HEROCS.pdf' })}
                          className="group/thumb relative overflow-hidden rounded-xl border-2 border-slate-600 hover:border-slate-600 transition-all duration-300"
                        >

                          <img
                            src="/Assests/img/HEROCS_Thumbnail.jpg"
                            alt="HEROCS Thesis Thumbnail"
                            className="relative h-40 w-56 object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 opacity-0 transition-opacity duration-300 group-hover/thumb:opacity-100">
                            <span className="rounded-lg bg-slate-700/40 px-4 py-2 text-sm font-semibold text-slate-950">
                              View PDF
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </article></li>
              <li className="education-stage "><span className="education-step">04</span><article className="experience-entry">
                    <div className="flex flex-col gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block rounded-full bg-slate-700/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-300">Freelance</span>
                            </div>
                            <h4 className="font-display text-xl text-white mb-1">Business Website Developer</h4>
                            <p className="text-sm text-slate-300 font-semibold mb-3">Client Projects in Slovakia</p>
                            <ul className="space-y-2 text-sm text-slate-300">
                              <li>Developed responsive and visually appealing websites for local businesses.</li>
                              <li>Improved online presence and customer engagement through SEO-oriented, performance-focused solutions.</li>
                              <li>Integrated SaaS tools to support operations, lead generation, and customer management.</li>
                              <li>Collaborated directly with clients to deliver tailored and scalable website implementations.</li>
                            </ul>
                          </div>
                          <span className="rounded-lg bg-slate-700/40 px-3 py-1.5 text-sm font-bold text-slate-300 border border-slate-600">Oct 2025 - Mar 2026</span>
                        </div>
                      </div>
                    </div>
                  </article></li>
              <li className="education-stage experience-latest"><span className="education-step">05</span><article className="experience-entry">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block rounded-full bg-slate-700/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-300">Internship</span>
                              <span className="inline-flex items-center gap-1 rounded-full bg-slate-700/40 px-2 py-1 text-xs font-bold text-slate-300">
                                <span className="h-2 w-2 rounded-full bg-slate-700/40"></span>
                                Current
                              </span>
                            </div>
                            <h4 className="font-display text-xl text-white mb-1">Southern Philippines Medical Center (SPMC)</h4>
                            <p className="text-sm text-slate-400 mb-2">JP Laurel Avenue, Bajada, Davao City, 8000, Philippines</p>
                            <p className="text-sm text-slate-300 font-semibold mb-3">Project: Referral System for Emergency Dispatch Communication Center (EDCC)</p>
                            <p className="text-sm text-slate-300 leading-relaxed">Developing a comprehensive hospital referral management system for incoming referrals across neighboring hospitals around the Philippines.</p>
                          </div>
                          <span className="rounded-lg bg-slate-700/40 px-3 py-1.5 text-sm font-bold text-slate-300 border border-slate-600">Jan 2026 - Present</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(projectsData.find(p => p.id === 'spmc-referral'))}
                          className="group/thumb relative overflow-hidden rounded-xl border-2 border-slate-600 hover:border-slate-600 transition-all duration-300"
                        >

                          <img
                            src="/Assests/img/Projects/SPMC/SPMC_Login.png"
                            alt="SPMC Referral System Login"
                            className="relative h-40 w-56 object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 opacity-0 transition-opacity duration-300 group-hover/thumb:opacity-100">
                            <span className="rounded-lg bg-slate-700/40 px-4 py-2 text-sm font-semibold text-slate-950">
                              View Project
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </article></li>
            </ol>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="modal-overlay fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/85 p-4 animate-fade-in" onClick={() => setSelectedProject(null)}>
          <div role="dialog" aria-modal="true" aria-label={selectedProject.name} className="project-dialog w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 bg-slate-900 p-6 animate-scale-in" onClick={(e) => e.stopPropagation()}>
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

            {selectedProject.disclaimer && (
              <div className="mb-6 rounded-xl border border-amber-300/50 bg-amber-400/10 p-4">
                <p className="text-sm text-amber-100 leading-relaxed">{selectedProject.disclaimer}</p>
              </div>
            )}

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
              {Array.isArray(selectedProject.contentSections) ? (
                <>
                  {selectedProject.contentSections.map((section) => (
                    <section key={section.title}>
                      <h4 className="text-base font-semibold text-white mb-2">{section.title}</h4>
                      {section.type === 'list' ? (
                        <ul className="space-y-2">
                          {section.items.map((item) => (
                            <li key={item} className="flex gap-2 text-sm text-slate-300">
                              <span className="text-cyan-300 mt-1">*</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-slate-300 leading-relaxed">{section.content}</p>
                      )}
                    </section>
                  ))}
                </>
              ) : (
                <>
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
                              <span className="text-cyan-300 mt-1">&#8226;</span>
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
                      <span className="text-cyan-300 mt-1">&#8226;</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
                </>
              )}
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
        <div className="modal-overlay fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 p-4 animate-fade-in" onClick={() => setSelectedProjectImage(null)}>
          <div role="dialog" aria-modal="true" aria-label={selectedProjectImage.title} className="image-dialog relative w-full max-w-7xl" onClick={(e) => e.stopPropagation()}>
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

