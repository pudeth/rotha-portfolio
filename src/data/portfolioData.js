export const portfolioData = {
  // Primary Profile: Rotha Khoeurn (Extracted directly from her Canva CV)
  profiles: {
    rotha: {
      id: 'rotha',
      brandName: 'rotha.',
      name: 'Rotha Khoeurn',
      role: 'Assistant Backend Development Manager & Senior Software Architect',
      heroTag: 'OPEN FOR TECHNICAL LEADERSHIP & CONSULTING',
      heroTitleLine1: 'Architecture That',
      heroTitleAccent: 'Powers',
      heroTitleLine2: 'FinTech.',
      heroSubtitle: 'Assistant Backend Development Manager with 12+ years building high-throughput core banking systems, microservices, and secure payment gateways across Cambodia.',
      experienceYears: '12+',
      experienceBadgeLabel: 'Years in Tech',
      avatarUrl: '/rotha_real.png',
      avatarFallback: '/rotha_hero.png',
      email: 'khoeurn.rotha@gmail.com',
      phone: '+855 96 364 9640',
      phoneRaw: '0963649640',
      location: 'Phnom Penh, Cambodia',
      telegram: '@rotha_kh',
      telegramUrl: 'https://t.me/rotha_kh',
      linkedin: 'https://www.linkedin.com/in/rotha-khoeurn-23ab0262/',
      bio: 'Leading backend engineering teams and architecting resilient banking platforms that process mission-critical financial transactions daily.',
      personalDetails: {
        dob: '09 January, 1995',
        pob: 'Cheng Village, Cheng Mean Chey Commune, Banan District, Battambang Province, Cambodia',
        maritalStatus: 'Married',
        sex: 'Female',
        nationality: 'Khmer'
      }
    },
    talmeez: {
      id: 'talmeez',
      brandName: 'talmeez.',
      name: 'Talmeez',
      role: 'Brand & Digital Product Designer',
      heroTag: 'OPEN FOR SELECTED PROJECTS',
      heroTitleLine1: 'Design That',
      heroTitleAccent: 'Builds',
      heroTitleLine2: 'Brands.',
      heroSubtitle: 'I help ambitious brands stand out with bold, strategic and unforgettable design.',
      experienceYears: '5+',
      experienceBadgeLabel: 'Years of Experience',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      avatarFallback: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      email: 'hello@talmeezdesign.com',
      phone: '+1 (555) 234-5678',
      location: 'New York, USA / Remote',
      telegram: '@talmeez',
      telegramUrl: 'https://t.me',
      linkedin: 'https://linkedin.com',
      bio: 'Designing bold brands that make impact.'
    }
  },

  summary: `Assistant Backend Development Manager and Software Engineer with over 12 years of experience in software development, banking technology, FinTech, and enterprise applications. Strong expertise in Java, Spring Boot, Microservices, REST APIs, SQL, Oracle, PostgreSQL, and cloud deployments. Proven background leading development teams and architecting reliable financial solutions across Cambodia.`,

  coreCompetencies: [
    'Backend & Microservices Architecture',
    'Core Banking & FinTech Platforms',
    'Team Leadership & Code Quality Reviews',
    'High-Throughput Payment Gateways (Swift, KHQR, EDC)',
    'Enterprise Security (OAuth2, JWT, Hybrid Encryption)',
    'Agile / Scrum SDLC & Production Support'
  ],

  services: [
    {
      id: 'banking-systems',
      iconName: 'Layout',
      title: 'Core Banking & FinTech',
      description: 'Designing fault-tolerant core banking integrations, Swift MTMX translation services, and high-frequency transaction processing.',
      tags: ['Swift MTMX', 'Oracle Flexcube', 'Payment Gateways'],
      features: ['Swift Messaging & Addressing', 'Cross-Border Visa Direct & Remittances', 'Core Banking API Wrappers', 'EDC Payment Systems']
    },
    {
      id: 'microservices',
      iconName: 'Globe',
      title: 'Microservices & APIs',
      description: 'Engineering scalable event-driven architectures with Spring Boot, Spring Cloud, RabbitMQ, Docker, and Kubernetes.',
      tags: ['Spring Boot', 'Spring Cloud', 'RabbitMQ', 'Docker'],
      features: ['Event-Driven Messaging', 'JWT & OAuth2 Authentication', 'Redis Distributed Caching', 'High-Availability Clusters']
    },
    {
      id: 'fraud-security',
      iconName: 'Sparkles',
      title: 'Security & Fraud Prevention',
      description: 'Implementing strict banking security, biometric verification, VIP face recognition, and automated fraud detection systems.',
      tags: ['Fraud Detection', 'VIP Face Recognition', 'Spring Security'],
      features: ['Real-Time Fraud Heuristics', 'Hybrid Data Encryption', 'Role-Based Access Control (RBAC)', 'Regulatory Compliance']
    },
    {
      id: 'tech-leadership',
      iconName: 'Layers',
      title: 'Technical Leadership',
      description: 'Guiding cross-functional engineering teams, conducting code reviews, mentoring developers, and maintaining production 99.99% uptime.',
      tags: ['System Architecture', 'Agile / Scrum', 'Mentorship'],
      features: ['Sprint Planning & Jira Management', 'Architecture Design Records (ADR)', 'CI/CD Pipeline Optimization', '24/7 Incident Escalation']
    }
  ],

  experiences: [
    {
      company: 'APD Bank',
      role: 'Assistant Backend Development Manager',
      period: 'Mar 2025 – Present',
      location: 'Cambodia',
      type: 'Full-time',
      description: 'Lead and support backend development initiatives for core banking applications and internal platforms. Provide architectural direction, technical governance, and enforce code quality standards across banking systems.',
      keyFeatures: [
        'Task Tracking Management System (TTS)',
        'Employee Management System',
        'Call Center Management System (V1.1, V2.0)',
        'Swift MTMX Translation Service',
        'Swift Postal Hybrid Structure Address',
        'Fraud Detection System',
        'EDC Payment System & APD Payway'
      ],
      technologies: ['Java', 'Spring Boot', 'REST APIs', 'PostgreSQL', 'Microservices', 'Docker', 'Kubernetes', 'Spring Cloud', 'OAuth2', 'JWT', 'RabbitMQ', 'WebSocket', 'Spring Data Redis', 'Spring AI', 'Python', 'Gradle', 'Jira']
    },
    {
      company: 'APD Bank',
      role: 'Senior Application Development Officer',
      period: 'Jan 2023 – Feb 2025',
      location: 'Cambodia',
      type: 'Full-time',
      description: 'Engineered mission-critical enterprise banking platforms and handled complex API integrations. Translated multi-department business requirements into high-performance, fault-tolerant solutions and optimized release cycles.',
      keyFeatures: [
        'Internal Chat System (ICS V2.0) & External Chat System (ECS)',
        'Call Center Management System (CCMS V1.0)',
        'User Management System (V1.0 & V2.0)',
        'Digital Channel Platform',
        'VIP Face Recognition System (FRP)',
        'Admin Management System (AMS)',
        'Cross Institution Fund Transfer and Interbank Payment'
      ],
      technologies: ['Spring Boot', 'REST APIs', 'PostgreSQL', 'Microservices', 'Docker', 'Spring Cloud', 'OAuth2', 'JWT', 'RabbitMQ', 'WebSocket', 'Spring Data Redis', 'Spring AI', 'Gradle', 'Agile Scrum']
    },
    {
      company: 'TL Express Cambodia',
      role: 'Senior Developer',
      period: 'Nov 2021 – Dec 2022',
      location: 'Cambodia',
      type: 'Full-time',
      description: 'Designed microservices architecture, complex relational database schemas, and delegated tasks across the engineering squad. Enforced high-security authentication protocols with OAuth2 and Spring Security.',
      keyFeatures: [
        'User Authorization & Role-Based Access',
        'Function Management Engine',
        'Facebook Live Automated Comment & Order Parser',
        'Customer App Backend for WeChat',
        'QuickBooks Financial Integration Service'
      ],
      technologies: ['Java Spring Boot', 'PostgreSQL', 'Microservices', 'Docker', 'Spring Cloud', 'JWT', 'REST APIs', 'SOAP APIs']
    },
    {
      company: 'Sathapana Bank Plc.',
      role: 'Officer, Digital Channel System',
      period: 'Mar 2020 – Nov 2021',
      location: 'Cambodia',
      type: 'Full-time',
      description: 'Enhanced and scaled digital channels including Mobile Banking and Internet Banking platforms. Connected Core Banking (Oracle Flexcube) through robust SOAP/REST integration layers.',
      keyFeatures: [
        'RetailPay: Real-time interbank fund transfers across local banks',
        'Special Account Management',
        'RedPocket: Multi-account red pocket transfers (up to 5 accounts/tx)',
        'TrueMoney & Lyhour Agent Transfer Gateways',
        'CashBack: Automated rewards engine for credit & debit cards',
        'Visa Direct: Local & cross-border instant fund transfer gateway'
      ],
      technologies: ['Java Spring Boot', 'Oracle Flexcube', 'PL/SQL', 'SOAP API', 'Oracle WebLogic', 'Appzillon']
    },
    {
      company: 'KREDIT Microfinance Institution',
      role: 'Software Developer',
      period: 'Jun 2018 – Feb 2020',
      location: 'Cambodia',
      type: 'Full-time',
      description: 'Developed and maintained banking APIs for mobile applications, internal systems, and core Flexcube modules. Resolved mission-critical database bottlenecks and implemented automated OTP services.',
      keyFeatures: [
        'IDM (Identity Manager): Centralized API service for identity and credential lifecycle',
        'AXIS: Unified administrative system managing all IDM features',
        'ZEUS: High-scale customer and branch management platform'
      ],
      technologies: ['Java Spring Boot', 'ZK Framework', 'Vue.js', 'Nuxt.js', 'React.js', 'Oracle Flexcube', 'PL/SQL Developer', 'JSON']
    },
    {
      company: 'TrueMoney Cambodia',
      role: 'Java Developer – Core System',
      period: 'Mar 2016 – Feb 2018',
      location: 'Cambodia',
      type: 'Full-time',
      description: 'Engineered high-throughput payment transaction pipelines. Developed remittance gateways, partner bill payment integrations, Alipay integrations, and automated agent incentive calculations.',
      keyFeatures: [
        'Domestic & International Remittance Pipeline',
        'Bill Payment Engine (Partner API, Batch Upload, Offline Sync)',
        'Cash In & Cash Out Agent Network',
        'Alipay Payment Gateway Integration'
      ],
      technologies: ['REST APIs', 'JSON', 'Apache Tomcat', 'Java SOAP API', 'MongoDB', 'PostgreSQL', 'SDLC', 'Jira']
    }
  ],

  projects: [
    {
      id: 'project-swift-mtmx',
      title: 'Swift MTMX Translation & Payment',
      category: 'BANKING TECHNOLOGY',
      subtitle: 'APD Bank Core Infrastructure',
      client: 'APD Bank Plc.',
      year: '2025–2026',
      description: 'Enterprise translation service converting legacy MT financial messages into modern ISO 20022 XML (MX) format, supporting postal hybrid structured addressing and strict bank compliance.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
      tags: ['Swift ISO 20022', 'Spring Boot', 'Financial Standards', 'Microservices'],
      liveUrl: '#',
      gallery: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    {
      id: 'project-fraud-detection',
      title: 'Real-Time Fraud Detection Engine',
      category: 'FINTECH & SECURITY',
      subtitle: 'Automated Anomaly Prevention',
      client: 'APD Bank Plc.',
      year: '2024–2025',
      description: 'High-throughput event-driven fraud monitoring system leveraging Redis, RabbitMQ, and rule engines to evaluate suspicious transactions within sub-100ms response windows.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80',
      tags: ['Fraud Detection', 'RabbitMQ', 'Spring Data Redis', 'Real-Time Rules'],
      liveUrl: '#',
      gallery: [
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    {
      id: 'project-retail-pay',
      title: 'RetailPay & Interbank Transfer',
      category: 'DIGITAL CHANNEL',
      subtitle: 'Sathapana Real-Time Payments',
      client: 'Sathapana Bank Plc.',
      year: '2020–2021',
      description: 'High-availability payment rails facilitating seamless instant fund transfers between commercial banks, TrueMoney agents, and Lyhour network across Cambodia.',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=900&q=80',
      tags: ['RetailPay', 'Oracle Flexcube', 'SOAP/REST', 'FinTech'],
      liveUrl: '#',
      gallery: [
        'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    {
      id: 'project-face-recog',
      title: 'VIP Face Recognition System (FRP)',
      category: 'AI & ACCESS CONTROL',
      subtitle: 'Biometric Banking Integration',
      client: 'APD Bank Plc.',
      year: '2024',
      description: 'Integrated VIP customer identification service deployed across branches, notifying branch managers instantly when high-value clients enter.',
      image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=900&q=80',
      tags: ['Face Recognition', 'Spring AI', 'WebSocket', 'Real-time Alert'],
      liveUrl: '#',
      gallery: ['https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80']
    }
  ],

  stats: [
    {
      id: 'exp',
      number: '12+',
      label: 'Years of Experience',
      iconName: 'Smile'
    },
    {
      id: 'systems',
      number: '30+',
      label: 'Banking Systems & APIs',
      iconName: 'ThumbsUp'
    },
    {
      id: 'institutions',
      number: '6+',
      label: 'Top Banks & FinTechs',
      iconName: 'Star'
    },
    {
      id: 'uptime',
      number: '99.9%',
      label: 'Production Uptime',
      iconName: 'Globe'
    }
  ],

  education: [
    {
      institution: 'Korea Software HRD Center (KSHRD)',
      degree: 'Certificate in Spring Framework',
      period: '2015–2016',
      location: 'Phnom Penh, Cambodia'
    },
    {
      institution: 'University of Puthisastra (UP)',
      degree: 'Bachelor’s Degree of Computer Science',
      period: '2014–2016',
      location: 'Phnom Penh, Cambodia'
    },
    {
      institution: 'Passerelles Numériques Cambodia (PNC)',
      degree: 'Associate Degree in Web Programming',
      period: '2012–2014',
      location: 'Cambodia'
    }
  ],

  certifications: [
    {
      institution: 'LOTUS ACADEMY',
      name: 'Foundation Certificate in Data Analytics',
      date: 'Oct 2025'
    },
    {
      institution: 'TECHLAB',
      name: 'Certificate of Secure Development Training',
      date: 'Jan 2021'
    },
    {
      institution: 'Microsoft',
      name: 'Certificate in Introduction to Data Science',
      date: 'Oct 2019'
    }
  ],

  technicalSkills: {
    backend: ['Java', 'Spring Boot', 'Spring Cloud', 'Hibernate', 'Microservices', 'REST API', 'SOAP API', 'JSP/Servlet', 'WebSocket', 'RabbitMQ', 'JWT', 'Spring Data Redis', 'Spring AI', 'C#', 'Python'],
    databases: ['PostgreSQL', 'Oracle', 'Oracle Flexcube', 'MongoDB', 'PL/SQL', 'SQL'],
    security: ['Spring Security', 'OAuth2', 'JWT', 'Distributed Systems', 'Hybrid Encryption'],
    devops: ['Docker', 'Kubernetes', 'Apache Tomcat', 'Oracle WebLogic', 'Git', 'JMeter', 'Jira', 'Redmine', 'xShell'],
    frontend: ['JavaScript', 'Vue.js', 'Nuxt.js', 'React.js', 'PHP', 'Laravel', 'CodeIgniter'],
    languages: [
      { name: 'Khmer', level: 'Native / Mother Tongue' },
      { name: 'English', level: 'Professional Working' },
      { name: 'Korean', level: 'Basic' }
    ]
  },

  testimonials: [
    {
      id: 1,
      quote: 'Rotha exhibits exceptional command over Spring Boot microservices and banking compliance. Her architecture for our interbank payment gateways reduced transaction delays to milliseconds.',
      author: 'VP of Technology',
      role: 'Core Banking Division, APD Bank',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5
    },
    {
      id: 2,
      quote: 'Her leadership on the Swift MTMX and postal hybrid addressing services ensured 100% compliance with international standards ahead of schedule. A truly world-class backend leader.',
      author: 'Lead Architect',
      role: 'FinTech Platform Partner',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5
    },
    {
      id: 3,
      quote: 'Whenever we had high-volume transaction spikes during holiday campaigns, Rotha’s optimized database queries and caching layers kept everything stable with zero downtime.',
      author: 'Product Director',
      role: 'Digital Channel Services',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      rating: 5
    }
  ],

  footerLinks: {
    quickLinks: [
      { name: 'About & Bio', href: '#about' },
      { name: 'Experience', href: '#experience' },
      { name: 'Core Systems', href: '#work' },
      { name: 'Skills & Education', href: '#skills' },
      { name: 'Contact', href: '#contact' }
    ],
    services: [
      { name: 'Core Banking Architecture', href: '#services' },
      { name: 'Spring Microservices', href: '#services' },
      { name: 'Fraud & Security', href: '#services' },
      { name: 'Technical Leadership', href: '#services' }
    ],
    socials: [
      { name: 'Telegram', icon: 'Send', href: 'https://t.me/rotha_kh' },
      { name: 'LinkedIn', icon: 'Linkedin', href: 'https://www.linkedin.com/in/rotha-khoeurn-23ab0262/' },
      { name: 'GitHub', icon: 'Github', href: 'https://github.com' },
      { name: 'Email', icon: 'Mail', href: 'mailto:khoeurn.rotha@gmail.com' }
    ]
  }
};
