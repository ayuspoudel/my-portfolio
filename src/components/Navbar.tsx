import "../styles/_Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__links">
        <li><a href="#about"><span>01.</span> About</a></li>
        <li><a href="#experience"><span>02.</span> Experience</a></li>
        <li><a href="#projects"><span>03.</span> Projects</a></li>
        <li><a href="#contact"><span>04.</span> Contact</a></li>
      </ul>
      <a href="/resume.pdf" className="navbar__resume">Resume</a>
    </nav>
  );
}
