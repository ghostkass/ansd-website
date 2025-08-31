// src/components/HeroSection.js

import React from 'react';
// import Image from 'next/image'; // Retirez cette ligne si vous n'utilisez pas le composant Image de Next.js
import { ArrowDown, ChevronDown } from 'lucide-react'; // Gardez seulement ArrowDown ou ChevronDown si vous les utilisez
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export default function HeroSection({ // Changé en export default
  title,
  subtitle,
  description,
  backgroundImage,
  badge,
  actions = [],
  stats = [],
  showScrollIndicator = true,
  overlay = 'green',
  className = ''
}) {
  
  const getOverlayStyles = () => { // Changé le nom pour éviter la confusion avec les classes CSS
    switch (overlay) {
      case 'dark':
        return 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))';
      case 'light':
        return 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6))';
      case 'green':
      default:
        return 'linear-gradient(rgba(0, 133, 61, 0.85), rgba(0, 107, 49, 0.75))';
    }
  };

  const textColorClass = overlay === 'light' ? 'text-gray-900' : 'text-white';
  const subtitleColorClass = overlay === 'light' ? 'text-gray-700' : 'text-white/90';

  return (
    <section 
      className={`relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat ${className}`}
      style={{
        backgroundImage: `${getOverlayStyles()}, url('${backgroundImage}')`
      }}
    >
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-dots-pattern opacity-20"></div>
      
      <div className="relative container-custom w-full">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Badge */}
          {badge && (
            <div className="animate-fade-in-up">
              <Badge 
                variant="secondary" 
                className="bg-[var(--senegal-gold)] text-black px-6 py-3 text-base"
              >
                {badge.icon && <badge.icon className="h-5 w-5 mr-2" />}
                {badge.text}
              </Badge>
            </div>
          )}

          {/* Titre et sous-titre */}
          <div className="space-y-4 animate-fade-in-up">
            <h1 className={`leading-tight ${textColorClass}`} style={{ fontSize: '3.5rem' }}>
              {title}
              {subtitle && (
                <span className="text-[var(--senegal-gold)] block mt-2">
                  {subtitle}
                </span>
              )}
            </h1>
            <p className={`${subtitleColorClass} leading-relaxed max-w-3xl mx-auto`} style={{ fontSize: '1.375rem' }}>
              {description}
            </p>
          </div>

          {/* Actions */}
          {actions.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  size="lg"
                  variant={action.variant || 'default'}
                  onClick={action.onClick}
                  className={`px-8 py-4 ${
                    action.variant === 'outline'
                      ? 'border-white text-white hover:bg-white hover:text-[var(--senegal-green)]'
                      : action.variant === 'secondary'
                      ? 'bg-white text-[var(--senegal-green)] hover:bg-gray-100'
                      : 'bg-[var(--senegal-gold)] text-black hover:bg-[var(--senegal-gold-dark)]'
                  }`}
                >
                  {action.icon && <action.icon className="mr-3 h-5 w-5" />}
                  {action.label}
                </Button>
              ))}
            </div>
          )}

          {/* Statistiques */}
          {stats.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 animate-fade-in-up">
              {stats.map((stat, index) => (
                <div key={index} className="glassmorphism rounded-xl p-6 text-center backdrop-blur-md">
                  {stat.icon && (
                    <stat.icon className="h-8 w-8 mx-auto mb-3 text-[var(--senegal-gold)]" />
                  )}
                  <div className={`${textColorClass} mb-1`} style={{ fontSize: '1.75rem' }}>
                    {stat.value}
                  </div>
                  <div className={`${subtitleColorClass}`} style={{ fontSize: '0.875rem' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        {showScrollIndicator && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className={`w-6 h-10 border-2 ${
              overlay === 'light' ? 'border-gray-400' : 'border-white/50'
            } rounded-full p-1`}>
              <div className={`w-1 h-3 ${
                overlay === 'light' ? 'bg-gray-600' : 'bg-white/70'
              } rounded-full mx-auto animate-pulse`}></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}