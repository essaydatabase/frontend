import PropTypes from 'prop-types';
import axios from 'axios';
import US_COLLEGES_UNIVERSITIES from './data/us_colleges.json';

export const EMPTY_FUNC = () => {};
export const EMPTY_OBJ = {};
export const NUM_ARTICLES = 40;
export const NUM_YEARS_BACK = 100;
export const FACEBOOK_PAGE_LINK = '';
export const TWITTER_PAGE_LINK = '';
export const ACCEPTED_FILE_TYPES = [
  ".doc",
  ".docx",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "application/pdf"
].join(",");

// app info
export const LOGO = "essay db";
export const COPYRIGHT = `© ${new Date().getFullYear()} ${LOGO}`;
export const SLOGAN = "collection of college application essays";
export const ABOUT = ` Compiling a global collection of college application essays and personal statements.`;


// options
export const TAGS = ["new", "popular", "featured"];

export const STATUSES = [
  "pending",
  "accepted",
  "rejected",
  "waitlisted"
];

export const COLLEGES = US_COLLEGES_UNIVERSITIES.map(college => college.institution);

const MAX_TRIES = 3;

export function GET_IMAGE(tries = 0) {
  return new Promise((resolve, reject) => {
    axios.get('https://source.unsplash.com/random').then(res => resolve(res.data)).catch(err => {
      if (tries === MAX_TRIES) {
        return reject(err);
      }
      console.error(` error happened: ${err}. \n now retrying`);
      return GET_IMAGE(tries + 1);
    })
  });
}

// export function GET_IMAGES() {
//   return Array(NUM_ARTICLES).keys().map(idx => GET_IMAGE());
// }

export const ESSAYS_SHAPE = PropTypes.shape({
  id: PropTypes.string.isRequired,
  paragraphs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  prompt: PropTypes.string.isRequired,
  college: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  yearApplied: PropTypes.instanceOf(Date),
  author: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  applicationStatus: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  dateUploaded: PropTypes.instanceOf(Date),
  imagePromise: PropTypes.func.isRequired,
}).isRequired;

// TODO LEGACY
// function getSearchResults(collegeName) {
//   if (!collegeName) {
//     return Promise.resolve({
//       options: []
//     });
//   }
//   return axios
//     .get(`https://universities.hipolabs.com/search?name=${collegeName}`)
//     .then(res => JSON.parse(res))
//     .then(data => data.data.map(c => c.name))
//     .then(options => ({
//       options
//     }))
//     .catch(err => console.error(err));
// }

// function _getImages() {
//   axios
//     .get("https://picsum.photos/list")
//     .then(res => res.data)
//     .catch(function () {
//       console.error("error");
//     });
// }