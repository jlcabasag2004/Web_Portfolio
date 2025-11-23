import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Calendar, MapPin, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Modal, IconButton, Box, Backdrop } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Image Carousel Component with Auto-play
const ImageCarousel = ({ images, eventTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (images.length <= 1) return;

    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }
      }, 4000); // Change image every 4 seconds
    };

    startAutoPlay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length, isPaused]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Handle single image or array of images
  const imageArray = Array.isArray(images) ? images : images ? [images] : ["/placeholder-event.jpg"];

  const handleOpenModal = (index) => {
    setModalImageIndex(index);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleModalPrevious = () => {
    setModalImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
  };

  const handleModalNext = () => {
    setModalImageIndex((prev) => (prev + 1) % imageArray.length);
  };

  return (
    <>
    <div
      className="relative group overflow-hidden rounded-2xl shadow-2xl cursor-pointer"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={() => handleOpenModal(currentIndex)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      
      {/* Image Container */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        {imageArray.map((img, index) => (
          <img
            key={index}
            src={img || "/placeholder-event.jpg"}
            alt={`${eventTitle} - Image ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            onError={(e) => {
              e.target.src = "/placeholder-event.jpg";
            }}
          />
        ))}
      </div>

      {/* Navigation Arrows - Only show if more than 1 image */}
      {imageArray.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-20"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots Indicator - Only show if more than 1 image */}
      {imageArray.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {imageArray.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-[#a855f7]"
                  : "w-2 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {imageArray.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs z-20">
          {currentIndex + 1} / {imageArray.length}
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>

    {/* Modal for image preview */}
    <Modal
      open={modalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(5px)",
        },
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        padding: 0,
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "auto",
          maxWidth: "90vw",
          maxHeight: "90vh",
          m: 0,
          p: 0,
          outline: "none",
          "&:focus": {
            outline: "none",
          },
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "white",
            bgcolor: "rgba(0,0,0,0.6)",
            zIndex: 1,
            padding: 1,
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.8)",
              transform: "scale(1.1)",
            },
          }}
          size="large"
        >
          <CloseIcon sx={{ fontSize: 24 }} />
        </IconButton>

        {/* Navigation Arrows in Modal - Only show if more than 1 image */}
        {imageArray.length > 1 && (
          <>
            <IconButton
              onClick={handleModalPrevious}
              sx={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                bgcolor: "rgba(0,0,0,0.6)",
                zIndex: 1,
                padding: 1,
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.8)",
                  transform: "translateY(-50%) scale(1.1)",
                },
              }}
              size="large"
            >
              <ChevronLeft className="w-6 h-6" />
            </IconButton>
            <IconButton
              onClick={handleModalNext}
              sx={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                bgcolor: "rgba(0,0,0,0.6)",
                zIndex: 1,
                padding: 1,
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.8)",
                  transform: "translateY(-50%) scale(1.1)",
                },
              }}
              size="large"
            >
              <ChevronRight className="w-6 h-6" />
            </IconButton>
          </>
        )}

        {/* Modal Image */}
        <img
          src={imageArray[modalImageIndex] || "/placeholder-event.jpg"}
          alt={`${eventTitle} - Image ${modalImageIndex + 1}`}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "90vh",
            margin: "0 auto",
            objectFit: "contain",
          }}
        />

        {/* Image Counter in Modal - Only show if more than 1 image */}
        {imageArray.length > 1 && (
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              bgcolor: "rgba(0,0,0,0.6)",
              color: "white",
              px: 3,
              py: 1,
              borderRadius: "20px",
              fontSize: "0.875rem",
            }}
          >
            {modalImageIndex + 1} / {imageArray.length}
          </Box>
        )}
      </Box>
    </Modal>
    </>
  );
};

const EventCard = ({ event, index }) => {
  const isEven = index % 2 === 0;

  // Support both single image (Img) and multiple images (Images array)
  const images = event.Images || (event.Img ? [event.Img] : []);

  return (
    <div
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-8 mb-12 md:mb-16`}
      data-aos={isEven ? "fade-up-right" : "fade-up-left"}
      data-aos-duration="1000"
    >
      {/* Image Section - Left side (or right for odd items) */}
      <div className="w-full md:w-1/2">
        <ImageCarousel images={images} eventTitle={event.Title || event.title} />
      </div>

      {/* Content Section - Right side (or left for odd items) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div className="space-y-4 md:space-y-6">
          {/* Title */}
          <h3
            className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {event.Title || event.title}
          </h3>

          {/* Caption/Description */}
          <div
            className="text-gray-300 text-base md:text-lg leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {(() => {
              const description = event.Description || event.description || event.Caption || event.caption || "";
              
              // Check if description contains "READ MORE:" or "Read More:" followed by URL
              const readMoreRegex = /(.*?)(?:READ\s+MORE|Read\s+More)[:\s]+(https?:\/\/[^\s]+)/i;
              const match = description.match(readMoreRegex);
              
              if (match) {
                // Split into text and link
                const textPart = match[1].trim();
                const urlPart = match[2];
                
                return (
                  <>
                    <p className="mb-3">{textPart}</p>
                    <a
                      href={urlPart}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a855f7] hover:text-[#6366f1] underline transition-colors duration-300 font-medium inline-flex items-center gap-1"
                    >
                      Read More
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </>
                );
              }
              
              // Fallback: Check if description contains a URL (without READ MORE)
              const urlRegex = /(https?:\/\/[^\s]+)/g;
              const parts = description.split(urlRegex);
              
              if (parts.length > 1) {
                // Has URL, replace with Read More link
                return parts.map((part, index) => {
                  // Check if this part is a URL
                  if (part.match(/^https?:\/\//)) {
                    return (
                      <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#a855f7] hover:text-[#6366f1] underline transition-colors duration-300 font-medium inline-flex items-center gap-1 ml-1"
                      >
                        Read More
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    );
                  }
                  return <span key={index}>{part}</span>;
                });
              }
              
              // No URL found, just display the text
              return <p>{description}</p>;
            })()}
          </div>

          {/* Date and Location */}
          <div className="flex flex-col gap-3 pt-2" data-aos="fade-up" data-aos-delay="400">
            {/* Date */}
            <div className="flex items-center gap-3 text-gray-400">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <Calendar className="w-5 h-5 text-[#a855f7]" />
              </div>
              <span className="text-sm md:text-base">
                {event.Date || event.date || "Date TBA"}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 text-gray-400">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <MapPin className="w-5 h-5 text-[#6366f1]" />
              </div>
              <span className="text-sm md:text-base">
                {event.Location || event.location || "Location TBA"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Events() {
  // Manual Events Data - Add your events here
  const manualEvents = [
    {
      id: 1,
      Title: "DOST - Pitching Competition 2025",
      Description: "Siquijor State College proudly marked a major achievement at the 𝐇𝐀𝐍𝐃𝐀 𝐏𝐢𝐥𝐢𝐩𝐢𝐧𝐚𝐬 𝐕𝐢𝐬𝐚𝐲𝐚𝐬 𝐄𝐱𝐩𝐨𝐬𝐢𝐭𝐢𝐨𝐧 𝟐𝟎𝟐𝟓, hosted in Bacolod City on October 27–29 2025, after its student team emerged as a 𝐑𝐞𝐠𝐢𝐨𝐧𝐚𝐥 𝐅𝐢𝐧𝐚𝐥𝐢𝐬𝐭 in the 𝐃𝐑𝐑𝐌 𝐈𝐝𝐞𝐚 𝐏𝐢𝐭𝐜𝐡𝐢𝐧𝐠 𝐂𝐨𝐦𝐩𝐞𝐭𝐢𝐭𝐢𝐨𝐧.  𝐊𝐮𝐝𝐨𝐬 𝐭𝐨 𝐭𝐡𝐞 𝐒𝐒𝐂 𝐓𝐞𝐚𝐦 𝐟𝐨𝐫 𝐬𝐡𝐢𝐧𝐢𝐧𝐠 𝐨𝐧 𝐭𝐡𝐞 𝐫𝐞𝐠𝐢𝐨𝐧𝐚𝐥 𝐬𝐭𝐚𝐠𝐞! https://siquijorstate.edu.ph/siquijor-state-college-earns-top-regional-finalist-honors-at-handa-pilipinas-2025/?fbclid=IwY2xjawOOg0lleHRuA2FlbQIxMABicmlkETEyV0hMeGFTamd0VmJGeTBSc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHrZy_NzRWugU2yWsGC-lSDRHJ1fGyq4ivHkVcdGQP-HoGoxuoWq6rCYCVpSt_aem_bpcsApLFbDjXHHIlryNJBg",
      // You can use either single image (Img) or multiple images (Images array)
      Images: [
        "/events/dala-3.jpg",
        "/events/dala-2.jpg",
        "/events/dala-1.jpg"
      ],
      // Or use single image: Img: "/events/tech-conference.jpg",
      Date: "October 27-29, 2025",
      Location: "Bacolod City, Negros Occidental"
    },
    {
      id: 2,
      Title: "iHub Launching Event - DOST",
      Description: "Thrilled to be part of the iHub Launching at DOST Siquijor, where we proudly unveil our startup concept TravelSikyu—a vision shaped for the future of smart travel. 🚀✨",
      Images: [
        "/events/sikyu-1.jpg",
        "/events/sikyu-2.jpg",
        "/events/sikyu-3.jpg"
      ],
      Date: "June 25, 2025",
      Location: "DOST iHub, Siquijor"
    },
    {
      id: 3,
      Title: "PSA - 34th National Statistics Month Inter-Collegiate Competition",
      Description: "Siquijor State College bagging GOLD, SILVER, and BRONZE during the 34th National Statistics Month Inter-Collegiate Competition.🌍✨",
      Images: [
        "/events/psa-1.jpg"
      ],
      Date: "October 24, 2023",
      Location: "Cebu Normal University, Cebu City"
    },
    // Add more events below by copying the format above
  ];

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden py-16" id="Events">
      {/* Header section */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Events
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          Events and activities I've participated in
          <Sparkles className="w-5 h-5 text-purple-400" />
        </p>
      </div>

      {/* Events List */}
      <div className="container mx-auto">
        {manualEvents.length > 0 ? (
          manualEvents.map((event, index) => (
            <EventCard key={event.id || index} event={event} index={index} />
          ))
        ) : (
          <div className="text-center py-16" data-aos="fade-up">
            <p className="text-gray-400 text-lg">No events to display yet.</p>
            <p className="text-gray-500 text-sm mt-2">Add events manually in the Events.jsx file.</p>
          </div>
        )}
      </div>
    </div>
  );
}

