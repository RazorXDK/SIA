import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

interface CategoryItem {
  title: string
  links: { text: string; url: string }[]
}

interface CommunityLink {
  title: string
  subtitle: string
  url: string
  icon: string
}

@Component({
  selector: "app-welcome-dashboard",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class WelcomeDashboardComponent {
  pageTitle = "Welcome to Pentaho Data Integration"

  categories: CategoryItem[] = [
    {
      title: "WORK",
      links: [
        { text: "Open files", url: "#" },
        { text: "New transformation", url: "#" },
        { text: "New job", url: "#" },
      ],
    },
    {
      title: "LEARN",
      links: [
        { text: "Documentation", url: "#" },
        { text: "Watch tutorials", url: "#" },
        { text: "Release notes", url: "#" },
      ],
    },
    {
      title: "EXTEND",
      links: [
        { text: "Marketplace", url: "#" },
        { text: "Build plugins", url: "#" },
      ],
    },
    {
      title: "DISCOVER",
      links: [
        { text: "Pentaho News", url: "#" },
        { text: "Pentaho Roadmap", url: "#" },
        { text: "Events & Webcasts", url: "#" },
      ],
    },
  ]

  communityLinks: CommunityLink[] = [
    {
      title: "Community",
      subtitle: "Join the discussion",
      url: "#",
      icon: "users",
    },
    {
      title: "Pentaho Forums",
      subtitle: "Join the discussion",
      url: "#",
      icon: "comments",
    },
    {
      title: "hitachivantara.com",
      subtitle: "Visit us",
      url: "#",
      icon: "globe",
    },
  ]

  getCategoryIcon(title: string): string {
    switch (title) {
      case "WORK":
        return "folder"
      case "LEARN":
        return "lightbulb"
      case "EXTEND":
        return "th-large"
      case "DISCOVER":
        return "binoculars"
      default:
        return ""
    }
  }
}
