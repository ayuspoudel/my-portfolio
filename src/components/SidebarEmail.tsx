import { links } from "../data";
import "../styles/_Sidebar.css";

export default function SidebarEmail() {
  return (
    <div className="sidebar sidebar--right">
      <a 
        href={`mailto:${links.email}`} 
        className="email" 
        aria-label="Email me"
        data-tooltip="Email me"
      >
        {links.email}
      </a>
    </div>
  );
}
