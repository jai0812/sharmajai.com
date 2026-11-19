/* =============================================================================
   data.js — the single source of truth for sharmajai.com
   Edit content HERE. Every page reads from this file.

   Quick edits you'll probably want:
     · SITE.formspreeId  → turn the contact form into real email  (line ~30)
     · SITE.resumeUrl    → drop resume.pdf into assets/documents/ (line ~31)
     · WORK.roles        → add real jobs                          (line ~60)
     · PROJECTS[].repo   → per-project GitHub URLs                (search "repo:")
   ========================================================================== */

const SITE = {
  name: 'Jai Sharma',
  role: 'Data Scientist · ML Engineer',
  location: 'Boston, MA',
  email: 'sharmajai.us@gmail.com',
  github: 'https://github.com/jai0812',
  linkedin: 'https://linkedin.com/in/jaisharma08122002/',
  orcid: 'https://orcid.org/0009-0006-7427-8998',
  domain: 'sharmajai.com',

  // ---------------------------------------------------------------------------
  // CONTACT FORM — submissions go to Formspree (https://formspree.io/f/mzeprezw),
  // which emails you. If a send fails, the visitor's mail app opens instead.
  formspreeId: 'mzeprezw',

  // Download buttons stay hidden until this file exists.
  resumeUrl: 'assets/documents/resume.pdf',

  // One-line location strip under the hero. Set to '' to hide it.
  based: 'Boston University, MA'
};

/* ========================= WORK EXPERIENCE ================================ */
/* Add real roles here and they appear at the top of work.html automatically.
   While `roles` is empty the page leads with the Education & Research timeline
   instead — so nothing ever renders as an empty or broken section.

   Copy this shape per role:
   {
     title: 'Data Science Intern',
     company: 'Company Name',
     location: 'Boston, MA',
     start: 'Jun 2025', end: 'Aug 2025',
     bullets: [
       'Built X that produced Y measurable outcome.',
       'Shipped Z used by N people / cut runtime from A to B.'
     ],
     tech: ['Python', 'PySpark', 'AWS']
   },
*/
const WORK = {
  roles: [
    {
      title: 'System Engineer',
      company: 'Boston University College of Communication',
      location: 'Boston, MA · Part-time',
      start: 'Oct 2026', end: 'Present',
      bullets: [
        'Data architecture and technical support for the College of Communication — keeping its systems, data and tools running for faculty, staff and students.'
      ],
      tech: ['Data architecture', 'Technical support'],
      image: '',
      imageAlt: ''
    },
    {
      title: 'Data Engineer Intern',
      company: 'Insighta',
      location: 'Boston, MA',
      start: 'May 2026', end: 'Aug 2026',
      bullets: [
        'Built ML-driven response verification and payout gating for a survey research platform, so studies only pay for clean, trustworthy responses from confirmed participants.',
        'Built the tiered verified-participant module — identity, eligibility and response-quality checks — on FastAPI and SQLAlchemy.',
        'Built the analytics side: participation and response-quality reporting for the researchers running each study.'
      ],
      tech: ['Python', 'FastAPI', 'SQLAlchemy', 'Statistical analysis'],
      image: 'assets/experience/insighta.jpg',
      imageAlt: 'Diagram of a four-tier verification funnel — identity, eligibility, response quality, verified — feeding a payout gate that releases only after all four pass'
    },
    {
      title: 'Research Assistant',
      company: 'AI & Computer Vision (AICV) Lab, Boston University',
      location: 'Boston, MA · Part-time',
      start: 'Jan 2026', end: 'May 2026',
      bullets: [
        'Deep-learning research on medical image analysis for knee osteoarthritis — building U-Net bone-segmentation models on knee MRI to support automated osteoarthritis assessment.',
        'Handled the full imaging pipeline: DICOM-to-image conversion, mask generation, preprocessing, and training on BU\'s Shared Computing Cluster (GPU).',
        'The same underlying problem as my hand osteoarthritis research — getting dependable performance out of medical imaging data that is scarce and unevenly labelled.'
      ],
      tech: ['Python', 'PyTorch', 'TensorFlow', 'LangChain', 'U-Net', 'OpenCV'],
      image: 'assets/experience/knee-mri.jpg',
      imageAlt: 'Schematic of a knee joint from the side, with the articular cartilage and tibial plateau marked and a predicted segmentation contour drawn around the femoral condyle'
    },
    {
      title: 'Data Science Intern',
      company: 'Punjab State Power Corporation Ltd.',
      location: 'Punjab, India',
      start: 'Jan 2025', end: 'Jun 2025',
      bullets: [
        'Built Python pipelines to clean and analyze operational energy datasets for Punjab\'s state electricity utility.',
        'Ran exploratory analysis on historical power-consumption data to surface usage trends and inconsistencies, and delivered visual reports for stakeholders.',
        'Reduced manual entry and proxy attendance through a data-driven tracking system.'
      ],
      tech: ['Python', 'Pandas', 'SQL', 'Excel'],
      image: 'assets/experience/pspcl.jpg',
      imageAlt: 'Illustrative daily electricity demand curve over 24 hours, with the evening peak highlighted'
    },
    {
      title: 'Research Assistant',
      company: 'Guru Nanak Dev University',
      location: 'Amritsar, India',
      start: 'May 2024', end: 'Aug 2024',
      bullets: [
        'Research and software development for iris recognition and biometric identification: image segmentation, feature extraction and Hamming-distance matching.',
        'Analysis and results contributed to peer-reviewed publications.'
      ],
      tech: ['Python', 'OpenCV', 'Image processing', 'Biometrics'],
      image: '',
      imageAlt: ''
    }
  ],

  education: [
    {
      degree: 'MS, Applied Data Analytics',
      school: 'Boston University',
      location: 'Boston, MA',
      period: 'Sep 2025 — present',   // confirmed by Jai
      detail: 'Focus: big data engineering, computer vision, statistical machine learning.',
      courses: ['CS777 Big Data Analytics', 'CS790 Advanced Computer Vision', 'CS699 Data Mining',
                'Statistical Machine Learning', 'Mathematical Machine Learning', 'Data Science with Python',
                'Database Design', 'Generative AI']
    },
    {
      degree: 'B.Tech, Computer Science & Engineering',
      school: 'Guru Nanak Dev University',
      location: 'Amritsar, India',
      period: 'Jun 2021 — May 2025',
      detail: 'GPA 3.38/4. Focus: machine learning, data science, computer networks, data structures.',
      courses: []
    }
  ]
};

