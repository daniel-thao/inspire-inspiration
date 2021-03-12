import CSS from "./video.module.css";

// This is the container for the YT Motivational Video

function Video() {
  return (
    <div className={`${CSS.container}`}>
      <iframe
        title="motivate"
        id="autoPlay"
        className={`${CSS.video}`}
        // This src should be dynamic eventually
        src="https://www.youtube.com/embed/DnS3vDtOkbs?start=48&autoplay=1&playsinline=1"
        controls="controls"
        allow="autoplay"
        allowFullScreen
      ></iframe>

      {/* <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/DnS3vDtOkbs"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe> */}
    </div>
  );
}

export default Video;
