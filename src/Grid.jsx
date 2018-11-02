import React, { Fragment, createRef, PureComponent, forwardRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ESSAYS_SHAPE, ESSAYS_INDEX } from "./constants";
import Card from "./Card";

const Empty = () => (
  <div
    className="uk-flex uk-flex-center uk-flex-middle"
    uk-height-viewport="expand: true"
  >
    <p>nothing to show</p>
  </div>
);

const ToTop = forwardRef((props, ref) => (
  <div
    className={`uk-section uk-section-secondary uk-section-xsmall uk-padding-remove-horizontal ${
      props.classes
    }`}
    ref={ref}
    id="to-top"
  >
    <div className="uk-container uk-container-expand">
      <div className="uk-flex uk-flex-right">
        <button uk-totop="" uk-scroll="" />
      </div>
    </div>
  </div>
));

const FilterSort = ({ handleFilter }) => (
  <Fragment>
    <div className="uk-flex uk-flex-between uk-flex-wrap">
      <div>
        <ul onClick={handleFilter} className="uk-subnav uk-subnav-pill">
          <li className="uk-active" uk-filter-control="">
            <a>All</a>
          </li>
          <li uk-filter-control="[data-tag='new']">
            <a>New</a>
          </li>
          <li uk-filter-control="[data-tag='popular']">
            <a>Popular</a>
          </li>
          <li uk-filter-control="[data-tag='featured']">
            <a>Featured</a>
          </li>
        </ul>
      </div>
      <div>
        <ul className="uk-subnav uk-subnav-pill">
          <li
            className="uk-active"
            uk-filter-control="sort: data-date; order: desc"
          >
            <a>Most recent</a>
          </li>
          <li uk-filter-control="sort: data-date">
            <a>Least recent</a>
          </li>
        </ul>
      </div>
    </div>
  </Fragment>
);

class Grid extends PureComponent {
  constructor(props) {
    super(props);
    this.toTop = createRef();
    this.state = {
      isVisible: true,
      essays: this.props.essays
    };
  }

  componentDidMount = async () => {
    let essays;
    try {
      essays = await axios.get(ESSAYS_INDEX);
    } catch (error) {
      console.error(error);
      essays = [];
    }
    this.setState({
      essays
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    // this.handleFilter();
  };

  handleFilter = () => {
    const offsetTop = this.toTop.current.offsetTop;
    if (offsetTop > window.innerHeight) {
      this.setState({
        isVisible: true
      });
    } else {
      if (this.state.isVisible) {
        this.setState({
          isVisible: false
        });
      }
    }
  };

  render() {
    const { essays } = this.state;
    return (
      <div>
        {essays.length > 0 ? (
          <div
            uk-filter="target: .js-filter"
            className="uk-flex uk-flex-column uk-flex-between uk-flex-center"
          >
            <FilterSort handleFilter={this.handleFilter} />
            <div
              className="js-filter uk-grid uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@xl uk-section-muted"
              uk-grid="masonry: true"
              uk-scrollspy="cls: uk-animation-fade; target: > div > .uk-card; delay: 500;"
              ref={this.grid}
            >
              {essays.map(
                ({
                  id,
                  paragraphs,
                  tag,
                  dateUploaded,
                  imageLink,
                  college,
                  applicationStatus
                }) => (
                  <div
                    key={id}
                    data-tag={tag}
                    data-date={dateUploaded.valueOf()}
                  >
                    <Card
                      text={paragraphs[0]}
                      tag={tag}
                      imageLink={imageLink}
                      linkEssay={`/${id}`}
                      college={college}
                      applicationStatus={applicationStatus}
                    />
                  </div>
                )
              )}
            </div>
            <div>
              <div className="uk-section uk-section-muted uk-section-xsmall" />
              <div className="uk-container" />
              <ToTop
                ref={this.toTop}
                classes={this.state.isVisible ? "" : `uk-invisible`}
              />
            </div>
          </div>
        ) : (
          <Empty />
        )}
      </div>
    );
  }
}

Grid.propTypes = {
  essays: PropTypes.arrayOf(ESSAYS_SHAPE).isRequired
};

export default Grid;
