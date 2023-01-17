import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import {
  FilterObjectClass,
  IDocument,
  FilterOption,
  EFilterType,
  EComparisons,
} from '@react_db_client/constants.client-types';
import {
  StyledSelectList,
  IStyledSelectListProps,
} from '@react_db_client/components.styled-select-list';
import {
  FilterId,
  FilterPanel,
} from '@react_db_client/components.filter-manager';
import { useAsyncRequest } from '@react_db_client/async-hooks.use-async-request';
import { Emoji } from '@react_db_client/components.emoji';
import {
  SelectionPreview,
  ISelectionPreviewProps,
} from '@react_db_client/components.selection-preview';
import { useSelectionManager } from './useSelectionManager';
import { SearchAndSelectStyles } from './styles';
import { CustomParser, IHeading, TSearchAndSelectSearchFunction } from './lib';

export interface ISearchAndSelectProps<ResultType extends IDocument>
  extends React.HTMLProps<HTMLInputElement> {
  initialFilters?: FilterObjectClass[];
  availableFilters: { [key: string]: FilterOption };
  searchFunction: TSearchAndSelectSearchFunction<ResultType>;
  headings: IHeading[];
  previewHeadings: IHeading[];
  handleSelect: (
    data: null | ResultType
  ) => void | ((data: null | ResultType[]) => void);
  selectionOverride?: ResultType[];
  autoUpdate?: boolean;
  allowFilters?: boolean;
  allowMultiple?: boolean;
  returnFieldOnSelect?: 'uid' | string;
  showSearchField?: boolean;
  searchFieldTargetField?: string;
  acceptSelectionBtnText?: string;
  showRefreshBtn?: boolean;
  sortBy?: 'uid' | string;
  reverseSort?: boolean;
  reloadKey?: null | number;
  loadOnInit?: boolean;
  noEmptySearch?: boolean;
  liveUpdate?: boolean;
  customParsers?: { [key: string]: CustomParser };
  labelField?: 'label' | string;
  allowSelectionPreview?: boolean;
  autoPreview?: boolean;
  initialSearchValue?: string;
  selectionPreviewProps?: Partial<ISelectionPreviewProps>;
  styledSelectListProps?: Partial<IStyledSelectListProps<ResultType>>;
}
export const EmptyArray = [];

/**
 * Search and Select Component
 * Allows searching using a set of filters then selecting a result and returning to parent component
 *
 * Ensure handleSelect uses the React useCallback hook to avoid render loop
 *
 * The searchFunction argument should be an async function with the following sig:
 * async (activeFilters: <Array[FilterType]>, sortBy: String, searchValue: String) => arrayOf({ uid: <String>})
 *
 */
