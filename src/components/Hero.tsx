import { hero, links } from "../data";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import "../styles/_Hero.css";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      {/* Availability badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="hero__availability"
      >
        <span className="hero__dot" />
        <span>Open to Full-Time Roles • Graduating May 2026</span>
      </motion.div>

      {/* Terminal-like intro */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="hero__prompt"
      >
        <span className="hero__user">ayush@softwareDeveloper</span>:~$ whoami
      </motion.p>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="hero__name"
      >
        {hero.name}
      </motion.h1>

      {/* Typing animation for roles */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="hero__roles"
      >
        <ReactTyped
          strings={[
            "DevOps SWE Intern @ CCC",
            "Ex-SRE Intern @ VSP Vision",
            "Ex-SDE Intern @ GRN"
          ]}
          typeSpeed={60}
          backSpeed={30}
          backDelay={1500}
          loop
          showCursor
          cursorChar="|"
        />
      </motion.h2>

      {/* Sub description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="hero__desc"
      >
        Architecting cloud-native infrastructure, automating pipelines, and
        building reliable platforms that scale from zero to millions of users.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="hero__actions"
      >
        <a href="#projects" className="hero__btn hero__btn--primary">
          Explore My Work
        </a>
        <a href={`mailto:${links.email}`} className="hero__btn hero__btn--outline">
          Get in Touch
        </a>
      </motion.div>
    </section>
  );
}
