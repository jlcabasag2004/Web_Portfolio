import React, { useState, useEffect } from "react";
import { Menu, X, Home, User, FolderOpen, Calendar, Mail } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");
    
    const navItems = [
        { href: "#Home", label: "Home", icon: Home },
        { href: "#About", label: "About", icon: User },
        { href: "#Portofolio", label: "Portofolio", icon: FolderOpen },
        { href: "#Events", label: "Events", icon: Calendar },
        { href: "#Contact", label: "Contact", icon: Mail },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            const sections = navItems.map(item => {
                const section = document.querySelector(item.href);
                if (section) {
                    return {
                        id: item.href.replace("#", ""),
                        offset: section.offsetTop - 550,
                        height: section.offsetHeight
                    };
                }
                return null;
            }).filter(Boolean);

            const currentPosition = window.scrollY;
            const active = sections.find(section => 
                currentPosition >= section.offset && 
                currentPosition < section.offset + section.height
            );

            if (active) {
                setActiveSection(active.id);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) {
            const top = section.offsetTop - 100;
            window.scrollTo({
                top: top,
                behavior: "smooth"
            });
        }
        setIsOpen(false);
    };

    return (
        <nav
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
            isOpen
                ? "bg-[#030014] opacity-100"
                : scrolled
                ? "bg-[#030014]/50 backdrop-blur-xl"
                : "bg-transparent"
        }`}
    >
        <div className="mx-auto px-4 sm:px-6 lg:px-[10%]">
            <div className="flex items-center justify-center h-16 relative">
                {/* Desktop Navigation - Centered */}
                <div className="hidden md:block">
                    <div className="flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className="group relative px-1 py-2 text-sm font-medium"
                            >
                                <span
                                    className={`relative z-10 transition-colors duration-300 ${
                                        activeSection === item.href.substring(1)
                                            ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                                            : "text-[#e2d3fd] group-hover:text-white"
                                    }`}
                                >
                                    {item.label}
                                </span>
                                <span
                                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] transform origin-left transition-transform duration-300 ${
                                        activeSection === item.href.substring(1)
                                            ? "scale-x-100"
                                            : "scale-x-0 group-hover:scale-x-100"
                                    }`}
                                />
                            </a>
                        ))}
                    </div>
                </div>
    
                {/* Mobile Menu Button - Positioned absolutely to the right */}
                <div className="md:hidden absolute right-4">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`relative p-2 text-[#e2d3fd] hover:text-white transition-transform duration-300 ease-in-out transform ${
                            isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
                        }`}
                    >
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    
        {/* Mobile Menu - Below Navbar */}
        <div
            className={`md:hidden fixed left-0 right-0 bg-[#030014] border-t border-white/10 transition-all duration-300 ease-in-out ${
                isOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-full pointer-events-none"
            }`}
            style={{ top: "64px" }}
        >
            <div className="flex items-center justify-around px-2 py-3">
                {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.href.substring(1);
                    return (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 ease ${
                                isActive
                                    ? "bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 text-[#6366f1] scale-110"
                                    : "text-[#e2d3fd] hover:text-white hover:bg-white/5"
                            }`}
                            style={{
                                transitionDelay: `${index * 50}ms`,
                                transform: isOpen 
                                    ? isActive 
                                        ? "translateY(0) scale(1.1)" 
                                        : "translateY(0) scale(1)"
                                    : "translateY(-20px) scale(0.8)",
                                opacity: isOpen ? 1 : 0,
                            }}
                            title={item.label}
                        >
                            <Icon className={`w-6 h-6 mb-1 ${isActive ? "text-[#6366f1]" : ""}`} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </a>
                    );
                })}
            </div>
        </div>
    </nav>
    
    );
};

export default Navbar;