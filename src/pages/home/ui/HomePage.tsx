import { Container } from "../../../shared/ui";
import { TopBar, SearchBarRow, HeroWeatherCard, ForecastCard, FavoritesSection } from "../../../wigeets";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Container>
        <TopBar />
        <SearchBarRow />
        <HeroWeatherCard />
        <ForecastCard />
        <FavoritesSection />
      </Container>
    </div>
  );
}