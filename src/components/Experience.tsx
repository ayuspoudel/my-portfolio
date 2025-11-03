import { useState } from "react";
import { experiences } from "../data/Experience";

export default function Experience() {
  const [activeId, setActiveId] = useState(experiences[0].id);

  const activeExp = experiences.find((e) => e.id === activeId)!;

  return (
    <section id="experience" className="experience">
      <h2 className="experience__heading">
        <span className="experience__number">02.</span> Where I've Worked
      </h2>

      <div className="experience__container">
        {/* Left column (companies) */}
        <div className="experience__companies">
          {experiences.map((exp) => (
            <button
              key={exp.id}
              className={`experience__company ${
                exp.id === activeId ? "active" : ""
              }`}
              onClick={() => setActiveId(exp.id)}
            >
              {exp.company}
            </button>
          ))}
        </div>

        {/* Right column (job details) */}
        <div className="experience__details">
          <h3 className="experience__role">
            {activeExp.role}{" "}
            <span className="experience__at">@ {activeExp.company}</span>
          </h3>
          <p className="experience__period">{activeExp.period}</p>

          <ul className="experience__bullets">
            {activeExp.bullets.map((b, i) => (
              <li key={i}>
                <span className="experience__bullet-icon">▸</span> {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