/* ============================== PILLARS =================================== */
const PILLARS = [
  {
    name: 'Data science & analytics',
    body: 'Real datasets, honest evaluation, statistical testing. I care most about what happens to the minority class — the rows a model is happy to ignore.',
    chips: ['Python', 'scikit-learn', 'Statsmodels', 'Pandas']
  },
  {
    name: 'Big data engineering',
    body: 'Distributed jobs that behave the same on my laptop and on a cloud cluster. Written down to the RDD when the abstraction gets in the way.',
    chips: ['PySpark', 'AWS EMR', 'S3', 'NumPy']
  },
  {
    name: 'Computer vision & applied AI',
    body: 'Generative models for medical imaging, and retrieval systems running on local LLMs. Research-grade methods, evaluated like production.',
    chips: ['PyTorch', 'Diffusion', 'LLaMA 3', 'FAISS']
  }
];

/* ============================ CASE STUDIES ================================ */
/* `thumb` images live in assets/thumbs/ and render in a wide rectangular panel
   (60% of the card). Supply them at roughly 1600×1000 — anything close to a
   16:10 rectangle works; the panel crops from the centre. Overwrite the file
   with the same name and it appears automatically.

   VIDEO INSTEAD OF A STILL
   Drop an .mp4 in assets/thumbs/ and set `video` to its path. It plays muted
   and looped, only while the card is on screen, with no controls — an ambient
   loop, not a player. Keep `thumb` set as well: it becomes the poster frame,
   so the card looks right before the video loads, if autoplay is blocked, or
   if the visitor has reduced motion turned on.

     video: 'assets/thumbs/hand-oa.mp4',
     videoWebm: '',   // optional smaller WebM, served first when present

   Aim for under ~4 MB each, 8–15 seconds, no audio track, H.264 / yuv420p.   */
const CASES = [
  {
    slug: 'case-harsc.html',
    kicker: 'Big data · Distributed computing',
    title: 'KNN from scratch on Spark: 21.7 million distance computations.',
    short: 'Human Activity Recognition on Spark',
    summary: 'The entire K-Nearest Neighbors algorithm — distance computation, neighbor selection, voting — implemented using pure PySpark RDD primitives. No MLlib, no scikit-learn. 90.53% accuracy classifying six human activities from 561-dimensional sensor data, deployed identically on a laptop and on AWS EMR.',
    metric: '0.9024', metricLabel: 'macro-F1 (beats published SVM baseline)',
    video: '',
    videoWebm: '',
    thumb: 'assets/thumbs/harsc.png',
    thumbAlt: 'Smartwatch on a wrist recognizing human activity, with a holographic display showing Walking, Running, Sitting and Cycling classifications alongside a data pipeline',
    tech: ['PySpark', 'AWS EMR', 'S3', 'NumPy']
  },
  {
    slug: 'case-hand-oa.html',
    kicker: 'Computer vision · Medical imaging',
    title: 'Teaching a diffusion model to draw the X-rays we don\'t have',
    short: 'Hand OA X-ray synthesis',
    summary: 'Severe osteoarthritis is 2.9% of a 13,176-image dataset — so classifiers fail exactly where the clinical stakes are highest. A class-conditional latent diffusion model generated the missing severe grades and lifted 5-class AUC from 0.878 to 0.908.',
    metric: '+0.072', metricLabel: 'AUC on the rarest grade (KL4)',
    video: '',
    videoWebm: '',
    thumb: 'assets/thumbs/hand-oa.png',
    thumbAlt: 'Title card reading "Generating KL grade osteoarthritis in DIP joints", beside two finger-joint X-rays labelled KL 0-2 lower grade and KL 3-4 higher grade',
    tech: ['PyTorch', 'Latent Diffusion', 'CycleGAN', 'VAE', 'ResNet-18']
  },
  {
    slug: 'case-lane-advantage.html',
    kicker: 'Sports analytics · Elite sprinting',
    title: 'Middle lanes win more sprints. Not because they run faster.',
    short: 'Lane advantage in track & field',
    summary: 'A decade of Olympic and World Championship sprint results, tested properly. Lane and winning are strongly dependent — but finishing times across lanes are statistically identical. The advantage is structural, not physiological.',
    metric: '8.2% → 0%', metricLabel: 'middle-lane vs inside-lane win rate',
    video: 'assets/thumbs/lane.mp4',
    videoWebm: '',
    thumb: 'assets/thumbs/lane.jpg',
    thumbAlt: 'Bar chart of win probability by lane, peaking near 13% at lanes 5 and 6 and flat at zero for lanes 1 and 2',
    tech: ['R', 'tidyverse', 'Chi-square', 'ANOVA', 'Tukey HSD']
  },
  {
    slug: 'case-disability.html',
    kicker: 'Data science · American Housing Survey 2023',
    title: 'Thirty-six models, and the simplest fix won',
    short: 'US household disability prediction',
    summary: 'Nine classifiers crossed with four class-balancing strategies on 9,241 households, all scored on minority-class recall rather than accuracy. Plain random undersampling beat SMOTE and every fancier alternative.',
    metric: '36', metricLabel: 'pipelines trained on one identical split',
    video: '',        // e.g. 'assets/thumbs/disability.mp4' — see note above
    videoWebm: '',
    thumb: 'assets/thumbs/disability.jpg',
    thumbAlt: 'Infographic showing imbalanced dataset structure, conventional model failure at 90%+ raw accuracy, and the classifier plus imbalance fix solution with SMOTE, ADASYN, Tomek Links and class weighting leading to balanced performance',
    tech: ['scikit-learn', 'imbalanced-learn', 'Pandas']
  }
];

