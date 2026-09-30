import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import { testimonialsKhmer } from '../data/translations';

export default function Testimonials({ testimonials }) {
  const { language, t } = useLanguage();
  const isKhmer = language === 'km';
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 3 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= testimonials.length - 3 ? 0 : prev + 1));
  };

  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="mb-12">
            <span className="text-[#F95721] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 block">
              {t.testimonials.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#161616]">
              {t.testimonials.title}<span className="text-[#F95721]">.</span>
            </h2>
            <p className="text-neutral-600 text-base max-w-2xl mt-3 leading-relaxed">
              {t.testimonials.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonials Container with Carousel Navigation */}
        <div className="relative">
          
          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous Testimonial"
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-neutral-200 text-[#F95721] shadow-lg flex items-center justify-center hover:bg-[#F95721] hover:text-white transition-all duration-200 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.slice(0, 3).map((item, idx) => {
              const kmTestimonial = isKhmer && testimonialsKhmer[idx] ? testimonialsKhmer[idx] : null;
              const quoteText = kmTestimonial?.quote || item.quote;
              const roleText = kmTestimonial?.role || item.role;

              return (
                <ScrollReveal
                  key={item.id || idx}
                  animation="fade-up"
                  delay={idx * 140}
                  className="h-full"
                >
                  <div className="h-full bg-[#FFF8F3] border border-[#FDE8DF] rounded-3xl p-8 sm:p-9 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div>
                      {/* Star Rating */}
                      <div className="flex items-center gap-1.5 mb-6 text-[#F95721]">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#F95721] stroke-[#F95721]" />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-[#161616] text-sm sm:text-base font-medium leading-relaxed mb-8 italic">
                        "{quoteText}"
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-3.5 pt-4 border-t border-[#FCD7C8]/50">
                      <img
                        src={item.avatar}
                        alt={item.author}
                        className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80';
                        }}
                      />
                      <div>
                        <h4 className="text-sm font-bold text-[#161616]">
                          {item.author}
                        </h4>
                        <p className="text-xs text-neutral-500 font-medium">
                          {roleText}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            aria-label="Next Testimonial"
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-neutral-200 text-[#F95721] shadow-lg flex items-center justify-center hover:bg-[#F95721] hover:text-white transition-all duration-200 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

        </div>

      </div>
    </section>
  );
}
