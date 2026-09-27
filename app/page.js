'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Download,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Music,
  Ghost,
  MousePointerClick,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  X,
} from 'lucide-react';
import Image from 'next/image';
import HeroName from './HeroName';
import HeroImage from './HeroImage';
import HeroMarquee from './HeroMarquee';
import MostakimNav from './components/MostakimNav';
import WelcomeIntro from './components/WelcomeIntro';
import { scrollToSection, smoothScrollTo } from './lib/scrollTo';

const data = {
  name: 'Mostakim Hossain',
  role: 'Full-Stack Developer',
  available: true,
  tagline: 'I build digital products that feel effortless.',
  intro:
    'Full-stack developer focused on clean interfaces, fast performance, and thoughtful details — from the first pixel to the last API.',
  aboutParagraphs: [
    'I’m a Computer Science student at North South University with a focus on full-stack development and applied AI. I work with Python, Java, JavaScript, C/C++, and modern stacks like React, Node.js, Django, and FastAPI to build end-to-end web applications and APIs.',
    'My recent work includes embedded IoT prototypes and deep learning projects in speech and NLP, such as hybrid CNN-Transformer and CNN-BiLSTM models for Bengali emotion detection. I care about building practical systems that solve real problems for my campus and community.',
  ],
  journeyStats: [
    { value: '15+', label: 'Projects Built' },
    { value: '20+', label: 'Technologies Used' },
    { value: '5+', label: 'AI / ML Projects' },
    { value: '8+', label: 'Talks / Workshops' },
  ],
  journeyTimeline: [
    {
      year: 'Jan 2025 – Feb 2026',
      title: 'Vice Chair (Technical), IEEE NSU WIE AG',
      company: 'North South University',
      description:
        'Overseeing the technical direction of the WIE Affinity Group, mentoring teams, and coordinating projects and events.',
    },
    {
      year: 'Jun 2023 – Jan 2025',
      title: 'Graphics Team Lead, IEEE NSU WIE AG',
      company: 'North South University',
      description:
        'Led the graphics team to produce event branding, posters, and crests while supervising volunteers and meeting tight deadlines.',
    },
    {
      year: 'Fall 2021 – Summer 2025',
      title: 'B.Sc. in Computer Science & Engineering',
      company: 'North South University · CGPA 3.46',
      description:
        'Coursework and projects in algorithms, full-stack development, embedded systems, and AI/ML with a focus on speech and NLP.',
    },
  ],
  skills: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Tailwind CSS',
    'PostgreSQL',
    'Framer Motion',
    'Git',
  ],
  skillCategories: [
    {
      title: 'Programming & Development',
      color: '#8b5cf6',
      skills: ['Python', 'Java', 'JavaScript', 'C / C++', 'PHP'],
    },
    {
      title: 'Web & APIs',
      color: '#6366f1',
      skills: ['React / Next.js', 'Node.js', 'Django / FastAPI', 'HTML / CSS', 'REST APIs'],
    },
    {
      title: 'AI / ML & Data',
      color: '#ec4899',
      skills: [
        'TensorFlow / PyTorch',
        'Scikit-Learn',
        'Computer Vision',
        'Speech & Audio',
        'NLP · CNN / Transformer / BiLSTM',
        'Pandas / NumPy / Matplotlib',
      ],
    },
    {
      title: 'Embedded, Databases & Tools',
      color: '#22d3ee',
      skills: [
        'Embedded / IoT (MCU prototyping)',
        'MongoDB / MySQL',
        'Git / GitHub',
        'Postman',
        'Excel / Data Handling',
        'Discord / Trello',
      ],
    },
  ],
  graphicsTools: [
    { label: 'Adobe Illustrator', src: '/assets/Adobe_Illustrator_CC_icon.svg' },
    { label: 'Adobe Photoshop', src: '/assets/Adobe_Photoshop_CC_icon.svg' },
    { label: 'Adobe Lightroom', src: '/assets/Adobe_Photoshop_Lightroom_CC_logo.svg' },
    { label: 'Canva', src: '/assets/canva-icon.png' },
    { label: 'Adobe Premiere Pro', src: '/assets/Adobe_Premiere_Pro_CC_icon.svg' },
    { label: 'Adobe After Effects', src: '/assets/Adobe_After_Effects_CC_icon.svg' },
    { label: 'Adobe Media Encoder', src: '/assets/Adobe_Media_Encoder_Icon.svg' },
  ],
  graphicsSubsections: [
    {
      id: 'promo-videos',
      tab: 'Promo Videos',
      title: 'Promotional & Introductory Video Production',
      description:
        "I specialize in creating high-energy promotional advertisements and professional introductory videos. This project includes a custom commercial advertisement for a client and a comprehensive introductory video for the IEEE NSU Student Branch WIE Affinity Group. My work focuses on seamless transitions, clear messaging, and engaging visuals to effectively represent a brand's identity and mission through video storytelling.",
      images: [],
      videos: [
        '/assets/graphic_designer_section/videos/intro.mp4',
        '/assets/graphic_designer_section/videos/commercial-ad.mp4',
        '/assets/graphic_designer_section/videos/jersey-geeks.mp4',
        '/assets/graphic_designer_section/videos/membership-drive.mp4',
        '/assets/graphic_designer_section/videos/ramadan.mp4',
        '/assets/graphic_designer_section/videos/womens-day.mp4',
      ],
      files: [],
    },
    {
      id: 'seminars',
      tab: 'Seminars',
      title: 'Technical Seminar & Workshop Visuals',
      description:
        'I specialize in designing high-impact posters for technical events and engineering workshops. My designs effectively communicate complex topics like AI, IoT, and Web Development to a broad audience, ensuring high engagement and professional aesthetics for university and organizational seminars.',
      images: [
        '/assets/graphic_designer_section/seminars/seminar-01.jpg',
        '/assets/graphic_designer_section/seminars/seminar-02.jpg',
        '/assets/graphic_designer_section/seminars/seminar-03.jpg',
        '/assets/graphic_designer_section/seminars/seminar-04.jpg',
        '/assets/graphic_designer_section/seminars/seminar-05.jpg',
        '/assets/graphic_designer_section/seminars/seminar-06.png',
        '/assets/graphic_designer_section/seminars/seminar-07.jpg',
        '/assets/graphic_designer_section/seminars/seminar-08.jpg',
        '/assets/graphic_designer_section/seminars/banner.png',
        '/assets/graphic_designer_section/seminars/particles-to-patterns.jpg',
        '/assets/graphic_designer_section/seminars/dlp-aurora-poster.jpg',
        '/assets/graphic_designer_section/seminars/stemup.png',
        '/assets/graphic_designer_section/seminars/mental-health.jpg',
      ],
      videos: [],
      files: [],
    },
    {
      id: 'certificates',
      tab: 'Certificates',
      title: 'Professional Certificates & Award Design',
      description:
        'I create official institutional assets, including custom-designed certificates of participation, merit awards, and organizational crests. These designs prioritize clean typography and elegant layouts, providing a sense of authority and prestige for professional recognition and academic milestones.',
      images: [
        '/assets/graphic_designer_section/certificates/crests/crest-eb-2025.jpg',
        '/assets/graphic_designer_section/certificates/crests/crest-leads.jpg',
        '/assets/graphic_designer_section/certificates/crests/crest-rabbil-hassan.jpg',
        '/assets/graphic_designer_section/certificates/crests/crest-shining-star.jpg',
      ],
      videos: [],
      files: [
        {
          label: 'Certificate of Appreciation',
          href: '/assets/graphic_designer_section/certificates/certs/certificate-appreciation.pdf',
        },
        {
          label: 'EB Certificates',
          href: '/assets/graphic_designer_section/certificates/certs/certificates-eb.pdf',
        },
        {
          label: 'Leads Certificates',
          href: '/assets/graphic_designer_section/certificates/certs/certificates-leads.pdf',
        },
        {
          label: 'Trainer Certificates',
          href: '/assets/graphic_designer_section/certificates/certs/certificates-trainer.pdf',
        },
      ],
      tags: [],
    },
    {
      id: 'branding',
      tab: 'Branding',
      title: 'Institutional Branding & Info-Graphics',
      description:
        'I design clean and organized informational layouts for organizations, including executive panel reveals and community awareness graphics. This project demonstrates my ability to present structured data and team hierarchies in a visually appealing and easy-to-read format for social media and internal use.',
      images: [
        '/assets/graphic_designer_section/branding/announcements/announcement-01.jpg',
        '/assets/graphic_designer_section/branding/announcements/weekly-meeting.jpg',
        '/assets/graphic_designer_section/branding/announcements/announcement-02.jpg',
        '/assets/graphic_designer_section/branding/announcements/call-for-leads-2025.jpg',
        '/assets/graphic_designer_section/branding/profiles/profile-01.jpg',
        '/assets/graphic_designer_section/branding/profiles/profile-02.jpg',
        '/assets/graphic_designer_section/branding/profiles/profile-03.jpg',
        '/assets/graphic_designer_section/branding/profiles/profile-04.jpg',
        '/assets/graphic_designer_section/branding/profiles/profile-05.jpg',
        '/assets/graphic_designer_section/branding/profiles/profile-06.jpg',
        '/assets/graphic_designer_section/branding/profiles/speaker-profile.jpg',
      ],
      videos: [],
      files: [],
    },
    {
      id: 'celebratory',
      tab: 'Celebratory',
      title: 'Celebratory Materials',
      description:
        'Festive visuals for community milestones — luxury gold-themed birthday posters and stories, International Women’s Day greetings, and achievement celebration graphics, all crafted to make every occasion feel special on social media.',
      images: [
        '/assets/graphic_designer_section/celebratory/birthday/birthday-01.jpg',
        '/assets/graphic_designer_section/celebratory/birthday/birthday-02.jpg',
        '/assets/graphic_designer_section/celebratory/birthday/birthday-03.jpg',
        '/assets/graphic_designer_section/celebratory/achievements/achievement-01.jpg',
        '/assets/graphic_designer_section/celebratory/achievements/achievement-02.jpg',
        '/assets/graphic_designer_section/celebratory/achievements/achievement-03.jpg',
        '/assets/graphic_designer_section/celebratory/achievements/womens-day-greeting.jpg',
      ],
      videos: [],
      files: [],
    },
  ],
  talksHighlights: [
    {
      kind: 'Springer · Publication',
      title: 'Emotionally Aware Bangla Speech Systems',
      description:
        'Bangla SER is hindered by small datasets, overfitting, and minimal real-world validation. Using merged data, MFCC-only features, noise-robust training, and an efficient CNN–BiLSTM, we achieve 82% accuracy and real-time Raspberry Pi performance.',
      href: 'https://link.springer.com/article/10.1007/s42979-026-04744-9',
      linkLabel: 'View on Springer',
      image: '/assets/raspberrypi.jpg',
      logos: [{ src: '/assets/springer.png', alt: 'Springer' }],
    },
    {
      kind: 'IEEE Xplore · Publication',
      title: 'Hybrid CNN Bi-LSTM BSER',
      description:
        'An efficient tool for LLMs utilizing incremental learning. Presented at ICCIT 2025.',
      href: 'https://ieeexplore.ieee.org/document/11491471',
      linkLabel: 'View on IEEE Xplore',
      image: '/assets/hybrid_cnn.jpg',
      logos: [{ src: '/assets/IEEE-Xplore.svg', alt: 'IEEE Xplore' }],
    },
    {
      kind: 'LinkedIn · Event',
      title: 'Technology with Purpose: Accessible Motion Capture Systems',
      description:
        'I ran this workshop on building accessible motion capture systems with the ESP32 and MPU6050, streaming live 3D motion into a browser over the Web Serial API.',
      href: 'https://www.linkedin.com/posts/ieee-nsu-sb-wie-affinity-group_on-3rd-july-2026-the-ieee-nsu-student-branch-activity-7481018962223312897-1kUs',
      linkLabel: 'View on LinkedIn',
      embedSrc: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7481018962223312897?collapsed=1',
      logos: [
        { src: '/assets/nsu.png', alt: 'North South University' },
        { src: '/assets/INSB.png', alt: 'IEEE NSU Student Branch' },
        { src: '/assets/ieeewie.png', alt: 'IEEE NSU WIE AG' },
      ],
    },
    {
      kind: 'LinkedIn · Reflection',
      title: 'Tiny Powerhouses: LLMs in Microcontrollers',
      description: 'I ran this workshop on bringing LLMs to microcontrollers as Vice Chair (Technical) of IEEE NSU SB WIE AG.',
      href: 'https://www.linkedin.com/posts/ieee-nsu-sb-wie-affinity-group_the-ieee-nsu-student-branch-wie-affinity-activity-7404874864085364736-Fd2u',
      linkLabel: 'View on LinkedIn',
      embedSrc: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7404874864085364736?collapsed=1',
      logos: [
        { src: '/assets/nsu.png', alt: 'North South University' },
        { src: '/assets/INSB.png', alt: 'IEEE NSU Student Branch' },
        { src: '/assets/ieeewie.png', alt: 'IEEE NSU WIE AG' },
      ],
    },
    {
      kind: 'LinkedIn · Personal Project',
      title: 'RubuPAD — Custom Smart Macropad',
      description:
        'I built RubuPAD, a custom ESP32-S3 macropad with a browser-based WebUI for real-time key mapping, OLED animations, and layer switching — no code required.',
      href: 'https://www.linkedin.com/posts/mostakimhossain_esp32-embeddedsystems-macropad-activity-7452717111036018688-d_yr',
      linkLabel: 'View on LinkedIn',
      embedSrc: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7452717111036018688?collapsed=1',
      logos: [{ src: '/assets/espressif.png', alt: 'Espressif' }],
    },
  ],
  applicationsProjects: [
    {
      title: 'Bangla Emotion Detection',
      description:
        'Hybrid CNN-Transformer & CNN-BiLSTM architecture for emotion recognition on native Bangla speech data.',
      tags: ['Python', 'TensorFlow', 'NLP'],
      image: '/assets/CSE499.png',
      hoverImage: '/assets/capstone.jpg',
      repoHref: 'https://github.com/Mostakim52/7-Emotion-Bangla-Speech-Recognition-Model',
      liveHref: 'https://realtimebser.vercel.app',
    },
    {
      title: 'Repugate',
      description: 'A SaaS app for an AI-based review reply system for Facebook Business.',
      tags: ['SaaS', 'AI', 'Product'],
      image: '/assets/repugate.png',
      hoverImage: '/assets/repugate_logo.png',
      repoHref: 'https://github.com/Mostakim52/repugate',
      liveHref: 'https://repugate.vercel.app',
    },
    {
      title: 'Khuje Nao — Lost & Found App',
      description: 'A Flutter app for finding lost items at North South University.',
      tags: ['React', 'Flutter', 'FastAPI'],
      image: '/assets/khuje_nao.png',
      hoverImage: '/assets/khuje_nao.jpg',
      repoHref: 'https://github.com/Mostakim52/khuje_nao',
    },
    {
      title: 'Flood Forecast BD',
      description:
        'An AI-driven flood prediction system using XGBoost over 65 years of climate records, delivering real-time flash flood forecasts for 33 stations across Bangladesh via a Next.js web portal and a Flutter mobile app.',
      tags: ['Python', 'XGBoost', 'Next.js', 'Flutter'],
      image: '/assets/flood_forecast_bd.png',
      hoverImage: '/assets/flood_forecast.png',
      repoHref: 'https://github.com/Mostakim52/cse445-flood-forecast-bd',
      liveHref: 'https://floodforecastbd.vercel.bd',
    },
  ],
  kitHardwareProjects: [
    {
      kind: 'ESP32 · Embedded AI',
      title: 'ESP32 Pocket LLM',
      description:
        'Voice-controlled pocket LLM on ESP32: record speech, transcribe with AssemblyAI, and generate stories locally on-device with a tiny 260K-parameter model.',
      image: '/assets/esp32_pocket_llm.jpg',
      href: 'https://github.com/Mostakim52/ESP32-Pocket-LLM',
      linkLabel: 'View on GitHub',
      bgImage: '/assets/tinyllm_workshop.jpg',
      logos: [
        { src: '/assets/espressif.png', alt: 'Espressif' },
        { src: '/assets/assemblyai.png', alt: 'AssemblyAI' },
      ],
    },
    {
      kind: 'ESP32 · IoT Safety',
      title: 'ESP32 Smart Helmet',
      description:
        'IoT-enabled smart helmet for construction worker safety with fall detection, environmental sensing, and real-time mobile + server alerts.',
      image: '/assets/helmet.png',
      href: 'https://github.com/Mostakim52/ESP32-Smart-Helmet',
      linkLabel: 'View on GitHub',
      bgImage: '/assets/helmet_project.jpg',
      logos: [
        { src: '/assets/espressif.png', alt: 'Espressif' },
        { src: '/assets/safety_helmet.png', alt: 'Safety helmet' },
      ],
    },
    {
      kind: 'ESP32-S3 · Firmware',
      title: 'ESP32 Macropad',
      description:
        'A smart ESP32-S3 macropad with a WebUI for real-time configuration, F13–F24 mapping, OLED GIF support, and persistent on-device storage.',
      image: '/assets/esp32_macropad.jpg',
      href: 'https://github.com/Mostakim52/esp32-macropad',
      linkLabel: 'View on GitHub',
      bgImage: '/assets/macropad_stl.png',
      logos: [
        { src: '/assets/espressif.png', alt: 'Espressif' },
        { src: '/assets/tinkercad.png', alt: 'Tinkercad' },
      ],
    },
    {
      kind: 'ESP32-C3 · Motion Capture',
      title: 'ESP32 Mocap Visualizer',
      description:
        'Real-time motion capture with an ESP32-C3 and MPU6050 IMU, streaming 60Hz sensor data over the Web Serial API into a Three.js 3D character viewer.',
      image: '/assets/esp32_mocap.jpg',
      href: 'https://github.com/Mostakim52/esp32-mocap',
      linkLabel: 'View on GitHub',
      bgImage: '/assets/mocap_workshop.jpg',
      logos: [
        { src: '/assets/espressif.png', alt: 'Espressif' },
        { src: '/assets/mocap.png', alt: 'Mocap' },
      ],
    },
  ],
  informationSocials: [
    { label: 'GitHub', username: 'Mostakim52', href: 'https://github.com/Mostakim52', icon: Github },
    {
      label: 'LinkedIn',
      username: 'mostakimhossain',
      href: 'https://linkedin.com/in/mostakimhossain',
      icon: Linkedin,
    },
    {
      label: 'Facebook',
      username: 'Mostakim Rubaiyat',
      href: 'https://www.facebook.com/mostakim.rubaiyat',
      icon: Facebook,
    },
    {
      label: 'Instagram (Photography)',
      username: 'mostakim.rubaiyat',
      href: 'https://www.instagram.com/mostakim.rubaiyat/',
      icon: Instagram,
    },
    {
      label: 'Instagram (Personal)',
      username: 'rubu_privv',
      href: 'https://www.instagram.com/rubu_privv/',
      icon: Instagram,
    },
    { label: 'X', username: 'Mostakim52', href: 'https://x.com/Mostakim52', icon: Twitter },
    {
      label: 'Spotify',
      username: 'Rubuu',
      href: 'https://open.spotify.com/user/31vtxswenmmj3xu5ztwarljjqypy?si=9962bc9af1104559',
      icon: Music,
    },
    {
      label: 'Snapchat',
      username: 'mostakim52',
      href: 'https://www.snapchat.com/add/mostakim52?share_id=PDbwrLHVf58&locale=en-GB',
      icon: Ghost,
    },
  ],
  mailMeIntro:
    "Whether it's a startup idea, a research project, or just a conversation about AI and the future of tech — I'm always open to new opportunities.",
  mailMeContact: [
    {
      label: 'Email',
      value: 'mostakim.rubaiyat@gmail.com',
      href: 'mailto:mostakim.rubaiyat@gmail.com',
      icon: Mail,
    },
    { label: 'Phone', value: '+880 1319 674564', href: 'tel:+8801319674564', icon: Phone },
    { label: 'Location', value: 'Dhaka, Bangladesh', icon: MapPin },
  ],
};