/* ============================ PUBLICATIONS ================================ */
const PAPERS = [
  {
    id: 'retinopathy',
    title: 'A Hybrid Approach Combining Deep CNN Features with Classical Machine Learning for Diabetic Retinopathy Diagnosis',
    venue: 'IJACSA', vol: 'Vol. 16, No. 8', year: '2025', type: 'Journal article',
    doi: '10.14569/ijacsa.2025.0160827',
    url: 'https://doi.org/10.14569/ijacsa.2025.0160827',
    authors: ['Jai Sharma', 'Amandeep Kaur', 'Simranjit Singh', 'Hardeep Singh', 'Sarveshwar Bharti', 'Himanshi Sharma'],
    first: true,
    headline: 'A tuned RBF-SVM reading dual-CNN features hit 85.48% accuracy — beating every end-to-end deep baseline it was compared against, while staying light enough for a rural clinic.',
    problem: 'Diabetic retinopathy is the leading cause of preventable blindness, and it progresses silently — by the time manual inspection catches it, it is often advanced. The goal was an automated system that reads a retinal fundus image and classifies the disease stage.',
    did: [
      'Preprocessed each image to 224×224, extracted the green channel (where vessels and lesions show clearest), then applied top-hat filtering for bright exudates and bottom-hat for dark hemorrhages.',
      'Used GoogleNet and ResNet-18 as feature extractors only — classification heads removed — and concatenated their feature maps into one vector per image.',
      'Z-score normalised, then ran ten classical classifiers over those features. The winning RBF-SVM was tuned with GridSearchCV and 5-fold cross-validation.'
    ],
    data: 'APTOS 2019 Blindness Detection · 3,662 retinal fundus images · 5 stages',
    results: [
      ['Best model', 'Tuned RBF-SVM'],
      ['Accuracy', '85.48%'],
      ['Precision / F1', '85.05% / 84.93%'],
      ['Per-class AUC', '0.87 – 0.99']
    ],
    compare: [
      ['This work — dual-CNN + RBF-SVM', 85.48],
      ['Gulshan 2016 — InceptionV3', 82],
      ['Islam 2022 — CNN + SVM', 81.7],
      ['Mohanty 2023 — VGG16 + XGBoost', 79.5],
      ['Pratt 2016 — CNN end-to-end', 75]
    ],
    compareLabel: 'Accuracy vs prior published work (%)',
    why: 'Splitting the problem — deep networks for representation, a classical classifier for the decision — outperformed every standalone deep model here while remaining interpretable and cheap to deploy. That combination matters clinically, where an unexplained prediction is not much use.',
    tools: ['Python', 'TensorFlow', 'GoogleNet', 'ResNet-18', 'scikit-learn', 'OpenCV']
  },
  {
    id: 'centrality',
    title: 'Comparative Evaluation of Centrality Measures for Detecting Significant Nodes in Social Networks',
    venue: 'IJACSA', vol: 'Vol. 16, No. 9', year: '2025', type: 'Journal article',
    doi: '10.14569/IJACSA.2025.0160926',
    url: 'https://doi.org/10.14569/IJACSA.2025.0160926',
    // Co-authors to be added.
    authors: [],
    first: false,
    headline: 'Twelve centrality measures, four real networks, one verdict: gravity-based measures win on accuracy and node differentiation, and Betweenness is both the slowest and the least accurate.',
    problem: 'Some nodes in a network matter far more than others — for containing an outbreak, targeting influence, or hardening a power grid. Dozens of centrality measures exist to find them and there is no agreed-upon best. This paper benchmarks them head to head.',
    did: [
      'Selected 12 measures spanning local (Degree, ProfitLeader), semi-local (H-Index, Local Gravity) and global (Betweenness, Closeness, Eigenvector, PageRank, K-Shell, Gravity, Extended Gravity, Electric Potential) scope.',
      'Ran all of them on the same four real-world networks, so the comparison is genuinely apples-to-apples.',
      'Scored on three axes — accuracy against ground truth, differentiation between nodes, and runtime as the network grows.',
      'Established ground truth with SIR epidemic simulation, then measured agreement with Kendall Tau and separation with Monotonicity.'
    ],
    data: 'LastFM (7,624 nodes) · US Western power grid (4,941) · Webspam (4,767) · Dolphins (62)',
    results: [
      ['Most accurate', 'Extended Gravity (τ up to 0.897)'],
      ['Least accurate', 'Betweenness (τ 0.411)'],
      ['Fastest', 'Degree (0.0036s on LastFM)'],
      ['Slowest', 'Betweenness (350.6s on LastFM)']
    ],
    compare: [
      ['Extended Gravity', 0.897], ['Gravity', 0.849],
      ['Electric Potential', 0.831], ['K-Shell', 0.522], ['Betweenness', 0.411]
    ],
    compareLabel: 'Kendall τ — ranking accuracy against SIR ground truth',
    why: 'Practitioners have to pick a measure before they can do anything else, and the popular defaults are a poor choice. Extended Gravity gives the best accuracy and near-perfect differentiation at moderate cost; Betweenness costs five orders of magnitude more runtime to be less accurate.',
    tools: ['Python', 'NetworkX', 'SIR simulation', 'Kendall Tau']
  },
  {
    id: 'climate',
    title: 'Fifty Years of Climate Change Studies: A Scientometric Assessment',
    venue: 'IEEE Access', vol: 'Vol. 13', year: '2025', type: 'Journal article',
    doi: '10.1109/ACCESS.2025.3578434',
    url: 'https://doi.org/10.1109/ACCESS.2025.3578434',
    authors: ['Sulaimon Oyeniyi Adebayo', 'Hardeep Singh', 'Supreet Kaur', 'Himanshi Sharma', 'Jai Sharma', 'Karman Singh Sethi'],
    first: false,
    headline: 'One of the largest scientometric studies in the field: 437,035 documents over 50 years, mapping who publishes climate research, from where, and on what.',
    problem: 'Climate research has grown explosively for five decades, but nobody had mapped the field at full scale — who publishes, from which countries and institutions, on which topics, and how all of that shifted over time.',
    did: [
      'Retrieved 437,035 documents from Scopus covering 1972–2021, chosen for its coverage, citation depth and VOSviewer compatibility.',
      'Cleaned and disambiguated authors using ORCID and Scopus Author IDs, then filtered on SJR, CiteScore and H-Index.',
      'Ran four analyses in VOSviewer — citation, authorship and co-citation, country and institutional collaboration, and keyword clustering.',
      'Sliced the whole corpus decade by decade, 1972–81 through 2012–21, to trace how the field moved.'
    ],
    data: '437,035 documents · 1972–2021 · Scopus · 14.3% average annual growth',
    results: [
      ['Corpus', '437,035 documents'],
      ['Concentration', '69% published in the last decade'],
      ['Leading country', 'USA, 19.18% of all output'],
      ['Peak year', '2021 — 47,362 papers']
    ],
    compare: [
      ['USA', 19.18], ['China', 8.18], ['UK', 8.00], ['Germany', 5.51],
      ['Australia', 4.88], ['Canada', 4.37], ['India', 2.39]
    ],
    compareLabel: 'Share of global climate-change publications (%)',
    why: 'The output is heavily concentrated — by decade, by country, by language — and the growth spikes track policy milestones like Kyoto, the IPCC assessments and Paris. The clearest finding is a gap: Africa and non-English research are badly underrepresented in a literature about a global problem.',
    tools: ['Scopus', 'VOSviewer', 'ORCID', 'Excel']
  },
  {
    id: 'gravity',
    title: 'Comparative Evaluation of Different Gravity Centrality Measures for Finding Central Nodes in Social Networks',
    venue: 'Springer Nature · CCIS', vol: 'Book chapter', year: '2027', type: 'Book chapter',
    doi: '10.1007/978-3-032-27120-4_21',
    url: 'https://doi.org/10.1007/978-3-032-27120-4_21',
    authors: ['Hardeep Singh', 'Jai Sharma', 'Harnoor Kaur'],
    first: false,
    headline: 'A focused follow-up to the centrality benchmark, narrowing in on the gravity family that came out ahead.',
    problem: '',
    did: [],
    data: '',
    results: [],
    compare: [],
    compareLabel: '',
    // Deep-dive to be added; the write-up section appears once it is filled in.
    why: '',
    tools: ['Python', 'NetworkX']
  }
];

