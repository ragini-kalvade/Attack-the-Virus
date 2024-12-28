import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { QuizScreenComponent } from './components/quiz-screen/quiz-screen.component';
import { AvatarCarouselComponent } from './components/avatar-carousel/avatar-carousel.component';
import { VirusBreakerGameComponent } from './components/virus-breaker-game/virus-breaker-game.component';
import { MapPageComponent } from './components/map-page/map-page.component';
import { MoreGamesComponent } from './components/more-games/more-games.component';
import { VirusSweeperComponent } from './components/virus-sweeper/virus-sweeper.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { InfoCentreComponent } from './components/info-centre/info-centre.component';
import { VirusSimulatorComponent } from './components/virus-simulator/virus-simulator.component';

export const routes: Routes = [
    {path : 'login' , component: LoginPageComponent},
    {path : 'quiz' , component: QuizScreenComponent},
    {path : 'avatar' , component: AvatarCarouselComponent},
    {path : 'virus-breaker' , component: VirusBreakerGameComponent},
    {path : 'virus-sweeper' , component: VirusSweeperComponent},
    {path : 'virus-simulator' , component: VirusSimulatorComponent},
    {path : 'map' , component: MapPageComponent},
    {path : 'more-games' , component: MoreGamesComponent},
    {path : 'leaderboard' , component: LeaderboardComponent},
    {path : 'home', component: HomepageComponent },
    {path : '', component: HomepageComponent },
    {path : 'info', component: InfoCentreComponent },
]

