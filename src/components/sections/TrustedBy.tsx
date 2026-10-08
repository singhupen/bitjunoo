"use client";

export default function TrustedBy() {
  return (
    <section className="relative py-6 sm:py-8 bg-white dark:bg-[#081022] border-y border-[#DCE8F5] dark:border-slate-800/80 overflow-hidden transition-colors duration-300">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          
          {/* Label */}
          <div className="shrink-0 text-xs sm:text-[13px] font-semibold text-[#50627D] dark:text-slate-400 tracking-tight whitespace-nowrap">
            Trusted by Growing Enterprises
          </div>

          {/* Thin separator visible on desktop */}
          <div className="hidden lg:block w-px h-6 bg-[#DCE8F5] dark:bg-slate-800 shrink-0" />

          {/* Logos strip */}
          <div className="w-full flex items-center justify-between sm:justify-center lg:justify-between gap-6 sm:gap-8 lg:gap-6 overflow-x-auto no-scrollbar py-2">
            
            {/* 1. Microsoft */}
            <div className="flex items-center gap-2 shrink-0 group opacity-85 hover:opacity-100 transition-opacity">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 21 21" fill="none">
                <rect width="10" height="10" fill="#F25022" />
                <rect x="11" width="10" height="10" fill="#7FBA00" />
                <rect y="11" width="10" height="10" fill="#00A4EF" />
                <rect x="11" y="11" width="10" height="10" fill="#FFB900" />
              </svg>
              <span className="text-[13px] font-semibold text-[#0B1733] dark:text-slate-200">
                Microsoft
              </span>
            </div>

            <div className="hidden sm:block w-px h-5 bg-[#DCE8F5] dark:bg-slate-800 shrink-0" />

            {/* 2. AWS */}
            <div className="flex items-center gap-1.5 shrink-0 opacity-85 hover:opacity-100 transition-opacity">
              <svg className="h-4.5 w-auto" viewBox="0 0 65 39" fill="none">
                <path d="M19.1 19.8C18.6 19.3 17.8 19 16.7 19C15.2 19 14 19.6 13.1 20.8V19.3H9.4V31.3H13.2V25.8C14.1 27 15.3 27.6 16.7 27.6C17.8 27.6 18.6 27.3 19.1 26.8C19.7 26.2 20 25.4 20 23.3C20 21.2 19.7 20.4 19.1 19.8ZM16.1 24.3C15.4 24.3 14.8 24 14.3 23.5V23.1C14.8 22.6 15.4 22.3 16.1 22.3C16.9 22.3 17.3 22.7 17.3 23.3C17.3 23.9 16.9 24.3 16.1 24.3Z" fill="#0B1733" className="dark:fill-slate-200" />
                <path d="M35.6 19.3H32.1L29.6 27.4L27.2 19.3H23.7L21.2 27.4L18.7 19.3H15.1L19.5 31.3H23L25.4 23.3L27.8 31.3H31.3L35.6 19.3Z" fill="#0B1733" className="dark:fill-slate-200" />
                <path d="M41.7 24.5C40.6 24 39.4 23.8 38.6 23.5C38 23.3 37.7 23 37.7 22.6C37.7 22.1 38.1 21.8 38.9 21.8C39.7 21.8 40.5 22.1 41.3 22.6L42.6 20C41.5 19.4 40.2 19.1 38.8 19.1C35.9 19.1 34.1 20.5 34.1 22.8C34.1 24.4 35.1 25.5 37.1 26.1C37.8 26.3 38.3 26.6 38.3 27C38.3 27.5 37.7 27.9 36.8 27.9C35.8 27.9 34.7 27.4 33.7 26.7L32.4 29.4C33.7 30.3 35.3 30.7 36.8 30.7C39.9 30.7 41.9 29.2 41.9 26.9C41.9 25.9 41.4 25.2 41.7 24.5Z" fill="#0B1733" className="dark:fill-slate-200" />
                <path d="M49 31C39.8 37.8 23.4 37.8 12 33.1C10.5 32.5 11.8 31.2 13 31.8C23.6 36 38.7 35.9 47.1 29.8C48.4 28.9 49.9 30.3 49 31Z" fill="#FF9900" />
                <path d="M52.3 27.4C51.6 26.5 47.6 26.9 45.8 27.1C45.3 27.2 45.4 26.7 45.9 26.3C49.2 24.2 54.1 25.2 54.6 25.8C55.1 26.4 54.2 31.4 51.1 33.8C50.7 34.1 50.3 33.9 50.5 33.5C51.2 31.8 53 28.3 52.3 27.4Z" fill="#FF9900" />
              </svg>
            </div>

            <div className="hidden sm:block w-px h-5 bg-[#DCE8F5] dark:bg-slate-800 shrink-0" />

            {/* 3. Google Cloud */}
            <div className="flex items-center gap-2 shrink-0 opacity-85 hover:opacity-100 transition-opacity">
              <svg className="w-5 h-4 shrink-0" viewBox="0 0 24 19" fill="none">
                <path d="M19.35 7.04C18.67 3.02 15.18 0 11 0C7.81 0 5.06 1.76 3.65 4.36C1.56 4.96 0 6.9 0 9.2C0 11.96 2.24 14.2 5 14.2H19C21.76 14.2 24 11.96 24 9.2C24 6.64 21.94 4.56 19.35 4.04V7.04Z" fill="#4285F4" />
                <path d="M5 14.2H11V8.2H5C2.24 8.2 0 10.44 0 13.2C0 13.54 0.04 13.87 0.1 14.2H5Z" fill="#EA4335" />
                <path d="M11 14.2H19C21.76 14.2 24 11.96 24 9.2C24 8.86 23.96 8.53 23.9 8.2H18V8.2C16.9 8.2 16 9.1 16 10.2V14.2H11Z" fill="#34A853" />
                <path d="M11 0C10.6 0 10.2 0.04 9.8 0.12V8.2H16C16 4.8 13.7 2.1 11 0Z" fill="#FBBC05" />
              </svg>
              <span className="text-[13px] font-semibold text-[#0B1733] dark:text-slate-200">
                Google Cloud
              </span>
            </div>

            <div className="hidden sm:block w-px h-5 bg-[#DCE8F5] dark:bg-slate-800 shrink-0" />

            {/* 4. MongoDB */}
            <div className="flex items-center gap-1.5 shrink-0 opacity-85 hover:opacity-100 transition-opacity">
              <svg className="w-4 h-5 shrink-0" viewBox="0 0 24 28" fill="none">
                <path d="M12.3 0.2C11.8 -0.1 11.1 -0.1 10.6 0.2C5.9 3.2 0 9.6 0 17.5C0 24.3 5.4 27.6 11 27.9C11.2 27.9 11.4 28 11.6 28C11.8 28 12 27.9 12.2 27.9C17.8 27.6 23.2 24.3 23.2 17.5C23.2 9.6 17.1 3.2 12.3 0.2ZM11.6 25.8C11.5 25.8 11.4 25.7 11.3 25.6V1.9C15.8 4.6 21.2 10.2 21.2 17.5C21.2 23.1 16.7 25.5 11.6 25.8Z" fill="#00ED64" />
                <path d="M11.3 25.6C6.2 25.3 1.7 22.9 1.7 17.5C1.7 10.2 7.1 4.6 11.3 1.9V25.6H11.3Z" fill="#00684A" />
              </svg>
              <span className="text-[13px] font-semibold text-[#0B1733] dark:text-slate-200">
                MongoDB
              </span>
            </div>

            <div className="hidden sm:block w-px h-5 bg-[#DCE8F5] dark:bg-slate-800 shrink-0" />

            {/* 5. Vercel */}
            <div className="flex items-center gap-2 shrink-0 opacity-85 hover:opacity-100 transition-opacity">
              <svg className="w-4 h-3.5 shrink-0" viewBox="0 0 76 65" fill="none">
                <path d="M37.5 0L75 65H0L37.5 0Z" fill="#0B1733" className="dark:fill-white" />
              </svg>
              <span className="text-[13px] font-semibold text-[#0B1733] dark:text-slate-200">
                Vercel
              </span>
            </div>

            <div className="hidden sm:block w-px h-5 bg-[#DCE8F5] dark:bg-slate-800 shrink-0" />

            {/* 6. Docker */}
            <div className="flex items-center gap-1.5 shrink-0 opacity-85 hover:opacity-100 transition-opacity">
              <svg className="w-5 h-4 shrink-0" viewBox="0 0 24 18" fill="none">
                <path d="M23.7 8.3C23.3 7.5 22.3 7.1 21.4 7.2C21.1 7.2 20.8 7.3 20.6 7.4C20.1 6.2 19 5.3 17.7 5.1C17.5 5 17.3 5 17.1 5C16.9 3.5 15.6 2.4 14.1 2.4H13.6V4.3H15.5C15.8 4.3 16 4.5 16 4.8V5.3H11.2V2.4H8.8V5.3H6.4V2.4H4V5.3H1.6C0.7 5.3 0 6 0 6.9V10.2C0 14.5 4.3 17.5 10.5 17.5C17.2 17.5 22.3 14 23.3 9.4C23.8 9.1 24 8.7 23.7 8.3ZM4 7.2H6.4V9.6H4V7.2ZM8.8 7.2H11.2V9.6H8.8V7.2ZM13.6 7.2H16V9.6H13.6V7.2ZM1.6 7.2H3.5V9.6H1.6V7.2Z" fill="#2496ED" />
              </svg>
              <span className="text-[13px] font-semibold text-[#0B1733] dark:text-slate-200">
                docker
              </span>
            </div>

            <div className="hidden sm:block w-px h-5 bg-[#DCE8F5] dark:bg-slate-800 shrink-0" />

            {/* 7. GitHub */}
            <div className="flex items-center gap-1.5 shrink-0 opacity-85 hover:opacity-100 transition-opacity">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017C2 16.446 4.87 20.198 8.84 21.52C9.34 21.61 9.52 21.3 9.52 21.03C9.52 20.79 9.51 20.01 9.51 19.16C6.73 19.76 6.14 17.82 6.14 17.82C5.69 16.67 5.04 16.36 5.04 16.36C4.13 15.74 5.11 15.75 5.11 15.75C6.12 15.82 6.65 16.79 6.65 16.79C7.54 18.33 8.99 17.88 9.56 17.62C9.65 16.97 9.91 16.53 10.2 16.28C7.98 16.03 5.65 15.17 5.65 11.33C5.65 10.24 6.04 9.34 6.68 8.64C6.58 8.39 6.24 7.37 6.78 6C6.78 6 7.62 5.73 9.53 7.02C10.33 6.8 11.19 6.69 12.04 6.69C12.89 6.69 13.75 6.8 14.55 7.02C16.46 5.73 17.3 6 17.3 6C17.84 7.37 17.5 8.39 17.4 8.64C18.04 9.34 18.43 10.24 18.43 11.33C18.43 15.18 16.09 16.02 13.86 16.27C14.22 16.58 14.54 17.2 14.54 18.15C14.54 19.51 14.53 20.61 14.53 20.95C14.53 21.22 14.71 21.54 15.22 21.44C19.18 20.11 22.04 16.39 22.04 12.017C22.04 6.484 17.523 2 12 2Z" fill="#0B1733" className="dark:fill-slate-200" />
              </svg>
              <span className="text-[13px] font-semibold text-[#0B1733] dark:text-slate-200">
                GitHub
              </span>
            </div>

            <div className="hidden sm:block w-px h-5 bg-[#DCE8F5] dark:bg-slate-800 shrink-0" />

            {/* 8. Figma */}
            <div className="flex items-center gap-1.5 shrink-0 opacity-85 hover:opacity-100 transition-opacity">
              <svg className="w-3.5 h-5 shrink-0" viewBox="0 0 38 57" fill="none">
                <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
                <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
                <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
                <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
                <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
              </svg>
              <span className="text-[13px] font-semibold text-[#0B1733] dark:text-slate-200">
                Figma
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
