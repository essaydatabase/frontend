import React from "react";
import PropTypes from "prop-types";
import Details from "./Details";
import "./styles/essay.css";

const Essay = ({
  paragraphs,
  prompt,
  author,
  college,
  country,
  dateUploaded,
  applicationStatus,
  yearApplied,
  imageLink
}) => {
  return (
    <article className="uk-article">
      <h2 className="uk-heading-primary uk-margin-small-bottom">{prompt}</h2>
      <div className=" uk-overflow-hidden">
        <img
          data-src={imageLink}
          alt=""
          uk-img=""
          uk-scrollspy="cls: uk-animation-kenburns; repeat: true"
          className="uk-animation-reverse uk-transform-origin-top-right"
        />
      </div>
      <div className="uk-padding-small">
        <Details
          author={author}
          college={college}
          country={country}
          dateUploaded={dateUploaded}
          applicationStatus={applicationStatus}
          yearApplied={yearApplied}
        />
        <div className="uk-text-left">
          {paragraphs.map((paragraph, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? "uk-dropcap uk-text-lead"
                  : "uk-text-justify textSize"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
};

Essay.propTypes = {
  paragraphs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  prompt: PropTypes.string,
  imageLink: PropTypes.string.isRequired,
  author: PropTypes.string,
  college: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  dateUploaded: PropTypes.string.isRequired,
  applicationStatus: PropTypes.string.isRequired,
  yearApplied: PropTypes.number.isRequired
};
export default Essay;