// The Mail Me section's contact fields are pulled out individually (rather
// than mapped generically) since each now gets its own bespoke treatment —
// the email is the section's big statement, phone/location a small
// directory strip beside it.
const mailEmail = data.mailMeContact.find((c) => c.label === 'Email');
const mailPhone = data.mailMeContact.find((c) => c.label === 'Phone');
const mailLocation = data.mailMeContact.find((c) => c.label === 'Location');

// Shared between ProjectCarousel's measurement effect and its render — both
// need to agree on how much of the card's fixed height its own padding and
// the text block's top margin already claim.
const CARD_PADDING = 1.1 * 16 * 2; // 1.1rem top+bottom
const TEXT_MARGIN_TOP = 16; // the kind label's mt-4

// A 3D coverflow-style carousel: the active card faces the viewer, its
// neighbors are rotated/receded to the sides, and the whole thing cycles
// circularly (past the last card wraps to the first, and vice versa) via
// on-screen arrows or the left/right arrow keys — only while the carousel
// itself is actually on screen, so it doesn't hijack arrow keys used
// elsewhere on the page. Currently used by Talks; `heightVar` names the CSS
// custom property (set in page.js's measure() effect, scoped per-section)
// that caps this instance's shared card height to its own section's actual
// screen-fit budget, so a second instance elsewhere on the page
// can't share one global cap.
function ProjectCarousel({
  items,
  heightVar = '--talks-carousel-h',
  itemLabel = 'highlight',
  onIndexChange,
}) {
  const [index, setIndex] = useState(0);
  const [stageHeight, setStageHeight] = useState(null);
  const [mediaHeights, setMediaHeights] = useState([]);
  const stageRef = useRef(null);
  const textRefs = useRef([]);
  const inViewRef = useRef(false);
  const count = items.length;

  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  // Which embed cards have ever been part of the visible coverflow (active
  // or one of its two neighbors) — once true for a given index, it stays
  // true even after that card cycles back out to `is-hidden`. Only
  // mounting an iframe for *currently* visible cards (the original version
  // of this) meant every hidden->visible transition remounted it from
  // scratch, which is a real LinkedIn embed reload each time — visibly
  // flashing/reloading behind the cards as you click through. Tracking
  // "ever shown" instead still skips the embeds nobody scrolled to yet
  // (the actual goal), without ever re-paying for one already loaded.
  const [loadedEmbeds, setLoadedEmbeds] = useState(() => new Set());
  useEffect(() => {
    const next = new Set([index, (index + 1) % count, (index - 1 + count) % count]);
    setLoadedEmbeds((prev) => {
      let changed = false;
      const merged = new Set(prev);
      next.forEach((i) => {
        if (!merged.has(i)) {
          merged.add(i);
          changed = true;
        }
      });
      return changed ? merged : prev;
    });
  }, [index, count]);

  const go = useCallback(
    (dir) => {
      setIndex((i) => (i + dir + count) % count);
    },
    [count]
  );

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    const onKey = (e) => {
      if (!inViewRef.current) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      io.disconnect();
      window.removeEventListener('keydown', onKey);
    };
  }, [go]);

  // Every card shares one height — the tallest card's own natural need —
  // so the deck doesn't resize as you cycle between a short blurb and a
  // long abstract. Within that shared height, each card's own image then
  // grows or shrinks to fill whatever its own text *doesn't* need, instead
  // of a flat image size leaving blank space under a short blurb.
  //
  // Two passes: first find the shared target height using a baseline image
  // size (same idea every card used to share); then, per card, hand the
  // image whatever's left after that card's own text — floored so an image
  // never disappears, ceilinged so text never gets squeezed to nothing.
  //
  // `text.scrollHeight` (not offsetHeight) specifically: the text block has
  // its own `max-height` + internal scroll, so offsetHeight would report
  // the clamped size, not what the text actually needs — scrollHeight
  // always reports the true, unclamped content height regardless of that
  // clipping.
  useEffect(() => {
    const texts = textRefs.current;
    if (texts.length === 0) return undefined;
    const mediaMin = 140;

    const update = () => {
      const cap = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(heightVar)
      );
      const capValue = Number.isFinite(cap) ? cap : 640;

      const textNatural = texts.map((el) => (el ? el.scrollHeight : 0));

      const baselineMedia = Math.max(mediaMin, capValue * 0.5);
      const totals = textNatural.map(
        (t) => baselineMedia + TEXT_MARGIN_TOP + t + CARD_PADDING
      );
      // Capped at the section's actual screen-fit budget — the tallest
      // card's natural need can still exceed what a short screen has to
      // offer, and forcing every card to that uncapped height would push
      // them past the stage (no longer safety-netted by overflow:hidden,
      // since that was clipping the shadow).
      const target = Math.min(Math.max(...totals), capValue);

      const mediaMax = target * 0.78;
      const nextMedia = textNatural.map((t) => {
        const ideal = target - CARD_PADDING - TEXT_MARGIN_TOP - t;
        return Math.min(Math.max(ideal, mediaMin), mediaMax);
      });

      setStageHeight((prev) => (prev === target ? prev : target));
      setMediaHeights((prev) => {
        const same =
          prev.length === nextMedia.length &&
          prev.every((v, i) => Math.abs(v - nextMedia[i]) < 0.5);
        return same ? prev : nextMedia;
      });
    };

    update();
    const ro = new ResizeObserver(update);
    texts.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, [items, heightVar]);

  return (
    <div className="project-carousel">
      <div
        className="project-carousel-stage"
        ref={stageRef}
        style={stageHeight ? { height: `${stageHeight}px` } : undefined}
      >
        {items.map((item, i) => {
          const offset = (i - index + count) % count;
          let posClass = 'is-hidden';
          if (offset === 0) posClass = 'is-active';
          else if (offset === 1) posClass = 'is-next';
          else if (offset === count - 1) posClass = 'is-prev';

          const mediaH = mediaHeights[i];
          const mediaStyle = mediaH ? { height: `${mediaH}px` } : undefined;
          const textMaxHeight =
            stageHeight && mediaH
              ? stageHeight - CARD_PADDING - TEXT_MARGIN_TOP - mediaH
              : undefined;

          return (
            <article
              key={item.title}
              className={`project-carousel-card ${posClass}`}
              aria-hidden={posClass === 'is-active' ? undefined : true}
              onClick={posClass !== 'is-active' ? () => setIndex(i) : undefined}
              style={stageHeight ? { height: `${stageHeight}px` } : undefined}
            >
              {item.embedSrc ? (
                <div
                  className="project-carousel-media relative w-full overflow-hidden rounded-xl bg-neutral-100"
                  style={mediaStyle}
                >
                  {/* Only mounted once a card has actually been part of
                      the visible coverflow at least once (see
                      `loadedEmbeds` above) — skips paying for a LinkedIn
                      embed's iframe/JS/network cost for cards nobody has
                      scrolled to yet, without remounting (and so visibly
                      reloading) one that's simply cycled back out to
                      `is-hidden` and could return at any time. */}
                  {loadedEmbeds.has(i) ? (
                    <iframe
                      src={item.embedSrc}
                      style={{ border: 'none', width: '100%', height: '100%' }}
                      allowFullScreen
                      title={item.title}
                      loading="lazy"
                    />
                  ) : null}
                </div>
              ) : item.image ? (
                <div
                  className="project-carousel-media relative w-full overflow-hidden rounded-xl"
                  style={mediaStyle}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 420px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  className="project-carousel-media project-carousel-card-placeholder w-full rounded-xl bg-neutral-100"
                  style={mediaStyle}
                />
              )}
              {/* Scrolls internally on the rare card whose full text still
                  doesn't fit the available budget, rather than either
                  hard-clipping it invisibly or truncating it with "…". */}
              <div
                ref={(el) => {
                  textRefs.current[i] = el;
                }}
                className="project-carousel-text"
                style={textMaxHeight ? { maxHeight: `${textMaxHeight}px` } : undefined}
              >
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
                  {item.kind}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.description}</p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={posClass === 'is-active' ? 0 : -1}
                  className="mt-3 inline-block text-sm font-medium text-[#ff4d00] hover:underline"
                >
                  {item.linkLabel} →
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="project-carousel-controls">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={`Previous ${itemLabel}`}
          className="project-carousel-arrow"
        >
          <ChevronLeft size={18} strokeWidth={1.75} />
        </button>
        <div className="project-carousel-dots">
          {items.map((item, i) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Show ${item.title}`}
              onClick={() => setIndex(i)}
              className={`project-carousel-dot${i === index ? ' is-active' : ''}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={`Next ${itemLabel}`}
          className="project-carousel-arrow"
        >
          <ChevronRight size={18} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}

// Floating bubbles for Kit & Hardware: every build drifts gently in its own
// spot (own real photo, not a fabricated 3D asset). Click one and it snaps
// to the center at a larger size, pauses its drift, and the detail panel
// below updates to describe it.
const KIT_BUBBLE_META = [
  { top: '16%', left: '22%', size: '24%', dur: '5.6s', delay: '0s' },
  { top: '20%', left: '84%', size: '20%', dur: '6.4s', delay: '0.5s' },
  { top: '86%', left: '18%', size: '22%', dur: '6s', delay: '0.9s' },
  { top: '82%', left: '88%', size: '26%', dur: '5.2s', delay: '0.2s' },
];

function HardwareBubbles({ items, onActiveChange, onInteract }) {
  const [active, setActive] = useState(0);
  const activeItem = items[active];

  useEffect(() => {
    onActiveChange?.(active);
  }, [active, onActiveChange]);

  return (
    <div className="kit-bubble-row">
      <div className="kit-bubble-field">
        <div className="kit-bubble-glow" aria-hidden="true" />
        {items.map((item, i) => {
          const isActive = i === active;
          const meta = KIT_BUBBLE_META[i % KIT_BUBBLE_META.length];
          const style = isActive
            ? { top: '50%', left: '50%', width: '62%' }
            : {
                top: meta.top,
                left: meta.left,
                width: meta.size,
                '--kit-bubble-dur': meta.dur,
                '--kit-bubble-delay': meta.delay,
              };
          return (
            <button
              key={item.title}
              type="button"
              className={`kit-bubble${isActive ? ' is-active' : ' is-dim'}`}
              style={style}
              onClick={() => {
                setActive(i);
                onInteract?.();
              }}
              aria-label={`Show ${item.title}`}
              aria-pressed={isActive}
            >
              <span className="kit-bubble-inner">
                <Image
                  src={item.image}
                  alt={isActive ? item.title : ''}
                  fill
                  sizes={isActive ? '380px' : '160px'}
                  className="object-cover"
                  priority={false}
                />
              </span>
            </button>
          );
        })}
      </div>

      <div className="kit-bubble-detail kit-detail-fade" key={active}>
        {/* Platform / tool logos for the active build — every project is
            ESP32-based, plus one build-specific logo (AssemblyAI, the
            safety-helmet icon, Tinkercad, or the mocap icon). Sits directly
            above the kind/title/description, not off in the section's
            empty margin, so it reads as part of this build's own info. */}
        {activeItem.logos.length > 0 && (
          <div className="mb-6 hidden flex-nowrap items-center justify-center gap-6 md:flex lg:justify-start">
            {activeItem.logos.map((logo) => (
              <img
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                className="project-logo h-28 w-36 object-contain opacity-80"
              />
            ))}
          </div>
        )}
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
          {activeItem.kind}
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl lg:text-4xl">
          {activeItem.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg lg:text-xl">
          {activeItem.description}
        </p>
        <a
          href={activeItem.href}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-base font-medium text-[#ff4d00] hover:underline"
        >
          {activeItem.linkLabel} →
        </a>
      </div>
    </div>
  );
}

// Every full-screen section, in document order, for the wheel-driven
// section-lock below. "top" isn't a real element id (the page's true top,
// documentY 0, is anchored by .scroll-top-anchor instead — see globals.css
// for why a plain marker is used there rather than the sticky header or
// #top itself).
const SNAP_SECTION_IDS = [
  'top',
  'about',
  'journey',
  'skills',
  'talks',
  'applications',
  'kit-hardware',
  'information',
  'mail-me',
];

export default function Page() {
  // In-page nav links (header, hero CTA, footer) scroll via JS rather than
  // letting the browser follow a plain `href="#id"` — a native hash
  // navigation writes that hash into the URL/history on every click, which
  // isn't wanted here (this is a single scrolling page, not a set of
  // addressable routes). `href` stays on each `<a>` for keyboard/no-JS
  // fallback; the click just intercepts before the browser acts on it.
  const handleHashLink = useCallback((e, id) => {
    e.preventDefault();
    if (id === 'top') {
      smoothScrollTo(0);
    } else {
      scrollToSection(id);
    }
  }, []);

  const [activeTalkIndex, setActiveTalkIndex] = useState(0);
  const [showGraphics, setShowGraphics] = useState(false);
  const [activeGraphicsIdx, setActiveGraphicsIdx] = useState(0);
  const [graphicsLightboxIndex, setGraphicsLightboxIndex] = useState(null);
  // Derived before any effect below: effects' dependency arrays evaluate
  // during render, so these must already be initialized by then.
  const activeGraphics =
    data.graphicsSubsections[activeGraphicsIdx] ?? data.graphicsSubsections[0];
  // All media of the active sub-section (images first, then videos) for
  // the inline scrollable gallery and the per-item lightbox viewer.
  const graphicsMedia = [
    ...activeGraphics.images.map((src) => ({ type: 'image', src })),
    ...activeGraphics.videos.map((src) => ({ type: 'video', src })),
  ];
  const [activeKitIndex, setActiveKitIndex] = useState(0);
  const [hoveredApp, setHoveredApp] = useState(null);
  const [kitHintVisible, setKitHintVisible] = useState(false);
  const kitHintShownRef = useRef(false);
  const kitHintHideTimer = useRef(null);

  const dismissKitHint = useCallback(() => {
    clearTimeout(kitHintHideTimer.current);
    setKitHintVisible(false);
  }, []);

  const [heroHintVisible, setHeroHintVisible] = useState(false);
  const heroHintHideTimer = useRef(null);

  const dismissHeroHint = useCallback(() => {
    clearTimeout(heroHintHideTimer.current);
    setHeroHintVisible(false);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Graphics lightbox lifecycle: lock page scroll, flag the wheel-driven
  // section-lock below to stand down (so the wheel scrolls the lightbox,
  // not the page), and handle Escape (close) + arrows (prev/next).
  useEffect(() => {
    if (graphicsLightboxIndex === null) return undefined;
    document.documentElement.dataset.graphicsLightbox = 'open';
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setGraphicsLightboxIndex(null);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        setGraphicsLightboxIndex((i) =>
          i === null ? i : (i + dir + graphicsMedia.length) % graphicsMedia.length
        );
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      delete document.documentElement.dataset.graphicsLightbox;
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [graphicsLightboxIndex, graphicsMedia.length]);

  // The hero's scroll nudge — same "toast, not layout" idea as the Kit &
  // Hardware hint below, but rising from the bottom edge instead of
  // dropping from the header, since it's cueing scroll *down*. Living
  // outside the hero's own flow (rather than the old inline chevron
  // between the photo and the skills marquee) means the photo can now sit
  // directly above the marquee with nothing forcing a gap between them.
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setHeroHintVisible(true);
      heroHintHideTimer.current = setTimeout(() => setHeroHintVisible(false), 4500);
    }, 1200);

    // Dismiss the moment the visitor actually scrolls — by then they've
    // found their way past the hero on their own, so the nudge has done
    // its job (or wasn't needed).
    const onScroll = () => {
      if (window.scrollY > 40) dismissHeroHint();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(showTimer);
      clearTimeout(heroHintHideTimer.current);
      window.removeEventListener('scroll', onScroll);
    };
  }, [dismissHeroHint]);

  // A one-time nudge toward the Kit & Hardware bubbles — they're the only
  // "click to explore" interaction on the page that isn't a fairly obvious
  // affordance (a carousel arrow, a nav letter), so first-time visitors can
  // miss that they're clickable. Shows once, the first time the section is
  // actually seen (not merely mounted, since every section mounts on
  // load) — dismissed by clicking a bubble or, failing that, on its own
  // after a few seconds so it never lingers as clutter.
  useEffect(() => {
    const el = document.getElementById('kit-hardware');
    if (!el) return undefined;

    let showTimer;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (kitHintShownRef.current) return; // already shown once, ever
          kitHintShownRef.current = true;
          showTimer = setTimeout(() => {
            setKitHintVisible(true);
            kitHintHideTimer.current = setTimeout(() => setKitHintVisible(false), 4500);
          }, 1000);
        } else {
          // Scrolled away from the section before the hint's own timers
          // dismissed it — since it's `position: fixed`, leaving it up
          // would float it over whatever section is now in view instead
          // of the bubbles it's actually pointing at. Also cancels a
          // still-pending show (scrolled away inside that initial 1s
          // delay) so it doesn't pop in disconnected from the section too.
          clearTimeout(showTimer);
          dismissKitHint();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      clearTimeout(showTimer);
      clearTimeout(kitHintHideTimer.current);
    };
  }, [dismissKitHint]);

  // Drive section sizing from real measured screen/element sizes rather than
  // formulas or raw CSS `100vh` — mobile browsers resize their address bar
  // in and out of the viewport, desktop DPI/zoom can make CSS vh and
  // measured pixels disagree slightly, and web fonts swapping in after
  // first paint reflow the header and the giant background wordmark. A
  // ResizeObserver on the actual elements reacts to all of that directly,
  // instead of us trying to predict every trigger condition by hand.
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;

    const measure = () => {
      raf = 0;
      const header = document.querySelector('.site-header');
      const headerH = header ? header.getBoundingClientRect().height : 0;
      // Sanity-clamped: window.innerHeight is a trustworthy hard bound, so
      // nothing here should ever exceed it by much.
      const screenH = Math.min(Math.max(window.innerHeight - headerH, 0), window.innerHeight);
      root.style.setProperty('--screen-h', `${screenH}px`);
      root.style.setProperty('--header-h', `${headerH}px`);

      // How far down the giant background wordmark (two stacked lines)
      // actually renders, so the hero copy can clear it exactly instead of
      // guessing via a font-size formula. Must measure an actual text-bearing
      // element (.hero-marquee-base, a normal in-flow inline-flex span) —
      // .hero-marquee--lower itself is `position:absolute; inset:0`, so its
      // own box is stretched to the full hero height, not the text's size.
      const heroShell = document.getElementById('top');
      const lowerWordmark = document.querySelector('.hero-marquee--lower .hero-marquee-base');
      if (heroShell && lowerWordmark) {
        const clearance =
          lowerWordmark.getBoundingClientRect().bottom - heroShell.getBoundingClientRect().top;
        // Clamped to a sane range as a safety net — this value must never be
        // able to run away (e.g. via an accidental observer feedback loop).
        const clamped = Math.min(Math.max(clearance, 0) + 24, 800);
        root.style.setProperty('--wordmark-clear', `${clamped}px`);
      }

      // The rotated background word (MAKER / ODYSSEY / ...) must span its
      // section's actual full background exactly — true top edge to true
      // bottom edge, including the strip behind the header — not just the
      // header-clear content row's height. The row is normally shorter than
      // the section (it's vertically centered by `full-section`, with
      // margin above/below), so we force the grid itself to match the
      // section's real full height; combined with `items-stretch`, every
      // column (including the marquee's) then reaches the section's true
      // edges. The text column's own `pt-[var(--header-h)]` is what keeps
      // its *content* clear of the header — this only affects the grid's
      // overall (and thus the marquee's) height.
      //
      // Deliberately `window.innerHeight` (the stable, externally-anchored
      // full-viewport height), NOT the section's own rendered height:
      // reading the section's own height back into this same content box's
      // min-height would grow the section by however much it's already
      // overshooting, which then gets read back even larger next remeasure,
      // and so on. Shared by every dark "rotated ticker" section.
      const measureRotatedMarquee = (sectionId, colSelector, sectionVar, colVar) => {
        root.style.setProperty(sectionVar, `${window.innerHeight}px`);
        const col = document.querySelector(colSelector);
        if (col) {
          const colH = col.getBoundingClientRect().height;
          root.style.setProperty(colVar, `${Math.max(colH, 0)}px`);
        }
      };
      measureRotatedMarquee('about', '.about-marquee-col', '--about-section-h', '--about-marquee-h');
      measureRotatedMarquee(
        'journey',
        '.journey-marquee-col',
        '--journey-section-h',
        '--journey-marquee-h'
      );
      measureRotatedMarquee(
        'skills',
        '.expertise-marquee-col',
        '--expertise-section-h',
        '--expertise-marquee-h'
      );
      measureRotatedMarquee(
        'applications',
        '.applications-marquee-col',
        '--applications-section-h',
        '--applications-marquee-h'
      );
      measureRotatedMarquee(
        'information',
        '.info-marquee-col',
        '--info-section-h',
        '--info-marquee-h'
      );
      measureRotatedMarquee(
        'mail-me',
        '.mail-marquee-col',
        '--mail-section-h',
        '--mail-marquee-h'
      );
      // Same idea as measureRotatedMarquee (full viewport height, so the
      // marquee/background reach the section's true edges, with the text
      // column's own `pt-[var(--header-h)]` keeping its content clear of
      // the header) — kept as a separate function for Talks/Kit & Hardware
      // since their *carousel/bubble content* still needs its own
      // screenH-based budget (measureCarouselBudget/measureBubbleField
      // below), not the full viewport height used here for the grid.
      const measureCarouselMarquee = (sectionVar, colSelector, colVar) => {
        root.style.setProperty(sectionVar, `${window.innerHeight}px`);
        const col = document.querySelector(colSelector);
        if (col) {
          const colH = col.getBoundingClientRect().height;
          root.style.setProperty(colVar, `${Math.max(colH, 0)}px`);
        }
      };
      measureCarouselMarquee('--talks-section-h', '.talks-marquee-col', '--talks-marquee-h');
      measureCarouselMarquee('--kit-section-h', '.kit-marquee-col', '--kit-marquee-h');

      // A ProjectCarousel's own available height, so it — like the About
      // /Odyssey/Skills marquee sections — actually fits within one screen
      // instead of overflowing it. Deliberately measured against `screenH`
      // (the true viewport bound) rather than the section's own rendered
      // height: a `full-section` only has a `min-height` floor, not a
      // ceiling, so once the carousel is tall enough to overflow it, the
      // section itself grows to match — reading its height back would just
      // rubber-stamp whatever the carousel already decided, instead of
      // constraining it. Shared by every section that embeds a
      // ProjectCarousel (Talks, Kit & Hardware) since each needs its own
      // budget computed the same way but capped to its own CSS var.
      const measureCarouselBudget = (sectionId, contentSelector, heightVar, textMaxVar) => {
        const scope = document.getElementById(sectionId);
        if (!scope) return;
        const heading = scope.querySelector('.project-heading-block');
        const controls = scope.querySelector('.project-carousel-controls');
        const content = scope.querySelector(contentSelector);
        if (!heading || !controls || !content) return;

        const headingH = heading.getBoundingClientRect().height;
        const controlsH = controls.getBoundingClientRect().height;
        // The content grid carries its own responsive vertical padding
        // (py-20/sm:py-24, removed again at md:py-0) — read the real
        // computed value instead of assuming which breakpoint is active.
        const contentStyle = getComputedStyle(content);
        const contentPadding =
          parseFloat(contentStyle.paddingTop) + parseFloat(contentStyle.paddingBottom);
        // space-y-8 gap above the carousel (32px) + the carousel's own
        // top margin (8px) + the controls' top margin (32px) + a buffer.
        const reserved = 32 + 8 + 32 + 16 + contentPadding;
        const available = Math.min(
          Math.max(screenH - headingH - controlsH - reserved, 220),
          900
        );
        root.style.setProperty(heightVar, `${available}px`);

        // The text block's own budget: whatever's left of `available` after
        // the media block (same ratio-of-available formula as the
        // .project-carousel-media CSS rule, including its own <640px
        // media-query drop to 0.38) and the card's own padding — matched
        // here in JS so the two stay in sync. Below 640px the media image
        // gives up more of its usual half-share specifically because that's
        // where `available` itself is already smallest (a short phone
        // screen), so the description is the thing most likely to need the
        // room and least able to spare it to a picture.
        const mediaRatio = window.innerWidth < 640 ? 0.38 : 0.5;
        const mediaH = Math.max(140, available * mediaRatio);
        const cardPadding = 1.1 * 16 * 2; // 1.1rem top+bottom
        const textMarginTop = 16; // the kind label's mt-4
        const textMaxH = Math.max(available - mediaH - cardPadding - textMarginTop - 8, 60);
        root.style.setProperty(textMaxVar, `${textMaxH}px`);
      };

      measureCarouselBudget('talks', '.talks-content', '--talks-carousel-h', '--talks-text-max-h');

      // The floating-bubble field's diameter and (at the row breakpoint) the
      // detail text column's width: both computed from real leftover space
      // instead of a fixed guess, so together they actually fill the column
      // rather than hugging the left edge with a dead void beside them.
      // Never measures the bubble field's own box — only sibling parts
      // whose size doesn't depend on what we're about to set — to avoid the
      // same self-referential loop the carousel height math had to avoid.
      //
      // Two layouts, matched to the `.kit-bubble-row` CSS breakpoint
      // (1024px — deliberately `lg`, not `md`: at 768px there isn't enough
      // spare column width for a side-by-side detail column to stay
      // readable once the marquee column also claims its share, so tablet
      // widths keep the stacked layout instead): below it, bubbles stack
      // above the detail text (both centered) and the field can claim the
      // column's full width; at/above it they sit side by side, with the
      // detail column claiming *whatever width is left* after the field
      // (capped for paragraph readability) instead of a small fixed
      // fraction — that's what was leaving the large empty gap before the
      // marquee.
      const measureBubbleField = (sectionId, colSelector, detailSelector, sizeVar, detailVar) => {
        const scope = document.getElementById(sectionId);
        if (!scope) return;
        const heading = scope.querySelector('.project-heading-block');
        const col = scope.querySelector(colSelector);
        const detail = scope.querySelector(detailSelector);
        const content = scope.querySelector('.kit-content');
        if (!heading || !col || !detail || !content) return;

        const headingH = heading.getBoundingClientRect().height;
        const contentStyle = getComputedStyle(content);
        const contentPadding =
          parseFloat(contentStyle.paddingTop) + parseFloat(contentStyle.paddingBottom);

        const colStyle = getComputedStyle(col);
        const colPadding = parseFloat(colStyle.paddingLeft) + parseFloat(colStyle.paddingRight);
        const availableWidth = col.getBoundingClientRect().width - colPadding;

        let size;
        if (window.innerWidth >= 1024) {
          const gap = 80; // matches .kit-bubble-row's row gap
          const detailMin = 240;
          const detailMax = 800;
          // space-y-3 gap above the row (12px) + a small buffer.
          const reserved = 12 + 16 + contentPadding;
          const availableHeight = screenH - headingH - reserved;
          // The hub takes a bit more than half the width so it reads as the
          // bigger element — but capped by what's actually left for the
          // detail column to stay readable, not computed independently of
          // it. `.kit-bubble-detail` has no flex-shrink override, so if the
          // two didn't jointly fit `availableWidth` the browser would just
          // silently squeeze the detail column below this floor instead of
          // wrapping/overflowing — computing them together avoids that.
          const maxFieldWidth = Math.max(availableWidth - detailMin - gap, 160);
          const desiredField = Math.min(availableWidth * 0.5, availableHeight, 640);
          size = Math.max(Math.min(desiredField, maxFieldWidth), 160);
          const detailWidth = Math.min(Math.max(availableWidth - size - gap, detailMin), detailMax);
          root.style.setProperty(detailVar, `${detailWidth}px`);
        } else {
          const detailH = detail.getBoundingClientRect().height;
          // space-y-3 gap above the row (12px) + the stacked row's own gap
          // between field and detail (3rem = 48px) + a small buffer.
          const reserved = 12 + 48 + 16 + contentPadding;
          const availableHeight = screenH - headingH - detailH - reserved;
          size = Math.min(Math.max(Math.min(availableWidth, availableHeight), 240), 620);
          root.style.setProperty(detailVar, '100%');
        }
        root.style.setProperty(sizeVar, `${size}px`);
      };

      measureBubbleField(
        'kit-hardware',
        '.kit-text',
        '.kit-bubble-detail',
        '--kit-bubble-size',
        '--kit-detail-width'
      );

      // The Skills section's decorative pixel-art illustration (a fun
      // personal touch, absolutely positioned outside the content grid) is
      // sized from the real leftover space below the skill tags, not a
      // fixed guess — on a shorter viewport the tags themselves sit lower,
      // so a fixed size would start overlapping them. Measured as the
      // *relative* gap between the grid's bottom and the section's own
      // bottom (both viewport-relative rects taken at the same instant),
      // not against `window.innerHeight` directly — this effect can run
      // while the section isn't even scrolled into view, where an
      // innerHeight-relative measurement would be meaningless. Also capped
      // by the text column's own width (converted through the image's real
      // aspect ratio), since it's now centered and scaled up enough that a
      // narrower column could make it overflow sideways otherwise.
      const skillsSection = document.getElementById('skills');
      const skillsGrid = document.querySelector('.expertise-skills-grid');
      const skillsTextCol = document.querySelector('.expertise-text');
      if (skillsSection && skillsGrid && skillsTextCol) {
        const sectionBottom = skillsSection.getBoundingClientRect().bottom;
        const gridBottom = skillsGrid.getBoundingClientRect().bottom;
        const availableHeight = sectionBottom - gridBottom - 24; // breathing room above it
        const colWidth = skillsTextCol.getBoundingClientRect().width;
        const ASPECT = 400 / 300; // matches the source image's own aspect ratio
        const availableByWidth = (colWidth * 0.85) / ASPECT;
        const size = Math.min(Math.max(Math.min(availableHeight, availableByWidth), 0), 420);
        root.style.setProperty('--skills-pixel-art-h', `${size}px`);
      }
    };

    const scheduleMeasure = () => {
      if (raf) return;
      raf = requestAnimationFrame(measure);
    };

    scheduleMeasure();

    // Only observe elements whose own size is independent of the CSS custom
    // properties we set above (header height and wordmark font-size are
    // both unaffected by --screen-h or --wordmark-clear) — observing
    // anything whose size changes *because* of our own mutation (like
    // document.documentElement, which spans the whole page's content
    // height) creates a feedback loop.
    const ro = new ResizeObserver(scheduleMeasure);
    const header = document.querySelector('.site-header');
    const lowerWordmark = document.querySelector('.hero-marquee--lower .hero-marquee-base');
    const aboutMarqueeColEl = document.querySelector('.about-marquee-col');
    const journeyMarqueeColEl = document.querySelector('.journey-marquee-col');
    const expertiseMarqueeColEl = document.querySelector('.expertise-marquee-col');
    const talksMarqueeColEl = document.querySelector('.talks-marquee-col');
    const applicationsMarqueeColEl = document.querySelector('.applications-marquee-col');
    const kitMarqueeColEl = document.querySelector('.kit-marquee-col');
    const infoMarqueeColEl = document.querySelector('.info-marquee-col');
    const mailMarqueeColEl = document.querySelector('.mail-marquee-col');
    const kitTextEl = document.querySelector('.kit-text');
    const kitBubbleDetailEl = document.querySelector('.kit-bubble-detail');
    const skillsGridEl = document.querySelector('.expertise-skills-grid');
    const projectHeadingEls = document.querySelectorAll('.project-heading-block');
    const projectControlsEls = document.querySelectorAll('.project-carousel-controls');
    if (aboutMarqueeColEl) ro.observe(aboutMarqueeColEl);
    if (journeyMarqueeColEl) ro.observe(journeyMarqueeColEl);
    if (expertiseMarqueeColEl) ro.observe(expertiseMarqueeColEl);
    if (talksMarqueeColEl) ro.observe(talksMarqueeColEl);
    if (applicationsMarqueeColEl) ro.observe(applicationsMarqueeColEl);
    if (kitMarqueeColEl) ro.observe(kitMarqueeColEl);
    if (infoMarqueeColEl) ro.observe(infoMarqueeColEl);
    if (mailMarqueeColEl) ro.observe(mailMarqueeColEl);
    if (kitTextEl) ro.observe(kitTextEl);
    if (kitBubbleDetailEl) ro.observe(kitBubbleDetailEl);
    if (skillsGridEl) ro.observe(skillsGridEl);
    projectHeadingEls.forEach((el) => ro.observe(el));
    projectControlsEls.forEach((el) => ro.observe(el));
    if (header) ro.observe(header);
    if (lowerWordmark) ro.observe(lowerWordmark);

    window.addEventListener('resize', scheduleMeasure);
    window.addEventListener('orientationchange', scheduleMeasure);
    window.addEventListener('load', scheduleMeasure);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scheduleMeasure).catch(() => {});
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', scheduleMeasure);
      window.removeEventListener('orientationchange', scheduleMeasure);
      window.removeEventListener('load', scheduleMeasure);
    };
  }, []);

  // Nav bar theme follows whatever section currently sits behind it: each
  // section opts in via data-nav-theme="dark" (dark sections like About and
  // Odyssey), anything unmarked is treated as light (Hero/Work/Contact). We
  // probe a fixed point just inside the header's own height rather than
  // routing through React state, since this needs to update every scroll
  // frame — a direct DOM mutation (matching the pattern MostakimNav already
  // uses for its own scroll-driven UI) avoids a render on every tick.
  useEffect(() => {
    const header = document.querySelector('.site-header');
    if (!header) return undefined;
    const sections = Array.from(document.querySelectorAll('section[id]'));
    let raf = 0;

    const updateTheme = () => {
      raf = 0;
      const probeY = header.getBoundingClientRect().height / 2;
      let theme = 'light';
      for (const section of sections) {
        const r = section.getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) {
          theme = section.dataset.navTheme || 'light';
          break;
        }
      }
      if (header.dataset.theme !== theme) header.dataset.theme = theme;
    };

    const scheduleUpdate = () => {
      if (raf) return;
      raf = requestAnimationFrame(updateTheme);
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  // Locks wheel/trackpad scrolling to exactly one section per gesture, in
  // either direction — the user should never be able to rest halfway
  // between two. CSS `scroll-snap-type: y mandatory` (globals.css) already
  // guarantees the *resting* position is always a section boundary, for
  // every input method (touch, keyboard, scrollbar drag included) — but on
  // its own it only commits once a gesture crosses 50% of a section's
  // height, so a single mouse-wheel notch (~100–120px) just rubber-bands
  // back to where it started instead of advancing. This intercepts wheel
  // input to commit fully on *any* deliberate scroll, while leaving CSS
  // snap as the safety net for every other input method.
  useEffect(() => {
    let busy = false;
    let fallbackTimer = 0;
    // `busy` must clear the moment our own triggered scroll actually
    // finishes — not after a guessed fixed delay. An earlier version
    // re-armed a fixed cooldown on *every* wheel event (including swallowed
    // ones) so a trailing straggler from the same physical gesture wouldn't
    // be misread as a new one — but that meant any fairly continuous
    // scrolling (wheel ticks arriving faster than the cooldown) kept
    // re-extending it and could leave the page stuck ignoring input
    // indefinitely. `scrollend` fires exactly when a scroll (ours included)
    // settles, so listening for it releases `busy` as soon as it's
    // genuinely safe to, however long that actually took, with a generous
    // timer only as a fallback in case `scrollend` isn't supported.
    const release = () => {
      busy = false;
      clearTimeout(fallbackTimer);
    };

    // Resolved fresh on every gesture (not cached) so it stays correct
    // through any layout change (resize, content reflow) — cheap enough to
    // just measure real DOM positions each time rather than track state.
    const getSnapTargets = () => {
      const targets = [0];
      for (const id of SNAP_SECTION_IDS) {
        if (id === 'top') continue;
        const el = document.getElementById(id);
        if (el) targets.push(el.getBoundingClientRect().top + window.scrollY);
      }
      const footer = document.querySelector('footer');
      if (footer) {
        const footerBottom = footer.getBoundingClientRect().bottom + window.scrollY;
        targets.push(Math.max(footerBottom - window.innerHeight, targets[targets.length - 1]));
      }
      return targets;
    };

    const onWheel = (e) => {
      // The graphics lightbox (Skills section) owns the wheel while open —
      // its own scrollable gallery must not trigger a section jump.
      if (document.documentElement.dataset.graphicsLightbox === 'open') return;
      // A scrollable inline graphics gallery owns the wheel while it can
      // still scroll further in the gesture's direction — the page only
      // takes over once it hits the top/bottom edge.
      const gallery =
        e.target instanceof Element ? e.target.closest('.graphics-gallery-scroll') : null;
      if (gallery) {
        const canUp = gallery.scrollTop > 0;
        const canDown = gallery.scrollTop + gallery.clientHeight < gallery.scrollHeight - 1;
        if ((e.deltaY < 0 && canUp) || (e.deltaY > 0 && canDown)) return;
      }
      // While a commit is in flight, swallow every wheel event instead of
      // just ignoring it — leaving any of them unprevented lets the
      // browser's own native scroll run *at the same time* as the
      // animation below, each fighting the other for scrollY every frame.
      if (busy) {
        e.preventDefault();
        return;
      }
      const dir = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
      if (dir === 0) return;

      const targets = getSnapTargets();
      const currentY = window.scrollY;
      let curIdx = 0;
      let curBest = Infinity;
      targets.forEach((t, i) => {
        const d = Math.abs(t - currentY);
        if (d < curBest) {
          curBest = d;
          curIdx = i;
        }
      });
      const targetIdx = Math.min(Math.max(curIdx + dir, 0), targets.length - 1);
      if (targetIdx === curIdx) return; // already at the first/last section

      e.preventDefault();
      busy = true;
      smoothScrollTo(targets[targetIdx]);
      // Safety net only, well past how long any real scroll should take —
      // `scrollend` (below) is what normally releases `busy`.
      clearTimeout(fallbackTimer);
      fallbackTimer = window.setTimeout(release, 2000);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scrollend', release);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scrollend', release);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Drives the .reveal / .reveal-marquee transitions (globals.css): each
  // marked element gets `.is-in` the moment it actually crosses into view,
  // then is unobserved — a one-time arrival, not a repeating scroll toggle.
  // One shared observer for the whole page rather than one per section,
  // since the trigger condition (element enters the viewport) is identical
  // everywhere; only the CSS stagger/delay differs per element.
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('.reveal, .reveal-marquee, .pixel-reveal'));
    if (targets.length === 0) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );
    targets.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  // Every section is mounted at once (it's one long scrolling page, not
  // per-section lazy mounting), which means every section's own infinite
  // CSS animation — the rotated ticker marquees, the hero's tech-stack
  // marquee, the Mail Me CV badge's spin, the Kit & Hardware bubbles'
  // float — keeps compositing continuously even while its section is
  // nowhere near the viewport (only one is ever actually seen at a time,
  // since scroll-snap settles on exactly one section). Pausing those via
  // `data-animating="false"` (globals.css) when a section is far from view
  // cuts that idle compositor/battery cost without touching any animation
  // that's actually visible — a generous rootMargin means the animation is
  // already running again well before a section scrolls into frame, so
  // there's never a visible "cold start". Direct DOM attribute writes
  // (not React state) for the same reason the header theme swap does this
  // outside React: a per-frame-adjacent toggle over many elements has no
  // reason to round-trip through a render.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (sections.length === 0) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.setAttribute('data-animating', entry.isIntersecting ? 'true' : 'false');
        });
      },
      { threshold: 0, rootMargin: '50% 0px 50% 0px' }
    );
    sections.forEach((el) => {
      el.setAttribute('data-animating', 'true');
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const marqueeSkills = data.skills.flatMap((skill) => [skill, '✳']);
  const marqueeCopies = 4;

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <WelcomeIntro />
      {/* Zero-height scroll-snap target for "top of page" — deliberately
          not the header itself: a `position: sticky` element doesn't
          reliably work as a snap target (it settles correctly on load, but
          scrolling back up from About toward it gets stuck rather than
          reaching it). This plain, unpositioned marker sits at the true
          document top and snaps predictably. */}
      <div aria-hidden="true" className="scroll-top-anchor" />
      {/* Nav */}
      <header className="site-header sticky top-0 z-50 border-b border-neutral-200 bg-white/95 md:bg-white/80 md:backdrop-blur">
        <nav className="site-nav relative flex items-center justify-between px-6 py-2 sm:px-10">
          <a
            href="#top"
            onClick={(e) => handleHashLink(e, 'top')}
            aria-label="Back to top"
            className="brand-mark flex-shrink-0 font-display text-lg font-bold tracking-tight text-neutral-900 transition hover:opacity-70"
          >
            MH.
          </a>
          <MostakimNav />
          <div className="ml-auto flex items-center gap-8 text-sm text-neutral-600">
            <a
              href="#about"
              onClick={(e) => handleHashLink(e, 'about')}
              className="hidden hover:text-neutral-900 sm:block"
            >
              About
            </a>
            <a
              href="#mail-me"
              onClick={(e) => handleHashLink(e, 'mail-me')}
              className="site-nav-cta rounded-full bg-neutral-900 px-5 py-2 font-medium text-white transition hover:bg-neutral-700"
            >
              Let’s talk
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="top"
        className="hero-shell relative z-0 flex min-h-[var(--screen-h)] w-full flex-col items-start overflow-x-hidden px-6 pt-6 sm:px-10"
      >
        {/* Scroll nudge — rises from the bottom edge rather than living
            inline (see the Kit & Hardware hint, which drops from the
            header for the same reason: dismissible chrome shouldn't cost
            permanent layout space). Shown once shortly after load,
            dismissed by clicking it (which also scrolls down), by
            scrolling on your own, or on its own after a few seconds. */}
        <button
          type="button"
          onClick={() => {
            dismissHeroHint();
            scrollToSection('maker');
          }}
          aria-label="Scroll to Maker section"
          className={`group pointer-events-none fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            heroHintVisible ? 'pointer-events-auto translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
        >
          <span className="flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-lg transition group-hover:bg-neutral-700">
            Scroll to explore
            <span className="hero-hint-track flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
              <span className="hero-hint-dot h-1 w-1 rounded-full bg-[#ff4d00]" />
            </span>
          </span>
        </button>

        <HeroMarquee text="MOSTAKIM" className="hero-marquee--upper" />
        <HeroMarquee text="HOSSAIN" className="hero-marquee--lower" />
        {/* Below md, this grid itself grows to fill whatever room is left
            in the hero (flex-1, inside hero-shell's flex column) instead
            of just sizing to its own content — and within it, the image
            column gets a `minmax(0,1fr)` row (hero-copy's is `auto`) so
            *it's* the one that absorbs that space, not empty margin. That
            makes the image a flexible-height box rather than a fixed-
            aspect one, which is what actually lets it reach the marquee
            below on every viewport height: a fixed-aspect image can only
            ever be as tall as its own ratio allows, so on a viewport
            taller than that (e.g. a narrow window on a portrait monitor)
            there was nothing to stop leftover space from landing
            somewhere as a gap — before, between the image and the
            marquee; now, restoring `md:mt-auto` on the marquee wrapper
            below, after the marquee instead, dangling before the next
            section. Desktop (`md:`) resets all of this back to the
            original content-sized behavior, unchanged. */}
        <div className="relative z-10 grid w-full flex-1 grid-rows-[auto_minmax(0,1fr)] items-stretch gap-4 sm:gap-6 md:flex-none md:grid-cols-12 md:grid-rows-none md:items-start md:gap-10">
          {/* Left: name + copy */}
          <div className="hero-copy order-1 md:col-span-5">
            <div className="hero-badge flex items-center gap-3">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ff4d00]" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
                {data.role}
                {data.available ? ' — Available for work' : ''}
              </span>
            </div>

            <p className="hero-tagline font-display mt-3 text-xl font-semibold leading-snug tracking-tight text-neutral-700 sm:mt-4 sm:text-2xl md:text-4xl">
              {data.tagline}
            </p>

            <p className="hero-intro mt-3 max-w-xl text-base leading-relaxed text-neutral-600 sm:mt-4 sm:text-lg">
              {data.intro}
            </p>

            <div className="mt-4 flex flex-wrap gap-4 sm:mt-6">
              <a
                href="#applications"
                onClick={(e) => handleHashLink(e, 'applications')}
                className="hero-cta hero-cta-primary rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-white hover:text-neutral-900 hover:ring-1 hover:ring-neutral-900"
              >
                View selected work
              </a>
            </div>
          </div>

          {/* Right: profile image */}
          <div className="order-2 min-h-0 md:col-span-7">
            <div className="hero-image-shell h-full w-full origin-top md:h-auto">
              <HeroImage
                src="/assets/profile_3.png"
                alt={data.name}
                width={560}
                height={700}
                priority
                sizes="(max-width: 768px) 90vw, 760px"
                className="h-full w-full md:h-auto"
              />
            </div>
          </div>
        </div>

        {/* Bottom-anchored group: the skills marquee always lives inside the
            hero. At md+, `mt-auto` pins it to the section's true bottom
            edge regardless of how much room the copy/image above it takes
            up. Below md that same auto-margin was the thing forcing a gap
            between the photo and the marquee (it claims *all* the flex
            container's leftover space as its own top margin) — a plain
            small gap there instead so the photo sits right above the
            marquee, the way it's meant to. The scroll cue used to live
            here too, but as an in-flow element it was extra height on top
            of that; it's a dismissible toast (below) now, so it no longer
            costs any layout space either way. */}
        <div className="relative z-10 mt-0 flex w-full flex-col items-center md:mt-auto">
          <div className="skills-marquee-shell relative w-screen ml-[calc(50%_-_50vw)] mr-[calc(50%_-_50vw)] border-y border-neutral-200 bg-white py-3">
            <div className="skills-marquee-viewport overflow-hidden">
              <div className="skills-marquee-track">
                {Array.from({ length: marqueeCopies }, (_, copyIndex) => (
                  <div
                    key={`marquee-copy-${copyIndex}`}
                    className="skills-marquee-group"
                    aria-hidden={copyIndex > 0 ? true : undefined}
                  >
                    {marqueeSkills.map((item, index) => {
                      const isSeparator = item === '✳';

                      return isSeparator ? (
                        <span
                          key={`sep-${copyIndex}-${index}`}
                          aria-hidden="true"
                          className="skills-marquee-separator text-[#ff4d00]"
                        >
                          ✳
                        </span>
                      ) : (
                        <span
                          key={`skill-${copyIndex}-${index}`}
                          className="skills-marquee-item font-display text-3xl font-medium text-neutral-700"
                        >
                          {item}
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About (the "M — Maker" nav letter anchors here, not to a separate section) */}
      <section
        id="about"
        data-nav-theme="dark"
        className="about-section full-section relative overflow-hidden bg-neutral-950 text-white"
      >
        <div id="maker" className="scroll-mt-24" aria-hidden="true" />
        <div className="about-content relative z-10 grid w-full items-stretch gap-6 py-10 sm:gap-8 sm:py-16 md:grid-cols-[minmax(0,22rem)_30%_minmax(0,1fr)] md:gap-8 md:py-0 lg:gap-12">
          {/* Rotated "MAKER" ticker — its own column, not overlapping the
              text/photo, reading bottom-to-top. */}
          <div className="about-marquee-col reveal-marquee relative hidden overflow-hidden md:block">
            <div className="about-marquee-rotate">
              <HeroMarquee text="MAKER" className="maker-word" repeat={12} duration="46s" />
            </div>
          </div>

          <div className="about-text reveal flex flex-col justify-center space-y-3 px-6 pt-[var(--header-h)] sm:space-y-4 sm:px-10 md:px-0">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              About
            </p>
            <div className="space-y-3 pt-2 sm:space-y-4 sm:pt-4">
              {data.aboutParagraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'font-display text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl'
                      : 'text-base leading-relaxed text-white/60 sm:text-lg'
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div
            className="about-photo reveal relative h-full min-h-[160px] w-full overflow-hidden md:min-h-0"
            style={{ transitionDelay: '150ms' }}
          >
            <Image
              src="/assets/profile2.jpeg"
              alt={data.name}
              fill
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-cover"
              priority={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r md:from-neutral-950 md:via-neutral-950/0 md:to-transparent" />
          </div>
        </div>
      </section>

      {/* Odyssey — the journey/milestones section. Layout mirrors About:
          the rotated ticker moves to the right, content takes the left. */}
      <section
        id="journey"
        className="journey-section full-section relative overflow-hidden bg-white text-neutral-900"
      >
        <div className="journey-content relative z-10 grid w-full items-stretch gap-6 py-8 sm:gap-10 sm:py-24 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:gap-8 md:py-0 lg:gap-12">
          <div className="journey-text flex flex-col justify-center space-y-5 px-6 pt-[var(--header-h)] sm:space-y-10 sm:px-10 md:pl-10 md:pr-10 lg:pl-16">
            <div className="reveal">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
                My Journey
              </p>
              <h2 className="font-display mt-2 max-w-xl text-2xl font-semibold leading-tight tracking-tight text-neutral-900 sm:mt-4 sm:text-3xl md:text-4xl">
                Milestones along the way.
              </h2>
            </div>

            <div
              className="reveal grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-4"
              style={{ transitionDelay: '120ms' }}
            >
              {data.journeyStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-neutral-200 bg-neutral-50 p-2.5 text-center sm:p-4"
                >
                  <p className="font-display text-lg font-semibold text-neutral-900 sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[0.65rem] uppercase tracking-wide text-neutral-400 sm:mt-1 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="reveal space-y-4 sm:space-y-8" style={{ transitionDelay: '220ms' }}>
              {data.journeyTimeline.map((item) => (
                <div key={item.title} className="border-l border-neutral-200 pl-5">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
                    {item.year}
                  </p>
                  <h3 className="mt-1 font-display text-base font-semibold text-neutral-900 sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-500">{item.company}</p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600 sm:mt-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Rotated "ODYSSEY" ticker — mirrors About's marquee, now on the
              right instead of the left. */}
          <div className="journey-marquee-col reveal-marquee relative hidden overflow-hidden md:block">
            <div className="journey-marquee-rotate">
              <HeroMarquee
                text="ODYSSEY"
                className="journey-word"
                repeat={12}
                duration="46s"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise — layout mirrors About again: the rotated
          ticker returns to the left, content takes the right. */}
      <section
        id="skills"
        data-nav-theme="dark"
        className="expertise-section full-section relative overflow-hidden bg-neutral-950 text-white"
      >
        <div className="expertise-content relative z-10 grid w-full items-stretch gap-6 py-8 sm:gap-10 sm:py-24 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-8 md:py-0 lg:gap-12">
          {/* Rotated "SKILLS" ticker — mirrors About's marquee column. */}
          <div className="expertise-marquee-col reveal-marquee relative hidden overflow-hidden md:block">
            <div className="expertise-marquee-rotate">
              <HeroMarquee
                text="SKILLS"
                className="expertise-word"
                repeat={12}
                duration="46s"
              />
            </div>
          </div>

          <div className="expertise-text relative flex flex-col justify-start space-y-5 px-6 pt-[calc(var(--header-h)+1.25rem)] sm:space-y-8 sm:px-10 sm:pt-[calc(var(--header-h)+2.5rem)] md:pl-10 md:pr-10 lg:pr-16">
            {/* Two-view slider: the default tech-skills view and the graphic
                design view that slides in from the right when the round
                button is pressed. Each slide is exactly one column wide
                (w-full + shrink-0, overflowing the track), so -100% of the
                track's own width shifts exactly one view. The wrapper is
                flex-1 + the track h-full so both slides are full column
                height — the pixel art stays glued to the section floor. */}
            <div className="min-w-0 flex-1 overflow-hidden">
              <div
                className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={{ transform: showGraphics ? 'translateX(-100%)' : 'translateX(0)' }}
              >
                {/* Slide 1 — tech skills (default view). `relative` so the
                    pixel art below anchors to this slide and rides out
                    with it, leaving a complete switch to graphics. */}
                <div
                  className="relative w-full shrink-0 space-y-5 sm:space-y-8"
                  aria-hidden={showGraphics || undefined}
                >
                  <div className="reveal">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                      Skills &amp; Expertise
                    </p>
                    <h2 className="font-display mt-2 max-w-xl text-2xl font-semibold leading-tight tracking-tight text-white sm:mt-4 sm:text-3xl md:text-4xl">
                      Technologies I work with to bring ideas to life.
                    </h2>
                  </div>

                  <div
                    className="expertise-skills-grid reveal grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8"
                    style={{ transitionDelay: '150ms' }}
                  >
                    {data.skillCategories.map((category) => (
                      <div key={category.title}>
                        <h3 className="flex items-center gap-3 text-sm font-semibold text-white">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ background: category.color }}
                          />
                          {category.title}
                        </h3>
                        <div className="mt-2.5 flex flex-wrap gap-2 sm:mt-4">
                          {category.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right-aligned graphic-design entry point — sits below
                      the skill tags, pushed to the right edge of the text
                      column. Pressing it slides in the graphics view. */}
                  <div
                    className="reveal flex justify-end pr-2 pt-4 sm:pr-6 lg:pr-10"
                    style={{ transitionDelay: '250ms' }}
                  >
                    <button
                      type="button"
                      onClick={() => setShowGraphics(true)}
                      aria-label="Show my graphic design skills"
                      className="group flex aspect-square w-56 flex-col items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 text-center text-white transition duration-300 hover:scale-105 hover:border-[#ff4d00] hover:bg-[#ff4d00] hover:text-white sm:w-64 lg:w-72"
                    >
                      <span className="px-6 text-xl font-semibold leading-tight sm:px-8 sm:text-2xl lg:text-3xl">
                        My
                        <br />
                        <span className="whitespace-nowrap">Graphic Design</span>
                        <br />
                        Skills
                      </span>
                      <ArrowRight
                        size={76}
                        strokeWidth={2.5}
                        className="transition-transform duration-300 group-hover:translate-x-2"
                      />
                    </button>
                  </div>

                  {/* Pixel art rides with slide 1 (see slide comment above)
                      so pressing the button clears the whole tech view —
                      art included — for a complete switch to graphics. */}
                  <Image
                    src="/assets/pixel_art.png"
                    alt={`Pixel art of ${data.name}`}
                    width={400}
                    height={300}
                    className="skills-pixel-art pixel-reveal pointer-events-none absolute bottom-0 left-[42%] z-0 hidden w-auto object-contain object-bottom md:block"
                  />
                </div>

                {/* Slide 2 — graphic design skills (slides in from right).
                    Deliberately bounded (one preview row + expand lightbox)
                    so this view fits the section's one-screen budget like
                    every other section. */}
                <div
                  className="w-full shrink-0 space-y-4 sm:space-y-5"
                  aria-hidden={!showGraphics || undefined}
                >
                  {/* Header: heading left, design-tool icons top-right. */}
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                        Graphic Design
                      </p>
                      <h2 className="font-display mt-2 max-w-xl text-2xl font-semibold leading-tight tracking-tight text-white sm:mt-3 sm:text-3xl md:text-4xl">
                        Visuals that give ideas their voice.
                      </h2>
                    </div>
                    <div
                      className="flex flex-wrap items-center gap-2 pt-1"
                      role="list"
                      aria-label="Design tools I use"
                    >
                      {data.graphicsTools.map((tool) => (
                        <img
                          key={tool.label}
                          src={tool.src}
                          alt={tool.label}
                          title={tool.label}
                          role="listitem"
                          loading="lazy"
                          className="h-9 w-9 rounded-lg border border-white/10 sm:h-10 sm:w-10"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Sub-section tabs */}
                  <div className="flex flex-wrap gap-2" role="tablist" aria-label="Graphic design sub-sections">
                    {data.graphicsSubsections.map((sub, i) => (
                      <button
                        key={sub.id}
                        type="button"
                        role="tab"
                        aria-selected={i === activeGraphicsIdx}
                        onClick={() => setActiveGraphicsIdx(i)}
                        tabIndex={showGraphics ? 0 : -1}
                        className={`rounded-full border px-4 py-2 text-xs font-medium transition sm:text-sm ${
                          i === activeGraphicsIdx
                            ? 'border-[#ff4d00] bg-[#ff4d00] text-white'
                            : 'border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {sub.tab}
                      </button>
                    ))}
                  </div>

                  {/* Active sub-section: description + bounded preview */}
                  <div key={activeGraphics.id} className="kit-detail-fade space-y-3 sm:space-y-4">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
                        {activeGraphics.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
                        {activeGraphics.description}
                      </p>
                    </div>

                    {graphicsMedia.length > 0 && (
                      <div className="graphics-gallery-scroll max-h-72 overflow-y-auto rounded-2xl border border-white/10 bg-white/[0.02] p-2 sm:max-h-96 sm:p-3">
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                          {graphicsMedia.map((tile, tileIndex) => (
                            <button
                              key={tile.src}
                              type="button"
                              onClick={() => setGraphicsLightboxIndex(tileIndex)}
                              tabIndex={showGraphics ? 0 : -1}
                              aria-label={`Expand ${activeGraphics.title} item ${tileIndex + 1}`}
                              className="group relative h-28 w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:h-36"
                            >
                              {tile.type === 'image' ? (
                                <Image
                                  src={tile.src}
                                  alt=""
                                  fill
                                  sizes="(max-width: 640px) 50vw, 30vw"
                                  className="object-cover transition duration-300 group-hover:scale-105"
                                />
                              ) : (
                                <>
                                <video
                                  preload="metadata"
                                  muted
                                  playsInline
                                  src={tile.src}
                                  aria-hidden="true"
                                  tabIndex={-1}
                                  className="h-full w-full object-cover"
                                />
                                  <span
                                    className="absolute inset-0 flex items-center justify-center"
                                    aria-hidden="true"
                                  >
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 transition group-hover:bg-[#ff4d00]">
                                      <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-white" />
                                    </span>
                                  </span>
                                </>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Back to the default tech-skills view. */}
                  <div className="flex justify-start pt-1">
                    <button
                      type="button"
                      onClick={() => setShowGraphics(false)}
                      aria-label="Back to tech skills"
                      className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-[#ff4d00] hover:bg-[#ff4d00] hover:text-white"
                    >
                      <ArrowLeft
                        size={18}
                        strokeWidth={2}
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                      />
                      Back to Tech Skills
                    </button>
                  </div>
                </div>

                {/* Full gallery lightbox lives at the end of this section
                    (below), outside the transformed slider track — a
                    `fixed` element inside a transformed ancestor would be
                    positioned/clipped relative to it instead. */}
              </div>
            </div>

          </div>
        </div>

        {/* Per-item lightbox viewer — a direct child of the section (never
            inside the transformed slider track), so `fixed` truly covers
            the viewport. Closed via Close / backdrop / Escape, browsed
            with the arrows or arrow keys. */}
        {graphicsLightboxIndex !== null && graphicsMedia[graphicsLightboxIndex] && (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeGraphics.title} item ${graphicsLightboxIndex + 1} of ${graphicsMedia.length}`}
            onClick={() => setGraphicsLightboxIndex(null)}
          >
            <div
              className="flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 p-4 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setGraphicsLightboxIndex(
                        (graphicsLightboxIndex - 1 + graphicsMedia.length) %
                          graphicsMedia.length
                      )
                    }
                    aria-label="Previous item"
                    className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-[#ff4d00] hover:bg-[#ff4d00]"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setGraphicsLightboxIndex(
                        (graphicsLightboxIndex + 1) % graphicsMedia.length
                      )
                    }
                    aria-label="Next item"
                    className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-[#ff4d00] hover:bg-[#ff4d00]"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <p className="truncate font-display text-base font-semibold text-white sm:text-lg">
                    {activeGraphics.title}{' '}
                    <span className="font-sans text-sm font-normal text-white/40">
                      ({graphicsLightboxIndex + 1} / {graphicsMedia.length})
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setGraphicsLightboxIndex(null)}
                  autoFocus
                  aria-label="Close viewer"
                  className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-[#ff4d00] hover:bg-[#ff4d00]"
                >
                  <X size={16} />
                  Close
                </button>
              </div>
              <div
                key={graphicsMedia[graphicsLightboxIndex].src}
                className="flex items-center justify-center overflow-y-auto bg-black p-4 sm:p-6"
              >
                {graphicsMedia[graphicsLightboxIndex].type === 'image' ? (
                  <img
                    src={graphicsMedia[graphicsLightboxIndex].src}
                    alt={`${activeGraphics.title} visual ${graphicsLightboxIndex + 1}`}
                    className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain"
                  />
                ) : (
                  <video
                    controls
                    playsInline
                    src={graphicsMedia[graphicsLightboxIndex].src}
                    className="max-h-[70vh] w-full max-w-3xl rounded-xl bg-black"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Talks — layout mirrors Odyssey: content on the left, rotated
          ticker on the right. */}
      <section
        id="talks"
        className="talks-section full-section relative overflow-hidden bg-white text-neutral-900"
      >
        <div className="talks-content relative z-10 grid w-full items-stretch gap-6 py-8 sm:gap-10 sm:py-24 md:grid-cols-[minmax(0,1fr)_18rem_minmax(0,22rem)] md:gap-8 md:py-0 lg:gap-12">
          <div className="talks-text flex flex-col justify-center space-y-4 px-6 pt-[var(--header-h)] sm:space-y-8 sm:px-10 md:pl-10 md:pr-10 lg:pl-16">
            <div className="project-heading-block reveal">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
                Talks
              </p>
              <h2 className="font-display mt-2 max-w-xl text-2xl font-semibold leading-tight tracking-tight text-neutral-900 sm:mt-4 sm:text-3xl md:text-4xl">
                Highlights &amp; publications.
              </h2>
            </div>

            <div className="reveal" style={{ transitionDelay: '150ms' }}>
              <ProjectCarousel
                items={data.talksHighlights}
                heightVar="--talks-carousel-h"
                itemLabel="highlight"
                onIndexChange={setActiveTalkIndex}
              />
            </div>
          </div>

          {/* Publication / organization logo(s) for whichever card is
              currently active in the carousel — Springer for the journal
              article, IEEE Xplore for the conference paper, NSU / IEEE NSU
              SB / IEEE NSU WIE AG for the two workshop posts, nothing for
              the personal-project post. */}
          <div className="talks-logos hidden flex-col items-center justify-center gap-10 md:flex">
            {data.talksHighlights[activeTalkIndex]?.logos.map((logo) => (
              <img
                key={`${activeTalkIndex}-${logo.src}`}
                src={logo.src}
                alt={logo.alt}
                className="project-logo h-40 w-full object-contain opacity-80"
              />
            ))}
          </div>

          {/* Rotated "TALKS" ticker — mirrors Odyssey's marquee column. */}
          <div className="talks-marquee-col reveal-marquee relative hidden overflow-hidden md:block">
            <div className="talks-marquee-rotate">
              <HeroMarquee text="TALKS" className="talks-word" repeat={12} duration="46s" />
            </div>
          </div>
        </div>
      </section>

      {/* Applications — layout mirrors Skills: the rotated ticker sits on
          the left, content takes the right. */}
      <section
        id="applications"
        data-nav-theme="dark"
        className="applications-section full-section relative overflow-hidden bg-neutral-950 text-white"
      >
        {/* Right-side background layer, same position/object-cover/gradient
            treatment as Information's photo, but hidden until a card is
            hovered — brightness-dimmed rather than opacity-dimmed (this
            section is already dark, so a low-opacity image would just look
            washed out rather than blending in) — and swaps to whichever
            card the pointer is currently over. */}
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] transition-opacity duration-500 md:block ${
            hoveredApp ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {hoveredApp ? (
            <Image
              key={hoveredApp}
              src={hoveredApp}
              alt=""
              aria-hidden="true"
              fill
              sizes="55vw"
              className="applications-hover-image object-cover brightness-[0.3]"
              priority={false}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/0 to-transparent" />
        </div>
        <div className="applications-content relative z-10 grid w-full items-stretch gap-10 py-12 sm:py-16 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-8 md:py-0 lg:gap-12">
          {/* Rotated "APPLICATIONS" ticker — mirrors Skills' marquee column. */}
          <div className="applications-marquee-col reveal-marquee relative hidden overflow-hidden md:block">
            <div className="applications-marquee-rotate">
              <HeroMarquee
                text="APPLICATIONS"
                className="applications-word"
                repeat={12}
                duration="46s"
              />
            </div>
          </div>

          <div className="applications-text flex flex-col justify-center space-y-5 px-6 pt-[var(--header-h)] sm:space-y-8 sm:px-10 md:pl-10 md:pr-10 lg:pr-16">
            <div className="reveal">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                Applications
              </p>
              <h2 className="font-display mt-3 max-w-xl text-2xl font-semibold leading-tight tracking-tight text-white sm:mt-4 sm:text-3xl md:text-4xl">
                Web platforms &amp; AI solutions.
              </h2>
            </div>

            <div
              className="applications-project-grid reveal grid max-w-3xl grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-20 sm:gap-y-6"
              style={{ transitionDelay: '150ms' }}
            >
              {data.applicationsProjects.map((project) => (
                <div
                  key={project.title}
                  onMouseEnter={() => setHoveredApp(project.hoverImage)}
                  onMouseLeave={() => setHoveredApp((prev) => (prev === project.hoverImage ? null : prev))}
                  onFocus={() => setHoveredApp(project.hoverImage)}
                  onBlur={() => setHoveredApp((prev) => (prev === project.hoverImage ? null : prev))}
                >
                  <div className="applications-project-media relative w-full overflow-hidden rounded-xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 639px) 90vw, 420px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-2.5 font-display text-base font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">
                    {project.description}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.7rem] text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-4">
                    <a
                      href={project.repoHref}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-[#ff4d00] hover:underline"
                    >
                      Code →
                    </a>
                    {project.liveHref ? (
                      <a
                        href={project.liveHref}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-[#ff4d00] hover:underline"
                      >
                        Live →
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kit & Hardware — layout mirrors Talks: content on the left, rotated
          ticker on the right. An editorial list, not a card system: each
          build's photo runs full-bleed (no border/shadow/rounded box),
          separated by thin divider lines only. */}
      <section
        id="kit-hardware"
        className="kit-section full-section relative overflow-hidden bg-white text-neutral-900"
      >
        {/* Right-side background layer for the active build — same
            position/object-cover/gradient treatment as Information's photo
            behind the social cards, except a lower opacity instead of a
            brightness filter (the background here is white, not dark, so
            dimming via brightness would just wash it out to grey instead of
            blending into the page). Swaps per bubble via `key`. */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] md:block">
          <Image
            key={data.kitHardwareProjects[activeKitIndex]?.bgImage}
            src={data.kitHardwareProjects[activeKitIndex]?.bgImage}
            alt=""
            aria-hidden="true"
            fill
            sizes="55vw"
            className="kit-bg-image object-cover opacity-[0.14]"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/0 to-transparent" />
        </div>

        {/* One-time nudge toward the bubbles — shown/hidden from Page()
            (see the IntersectionObserver + dismissKitHint above) rather
            than owned locally, since dismissal has to react to a click
            happening deep inside HardwareBubbles. Reads as a notification
            dropping down from the sticky header: fixed just below it,
            horizontally centered, independent of scroll position within
            the section. */}
        <div
          className={`pointer-events-none fixed left-1/2 top-[calc(var(--header-h)+1rem)] z-[60] -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            kitHintVisible ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
          }`}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-lg">
            <MousePointerClick size={16} strokeWidth={2} className="text-[#ff4d00]" />
            Click a bubble to explore
          </div>
        </div>

        <div className="kit-content relative z-10 grid w-full items-stretch gap-10 py-20 sm:py-24 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:gap-8 md:py-0 lg:gap-12">
          <div className="kit-text flex flex-col justify-center space-y-3 px-6 pt-[var(--header-h)] sm:px-10 md:pl-10 md:pr-10 lg:pl-16">
            <div className="project-heading-block reveal">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
                Kit &amp; Hardware
              </p>
              <h2 className="font-display mt-3 max-w-xl text-2xl font-semibold leading-tight tracking-tight text-neutral-900 sm:mt-4 sm:text-3xl md:text-4xl">
                Physical computing &amp; microcontrollers.
              </h2>
            </div>

            <div className="reveal" style={{ transitionDelay: '150ms' }}>
              <HardwareBubbles
                items={data.kitHardwareProjects}
                onActiveChange={setActiveKitIndex}
                onInteract={dismissKitHint}
              />
            </div>
          </div>

          {/* Rotated "KIT & HARDWARE" ticker — mirrors Talks' marquee column. */}
          <div className="kit-marquee-col reveal-marquee relative hidden overflow-hidden md:block">
            <div className="kit-marquee-rotate">
              <HeroMarquee
                text="KIT & HARDWARE"
                className="kit-word"
                repeat={10}
                duration="46s"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Information — layout mirrors Applications: rotated ticker on the
          left, content on the right. Real contact details and social links,
          taken from the reference portfolio's Socials.js/Contact.js. */}
      <section
        id="information"
        data-nav-theme="dark"
        className="info-section full-section relative overflow-hidden bg-neutral-950 text-white"
      >
        {/* Right-side background layer — same position, object-cover, and
            gradient-into-bg treatment as About/Maker's photo, but a plain
            absolutely positioned overlay (not a grid column), so it never
            constrains the cards' width; it just sits behind them (no
            z-index vs .info-content's z-10). */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] md:block">
          <Image
            src="/assets/profile.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes="55vw"
            className="object-cover brightness-[0.28]"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/0 to-transparent" />
        </div>
        <div className="info-content relative z-10 grid w-full items-stretch gap-10 py-12 sm:py-16 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-8 md:py-0 lg:gap-12">
          {/* Rotated "INFORMATION" ticker — mirrors Applications' marquee column. */}
          <div className="info-marquee-col reveal-marquee relative hidden overflow-hidden md:block">
            <div className="info-marquee-rotate">
              <HeroMarquee text="INFORMATION" className="info-word" repeat={10} duration="46s" />
            </div>
          </div>

          <div className="info-text flex flex-col justify-center space-y-8 px-6 pt-[var(--header-h)] sm:space-y-10 sm:px-10 md:pl-10 md:pr-10 lg:space-y-12 lg:pr-16">
            <div className="reveal">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                Information
              </p>
              <h2 className="font-display mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl">
                Socials &amp; where to find me.
              </h2>
            </div>

            <div
              className="reveal grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-5 lg:gap-6"
              style={{ transitionDelay: '150ms' }}
            >
              {data.informationSocials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur-sm transition hover:border-white/25 hover:bg-white/[0.08] sm:gap-4 sm:px-5 sm:py-4 lg:px-6 lg:py-5"
                  >
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#ff4d00] transition group-hover:border-[#ff4d00]/40 sm:h-12 sm:w-12 lg:h-14 lg:w-14">
                      <Icon size={15} className="sm:h-[22px] sm:w-[22px] lg:h-6 lg:w-6" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display truncate text-xs font-semibold text-white sm:text-lg">
                        {social.label}
                      </p>
                      <p className="truncate text-[0.7rem] text-white/50 sm:text-sm">
                        {social.username}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mail Me — layout mirrors Kit & Hardware: content on the left,
          rotated ticker on the right. Contact details + CV download, taken
          from the reference portfolio's Contact.js "Let's Collaborate"
          panel. */}
      <section
        id="mail-me"
        className="mail-section full-section relative overflow-hidden bg-white text-neutral-900"
      >
        <div className="mail-content relative z-10 grid w-full items-stretch gap-10 py-12 sm:py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:gap-8 md:py-0 lg:gap-12">
          <div className="mail-text relative flex flex-col justify-center space-y-8 px-6 pt-[var(--header-h)] sm:space-y-10 sm:px-10 md:pl-10 md:pr-10 lg:space-y-16 lg:pl-16">
            <div className="reveal">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
                Mail Me
              </p>
              <h2 className="font-display mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-neutral-900 sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl">
                Let&apos;s collaborate.
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-600 sm:mt-5 sm:text-lg lg:text-xl">
                {data.mailMeIntro}
              </p>
            </div>

            <div className="reveal flex flex-col gap-8 sm:gap-10" style={{ transitionDelay: '150ms' }}>
              {/* The email itself is the section's real call to action — a
                  big display-type statement instead of one more icon row,
                  with the underline drawing in on hover (globals.css). */}
              <a href={mailEmail.href} className="mail-email-link font-display text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl lg:text-5xl">
                <span className="mail-email-link-text break-all sm:break-normal">
                  {mailEmail.value}
                </span>
                <ArrowUpRight
                  className="mail-email-link-arrow h-6 w-6 flex-shrink-0 sm:h-7 sm:w-7 lg:h-9 lg:w-9"
                  strokeWidth={2}
                />
              </a>

              {/* A slim directory strip, not another pair of icon badges —
                  thin rule above, a vertical divider between the two
                  fields, matching Kit & Hardware's "dividers, not cards"
                  treatment. */}
              <div className="flex flex-wrap items-start gap-x-10 gap-y-6 border-t border-neutral-200 pt-6 sm:pt-8">
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-400 sm:text-sm">
                    Phone
                  </p>
                  <a
                    href={mailPhone.href}
                    className="mt-1 block text-base font-medium text-neutral-900 transition hover:text-[#ff4d00] sm:text-lg lg:text-xl"
                  >
                    {mailPhone.value}
                  </a>
                </div>
                <div className="border-l border-neutral-200 pl-10">
                  <p className="text-xs uppercase tracking-widest text-neutral-400 sm:text-sm">
                    Location
                  </p>
                  <p className="mt-1 text-base font-medium text-neutral-900 sm:text-lg lg:text-xl">
                    {mailLocation.value}
                  </p>
                </div>
              </div>
            </div>

            {/* A rotating badge instead of another boxed "Download CV"
                card — the whole thing is the download link, so it doubles
                as this section's one bit of continuous-motion signature
                (mirroring the ticker marquees elsewhere on the page). */}
            <a
              href="/assets/Mostakim_Hossain_CV.pdf"
              download
              aria-label="Download CV"
              className="cv-badge group absolute bottom-8 right-6 hidden h-28 w-28 items-center justify-center md:flex lg:bottom-10 lg:right-10 lg:h-32 lg:w-32"
            >
              <svg viewBox="0 0 100 100" className="cv-badge-spin absolute inset-0 h-full w-full text-neutral-400 transition-colors duration-300 group-hover:text-neutral-900">
                <defs>
                  <path id="cv-badge-path" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text fontSize="8" letterSpacing="2" fill="currentColor">
                  <textPath href="#cv-badge-path" startOffset="0%">
                    DOWNLOAD CV • DOWNLOAD CV •
                  </textPath>
                </text>
              </svg>
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors duration-300 group-hover:bg-[#ff4d00] lg:h-16 lg:w-16">
                <Download size={20} />
              </span>
            </a>
          </div>

          {/* Rotated "MAIL ME" ticker — mirrors Kit & Hardware's marquee column. */}
          <div className="mail-marquee-col reveal-marquee relative hidden overflow-hidden md:block">
            <div className="mail-marquee-rotate">
              <HeroMarquee text="MAIL ME" className="mail-word" repeat={10} duration="46s" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <a
              href="#top"
              onClick={(e) => handleHashLink(e, 'top')}
              aria-label="Back to top"
              className="brand-mark flex-shrink-0 font-display text-lg font-bold tracking-tight text-neutral-900 transition hover:opacity-70"
            >
              MH.
            </a>
            <span>
              © {new Date().getFullYear()} {data.name}
            </span>
          </div>
          <a
            href="#top"
            onClick={(e) => handleHashLink(e, 'top')}
            className="transition hover:text-neutral-900"
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
