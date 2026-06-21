import { Component, OnDestroy, OnInit, signal } from '@angular/core';

type Metric = {
  value: string;
  label: string;
};

type Category = {
  name: string;
  description: string;
  accent: string;
};

type Collection = {
  title: string;
  eyebrow: string;
  description: string;
  surface: string;
};

type Highlight = {
  title: string;
  detail: string;
};

type HeroSlide = {
  image: string;
  imageAlt: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  private carouselTimerId?: ReturnType<typeof setInterval>;

  protected readonly heroSlides: HeroSlide[] = [
    {
      image: '/home-carousel/ca8c9862712244f8b951915b22d9594b.jpeg',
      imageAlt: 'Technician using cordless tools in a workshop scene'
    },
    {
      image: '/home-carousel/5f420230b9c64d6f8ec616257e16e73f.jpg',
      imageAlt: 'Jadever branded work smarter promotional banner'
    },
    {
      image: '/home-carousel/c60eba80b32046d6b7030c7d756c1763.jpg',
      imageAlt: 'Worker using green and yellow cordless tools on a project'
    }
  ];

  protected readonly metrics: Metric[] = [
    { value: '120+', label: 'featured products' },
    { value: '24', label: 'campaign-ready sections' },
    { value: '4.9/5', label: 'brand perception score' },
    { value: '100%', label: 'static Angular build' }
  ];

  protected readonly categories: Category[] = [
    {
      name: 'Hand tools',
      description: 'Compact essentials for trade professionals and everyday projects.',
      accent: 'sun'
    },
    {
      name: 'Power tools',
      description: 'High-impact tools with clean product storytelling and bold visuals.',
      accent: 'steel'
    },
    {
      name: 'Accessories',
      description: 'Supporting items, add-ons, and cross-sell opportunities in a tight layout.',
      accent: 'ember'
    },
    {
      name: 'Cordless lineup',
      description: 'Promote battery systems, kits, and platform-based merchandising.',
      accent: 'forest'
    }
  ];

  protected readonly collections: Collection[] = [
    {
      eyebrow: 'Best seller',
      title: 'Workspace essentials',
      description:
        'A sharp editorial block for practical products that need both utility and visual polish.',
      surface:
        'linear-gradient(160deg, rgba(206, 146, 72, 0.8), rgba(59, 38, 20, 0.88))'
    },
    {
      eyebrow: 'New arrival',
      title: 'Urban lifestyle edit',
      description:
        'Use this for seasonal campaigns, lifestyle merchandise, or premium brand collections.',
      surface:
        'linear-gradient(160deg, rgba(63, 93, 95, 0.82), rgba(19, 30, 31, 0.92))'
    },
    {
      eyebrow: 'Featured range',
      title: 'Trade-ready systems',
      description:
        'A structured card that helps visitors quickly understand the breadth of your offering.',
      surface:
        'linear-gradient(160deg, rgba(86, 74, 48, 0.82), rgba(21, 22, 18, 0.92))'
    }
  ];

  protected readonly highlights: Highlight[] = [
    { title: 'Category-first navigation', detail: 'Guide shoppers through clear groupings and strong hierarchy.' },
    { title: 'Polished editorial blocks', detail: 'Mix promotional content with product-focused storytelling.' },
    { title: 'Responsive by design', detail: 'A layout that adapts from desktop showcase to mobile browsing.' }
  ];

  protected readonly trustItems = ['Fast browsing', 'Static-friendly', 'Brand-led layout', 'Lead capture ready'];

  protected readonly currentSlide = signal(0);
  protected readonly mobileMenuOpen = signal(false);

  protected get activeSlide() {
    return this.heroSlides[this.currentSlide()];
  }

  protected slideState(index: number): 'active' | 'prev' | 'next' | 'hidden' {
    const current = this.currentSlide();
    const total = this.heroSlides.length;

    if (index === current) {
      return 'active';
    }

    if (index === (current - 1 + total) % total) {
      return 'prev';
    }

    if (index === (current + 1) % total) {
      return 'next';
    }

    return 'hidden';
  }

  ngOnInit(): void {
    this.carouselTimerId = setInterval(() => {
      this.nextSlide();
    }, 5500);
  }

  ngOnDestroy(): void {
    if (this.carouselTimerId) {
      clearInterval(this.carouselTimerId);
    }
  }

  protected nextSlide(): void {
    this.currentSlide.update((current) => (current + 1) % this.heroSlides.length);
  }

  protected previousSlide(): void {
    this.currentSlide.update((current) => (current - 1 + this.heroSlides.length) % this.heroSlides.length);
  }

  protected setSlide(index: number): void {
    this.currentSlide.set(index);
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((value) => !value);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  protected handleSlideClick(event: MouseEvent): void {
    const target = event.target as HTMLImageElement;
    const rect = target.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const midpoint = rect.width / 2;

    if (clickX > midpoint) {
      this.nextSlide();
    } else {
      this.previousSlide();
    }
  }
}
