import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Article {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  category: string;
  publishedDate: string;
  views: number;
  thumbnail: string;
  isNew: boolean;
  isTrending: boolean;
  isBookmarked: boolean;
  keywords?: string[];
}

@Component({
  selector: 'app-newarticles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newarticles.html',
  styleUrl: './newarticles.scss'
})
export class Newarticles implements OnInit {
  // Stats
  totalArticles = 0;
  todayArticles = 0;
  categoriesCount = 0;
  totalViews = 0;

  // Articles data
  articles: Article[] = [];
  filteredArticles: Article[] = [];

  // Filters
  showFilters = false;
  selectedCategory = '';
  selectedDateRange = 'all';
  selectedSort = 'newest';
  searchQuery = '';

  // Categories
  categories: string[] = [
    'Quantum Computing',
    'Artificial Intelligence',
    'Machine Learning',
    'Blockchain',
    'Cybersecurity',
    'Data Science',
    'Cloud Computing',
    'IoT',
    'Biotechnology',
    'Nanotechnology'
  ];

  // View mode
  viewMode: 'grid' | 'list' = 'grid';

  // Pagination
  currentPage = 1;
  itemsPerPage = 9;
  totalPages = 1;

  // Modal
  showModal = false;
  selectedArticle: Article | null = null;

  ngOnInit() {
    this.loadArticles();
    this.calculateStats();
    this.applyFilters();
  }

  loadArticles() {
    // Sample data - Replace with actual API call
    this.articles = [
      {
        id: '1',
        title: 'Quantum Entanglement in Machine Learning: A New Paradigm',
        authors: 'Dr. Sarah Chen, Prof. Michael Roberts',
        abstract: 'This groundbreaking research explores the application of quantum entanglement principles to enhance machine learning algorithms. Our findings demonstrate a 300% improvement in processing speed for complex neural networks while maintaining accuracy. The study opens new possibilities for quantum-enhanced AI systems.',
        category: 'Quantum Computing',
        publishedDate: 'Nov 02, 2025',
        views: 2547,
        thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
        isNew: true,
        isTrending: true,
        isBookmarked: false,
        keywords: ['Quantum Computing', 'Machine Learning', 'Neural Networks', 'AI']
      },
      {
        id: '2',
        title: 'Federated Learning for Privacy-Preserving Healthcare Analytics',
        authors: 'Dr. Emily Johnson, Prof. David Lee',
        abstract: 'We present a novel federated learning framework that enables collaborative medical research while maintaining patient privacy. The system has been successfully deployed across 50+ hospitals, processing over 1 million patient records without compromising data security.',
        category: 'Artificial Intelligence',
        publishedDate: 'Nov 01, 2025',
        views: 1892,
        thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
        isNew: true,
        isTrending: true,
        isBookmarked: false,
        keywords: ['Federated Learning', 'Healthcare', 'Privacy', 'Medical AI']
      },
      {
        id: '3',
        title: 'Blockchain-Based Supply Chain Transparency: Real-World Implementation',
        authors: 'Prof. Amanda White, Dr. Robert Garcia',
        abstract: 'This paper details the successful implementation of a blockchain-based supply chain management system across multiple industries. Our solution provides real-time tracking, reduces fraud by 85%, and improves efficiency by 40%.',
        category: 'Blockchain',
        publishedDate: 'Oct 31, 2025',
        views: 3421,
        thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
        isNew: true,
        isTrending: false,
        isBookmarked: true,
        keywords: ['Blockchain', 'Supply Chain', 'Transparency', 'Smart Contracts']
      },
      {
        id: '4',
        title: 'Zero-Trust Security Architecture for Modern Cloud Environments',
        authors: 'Dr. Kevin Martinez, Prof. Lisa Anderson',
        abstract: 'We introduce a comprehensive zero-trust security framework specifically designed for hybrid cloud deployments. The architecture has been tested in enterprise environments with 99.99% uptime and zero security breaches over 18 months.',
        category: 'Cybersecurity',
        publishedDate: 'Oct 30, 2025',
        views: 2156,
        thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
        isNew: false,
        isTrending: true,
        isBookmarked: false,
        keywords: ['Cybersecurity', 'Cloud', 'Zero Trust', 'Network Security']
      },
      {
        id: '5',
        title: 'Deep Reinforcement Learning for Autonomous Vehicle Navigation',
        authors: 'Prof. Daniel Kim, Dr. Jennifer Taylor',
        abstract: 'Our research presents a novel deep reinforcement learning approach for autonomous vehicle navigation in complex urban environments. The system achieves 98.7% success rate in simulation and has been successfully tested in real-world conditions.',
        category: 'Machine Learning',
        publishedDate: 'Oct 29, 2025',
        views: 4567,
        thumbnail: 'https://images.unsplash.com/photo-1617704548623-340376564e68?w=800&q=80',
        isNew: false,
        isTrending: true,
        isBookmarked: false,
        keywords: ['Reinforcement Learning', 'Autonomous Vehicles', 'Deep Learning', 'AI']
      },
      {
        id: '6',
        title: 'Edge Computing for Real-Time IoT Data Processing',
        authors: 'Dr. Michelle Clark, Prof. Thomas Wilson',
        abstract: 'This study explores edge computing architectures optimized for IoT applications requiring real-time data processing. Our framework reduces latency by 75% and bandwidth usage by 60% compared to traditional cloud-based solutions.',
        category: 'IoT',
        publishedDate: 'Oct 28, 2025',
        views: 1834,
        thumbnail: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80',
        isNew: false,
        isTrending: false,
        isBookmarked: false,
        keywords: ['Edge Computing', 'IoT', 'Real-time Processing', 'Cloud']
      },
      {
        id: '7',
        title: 'CRISPR-Cas9 Gene Editing: Advances in Precision Medicine',
        authors: 'Prof. Patricia Moore, Dr. Christopher Harris',
        abstract: 'We present breakthrough developments in CRISPR-Cas9 technology that enable unprecedented precision in gene editing. Clinical trials show promising results for treating genetic disorders with 95% success rates.',
        category: 'Biotechnology',
        publishedDate: 'Oct 27, 2025',
        views: 5234,
        thumbnail: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80',
        isNew: false,
        isTrending: true,
        isBookmarked: true,
        keywords: ['CRISPR', 'Gene Editing', 'Biotechnology', 'Precision Medicine']
      },
      {
        id: '8',
        title: 'Natural Language Processing for Multilingual Sentiment Analysis',
        authors: 'Dr. Andrew Turner, Prof. Nancy Young',
        abstract: 'Our research introduces a transformer-based NLP model capable of accurate sentiment analysis across 50+ languages. The model achieves state-of-the-art performance with 92% accuracy on diverse datasets.',
        category: 'Artificial Intelligence',
        publishedDate: 'Oct 26, 2025',
        views: 2987,
        thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
        isNew: false,
        isTrending: false,
        isBookmarked: false,
        keywords: ['NLP', 'Sentiment Analysis', 'Transformers', 'Multilingual AI']
      },
      {
        id: '9',
        title: 'Sustainable Data Centers: Green Computing Innovations',
        authors: 'Prof. Maria Rodriguez, Dr. James Thompson',
        abstract: 'This paper presents innovative cooling and power management technologies that reduce data center energy consumption by 50%. Our solutions have been implemented in multiple Fortune 500 companies with significant cost savings.',
        category: 'Cloud Computing',
        publishedDate: 'Oct 25, 2025',
        views: 1654,
        thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        isNew: false,
        isTrending: false,
        isBookmarked: false,
        keywords: ['Green Computing', 'Data Centers', 'Sustainability', 'Energy Efficiency']
      },
      {
        id: '10',
        title: 'Neuromorphic Computing: Brain-Inspired AI Hardware',
        authors: 'Dr. Richard Brown, Prof. Susan Davis',
        abstract: 'We introduce a new neuromorphic chip architecture that mimics biological neural networks. The chip demonstrates 100x energy efficiency compared to traditional GPUs while maintaining comparable performance.',
        category: 'Artificial Intelligence',
        publishedDate: 'Oct 24, 2025',
        views: 3876,
        thumbnail: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800&q=80',
        isNew: false,
        isTrending: true,
        isBookmarked: false,
        keywords: ['Neuromorphic Computing', 'AI Hardware', 'Neural Networks', 'Energy Efficiency']
      }
    ];
  }

