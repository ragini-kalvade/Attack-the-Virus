import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ChatbotComponent } from '../../chatbot/chatbot.component';


@Component({
  selector: 'app-info-card-slideshow',
  standalone: true,
  imports: [CommonModule, ChatbotComponent],
  templateUrl: './info-card-slideshow.component.html',
  styleUrls: ['./info-card-slideshow.component.css']
})

export class InfoCardSlideshowComponent {
  currentIndex = 0;
  isAnimating = false;
  isModalOpen = false; 

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }


  menuItems = [
    {
      icon: '🦠',
      title: 'Virus Protection',
      description: 'Virus Protection in Medicine refers to strategies and practices aimed at preventing the spread and impact of viral infections on human health. This includes vaccination programs, antiviral medications, and public health measures such as hygiene practices, quarantines, and social distancing during outbreaks. Vaccines are one of the most effective tools in virus protection, offering immunity against specific viruses by stimulating the body\'s immune system. Antiviral drugs, when available, can help reduce the severity or duration of viral infections. Additionally, medical professionals emphasize preventive measures like hand washing, mask-wearing, and avoiding contact with infected individuals to minimize the risk of transmission. Effective virus protection is crucial in controlling the spread of diseases, reducing morbidity and mortality, and protecting vulnerable populations.',
    },
    {
      icon: '💉',
      title: 'Vaccination Insights',
      description: 'Vaccination Insights highlight the significant role vaccines play in preventing infectious diseases and improving global health. Over the years, vaccines have successfully controlled and even eradicated diseases like smallpox and polio. Recent advancements, such as mRNA vaccine technology, have revolutionized vaccine development, enabling quicker production and broader protection against emerging diseases like COVID-19. Insights into vaccine efficacy, safety, and public trust underscore the importance of transparent communication and education to combat misinformation. Moreover, the emergence of variant strains has led to the development of booster shots to ensure continued immunity. Global vaccination programs aim to achieve herd immunity and reduce disease burden, though challenges such as vaccine accessibility and hesitancy remain, particularly in low-income areas. Ongoing research is essential for adapting vaccines to evolving pathogens and improving delivery methods, ultimately ensuring that vaccines remain a key tool in preventing illness and saving lives worldwide.',
    },
    {
      icon: '🧼',
      title: 'Hygiene Best Practices',
      description: 'Hygiene Best Practices are essential for preventing the spread of infections and maintaining overall health. Key practices include frequent handwashing with soap and water for at least 20 seconds, especially after using the restroom or before eating. Using hand sanitizer with at least 60% alcohol is a good alternative when soap and water are unavailable. Covering coughs and sneezes with a tissue or elbow, avoiding touching the face, and cleaning surfaces regularly can further reduce the risk of spreading germs. Additionally, maintaining good oral hygiene, keeping personal items clean, and practicing proper food hygiene are vital for overall well-being.',
    },
    {
      icon: '🌡️',
      title: 'Early Symptoms',
      description: 'Early symptoms of many viral infections often include fever, fatigue, body aches, and headache. Respiratory symptoms like cough, sore throat, or congestion can also appear. Gastrointestinal symptoms such as nausea, vomiting, or diarrhea may occur with some infections. \'s important to monitor these symptoms closely and seek medical advice, especially if they worsen or persist.',
      color: '#5c1d44'
    },
    {
      icon: '🏥',
      title: 'Medical Guidance',
      description: 'Medical Guidance involves expert recommendations on preventing, diagnosing, and treating health conditions. It includes advice on vaccination, hygiene practices, and lifestyle changes to reduce disease risks. For diagnosis, it encourages recognizing symptoms early and consulting healthcare providers for accurate tests and treatments. Treatment guidance covers prescribed medications, therapies, and interventions tailored to the individual’s needs. In emergencies, medical guidance helps identify when immediate care is necessary. Additionally, it includes mental health support, offering strategies for managing stress and mental conditions. Overall, medical guidance aims to empower individuals with the knowledge to maintain health and seek appropriate care when needed.',
      color: '#7d2c58'
    }
  ];

  ngOnInit(): void {
    
  }

  isChatbotOpen = false;

  openChatbot() {
    this.isChatbotOpen = true;
  }

  closeChatbot() {
    this.isChatbotOpen = false;
  }
  
  get currentSlide() {
    return this.menuItems[this.currentIndex];
  }

  next() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.currentIndex = (this.currentIndex + 1) % this.menuItems.length;
      setTimeout(() => this.isAnimating = false, 500);
    }
  }

  prev() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.currentIndex = (this.currentIndex - 1 + this.menuItems.length) % this.menuItems.length;
      setTimeout(() => this.isAnimating = false, 500);
    }
  }

  goToSlide(index: number) {
    if (!this.isAnimating && index !== this.currentIndex) {
      this.isAnimating = true;
      this.currentIndex = index;
      setTimeout(() => this.isAnimating = false, 500);
    }
  }

}


export const slideAnimation = trigger('slideAnimation', [
  transition(':increment', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
  ]),
  transition(':decrement', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
  ])
]);