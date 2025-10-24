import { PortfolioNavigation } from "@/components/portfolio-navigation"
import { PortfolioHero } from "@/components/portfolio-hero"
import { PortfolioProjects } from "@/components/portfolio-projects"
import { PortfolioContact } from "@/components/portfolio-contact"

export default function Home() {
  return (
    <main className="min-h-screen">
      <PortfolioNavigation />
      <div id="home">
        <PortfolioHero />
      </div>
      <PortfolioProjects />
      <PortfolioContact />
    </main>
  )
}
