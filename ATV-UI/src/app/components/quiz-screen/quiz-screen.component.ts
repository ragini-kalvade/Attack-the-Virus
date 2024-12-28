import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { AvatarService } from '../avatar-carousel/avatar.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LeaderboardService } from '../leaderboard/leaderboard.service';
import { PreloaderComponent } from "../preloader/preloader.component";

interface Question {
  text: string;
  options: string[];
  answer: number;
}

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-quiz-screen',
  templateUrl: './quiz-screen.component.html',
  imports: [CommonModule, FormsModule, PreloaderComponent],
  standalone: true,
  styleUrls: ['./quiz-screen.component.css']
})
export class QuizScreenComponent implements OnInit, OnDestroy {
  currentAvatarIndex: number = 0;

  name = '';
  isModalOpen: boolean = true;
  isNameValid: boolean = false;
  constructor(private avatarService: AvatarService, private router: Router, public leaderboardService: LeaderboardService) { }

  navigationItems: NavItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Find Your Clinic', route: '/map' },
    { label: 'Avatar', route: '/avatar' },
    { label: 'More Games', route: '/more-games' },
    { label: 'Ask VacciWiz', route: '/info' }
  ];

  currentQuestionIndex: number = 0;
  questions: Question[] = [
    {
      text: 'What is the first vaccine discovered?',
      options: ['Smallpox', 'Rabies', 'Polio', 'Tuberculosis'],
      answer: 0
    },
    {
      text: 'A vaccine requires a dosage of 0.5 mL per 10 kg of body weight. If a patient weighs 60 kg, how much vaccine should they receive?',
      options: ['3mL', '6mL', '9mL', '12mL'],
      answer: 0
    },
    {
      text: 'Which virus is commonly associated with the flu?',
      options: ['HIV', 'Influenza', 'SARS-CoV-2', 'Ebola'],
      answer: 1
    },
    {
      text: 'Which vaccine was the first to be widely used for preventing smallpox?',
      options: ['BCG', 'MMR', 'Smallpox vaccine', 'Polio vaccine'],
      answer: 2
    },
    {
      text: 'If a virus spreads to 3 new people every day, starting with 1 infected person, how many people will be infected after 7 days (assuming no one recovers)?',
      options: ['21', '22', '24', '28'],
      answer: 1
    },
    {
      text: 'The BCG vaccine is used to protect against which disease?',
      options: ['Tetanus', 'Tuberculosis', 'Hepatitis B', 'Chickenpox'],
      answer: 1
    },
    {
      text: 'To achieve herd immunity, 80% of a population must be vaccinated. If the population is 500,000 people, how many need to be vaccinated?',
      options: ['100,000', '200,000', '300,000', '400,000'],
      answer: 3
    },
    {
      text: 'A vaccine reduces infection rates by 70%. If 1,000 people are exposed to the virus, how many are likely to get infected after vaccination?',
      options: ['700', '500', '300', '100'],
      answer: 2
    },
    {
      text: 'Which vaccine is given to prevent polio?',
      options: ['Hepatitis B vaccine', 'IPV', 'BCG', 'DTP'],
      answer: 1
    },
    {
      text: 'The MMR vaccine protects against which three diseases?',
      options: ['Measles, Mumps, Rubella', 'Measles, Malaria, Rabies', 'Measles, Mumps, Rhinovirus', 'Malaria, Mumps, Rabies'],
      answer: 0
    },
    {
      text: 'The probability of a virus mutating during replication is 1%. If the virus replicates 200 times, how many mutations are expected?',
      options: ['7', '6', '3', '2'],
      answer: 3
    },
    {
      text: 'Which vaccine is given to prevent cervical cancer caused by HPV?',
      options: ['Flu vaccine', 'HPV vaccine', 'Rotavirus vaccine', 'Chickenpox vaccine'],
      answer: 1
    },
    {
      text: 'A vaccine generates 500 antibodies per hour in a person. How many antibodies will be generated after 8 hours?',
      options: ['3200', '4000', '4800', '5600'],
      answer: 1
    },
    {
      text: 'The Hepatitis B vaccine is recommended for which group?',
      options: ['Infants at birth', 'Only adults', 'Only the elderly', 'Pregnant women only'],
      answer: 0
    },
    {
      text: 'A treatment reduces the viral load by 50% every hour. If the initial viral load is 1,000 particles, what will it be after 3 hours?',
      options: ['500', '250', '125', '65'],
      answer: 2
    },
    {
      text: 'Which virus is the target of the rabies vaccine?',
      options: ['Ebola virus', 'Influenza virus', 'Rabies virus', 'Zika virus'],
      answer: 2
    },
    {
      text: 'The rotavirus vaccine is primarily given to prevent infections that affect which organ?',
      options: ['Lungs', 'Liver', 'Heart', 'Stomach'],
      answer: 3
    },
    {
      text: 'Which vaccine helps prevent tetanus, diphtheria, and pertussis?',
      options: ['Tdap', 'HPV', 'BCG', 'MMR'],
      answer: 0
    },
    {
      text: 'A vaccine has an effectiveness of 90%. If 1,000 people are vaccinated, how many of them are effectively protected?',
      options: ['100', '300', '500', '900'],
      answer: 3
    },
    {
      text: 'Which vaccine was developed during the COVID-19 pandemic?',
      options: ['Influenza vaccine', 'Pfizer-BioNTech', 'HPV vaccine', 'Hepatitis B vaccine'],
      answer: 1
    }
  ];

  currentQuestion: Question = this.questions[0];
  answered = false;
  feedback: string = '';
  quizCompleted = false;
  score: number = 0;

  timeLeft: number = 15;
  timerSubscription?: Subscription;
  health: number = 100;

  showModal = false;
  public fact: string = '';

  ngOnInit() {
    this.avatarService.selectedAvatar$.subscribe((index: number) => {
      this.currentAvatarIndex = index;
    });
  }

  startGame(): void {
    this.isModalOpen = false;
    console.log("name is " + this.name);
    this.startTimer();
  }

  onNameInput(): void {
    this.isNameValid = this.name.trim().length > 0;
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.timeLeft = 15;
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.answerQuestion(-1); // -1 indicates time's up
      }
    });
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  answerQuestion(selectedIndex: number) {
    this.stopTimer();
    this.answered = true;
    if (selectedIndex === this.currentQuestion.answer) {
      this.feedback = 'Correct!';
      this.score++;
    } else if (selectedIndex !== this.currentQuestion.answer && selectedIndex !== -1) {
      this.feedback = 'Incorrect!';
      this.health -= 25;
    }
    else if (selectedIndex === -1) {
      this.feedback = 'Time\'s up!';
      this.health -= 25;
    }
    if (this.health <= 0) {
      this.quizCompleted = true;
      this.sendScores();
    }
    this.fact = this.getFactForQuestion(this.currentQuestionIndex);
    this.showModal = true;
  }

  getFactForQuestion(questionIndex: number): string {
    const facts = [
      "The world's first vaccine is the smallpox vaccine. Dr Edward Jenner created the world's first successful vaccine. He found out that people infected with cowpox were immune to smallpox, and used that information to create the smallpox vaccine.",
      "",
      "The influenza virus is associated with the flu, and it is a master of disguise! Each year, it changes just enough to evade our immune systems, which is why getting a yearly flu vaccine is recommended.",
      "The smallpox vaccine is used to prevent smallpox. The vaccine didn’t require injections when it was first administered! Early vaccines were given through a method called scarification, where a small scratch was made on the skin, and the vaccine was applied to the scratch. ",
      "",
      "The BCG vaccine (Bacille Calmette-Guérin) protects against tuberculosis. It is over 100 years old and is still the only vaccine available for TB! It was developed in 1921 by French scientists Albert Calmette and Camille Guérin using a weakened strain of the TB bacteria. ",
      "",
      "",
      "The IPV vaccine is given to prevent polio. When Dr. Jonas Salk developed the first successful polio vaccine in 1955, he famously chose not to patent it because he wanted the vaccine to be widely accessible and affordable, helping to stop polio without profit as a barrier. This decision has been estimated to have saved countless lives and is considered one of the biggest humanitarian gestures in medical history. ",
      "The MMR vaccine protects against Measles, Mumps and Rubella. A cool fact? Receiving the MMR vaccine doesn’t just protect against these three diseases! Studies suggest it may also boost the immune system in a way that helps protect against other infections.",
      "",
      "The HPV vaccine not only protects against the human papillomavirus, which can cause cervical, throat, and other cancers, but it was also the first vaccine specifically designed to prevent a type of cancer. ",
      "",
      "The Hepatitis B vaccine is recommended for infants at birth. It is so effective that it was the first vaccine developed using recombinant DNA technology. It’s also one of the first vaccines to be included in infant vaccination schedules worldwide, offering protection against a virus that can cause chronic liver disease and liver cancer.",
      "",
      "The rabies vaccine helps prevent rabies. The rabies virus attacks the nervous system, causing symptoms like aggression, confusion, and hydrophobia (fear of water), which is why the disease has long been associated with wild, rabid animals like dogs and bats. Despite being one of the deadliest diseases, rabies is entirely preventable through vaccination!",
      "The rotavirus is a virus that affects the stomach. Before the vaccine, rotavirus was responsible for millions of cases of severe diarrhea worldwide, leading to hundreds of thousands of hospitalizations each year. The vaccine has helped save lives and drastically reduce the burden on healthcare systems. In fact, it is estimated that since its introduction, the vaccine has prevented over 200,000 deaths globally!",
      "The Tdap vaccine helps prevent tetanus, diphtheria, and pertussis. Tetanus, often called lockjaw, is caused by a toxin produced by the bacterium Clostridium tetani, which enters the body through cuts or puncture wounds. What's surprising is that the bacteria are found everywhere—in soil, dust, and even animal manure! ",
      "",
      "The Pfizer-BioNTech vaccine was developed during the COVID-19 pandemic. Did you know that COVID-19 was the first pandemic in history to be officially recognized as a public health emergency of international concern by the World Health Organization (WHO) on January 30, 2020, before the virus even became widespread in many countries?!"
    ];
    return facts[questionIndex];
  }

  closeModal(): void {
    this.showModal = false;
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length && this.health > 0) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.answered = false;
      this.feedback = '';
      this.startTimer();
    } else {
      this.quizCompleted = true;
      this.sendScores();
    }
  }

  restartQuiz() {
    this.quizCompleted = false;
    this.currentQuestionIndex = 0;
    this.currentQuestion = this.questions[0];
    this.answered = false;
    this.feedback = '';
    this.score = 0;
    this.health = 100;
    this.startTimer();
  }

  onNavHover(element: HTMLElement) {
    gsap.to(element, {
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  onNavLeave(element: HTMLElement) {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  onNavClick(route: string): void {
    this.router.navigate([route]);
  }

  navigateToHome() {
    this.router.navigate(['/home'])
  }

  sendScores() {
    this.leaderboardService
      .addNewScore(this.name, this.score)
      .subscribe({
        next: (response: any) => {
          console.log('Score submitted successfully:', response);
        },
        error: (error: any) => {
          console.error('Error submitting score:', error);
        },
      });
  }

  navigateToLeaderboard() {
    this.router.navigate(['/leaderboard']);
  }
}
