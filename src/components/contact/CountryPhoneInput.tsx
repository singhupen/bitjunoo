"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { defaultCountries, parseCountry, FlagImage } from "react-international-phone";

export interface CountryItem {
  name: string;
  iso2: string;
  dialCode: string;
}

const PREFERRED_ISO2 = ["in", "us", "gb", "ae", "ca", "au", "sg", "de"];

// Pre-parse the default countries once
const ALL_COUNTRIES: CountryItem[] = defaultCountries.map((c) => {
  const parsed = parseCountry(c);
  return {
    name: parsed.name,
    iso2: parsed.iso2,
    dialCode: parsed.dialCode,
  };
});

interface CountryPhoneInputProps {
  value: string;
  onChange: (fullPhone: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function CountryPhoneInput({
  value,
  onChange,
  placeholder,
  disabled = false,
}: CountryPhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryItem>(() => {
    const defaultIn = ALL_COUNTRIES.find((c) => c.iso2 === "in");
    return defaultIn || ALL_COUNTRIES[0];
  });
  const [localNumber, setLocalNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Sync internal localNumber if external value is reset to empty
  useEffect(() => {
    if (!value) {
      setLocalNumber("");
    }
  }, [value]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter countries based on search
  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase().replace(/^\+/, "");
    if (!q) return ALL_COUNTRIES;
    return ALL_COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.iso2.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Preferred countries subset (only when search is empty)
  const preferredCountries = useMemo(() => {
    return PREFERRED_ISO2.map((iso) => ALL_COUNTRIES.find((c) => c.iso2 === iso)).filter(
      Boolean
    ) as CountryItem[];
  }, []);

  const handleCountrySelect = (country: CountryItem) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery("");

    // Re-emit formatted phone with new dial code
    const digitsOnly = localNumber.replace(/[^\d]/g, "");
    if (digitsOnly) {
      onChange(`+${country.dialCode}-${digitsOnly}`);
    } else {
      onChange("");
    }

    setTimeout(() => {
      phoneInputRef.current?.focus();
    }, 50);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value;

    // If pasted with leading +, strip the dial code if it matches selectedCountry
    if (inputVal.startsWith("+")) {
      inputVal = inputVal.slice(1).trim();
      if (inputVal.startsWith(selectedCountry.dialCode)) {
        inputVal = inputVal.slice(selectedCountry.dialCode.length).trim();
      }
    }

    // Keep digits, spaces, and hyphens for display
    const sanitizedDisplay = inputVal.replace(/[^\d\s-]/g, "");
    setLocalNumber(sanitizedDisplay);

    const digitsOnly = sanitizedDisplay.replace(/[^\d]/g, "");
    if (digitsOnly) {
      onChange(`+${selectedCountry.dialCode}-${digitsOnly}`);
    } else {
      onChange("");
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input container */}
      <div
        className={`relative flex items-center w-full rounded-xl border ${
          isFocused || isOpen
            ? "border-blue-500 ring-1 ring-blue-500"
            : "border-slate-200 dark:border-slate-800"
        } bg-[#F8FAFC] dark:bg-slate-900/50 transition-all`}
      >
        {/* Country Selector Trigger */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="h-12 px-3 sm:px-3.5 flex items-center gap-2 border-r border-slate-200 dark:border-slate-800/80 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 rounded-l-xl transition-colors cursor-pointer shrink-0"
        >
          <FlagImage iso2={selectedCountry.iso2} size="18px" />
          <span className="text-[13px] font-bold text-slate-800 dark:text-slate-200">
            +{selectedCountry.dialCode}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-blue-500" : ""
            }`}
          />
        </button>

        {/* Local Number Input */}
        <input
          ref={phoneInputRef}
          type="tel"
          disabled={disabled}
          value={localNumber}
          onChange={handleNumberChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={
            placeholder ||
            (selectedCountry.iso2 === "in" ? "91754 25157" : "Phone number")
          }
          className="w-full h-12 px-3 sm:px-4 bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 text-[13px] font-medium focus:outline-none"
        />
      </div>

      {/* Floating Country Dropdown Menu with Search */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full sm:w-[360px] max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Search Header */}
          <div className="p-2.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/80">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or dial code..."
                className="w-full pl-9 pr-8 py-2 text-[12.5px] bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Countries List */}
          <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 scrollbar-thin">
            {/* Preferred / Popular Section when not searching */}
            {!searchQuery.trim() && (
              <div>
                <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/80 dark:bg-slate-950/40">
                  Popular Countries
                </div>
                {preferredCountries.map((country) => {
                  const isSelected = selectedCountry.iso2 === country.iso2;
                  return (
                    <button
                      key={`pref-${country.iso2}`}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-[13px] text-left transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-cyan-blue font-semibold"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FlagImage iso2={country.iso2} size="18px" />
                        <span className="truncate">{country.name}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400 shrink-0 ml-2">
                        +{country.dialCode}
                      </span>
                    </button>
                  );
                })}
                <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/80 dark:bg-slate-950/40">
                  All Countries
                </div>
              </div>
            )}

            {/* Filtered Countries */}
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => {
                const isSelected = selectedCountry.iso2 === country.iso2;
                return (
                  <button
                    key={country.iso2}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-[13px] text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-cyan-blue font-semibold"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FlagImage iso2={country.iso2} size="18px" />
                      <span className="truncate">{country.name}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 shrink-0 ml-2">
                      +{country.dialCode}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                No countries found matching &ldquo;{searchQuery}&rdquo;
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

