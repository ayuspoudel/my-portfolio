import { links } from "../data";
import "../styles/_Sidebar.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineDocumentDownload } from "react-icons/hi";

export default function SidebarSocial() {
  return (
    <div className="sidebar sidebar--left">
      <ul>
        {/* GitHub */}
        <li>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar__icon"
            aria-label="Go to my GitHub"
            data-tooltip="Go to my GitHub"
          >
            <FaGithub />
          </a>
        </li>

        {/* LinkedIn */}
        <li>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar__icon"
            aria-label="Go to my LinkedIn"
            data-tooltip="Go to my LinkedIn"
          >
            <FaLinkedin />
          </a>
        </li>

        {/* Resume Download */}
        <li>
          <a
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar__icon"
            aria-label="Download my Resume"
            data-tooltip="Download my Resume"
          >
            <HiOutlineDocumentDownload />
          </a>
        </li>
      </ul>
    </div>
  );
}
