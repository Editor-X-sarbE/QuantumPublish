import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

@Component({
  selector: 'app-oldarticles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './oldarticles.html',
  styleUrl: './oldarticles.scss'
})
export class Oldarticles implements OnInit {
  // All articles data
  allArticles: Article[] = [
    {
      id: 1,
      title: 'The Future of Web Development',
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development in 2025 and beyond.',
      category: 'Technology',
      date: 'Jan 15, 2025',
      readTime: '5 min read',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800'
    },
    {
      id: 2,
      title: 'Modern UI/UX Design Principles',
      excerpt: 'A comprehensive guide to creating intuitive and beautiful user interfaces that users love.',
      category: 'Design',
      date: 'Jan 10, 2025',
      readTime: '8 min read',
      imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800'
    },
    {
      id: 3,
      title: 'Scaling Your Startup Successfully',
      excerpt: 'Learn the essential strategies and tactics for scaling your startup from zero to millions of users.',
      category: 'Business',
      date: 'Jan 5, 2025',
      readTime: '10 min read',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    },
    {
      id: 4,
      title: 'AI and Machine Learning Trends',
      excerpt: 'Discover how artificial intelligence is transforming industries and creating new opportunities.',
      category: 'Technology',
      date: 'Dec 28, 2024',
      readTime: '7 min read',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'
    },
    {
      id: 5,
      title: 'The Art of Minimalist Design',
      excerpt: 'Understanding the power of simplicity and how less can truly be more in modern design.',
      category: 'Design',
      date: 'Dec 20, 2024',
      readTime: '6 min read',
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800'
    },
    {
      id: 6,
      title: 'Building High-Performance Teams',
      excerpt: 'Key insights into creating and maintaining teams that deliver exceptional results consistently.',
      category: 'Business',
      date: 'Dec 15, 2024',
      readTime: '9 min read',
      imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800'
    },
    {
      id: 7,
      title: 'Cloud Computing Best Practices',
      excerpt: 'Essential guidelines for leveraging cloud infrastructure effectively and securely.',
      category: 'Technology',
      date: 'Dec 10, 2024',
      readTime: '6 min read',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800'
    },
    {
      id: 8,
      title: 'Color Theory in Digital Design',
      excerpt: 'Master the art of color selection and application in your digital design projects.',
      category: 'Design',
      date: 'Dec 5, 2024',
      readTime: '7 min read',
      imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800'
    },
    {
      id: 9,
      title: 'Marketing Strategies for 2025',
      excerpt: 'Innovative marketing approaches to reach and engage your target audience effectively.',
      category: 'Business',
      date: 'Nov 30, 2024',
      readTime: '8 min read',
      imageUrl: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800'
    },
    {
      id: 10,
      title: 'Cybersecurity Essentials',
      excerpt: 'Protecting your digital assets in an increasingly connected world.',
      category: 'Technology',
      date: 'Nov 25, 2024',
      readTime: '9 min read',
      imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800'
    }
  ];

  // Filtered and displayed articles
  filteredArticles: Article[] = [];
  displayedArticles: Article[] = [];

  // Filter and search state
  categories: string[] = ['All', 'Technology', 'Design', 'Business'];
  selectedCategory: string = 'All';
  searchQuery: string = '';

  // Pagination state
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;
  pageNumbers: number[] = [];

  ngOnInit(): void {
    this.applyFilters();
  }

  // Filter articles based on category and search query
  applyFilters(): void {
    this.filteredArticles = this.allArticles.filter(article => {
      const matchesCategory = this.selectedCategory === 'All' || 
                             article.category === this.selectedCategory;
      const matchesSearch = this.searchQuery === '' || 
                           article.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    this.totalPages = Math.ceil(this.filteredArticles.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePageNumbers();
    this.updateDisplayedArticles();
  }

  // Update displayed articles based on current page
  updateDisplayedArticles(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedArticles = this.filteredArticles.slice(startIndex, endIndex);
  }

  // Update page numbers for pagination
  updatePageNumbers(): void {
    this.pageNumbers = [];
    
    if (this.totalPages <= 7) {
      // Show all pages if total pages <= 7
      for (let i = 1; i <= this.totalPages; i++) {
        this.pageNumbers.push(i);
      }
    } else {
      // Show first page, current page +/- 1, and last page
      this.pageNumbers.push(1);
      
      if (this.currentPage > 3) {
        this.pageNumbers.push(-1); // -1 represents ellipsis
      }
      
      for (let i = Math.max(2, this.currentPage - 1); i <= Math.min(this.totalPages - 1, this.currentPage + 1); i++) {
        this.pageNumbers.push(i);
      }
      
      if (this.currentPage < this.totalPages - 2) {
        this.pageNumbers.push(-1); // -1 represents ellipsis
      }
      
      this.pageNumbers.push(this.totalPages);
    }
  }

  // Handle category filter change
  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  // Handle search input
  onSearchChange(): void {
    this.applyFilters();
  }

  // Navigate to specific page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePageNumbers();
      this.updateDisplayedArticles();
      this.scrollToTop();
    }
  }

  // Navigate to previous page
  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  // Navigate to next page
  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  // Check if category is selected
  isCategoryActive(category: string): boolean {
    return this.selectedCategory === category;
  }

  // Check if page is current
  isPageActive(page: number): boolean {
    return this.currentPage === page;
  }

  // Check if it's an ellipsis
  isEllipsis(page: number): boolean {
    return page === -1;
  }

  // Handle article click
  onArticleClick(article: Article): void {
    console.log('Article clicked:', article);
    // Implement navigation to article detail page
    // this.router.navigate(['/articles', article.id]);
  }

  // Scroll to top of page
  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}