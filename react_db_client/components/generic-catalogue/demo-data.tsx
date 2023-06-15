/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react';
import {
  EFilterType,
  IDocument,
} from '@react_db_client/constants.client-types';
import { IHeadingButton, THeading } from '@form-extendable/lib';

export const demoHeadingsDataSimple: THeading<any>[] = [
  {
    uid: 'uid',
    label: 'UID',
    type: 'button',
    onClick: (x) => alert(x),
  } as IHeadingButton,
  {
    uid: 'name',
    label: 'Name',
    type: EFilterType.text,
  },
  {
    uid: 'count',
    label: 'Count',
    type: EFilterType.number,
    defaultValue: 7,
    step: 1,
  },
];

export const demoResults: { [k: string]: IDocument & any } = {
  a: {
    uid: 'a',
    label: 'a',
    natid: '100a',
    name: 'Foo',
    count: 3,
    multiplier: 2,
    toggle: true,
    readOnly: "Can't touch me",
    select: 'a',
    hiddenDemoNumber: 3,
    hiddenDemo: 'Hide me',
  },
  ab: {
    // Note string "4" here to check we can pass string numbers without issues
    uid: 'ab',
    label: 'ab',
    natid: '10a',
    name: 'Foobar',
    count: '99',
    def: 3,
    hiddenDemoNumber: 3,
    hiddenDemo: 'Hide me',
  },
  b: {
    uid: 'b',
    label: 'b',
    natid: '50a',
    name: 'Bar',
    description:
      'A really really really long description that needs to fit into a little box!',
    hiddenDemoNumber: 3,
    hiddenDemo: 'Hide me',
  },
  c: {
    uid: 'c',
    label: 'c',
    name: 'C',
    count: 3,
    multiplier: 3,
    expression: 9,
    hiddenDemoNumber: 3,
    hiddenDemo: 'Hide me',
  },
  d: {
    uid: 'd',
    label: 'd',
    name: '',
    hiddenDemoNumber: 3,
    hiddenDemo: 'Hide me',
  },
};

export const demoHeadingsData: THeading<any>[] = [
  {
    uid: 'uid',
    label: 'UID',
    type: EFilterType.button,
    onClick: () => alert(),
    required: true,
    group: 0,
  } as IHeadingButton,
  {
    uid: 'name',
    label: 'Name',
    type: EFilterType.text,
    required: true,
    group: 0,
  },
  {
    uid: 'reference',
    label: 'Reference',
    collection: 'democollection',
    type: EFilterType.reference,
    searchFieldTargetField: 'label',
    allowAddNew: true,
  },
];

export const CustomField = ({ acceptValue, cellData, editMode, focused }) => {
  const actionFunc = useMemo(() => {
    return () => acceptValue(Math.random());
  }, [acceptValue]);

  useEffect(() => {
    if (editMode && focused) {
      actionFunc();
    }
  }, [editMode, focused, actionFunc]);
  return (
    <div className="dataTableCellData dataTableCellData-button">
      <button type="button" onClick={actionFunc}>
        {cellData}
      </button>
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
export const customFilter = (value, expression, targetValue, item) => {
  if (Math.abs(value - targetValue) < 0.3) return true;
  return false;
};