export const SearchAndSelect = <ResultType extends IDocument>({
  id,
  initialFilters,
  availableFilters, // same as field data
  searchFunction,
  headings,
  previewHeadings,
  handleSelect,
  selectionOverride,
  autoUpdate,
  // forceUpdate,
  allowFilters,
  allowMultiple,
  returnFieldOnSelect = 'uid',
  showSearchField,
  searchFieldTargetField,
  acceptSelectionBtnText,
  showRefreshBtn,
  sortBy: sortByOverride,
  reverseSort = false,
  reloadKey,
  loadOnInit,
  noEmptySearch,
  liveUpdate,
  customParsers,
  labelField = 'label',
  allowSelectionPreview,
  autoPreview,
  initialSearchValue = '',
  selectionPreviewProps = {},
  styledSelectListProps = {},
  ...inputProps
}: ISearchAndSelectProps<ResultType>) => {
  const [showPreview, setShowPreview] = useState(autoPreview);
  const [shouldReload, setShouldReload] = useState(loadOnInit);
  const [singleLoad, setSingleLoad] = useState(false);
  const [activeFilters, setActiveFilters] = useState(
    initialFilters || EmptyArray
  );
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [sortBy] = useState(sortByOverride);
  const [canLoad, setCanLoad] = useState(loadOnInit); // flag to stop loading on init

  const {
    response: results,
    reload,
    loading,
    // hasLoaded,
    error,
  } = useAsyncRequest<ResultType[], any[]>({
    args: [],
    callFn: searchFunction,
    callOnInit: false,
    reloadKey: searchFunction,
  });

  /* Reset the active filters if initial filters changes */
  useEffect(() => {
    setActiveFilters(initialFilters || EmptyArray);
    if (autoUpdate) setShouldReload(true);
  }, [initialFilters]);

  const {
    handleItemSelect,
    currentSelection,
    currentSelectionUid,
    selectAll,
    clearSelection,
    acceptSelection,
  } = useSelectionManager({
    results,
    returnFieldOnSelect,
    allowMultiple,
    selectionOverride,
    handleSelect,
    liveUpdate,
    labelField,
  });

  useEffect(() => {
    // VALIDATE INPUT
    if (!initialFilters || !Array.isArray(initialFilters))
      throw TypeError('Initial Filters should be an array');
  }, [initialFilters]);

  useEffect(() => {
    if (canLoad && shouldReload && (autoUpdate || singleLoad)) {
      setSingleLoad(false);
      if (!noEmptySearch || activeFilters.length > 0 || searchValue) {
        setShouldReload(false);
        if (searchFieldTargetField)
          reload([activeFilters, sortBy, null, reverseSort]);
        if (!searchFieldTargetField)
          reload([activeFilters, sortBy, searchValue, reverseSort]);
      }
    }
  }, [
    shouldReload,
    activeFilters,
    sortBy,
    searchValue,
    reload,
    autoUpdate,
    noEmptySearch,
    searchFieldTargetField,
    reverseSort,
    singleLoad,
  ]);

  useEffect(() => {
    // TODO: Test this
    if (reloadKey && reloadKey > 0) setShouldReload(true);
  }, [reloadKey]);

  const handleSearchFieldInput = (e) => {
    const newSearchString = e.target.value;

    setSearchValue(newSearchString);
    /* We block loading until user input received */
    if (!canLoad) setCanLoad(true);
    setShouldReload(true);

    setActiveFilters((prev) => {
      // Remove previous search string filter and create a new one
      const filtersCopy = prev
        ? [...prev.filter((f) => f.uid !== 'search')]
        : [];
      if (newSearchString && searchFieldTargetField) {
        filtersCopy.push(
          new FilterObjectClass({
            uid: 'search',
            field: searchFieldTargetField,
            value: newSearchString,
            operator: EComparisons.CONTAINS,
            type: EFilterType.text,
          })
        );
        return filtersCopy;
      }
      return filtersCopy;
    });
  };

  const handleAddFilter = (newFilterObj) => {
    setActiveFilters((prev) => prev.concat([newFilterObj]));
    if (!canLoad) setCanLoad(true);
    setShouldReload(true);
  };

  const handleDeleteFilter = (index) => {
    setActiveFilters((prevFilterData) =>
      prevFilterData.filter((f, i) => i !== index)
    );
    if (!canLoad) setCanLoad(true);
    setShouldReload(true);
  };

  const handleUpdateFilter = (index, newFilter) => {
    setActiveFilters((prevFilterData) => {
      const newFilterData = cloneDeep(prevFilterData);
      newFilterData[index] = newFilter;
      return newFilterData;
    });
    if (!canLoad) setCanLoad(true);
    setShouldReload(true);
  };

  const handleClearFilters = () => setActiveFilters([]);

  return (
    <SearchAndSelectStyles>
      <div
        className="searchAndSelect sas_wrap sectionWrapper"
        data-testid={`rdc-sas-${id}`}
      >
        <section
          className="sas_filtersSection"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {allowSelectionPreview && (
            <button
              type="button"
              className={showPreview ? 'button-two' : 'button-one'}
              onClick={() => setShowPreview((prev) => !prev)}
            >
              Show Preview
            </button>
          )}
          {allowFilters && (
            <FilterPanel
              filterData={activeFilters}
              addFilter={(newFilterData: FilterObjectClass) =>
                handleAddFilter(newFilterData)
              }
              deleteFilter={(filterId: FilterId) =>
                handleDeleteFilter(filterId)
              }
              updateFilter={(
                filterId: FilterId,
                newFilterData: FilterObjectClass
              ) => handleUpdateFilter(filterId, newFilterData)}
              clearFilters={handleClearFilters}
              updateFieldTarget={() => {}} // TODO: Implement this
              updateOperator={() => {}} // TODO: Implement this
              fieldsData={availableFilters}
            />
          )}

          {showSearchField && (
            <div
              style={{
                marginLeft: '1rem',
                flexGrow: 1,
                display: 'flex',
              }}
            >
              <label>Search: </label>
              <input
                className="searchField"
                style={{ flexGrow: 1 }}
                aria-label="search"
                type="text"
                placeholder="search..."
                value={searchValue}
                onChange={handleSearchFieldInput}
                {...inputProps}
              />
            </div>
          )}
          {showRefreshBtn && (
            <button
              type="button"
              className="button-reset refreshBtn"
              onClick={() => {
                setShouldReload(true);
                setSingleLoad(true);
              }}
              style={{
                width: '2rem',
                height: '2rem',
                textAlign: 'center',
                fontSize: '1.5rem',
              }}
            >
              <Emoji emoj="🔄" label="refresh" />
            </button>
          )}
        </section>

        <section
          className="sas_resultsSection"
          style={{
            minWidth: '100%',
          }}
        >
          <div className="sas_resultsList">
            {/* TODO: Add option to turn on results title */}
            {/* <h4>Results</h4> */}
            <div
              style={{
                cursor: loading ? 'progress' : 'default',
              }}
            >
              <StyledSelectList<ResultType>
                listInput={results || []}
                headings={headings}
                handleSelect={
                  loading
                    ? ((() => {}) as any)
                    : (uid, data) => handleItemSelect(data, returnFieldOnSelect)
                }
                currentSelection={currentSelectionUid}
                selectionField="uid"
                customParsers={customParsers || {}}
                {...styledSelectListProps}
              />
            </div>
            {loading && (
              <div
                className={`sas_loadingWrap ${loading ? '' : 'hidden'}`}
                style={{ display: loading ? 'initial' : 'none' }}
              >
                Loading results...
              </div>
            )}
            {!loading && (!results || results.length === 0) && (
              <div className="sas_resultsList-empty">
                No results found. Try adjusting the filters above.
              </div>
            )}
            {!loading && error && (
              <div className="sas_resultsList-empty">{error.message}</div>
            )}

            {showPreview && (
              <section className="selectionPreviewWrap">
                <SelectionPreview
                  headings={previewHeadings}
                  currentSelectionData={currentSelection[0] || {}}
                  customParsers={customParsers}
                  {...selectionPreviewProps}
                />
              </section>
            )}
          </div>
        </section>

        {allowMultiple && (
          <section className="sas_manageSelectionSection">
            {!liveUpdate && (
              <button
                type="button"
                className="button-two acceptSelectionBtn"
                onClick={() => acceptSelection()}
                disabled={!currentSelection || currentSelection.length === 0}
              >
                {acceptSelectionBtnText}
              </button>
            )}

            <button
              type="button"
              className="button-one selectAllBtn"
              onClick={selectAll}
            >
              Select All
            </button>
            <button
              type="button"
              className="button-one clearSelectionButton"
              onClick={clearSelection}
            >
              Clear Selection
            </button>
          </section>
        )}
      </div>
    </SearchAndSelectStyles>
  );
};