/* =========================== LIVE PRODUCTS ================================ */
/* Things running in public right now. Shown as browser windows on the home
   page, with the real address in the address bar. `shot` is a screenshot in
   assets/products/ (any width ≥1200px). Frames are 16:10 unless `ratio`
   is set; they crop from the top.                                          */
const PRODUCTS = [
  {
    name: 'SharmaJai Job Portal',
    url: 'https://jobs.sharmajai.com',
    host: 'jobs.sharmajai.com',
    repo: 'https://github.com/jai0812/job_portal',
    shot: 'assets/products/job-portal.jpg',
    ratio: '2 / 1',
    shotAlt: 'The job portal home page: the headline "Jobs from the source, minutes after they\'re posted" above a departure-board table of new postings',
    summary: 'Reads 526 employers\' own career sites and 43 job lists every 10–30 minutes, de-duplicates them into one table, and shows each US employer\'s real H-1B approval history from USCIS data.',
    facts: [['526', 'career sites read'], ['~200k', 'open jobs indexed'], ['10 min', 'refresh for top companies']],
    tech: ['Python', 'FastAPI', 'SQLite', 'JavaScript', 'Apify']
  },
  {
    name: 'Boston Subway Replay',
    url: 'https://mbta.sharmajai.com',
    host: 'mbta.sharmajai.com',
    repo: 'https://github.com/jai0812/boston-transit-reliability',
    shot: 'assets/products/transit.jpg',
    shotAlt: 'Replay of Kenmore station on the Green Line: an LED countdown showing arrival ranges, and a schematic of the B, C, D and E branches with live trains',
    summary: 'Day-ahead arrival forecasts with calibrated ranges for every Blue, Red and Green Line train, checked against 12.5 million real arrivals. Replay any morning commute on a live map.',
    facts: [['12.5M', 'arrivals checked'], ['75–82%', 'inside an 80% range'], ['104', 'stations']],
    tech: ['Python', 'DuckDB', 'LightGBM', 'Conformal prediction', 'React', 'MapLibre']
  }
];