  calculateStats() {
    this.totalArticles = this.articles.length;
    this.todayArticles = this.articles.filter(a => a.publishedDate.includes('Nov 02')).length;
    this.categoriesCount = new Set(this.articles.map(a => a.category)).size;
    this.totalViews = this.articles.reduce((sum, a) => sum + a.views, 0);
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  applyFilters() {
    let filtered = [...this.articles];

    // Category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(a => a.category === this.selectedCategory);
    }

    // Date range filter
    if (this.selectedDateRange !== 'all') {
      const now = new Date();
      filtered = filtered.filter(a => {
        const articleDate = new Date(a.publishedDate);
        const diffDays = Math.floor((now.getTime() - articleDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (this.selectedDateRange) {
          case 'today': return diffDays === 0;
          case 'week': return diffDays <= 7;
          case 'month': return diffDays <= 30;
          default: return true;
        }
      });
    }

    // Search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(query) ||
        a.authors.toLowerCase().includes(query) ||
        a.abstract.toLowerCase().includes(query) ||
        a.category.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (this.selectedSort) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime());
        break;
      case 'views':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    this.filteredArticles = filtered;
    this.totalPages = Math.ceil(this.filteredArticles.length / this.itemsPerPage);
    this.updatePagination();
  }

  clearFilters() {
    this.selectedCategory = '';
    this.selectedDateRange = 'all';
    this.selectedSort = 'newest';
    this.searchQuery = '';
    this.showFilters = false;
    this.applyFilters();
  }

  searchArticles() {
    this.applyFilters();
  }

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredArticles = this.filteredArticles.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyFilters();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    
    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1);
        for (let i = this.totalPages - 3; i <= this.totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push(this.currentPage - 1);
        pages.push(this.currentPage);
        pages.push(this.currentPage + 1);
        pages.push(this.totalPages);
      }
    }
    
    return pages;
  }

  viewArticle(article: Article) {
    this.selectedArticle = article;
    this.showModal = true;
  }

  downloadArticle(article: Article) {
    console.log('Downloading article:', article.title);
    // In real application, trigger actual download
    alert(`Downloading: ${article.title}`);
  }

  toggleBookmark(article: Article) {
    article.isBookmarked = !article.isBookmarked;
    // In real application, save to backend
  }

  refreshArticles() {
    this.loadArticles();
    this.calculateStats();
    this.applyFilters();
  }

  closeModal() {
    this.showModal = false;
    this.selectedArticle = null;
  }
}