SearchAndSelect.propTypes = {
  searchFunction: PropTypes.func.isRequired,
  initialFilters: PropTypes.arrayOf(PropTypes.instanceOf(FilterObjectClass)),
  availableFilters: PropTypes.objectOf(
    PropTypes.shape({
      uid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.any,
    })
  ).isRequired,
  handleSelect: PropTypes.func.isRequired,
  headings: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    })
  ).isRequired,
  previewHeadings: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    })
  ),
  selectionOverride: PropTypes.shape({
    uid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }),
  autoUpdate: PropTypes.bool,
  // forceUpdate: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  allowFilters: PropTypes.bool,
  allowMultiple: PropTypes.bool,
  returnFieldOnSelect: PropTypes.string,
  showSearchField: PropTypes.bool,
  searchFieldTargetField: PropTypes.string,
  acceptSelectionBtnText: PropTypes.string,
  showRefreshBtn: PropTypes.bool,
  limitResultHeight: PropTypes.number,
  sortBy: PropTypes.string,
  reverseSort: PropTypes.bool,
  reloadKey: PropTypes.number,
  loadOnInit: PropTypes.bool,
  noEmptySearch: PropTypes.bool,
  liveUpdate: PropTypes.bool,
  autoWidth: PropTypes.bool,
  customParsers: PropTypes.objectOf(PropTypes.func),
  labelField: PropTypes.string,
  allowSelectionPreview: PropTypes.bool,
  autoPreview: PropTypes.bool,
};

SearchAndSelect.defaultProps = {
  selectionOverride: null,
  initialFilters: [],
  previewHeadings: [],
  autoUpdate: false,
  // forceUpdate: false,
  allowFilters: true,
  allowMultiple: false,
  returnFieldOnSelect: 'uid',
  showSearchField: false,
  searchFieldTargetField: null,
  acceptSelectionBtnText: 'Accept Selection',
  showRefreshBtn: false,
  limitResultHeight: null,
  sortBy: 'uid',
  reverseSort: false,
  reloadKey: 0,
  loadOnInit: true,
  noEmptySearch: false,
  liveUpdate: false,
  autoWidth: true,
  customParsers: {},
  labelField: 'label',
  allowSelectionPreview: false,
  autoPreview: false,
};
