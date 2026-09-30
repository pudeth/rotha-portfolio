import React from 'react';
import { Smile, ThumbsUp, Star, Globe } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Stats({ stats }) {
  const getStatIcon = (iconName) => {
    switch (iconName) {
      case 'Smile':
        return <Smile className="w-7 h-7 text-[#F95721] stroke-[2]" />;
      case 'ThumbsUp':
        return <ThumbsUp className="w-7 h-7 text-[#F95721] stroke-[2]" />;
      case 'Star':
        return <Star className="w-7 h-7 text-[#F95721] stroke-[2]" />;
      case 'Globe':
      default:
        return <Globe className="w-7 h-7 text-[#F95721] stroke-[2]" />;
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stats Container with Warm Cream Background & Glass Border */}
        <ScrollReveal animation="zoom-in">
          <div className="bg-[#FFF8F3] border border-[#FDE8DF] rounded-[2.5rem] p-6 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-[#FCD7C8]">
              {stats.map((stat, idx) => (
                <div
                  key={stat.id}
                  className="flex flex-col items-center text-center px-4 py-3 group hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="mb-3.5 p-3 rounded-2xl bg-[#FFF0E8] group-hover:bg-[#F95721]/15 group-hover:rotate-6 transition-all duration-300 shadow-2xs">
                    {getStatIcon(stat.iconName)}
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#161616] tracking-tight mb-1.5 group-hover:text-[#F95721] transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-neutral-600 tracking-tight max-w-[160px]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
