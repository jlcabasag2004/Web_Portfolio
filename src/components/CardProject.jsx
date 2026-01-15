import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { getYouTubeEmbedMeta } from '../utils/media';

const CardProject = ({ Img, Images, Video, Title, Description, Link: ProjectLink, id }) => {
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const youTubeMeta = getYouTubeEmbedMeta(Video);
  const youTubeEmbedUrl = youTubeMeta
    ? `${youTubeMeta.embedUrl}?autoplay=1&mute=1&loop=1&playlist=${youTubeMeta.videoId}&controls=0&rel=0&modestbranding=1`
    : null;
  
  // Use Images array if available, otherwise fall back to Img
  const displayImage = Images && Images.length > 0 ? Images[0] : Img;

  // Handle kasus ketika ProjectLink kosong
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      console.log("ProjectLink kosong");
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };
  
  const handleDetails = (e) => {
    if (!id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Project details are not available");
    }
  };
  

  return (
    <div className="group relative w-full">
            
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
    
        <div className="relative p-5 z-10">
          <div className="relative overflow-hidden rounded-lg">
            {Video ? (
              youTubeEmbedUrl ? (
                <div className="relative overflow-hidden pt-[56.25%]">
                  <iframe
                    src={youTubeEmbedUrl}
                    className="absolute inset-0 w-full h-full"
                    title={`${Title} demo`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <>
                  <video
                    src={Video}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    autoPlay
                    loop
                    muted={isVideoMuted}
                    playsInline
                    controls={false}
                  />
                  <button
                    type="button"
                    onClick={() => setIsVideoMuted(prev => !prev)}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white transition"
                    aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
                  >
                    {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </>
              )
            ) : (
              displayImage && (
                <img
                  src={displayImage}
                  alt={Title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              )
            )}
          </div>
          
          <div className="mt-4 space-y-3">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
              {Title}
            </h3>
            
            <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">
              {Description}
            </p>
            
            <div className="pt-4 flex items-center justify-between">
              {ProjectLink ? (
                <a
                href={ProjectLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Read More</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-gray-500 text-sm">Demo Not Available</span>
              )}
              
     

              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-gray-500 text-sm">Details Not Available</span>
              )}
            </div>
          </div>
          
          <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;