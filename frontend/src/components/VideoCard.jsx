import React from "react";
import "./videoCard.css";
import { MDBIcon } from "mdb-react-ui-kit";
import { Audio } from "react-loader-spinner";
const VideoCard = ({ sequence, index, video }) => {
  return (
    <div className="ccc-container">
      <div className="video-image">
        <div className="play-icon">
          <MDBIcon
            style={{ height: "42px", width: "64px" }}
            far
            icon="play-circle"
          />
        </div>
        <img src={video.thumbnail} alt="title" />
      </div>
      <div className="details">
        {sequence - 1 === index && (
          <>
            <div className="play-look">
              <Audio
                height="70"
                width="50"
                color="#4285F4"
                ariaLabel="audio-loading"
                wrapperStyle={{}}
                wrapperClass="wrapper-class"
                visible={true}
              />
            </div>
          </>
        )}
        <div className="video-card-texts">
          <div>{video.sequence}</div>
          <div className="video-title2">{video.title}</div>
          <div>{video.duration}</div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
