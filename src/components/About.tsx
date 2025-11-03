import { motion } from "framer-motion";
import Dag from "./Dag";

export default function About() {
  return (
    <section id="about" className="about">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="about__heading"
      >
        <span className="about__number">01.</span> About Me
      </motion.h2>

      {/* Bio */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="about__bio"
      >
        I’m a DevOps-focused engineer passionate about automation,
        cloud-native infrastructure, and AI-powered dashboards. My journey has
        been hands-on, starting from my undergrad at USF to multiple internships
        across development, reliability, and DevOps engineering.
      </motion.p>

      {/* DAG Visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="about__dag"
      >
        <Dag />
      </motion.div>
    </section>
  );
}
