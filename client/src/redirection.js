import history from "./history";

const __STREAM_LIST_LINK__ = "/";
const __NO_ACCESS_LINK__ = "/noAccess";

export const redirectToList = () => {
  history.push(__STREAM_LIST_LINK__);
};

export const redirectToNoAccess = () => {
  history.push(__NO_ACCESS_LINK__);
};