/* ============================ CERTIFICATIONS ============================== */
const CERTS = [
  { name: 'Bloomberg Market Concepts', issuer: 'Bloomberg', date: 'Oct 2026',
    id: 'fEkaXS1Unb6L6wPZYUfAwLyb',
    url: 'https://portal.bloombergforeducation.com/certificates/fEkaXS1Unb6L6wPZYUfAwLyb' },
  { name: 'Introduction to Data Analytics in Google Cloud', issuer: 'Google Cloud Skills Boost', date: 'Jul 2024',
    id: '9837380',
    url: 'https://www.cloudskillsboost.google/public_profiles/a0ad5eb3-2913-48c8-9632-d2cccebde651/badges/9837380' },
  { name: 'Introduction to Git and GitHub', issuer: 'Google · Coursera', date: 'Jul 2024',
    id: 'PZ2QUNQB35ST',
    url: 'https://www.coursera.org/account/accomplishments/records/PZ2QUNQB35ST' },
  { name: 'Software Engineering Job Simulation', issuer: 'Goldman Sachs · Forage', date: 'Mar 2024',
    id: '3uksNSXnMYwz9hGyy',
    url: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Goldman%20Sachs/NPdeQ43o8P9HJmJzg_Goldman%20Sachs_ApweQ9EW6F4KN7Met_1711316877126_completion_certificate.pdf' },
  { name: 'Cloud Platform Job Simulation', issuer: 'Verizon · Forage', date: 'Mar 2024',
    id: '7MxLcuGSExR2Cucza', url: '' },
  { name: 'Foundations: Data, Data, Everywhere', issuer: 'Google · Coursera', date: 'Jul 2022',
    id: 'LLHDTTSAJF5B',
    url: 'https://www.coursera.org/account/accomplishments/records/LLHDTTSAJF5B' }
];

/* ============================== PROJECTS ================================== */
/* `featured` links a case study, `live` a running site, `repo` the code.
   Leave `repo` empty for private work and the card says so instead.         */
const PROJECTS = [
  { name: 'SharmaJai Job Portal', cat: 'Full-stack products', featured: '', live: 'https://jobs.sharmajai.com',
    desc: 'Job search built from employers\' own career sites: 526 sites and 43 job lists checked every 10–30 minutes, de-duplicated into one table, with USCIS H-1B approval history for every US employer and per-user application tracking.',
    stat: 'Live · ~200k open jobs', tech: ['Python', 'FastAPI', 'SQLite', 'JavaScript', 'Apify'],
    repo: 'https://github.com/jai0812/job_portal' },

  { name: 'Boston Subway Replay', cat: 'Machine learning', featured: '', live: 'https://mbta.sharmajai.com',
    desc: 'Day-ahead arrival forecasts with conformal prediction ranges for Boston\'s Blue, Red and Green Lines, scored on 12.5M real arrivals. Beat the historical baseline on the Red Line; the Green Line loss is reported as measured.',
    stat: '75–82% coverage vs 80% target', tech: ['DuckDB', 'LightGBM', 'Conformal prediction', 'FastAPI', 'React', 'TypeScript'],
    repo: 'https://github.com/jai0812/boston-transit-reliability' },

  { name: 'Boston Restaurant Saturation', cat: 'Machine learning', featured: '', live: '',
    desc: 'How many restaurants can a Boston neighbourhood support? Census, OpenStreetMap, food-inspection and LODES jobs data feed three LightGBM and kNN models — capacity, underserved cuisines and 24-month survival — behind a what-if map.',
    stat: '681 block groups scored', tech: ['Python', 'LightGBM', 'GeoPandas', 'FastAPI', 'Next.js'],
    repo: 'https://github.com/jai0812/boston-restaurant-saturation' },

  { name: 'AI Contract Management', cat: 'NLP & LLMs', featured: '', live: '',
    desc: 'Proof of concept that turns media contracts into structured, source-traceable terms. I lead extraction: PDF ingestion with layout, table and OCR-quality detection, a Pydantic term schema, and an evaluator that checks every value against a quote on its page.',
    stat: 'AI architect · team of four', tech: ['Python', 'PyMuPDF', 'Pydantic', 'pytest', 'uv'],
    repo: '', private: true },

  { name: 'Piano Learn', cat: 'Full-stack products', featured: '', live: 'https://jai0812.github.io/piano-learn/',
    desc: 'A laptop-keyboard piano with falling tiles, a sampled Yamaha grand, 26 songs at three levels, MIDI import and recording — in a single HTML file.',
    stat: 'Live · zero dependencies', tech: ['JavaScript', 'Web Audio API', 'Canvas'],
    repo: 'https://github.com/jai0812/piano-learn' },

  { name: 'Hand OA X-ray Synthesis', cat: 'Computer vision', featured: 'case-hand-oa.html',
    desc: 'Class-conditional latent diffusion plus a CycleGAN baseline, built to fix an extreme class imbalance where severe grades were 2.9% of the data.',
    stat: '0.878 → 0.908 AUC', tech: ['PyTorch', 'Diffusion', 'CycleGAN', 'ResNet-18', 'VAE'],
    repo: '' },

  { name: 'Human Activity Recognition on Spark', cat: 'Big data', featured: 'case-harsc.html',
    desc: 'KNN written from scratch on PySpark RDD primitives with zero MLlib, classifying six activities from 561-dimensional sensor data — roughly 21.7 million distance computations.',
    stat: '90.53% on AWS EMR', tech: ['PySpark', 'AWS EMR', 'S3', 'NumPy'],
    repo: 'https://github.com/jai0812/Human-Activity-Recognition' },

  { name: 'US Household Disability Prediction', cat: 'Data science', featured: 'case-disability.html',
    desc: 'Nine classifiers crossed with four balancing techniques on 9,241 households and 145 features from the 2023 American Housing Survey.',
    stat: '36 pipelines compared', tech: ['scikit-learn', 'imbalanced-learn', 'Pandas'],
    repo: 'https://github.com/jai0812/us-household-disability-prediction' },

  { name: 'Lane Advantage in Track & Field', cat: 'Sports analytics', featured: 'case-lane-advantage.html',
    desc: 'Does lane assignment decide sprint races? About 866 elite race entries tested with chi-square, logistic regression, ANOVA and Tukey HSD.',
    stat: 'χ² = 50.6, p = 3×10⁻⁸', tech: ['R', 'tidyverse', 'ANOVA', 'Tukey HSD'],
    repo: 'https://github.com/jai0812/LaneAdvantage-Analytics' },

  { name: 'Multi-Agent RAG Assistant', cat: 'NLP & LLMs', featured: '',
    desc: 'Question answering over research papers using LLaMA 3 through Ollama, FAISS embeddings, and cosine-similarity scoring to flag likely hallucinations.',
    stat: 'Runs fully local', tech: ['LangChain', 'Ollama', 'LLaMA 3', 'FAISS'],
    repo: '' },

  { name: 'Face Recognition Attendance', cat: 'Computer vision', featured: '',
    desc: 'Webcam attendance capture using LBPH facial recognition, with a Tkinter dashboard and WhatsApp alerts over Twilio.',
    stat: 'End-to-end desktop app', tech: ['OpenCV', 'Tkinter', 'Twilio'],
    repo: 'https://github.com/jai0812/Face-Recognition-Attendance-System' },

  { name: 'Anomaly Detection Visualizer', cat: 'Data science', featured: '',
    desc: 'Drop in any CSV, pick your features, and see anomalies surfaced by Isolation Forest in an interactive Plotly view.',
    stat: 'Streamlit app', tech: ['Streamlit', 'scikit-learn', 'Plotly'],
    repo: 'https://github.com/jai0812/anomaly-visualizer' },

  { name: 'MovieLens 10M Analysis', cat: 'Big data', featured: '',
    desc: 'Rating-distribution analysis across 10 million rows, with five-partition splitting and a manual sort benchmarked against Python\'s built-in.',
    stat: '10M rows', tech: ['Python', 'NumPy', 'Matplotlib'],
    repo: 'https://github.com/jai0812/Big_Data_Projects' },

  { name: 'NYC Taxi Analytics', cat: 'Big data', featured: '',
    desc: 'Pure-Python streaming analysis of 2013 trip data: most active taxis, highest earning drivers by dollars per minute, and peak revenue hours.',
    stat: 'Revenue peaks at 7 PM', tech: ['Python', 'CSV', 'Jupyter'],
    repo: 'https://github.com/jai0812/Big_Data_Projects' },

  { name: 'Data Cleaning Toolkit', cat: 'Data analytics', featured: '',
    desc: 'A reusable preprocessing pipeline: missing-value handling, IQR outlier removal, min-max and z-score normalisation, and one-hot encoding.',
    stat: 'Reusable pipeline', tech: ['Python', 'Pandas', 'Matplotlib'],
    repo: 'https://github.com/jai0812/Python-utils' },

  { name: 'InventaBill', cat: 'Tools', featured: '',
    desc: 'Desktop retail billing and inventory system with GST invoicing, stock management, sales analytics and PDF invoice generation.',
    stat: 'Shipped desktop app', tech: ['Python', 'Tkinter', 'SQLite', 'FPDF'],
    repo: 'https://github.com/jai0812/InventaBill' },

  { name: 'Insighta Platform', cat: 'Tools', featured: '',
    desc: 'Survey research platform with a verified-participant engine, tiered verification and payout gating.',
    stat: 'Full-stack service', tech: ['FastAPI', 'SQLAlchemy', 'Jinja2'],
    repo: '' },

  { name: 'Text Editor on a Linked List', cat: 'Tools', featured: '',
    desc: 'A command-line text editor built on a custom singly linked list, so line insertion and deletion stay cheap.',
    stat: 'Data structures from scratch', tech: ['C++'],
    repo: 'https://github.com/jai0812/Text_Editor' },

  { name: 'SQL Coursework', cat: 'Data analytics', featured: '',
    desc: 'PostgreSQL schema design work: normalisation, constraints, indexing strategy and query optimisation.',
    stat: 'PostgreSQL', tech: ['PostgreSQL', 'SQL'],
    repo: 'https://github.com/jai0812/sql-courseqwork' }
];

/* ======================= SYSTEM DESIGN DIAGRAMS =========================== */
/* One diagram per project, keyed by its name in PROJECTS. Shown in the
   project's Quick view and, for case studies, on the case-study page.
   Each layer is L(name, [[component, detail], …], highlight). Data flows top
   to bottom; mark the layer that does the core work with `true`.            */
const L = (layer, nodes, hl) => ({ layer: layer, nodes: nodes, hl: !!hl });

const ARCH = {
  'SharmaJai Job Portal': {
    note: 'Two refresh lanes share one database: top companies and GitHub lists every 10 minutes, everything else every 30. Job lists are built in short-lived streaming processes, which keeps peak memory near 90 MB on a small server, and a self-check every 5 minutes restarts the app cleanly if it ever loses its files.',
    layers: [
      L('Sources', [['GitHub job lists', '43 curated lists'], ['Employer career sites', '526 · Workday, Greenhouse, Lever, Ashby…'], ['University career sites', 'often H-1B cap-exempt'], ['LinkedIn via Apify', 'on demand, budget-capped']]),
      L('Collection', [['Fast lane', 'top companies + lists · every 10 min'], ['Full refresh', 'every source · every 30 min']]),
      L('Processing', [['De-duplication', 'one row per real opening'], ['Tagging', 'sector · level · country · finance firm'], ['H-1B join', 'USCIS Employer Data Hub, FY2023']], true),
      L('Storage', [['SQLite', 'jobs, users, application status']]),
      L('Application', [['FastAPI', 'sessions · scrypt passwords · admin-only routes'], ['Plain-JS dashboard', 'no build step']]),
      L('Outputs', [['Job tables & analytics', 'per-user applied / wait / decline'], ['Alerts', 'ntfy · Telegram · email'], ['Live README snapshot', 'rewritten after each refresh']])
    ]
  },

  'Boston Subway Replay': {
    note: 'Static first: the model never runs on a request path. Every release is an immutable, hash-stamped bundle of JSON, so rolling back the site rolls back its data, and the build fails loudly on missing columns, duplicate keys or any feature that peeks past 8 PM the night before.',
    layers: [
      L('Sources', [['MBTA LAMP', '370 daily Parquet files'], ['GTFS archive', '122 timetable versions']]),
      L('Ingest', [['fetch', 'SHA-256 manifest · idempotent · retries']]),
      L('Transform', [['DuckDB SQL', 'scheduled roster ⟕ recorded arrivals'], ['Data-quality flags', 'unobserved · gaps · conflicts'], ['Features', 'known by 8 PM the day before']]),
      L('Model', [['Baselines', 'timetable · historical percentiles'], ['LightGBM quantiles', 'q10 · q50 · q90 per line'], ['Conformal calibration', 'CQR widening to an 80% range']], true),
      L('Evaluate', [['Held-out test weeks', 'scored once · bootstrap CIs'], ['Release criteria', 'pre-registered pass / fail']]),
      L('Serve', [['Versioned JSON release', 'release_id from input hashes'], ['React + MapLibre site', 'mbta.sharmajai.com'], ['FastAPI', 'read-only /v1 API']])
    ]
  },

  'Boston Restaurant Saturation': {
    note: 'The capacity model is trained only on "healthy" block groups (low violation and failure rates), so it learns what a sustainable restaurant market looks like instead of reproducing today\'s saturation.',
    layers: [
      L('Sources', [['US Census ACS', 'demographics'], ['OpenStreetMap', 'restaurant locations'], ['Boston food inspections', 'data.boston.gov'], ['LEHD LODES', 'daytime workers'], ['TIGER/Line', 'block-group shapes']]),
      L('Ingest', [['Python scrapers', 'one per source · Selenium fallback']]),
      L('Features', [['Hygiene risk', 'violations per block group'], ['Geo-join & aggregate', '681 block groups × 37 columns']]),
      L('Models', [['Capacity regressor', 'LightGBM · restaurants per 1,000'], ['Cuisine recommender', 'kNN over demographic peers'], ['Survival classifier', 'LightGBM · P(open at 24 months)']], true),
      L('API', [['FastAPI', 'per-block-group scores + what-if']]),
      L('Interfaces', [['Next.js 14 map', 'GO / RISKY / AVOID verdicts'], ['Streamlit dashboard', 'risk distribution']])
    ]
  },

  'AI Contract Management': {
    note: 'AI proposes terms but never calculates money. Every extracted value must trace to a page and a quote in the source PDF, amendments append rather than overwrite, and the legacy Excel and SQL Server systems stay read-only.',
    layers: [
      L('Input', [['Contract PDFs', 'synthetic and public samples only']]),
      L('Stage 1 · Ingestion', [['PyMuPDF parser', 'page text · blocks with bounding boxes'], ['Table detection', 'ruled lines or text alignment'], ['Quality flags', 'needs OCR · multi-column · suspect tables']]),
      L('Stage 2 · Extraction', [['LLM extraction', 'two passes · pending provider approval'], ['Pydantic term schema', 'decimal-string money · ISO dates · evidence']], true),
      L('Validation', [['Evidence check', 'each quote found on its cited page'], ['Extraction evaluator', 'precision · recall · per-field accuracy'], ['SME review', 'contract specialist sign-off']]),
      L('Later phases', [['Deterministic rules', 'Decimal obligations'], ['Reconciliation', 'line by line vs legacy Excel / SQL Server'], ['Audit pack', 'versioned contract record']])
    ]
  },

  'Piano Learn': {
    note: 'One HTML file with no build step and no dependencies. The grand-piano samples stream from the web on first use, and the app falls back to a built-in synthesised sound when offline.',
    layers: [
      L('Input', [['Laptop keyboard', '32-key window, slides by octave'], ['Mouse', 'any of the 88 keys'], ['MIDI files', 'drag and drop']]),
      L('Engine', [['Song model', '[notes, beats, flags] · auto levels'], ['MIDI parser', 'tempo map · running status'], ['Game loop', 'timing · score · streak · stars']], true),
      L('Sound', [['Web Audio API', 'Salamander Yamaha C5 samples'], ['Signal chain', 'velocity filter · compressor · reverb']]),
      L('Display', [['Canvas renderer', 'falling tiles aligned to 88 keys']]),
      L('Storage', [['localStorage', 'recordings · imported songs']])
    ]
  },

  'Hand OA X-ray Synthesis': {
    note: 'The KL grade is injected into every UNet block by scale-and-shift, not just at the input, which is what the CycleGAN baseline had no way to do. Severe grades are seeded from real anatomy, and every evaluation uses patients never seen in training or generation.',
    layers: [
      L('Data', [['13,176 DIP-joint X-rays', '3,505 patients · BU + Tufts'], ['Patient-level split', '70 / 15 / 15 · zero leakage verified']]),
      L('Compress', [['VAE encoder', '180×180 → 22×22×8 latent (16:1)']]),
      L('Generate', [['KL-conditioned UNet', 'DDPM · classifier-free guidance'], ['Severe-grade seeding', 'KL3–4 from real KL0–2 re-noised at 60%'], ['CycleGAN baseline', 'unpaired healthy ↔ diseased']], true),
      L('Decode', [['VAE decoder', '1,500 synthetic X-rays · 300 per grade']]),
      L('Evaluate', [['ResNet-18 retraining', 'real + synthetic at 10–200% · 3 seeds'], ['Per-grade AUC & FID', 'held-out patients only']])
    ]
  },

  'Human Activity Recognition on Spark': {
    note: 'Broadcast-and-map: the 33 MB training set is shipped to each executor exactly once, and every test row is classified independently inside RDD.map(). No shuffle during inference, so it scales linearly with executor cores, on a laptop or on AWS EMR, with zero code changes.',
    layers: [
      L('Storage', [['UCI HAR files', 'local disk or Amazon S3']]),
      L('Driver', [['Parse & label', 'zipWithIndex → (id, features, label)'], ['K sweep', 'K ∈ {1, 3, 5, 7, 11} → K = 11'], ['sc.broadcast()', '7,352 × 561 training set, sent once']]),
      L('Executors', [['RDD.map() per partition', 'Euclidean distance to every training row'], ['Top-K + majority vote', 'no shuffle']], true),
      L('Evaluate', [['Collect predictions', '2,947 test samples'], ['Metrics', 'accuracy · macro-F1 · confusion matrix']]),
      L('Deploy', [['Laptop', 'local[*]'], ['AWS EMR', 'same code, data on S3']])
    ]
  },

  'US Household Disability Prediction': {
    note: 'Every pipeline uses the same split and the same preprocessing path, so the 36 results can be ranked directly against each other. Ranking is on minority-class recall and F1, never on overall accuracy.',
    layers: [
      L('Data', [['American Housing Survey 2023', '9,241 households × 145 features']]),
      L('Prepare', [['Clean & encode', 'categorical survey fields'], ['Stratified split', 'held constant for every pipeline']]),
      L('Balance', [['None', 'reference'], ['Random oversampling', ''], ['SMOTE', 'synthetic minority rows'], ['Random undersampling', '']]),
      L('Classify', [['9 classifiers', 'each crossed with all 4 balancers → 36 pipelines']], true),
      L('Score', [['Minority-class recall & F1', 'ranked across all 36'], ['Winner', 'random undersampling']])
    ]
  },

  'Lane Advantage in Track & Field': {
    note: 'Two separate questions, tested separately: whether lane predicts winning, and whether lane predicts finishing time. Lane predicts winning; it does not predict time.',
    layers: [
      L('Data', [['Web scrape', '866 entries · 100 / 200 / 400 m'], ['Championships', 'Olympics + Worlds, 2008–2023']]),
      L('Clean', [['R · tidyverse', 'reshape · lane groups']]),
      L('Test', [['Chi-square', 'lane × win'], ['Logistic regression', 'lane → win odds'], ['ANOVA', 'lane → finishing time']], true),
      L('Confirm', [['Grouped lanes', 'inside · middle · outside'], ['Two-way ANOVA', 'lane × event'], ['Tukey HSD', 'pairwise differences']]),
      L('Conclusion', [['Structural, not physiological', 'middle lanes win; no lane is faster']])
    ]
  },

  'Multi-Agent RAG Assistant': {
    note: 'Everything runs locally through Ollama: no document or question leaves the machine. Answers are scored for similarity against the passages they cite so likely hallucinations are flagged instead of presented as fact.',
    layers: [
      L('Documents', [['Research papers', 'PDF']]),
      L('Index', [['Chunk & embed', 'LangChain'], ['FAISS', 'vector store']]),
      L('Agents', [['Retriever', 'top passages per question'], ['Answerer', 'LLaMA 3 via Ollama']], true),
      L('Check', [['Hallucination score', 'cosine similarity, answer vs sources']]),
      L('Output', [['Answer + sources', 'low-support answers flagged']])
    ]
  },

  'Face Recognition Attendance': {
    layers: [
      L('Capture', [['Webcam', 'OpenCV video stream']]),
      L('Enrol', [['Face samples', 'per person, stored with an ID']]),
      L('Recognise', [['Face detection', 'OpenCV'], ['LBPH recogniser', 'match against enrolled faces']], true),
      L('Record', [['Attendance log', 'name · date · time']]),
      L('Interfaces', [['Tkinter dashboard', 'daily and historical records'], ['WhatsApp alerts', 'Twilio']])
    ]
  },

  'Anomaly Detection Visualizer': {
    layers: [
      L('Input', [['CSV upload', 'any tabular file']]),
      L('Configure', [['Feature selection', 'pick the columns to analyse']]),
      L('Detect', [['Isolation Forest', 'scikit-learn'], ['LOF · Z-score', 'alternative detectors']], true),
      L('Visualise', [['Plotly charts', 'anomalies highlighted'], ['Streamlit app', 'runs in the browser']])
    ]
  },

  'MovieLens 10M Analysis': {
    layers: [
      L('Data', [['MovieLens 10M', '10 million ratings']]),
      L('Partition', [['Five partitions', 'processed separately']]),
      L('Compute', [['Rating distribution', 'per partition and overall'], ['Manual sort', 'benchmarked against Python\'s sorted()']], true),
      L('Report', [['Matplotlib charts', 'distributions and timings']])
    ]
  },

  'NYC Taxi Analytics': {
    layers: [
      L('Data', [['2013 NYC taxi trips', 'CSV']]),
      L('Stream', [['Row-by-row reader', 'pure Python, constant memory']]),
      L('Aggregate', [['Most active taxis', 'trip counts'], ['Top earners', 'dollars per minute'], ['Revenue by hour', 'peak at 7 PM']], true),
      L('Report', [['Jupyter notebook', 'tables and findings']])
    ]
  },

  'Data Cleaning Toolkit': {
    layers: [
      L('Input', [['Raw DataFrame', 'Pandas']]),
      L('Clean', [['Missing values', 'drop or impute'], ['Outliers', 'IQR rule']], true),
      L('Transform', [['Scaling', 'min-max · z-score'], ['Encoding', 'one-hot']]),
      L('Output', [['Clean dataset', 'with before / after plots']])
    ]
  },

  'InventaBill': {
    layers: [
      L('Interface', [['Tkinter desktop app', 'billing · stock · reports']]),
      L('Logic', [['Inventory', 'real-time stock updates'], ['Billing', 'GST · CGST / SGST split'], ['Sales analytics', 'daily and product totals']], true),
      L('Storage', [['SQLite', 'products · invoices · sales']]),
      L('Output', [['PDF invoices', 'FPDF']])
    ]
  },

  'Insighta Platform': {
    layers: [
      L('Participants', [['Survey responses', 'from study participants']]),
      L('Verification', [['Identity', 'tier 1'], ['Eligibility', 'tier 2'], ['Response quality', 'tier 3']], true),
      L('Gate', [['Payout gate', 'releases only after every tier passes']]),
      L('Backend', [['FastAPI + SQLAlchemy', 'studies · participants · payouts']]),
      L('Researchers', [['Jinja2 dashboards', 'participation and quality analytics']])
    ]
  },

  'Text Editor on a Linked List': {
    layers: [
      L('Input', [['Command line', 'insert · delete · find · save']]),
      L('Core', [['Singly linked list', 'one node per line · cheap insert / delete']], true),
      L('Storage', [['Text file', 'load and save']])
    ]
  },

  'SQL Coursework': {
    layers: [
      L('Design', [['Normalised schema', 'entities and relationships']]),
      L('Integrity', [['Constraints', 'keys · checks · referential integrity']], true),
      L('Performance', [['Indexes', 'chosen per query pattern'], ['Query optimisation', 'reading plans in PostgreSQL']])
    ]
  }
};

/* ============================== INTERESTS ================================= */
/* Problem areas, shown on the Experience page.                              */
const INTERESTS = [
  {
    name: 'Health & medical imaging',
    body: 'Diagnostic imaging, disease grading, and the generative methods that make rare conditions learnable. The problems where a model being wrong on the minority class actually costs something.'
  },
  {
    name: 'Computer vision',
    body: 'Image synthesis, classification and segmentation — particularly where the dataset is small, skewed or expensive to collect, and the interesting work is getting more out of less.'
  },
  {
    name: 'Applied AI & retrieval',
    body: 'Multi-agent systems, retrieval-augmented generation, and local LLMs. I care about the evaluation layer most: knowing when a system is confidently making things up.'
  },
  {
    name: 'Large-scale data systems',
    body: 'Distributed processing on Spark and cloud clusters, and the engineering that keeps a pipeline honest as the data grows past what fits on one machine.'
  },
  {
    name: 'Statistical analysis for real decisions',
    body: 'Experiment design, hypothesis testing and causal reasoning applied to questions people actually argue about — sports, housing, public health, policy.'
  },
  {
    name: 'Research that gets published',
    body: 'Work held to a standard where a reviewer will check the method. Four peer-reviewed papers taught me to report the number that survived the held-out set.'
  }
];

/* =========================== EXTRACURRICULARS ============================= */
/* Org names and years to be completed where marked "—".                      */
const LIFE = [
  { title: 'National-level swimmer', meta: 'India',
    body: 'Competed at national level in India.',
    why: '',
    tags: ['Swimming', 'National level'] },
  { title: 'Ironman triathlon, in training', meta: 'Upcoming',
    body: 'Currently building toward a full Ironman — 2.4 mile swim, 112 mile bike, 26.2 mile run.',
    why: 'Setting an absurd long-horizon goal and then executing a boring consistent plan toward it is exactly how the research projects got finished.',
    tags: ['Endurance', 'Long-horizon goals'] },
  { title: 'Part-time swim instructor', meta: 'Swim coaching · —',
    body: 'Teach swimming to learners across every age and confidence level, breaking a complex physical skill into steps people can actually complete.',
    why: 'Coaching a nervous beginner and explaining a model to a non-technical stakeholder are the same skill: patience, and refusing to hide behind jargon.',
    tags: ['Coaching', 'Communication'] },
  { title: 'Digital-literacy volunteer', meta: 'Community NGO · —',
    body: 'Taught children from marginalised communities to use computers for their schoolwork, from first login to real study tools.',
    why: 'It is why I care about interpretable, low-resource models. Methods that only run on expensive hardware never reach the people who need them most.',
    tags: ['Volunteering', 'Social impact'] },
  { title: 'Tennis', meta: 'Ongoing',
    body: 'Active club player — fast, strategic, and a good excuse to stop staring at a training loss curve.',
    why: 'Reading an opponent and adapting mid-match keeps the same reflex sharp that live debugging demands.',
    tags: ['Tennis', 'Strategy'] }
];

/* =============================== WRITING ================================== */
/* Blog posts. Don't hand-write these entries — run the converter and paste
   what it prints:
       python3 tools/docx-to-post.py ~/Desktop/my-post.docx
   It creates post-<slug>.html, pulls the pictures out of the Word file into
   assets/blog/<slug>/, and prints the block to paste in here.
   Newest first; the Writing page and the home page teaser both read this.   */
const POSTS = [
  {
    slug: 'post-autonomous-mobility.html',
    title: 'Beyond Self-Driving: The Data Science Behind Autonomous Mobility',
    date: '2026-09-03',
    dateLabel: '3 September 2026',
    readingTime: 12,
    excerpt: 'Making one vehicle autonomous is one problem. Operating thousands of them efficiently is an entirely different data science challenge — one built on forecasting, optimization, simulation and AI.',
    tags: ['Data Science', 'Autonomous Vehicles', 'Forecasting', 'Operations Research'],
    cover: ''
  }
];

/* ============================== DOCUMENTS ================================= */
const DOCS = [
  { label: 'Hand OA — full technical report', file: 'assets/documents/HandOA_LDM_Report.docx', kind: 'DOCX' },
  { label: 'Hand OA — presentation slides',   file: 'assets/documents/HandOA_LDM_Slides.pptx', kind: 'PPTX' },
  { label: 'Hand OA — conference poster',     file: 'assets/documents/HandOA_Poster.svg',      kind: 'SVG' },
  { label: 'Lane Advantage — full report',    file: 'assets/documents/Lane_Advantage_Report.pdf', kind: 'PDF' },
  { label: 'HARSC — full technical report',   file: 'assets/documents/HARSC_Final_Report.docx',   kind: 'DOCX' },
  { label: 'HARSC — results report',          file: 'assets/documents/HARSC_Results_Report.docx', kind: 'DOCX' }
];
