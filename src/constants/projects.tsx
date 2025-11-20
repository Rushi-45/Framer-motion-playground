import visileanLogo from "../assets/images/visilean.webp";
import celebalLogo from "../assets/images/celebal-tech.webp";
import nflLogo from "../assets/images/nfl.webp";
import solarPanelLogo from "../assets/images/solar-panel.webp";
import urbanNapsLogo from "../assets/images/urban-naps.webp";
import shopEaseLogo from "../assets/images/shop-ease.webp";
import mediTrackLogo from "../assets/images/medi-track.webp";
import learnifyLogo from "../assets/images/learnify.webp";
import smartHomeLogo from "../assets/images/smart-home.webp";
import loveAiLogo from "../assets/images/love-ai.webp";
import {
  FaMusic,
  FaBicycle,
  FaHiking,
  FaPlane,
  FaCode,
  FaBaseballBall,
} from "react-icons/fa";

export const projects = [
  {
    title: "VisiLean",
    logo: visileanLogo,
    technologies: [
      "React.js",
      "Redux",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "MUI",
      "SASS/SCSS",
      "Framer Motion",
    ],
    description:
      "VisiLean is a cloud-based construction project management platform integrating Lean principles with BIM for real-time 4D visualization and enhanced collaboration.",
  },
  {
    title: "NFL Fantasy Gaming",
    logo: nflLogo,
    technologies: [
      "React.js",
      "Redux",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind",
      "Framer Motion",
    ],
    description:
      "A football fantasy gaming platform where users can create and manage fantasy teams with real-time updates and interactive animations.",
  },
  {
    title: "Profit & Loss Dashboard",
    logo: celebalLogo,
    technologies: [
      "React.js",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind",
    ],
    description:
      "A web app that provides a comprehensive financial overview, including profit, loss, and expenditures.",
  },
  {
    title: "Crack Detection in Solar Panels",
    logo: solarPanelLogo,
    technologies: [
      "React.js",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind",
    ],
    description:
      "A React-based app that detects cracks in solar panels, allowing users to upload images, view defects, and analyze them in detail.",
  },
  {
    title: "Urban Naps - Pod Booking",
    logo: urbanNapsLogo,
    technologies: [
      "React.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Framer Motion",
      "CSS3",
      "HTML5",
      "PWA",
    ],
    description:
      "A Progressive Web App (PWA) for booking sleep pods at Urban Naps. Designed with a seamless UX for users to book pods, check availability, and make online payments.",
  },
  {
    title: "ShopEase - E-commerce Platform",
    logo: shopEaseLogo,
    technologies: ["React.js", "Redux", "TypeScript", "Tailwind CSS"],
    description:
      "A scalable e-commerce platform with real-time inventory, secure payments, and personalized recommendations.",
  },
  {
    title: "MediTrack - Healthcare Portal",
    logo: mediTrackLogo,
    technologies: ["React.js", "TypeScript", "Next.js", "Chakra UI", "GraphQL"],
    description:
      "A healthcare portal for patients and doctors to manage appointments, prescriptions, and health records securely.",
  },
  {
    title: "Learnify - EdTech LMS",
    logo: learnifyLogo,
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    description:
      "A modern Learning Management System (LMS) for online courses, quizzes, and student progress tracking.",
  },
  {
    title: "SmartHome IoT Dashboard",
    logo: smartHomeLogo,
    technologies: ["React.js", "TypeScript", "Socket.io", "Tailwind CSS"],
    description:
      "A real-time dashboard for monitoring and controlling smart home devices, energy usage, and automation routines.",
  },
  {
    title: "Love AI - Dating App",
    logo: loveAiLogo,
    technologies: [
      "React.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind",
      "Framer Motion",
      "matter-js",
      "socket.io",
    ],
    description:
      "A modern dating app that uses AI to match users based on interests, behavior, and preferences.",
  },
];

export const hobbies = [
  { name: "Coding & Development", icon: <FaCode /> },
  { name: "Dancing", icon: <FaMusic /> },
  { name: "Cycling", icon: <FaBicycle /> },
  { name: "Hiking", icon: <FaHiking /> },
  { name: "Traveling", icon: <FaPlane /> },
  { name: "Cricket Enthusiast", icon: <FaBaseballBall /> },
];
