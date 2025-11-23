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
        <>
        {/* Desktop Navigation - Top Bar */}
        <nav
            className={`hidden md:block fixed w-full top-0 z-50 transition-all duration-500 ${
                scrolled
                    ? "bg-[#030014]/50 backdrop-blur-xl"
                    : "bg-transparent"
            }`}
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-[10%]">
                <div className="flex items-center justify-center h-16">
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
            </div>
        </nav>

        {/* Mobile Bottom Navigation Bar */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#030014]/95 backdrop-blur-xl border-t border-white/10">
            <div className="flex items-center justify-around h-16 px-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.href.substring(1);
                    return (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 ${
                                isActive
                                    ? "text-[#6366f1]"
                                    : "text-[#e2d3fd]"
                            }`}
                        >
                            <div className={`relative p-2 rounded-lg transition-all duration-300 ${
                                isActive
                                    ? "bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 scale-110"
                                    : "hover:bg-white/5"
                            }`}>
                                <Icon className={`w-5 h-5 transition-all duration-300 ${
                                    isActive ? "scale-110" : ""
                                }`} />
                            </div>
                            <span className={`text-[10px] mt-0.5 font-medium transition-all duration-300 ${
                                isActive
                                    ? "text-[#6366f1] font-semibold"
                                    : "text-[#9ca3af]"
                            }`}>
                                {item.label}
                            </span>
                        </a>
                    );
                })}
            </div>
        </nav>
        </>
    );
};

export default Navbar;