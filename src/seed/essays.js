import essay from "./essay";
import {
  NUM_GRID_ARTICLES,
  STATUSES,
  TAGS,
  IMAGE_IDS
} from "../constants";

import momentRandom from "moment-random";

import {
  ID,
  selectRandom
} from "../utils";

export default Array.from(Array(NUM_GRID_ARTICLES), () =>
  Object.assign({}, essay, {
    id: ID(),
    meta: {
      ...essay.meta,
      applicationStatus: selectRandom(STATUSES),
      tag: selectRandom(TAGS),
      dateUploaded: momentRandom(),
      imageNo: IMAGE_IDS.then(ids => {
        return selectRandom(ids);
      })
    }
  })
);