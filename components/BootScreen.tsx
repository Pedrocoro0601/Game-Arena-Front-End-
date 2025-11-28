import React from 'react';

const BootScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-gray-900 transition-colors duration-500">
      
      <div className="relative z-10 flex flex-col items-center gap-16">
        {/* Rotating Container */}
        <div className="relative w-40 h-40 animate-spin-slower">
          
          {/* HTML Icon (Top Center) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
             <div className="w-16 h-16 bg-white rounded-full shadow-[0_0_20px_rgba(255,107,0,0.4)] flex items-center justify-center animate-pulse">
                <svg className="w-10 h-10 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 5L3 18L12 22L21 18L22 5L12 2Z" />
                  <path d="M17 17L12 19L7 17L6 7H18L17 17Z" fill="white" fillOpacity="0.2"/>
                </svg>
             </div>
          </div>

          {/* CSS Icon (Bottom Right) */}
          <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 transform">
             <div className="w-16 h-16 bg-white rounded-full shadow-[0_0_20px_rgba(41,101,241,0.4)] flex items-center justify-center animate-pulse delay-75">
                <svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 5L3 18L12 22L21 18L22 5L12 2Z" />
                  <path d="M17 17L12 19L7 17L6 7H18L17 17Z" fill="white" fillOpacity="0.2"/>
                </svg>
             </div>
          </div>

          {/* JS Icon (Bottom Left) */}
          <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 transform">
             <div className="w-16 h-16 bg-white rounded-full shadow-[0_0_20px_rgba(247,223,30,0.4)] flex items-center justify-center animate-pulse delay-150">
                <svg className="w-10 h-10 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3H21V21H3V3Z" />
                  <path d="M12 12H18V18H12V12Z" fill="white" fillOpacity="0.2"/>
                </svg>
             </div>
          </div>
        </div>

        <p className="font-sans font-bold text-gray-800 text-sm tracking-[0.2em] mt-8 animate-pulse">
          CONSTRUINDO FRONTEND...
        </p>
      </div>
    </div>
  );
};

export default BootScreen;