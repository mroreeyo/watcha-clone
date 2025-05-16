import React from 'react';

const RelatedVideos = ({ videos }: { videos: any[] }) => (
  <div className="related-videos-section">
    <div className="related-videos-title">관련 동영상</div>
    <div className="related-videos-list">
      {videos.slice(0, 3).map((video: any) => (
        <div className="related-video-card" key={video.id}>
          <img
            src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
            alt={video.name}
            className="related-video-thumb"
          />
          <div className="related-video-title">{video.name}</div>
        </div>
      ))}
    </div>
  </div>
);

export default RelatedVideos; 