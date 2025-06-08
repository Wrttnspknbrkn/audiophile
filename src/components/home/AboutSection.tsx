
import React from 'react';
import { ResponsiveImage } from '../ui/responsive-image';
import { useCMS } from '../cms/CMSProvider';

const AboutSection: React.FC = () => {
  const { content } = useCMS();
  
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h2 className="text-h2 text-audiophile-black mb-8">
              {content.about.title}
            </h2>
            <p className="text-body text-audiophile-black opacity-50">
              {content.about.description}
            </p>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <ResponsiveImage
              mobile="/assets/shared/mobile/image-best-gear.jpg"
              tablet="/assets/shared/tablet/image-best-gear.jpg"
              desktop={content.about.image}
              alt="Best audio gear"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
