/* A react hook to manage visability of columns in a dataset
 *
 */

import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export type HeadingObject = {
  uid: string,
  label?: string;
  columnWidth?: number;
  hidden?: boolean;
};

const getVisableColumns = (headingsDataList: HeadingObject[]) =>
  headingsDataList.filter((d) => !d.hidden);

const getHiddenColumnIds = (headingsDataList: HeadingObject[]) =>
  headingsDataList.filter((d) => d.hidden).map((d) => d.uid);

export const useColumnVisabilityManager = (headingsDataList: HeadingObject[]) => {
  const [hiddenColumnIds, setHiddenColumnIds] = useState(
    () => getHiddenColumnIds(headingsDataList)
  );
  const [visableColumns, setVisableColumns] = useState(
    () => getVisableColumns(headingsDataList)
  );

  useEffect(() => {
    // TODO: This is refreshing the visible columns
    // TODO: Extract any new columns or removed columns and update state
    // setVisableColumns(getVisableColumns(headingsDataList));
    // setHiddenColumnIds(getHiddenColumnIds(headingsDataList));
  }, [headingsDataList]);

  const handleHideColumn = (columnId: string) => {
    const indexOfHidden = hiddenColumnIds.indexOf(columnId);
    const alreadyHidden = indexOfHidden !== -1;
    const newHiddenList = [...hiddenColumnIds];
    if (alreadyHidden) {
      // remove from hidden list
      newHiddenList.splice(indexOfHidden, 1);
    } else {
      // add to hidden list
      newHiddenList.push(columnId);
      newHiddenList.sort();
    }
    const newVisableColumns = headingsDataList.filter(
      (d) => newHiddenList.indexOf(d.uid) === -1
    );
    setVisableColumns(newVisableColumns);
    setHiddenColumnIds(newHiddenList);
  };
  return {
    handleHideColumn,
    visableColumns,
    hiddenColumnIds,
  };
};

useColumnVisabilityManager.propTypes = {
  headingsDataList: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      hidden: PropTypes.bool,
    })
  ).isRequired,
};
