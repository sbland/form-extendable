import React from 'react';

import { render } from '@testing-library/react';
import { IFieldComponentProps, IHeadingTextArea } from '@form-extendable/lib';
import { EFilterType } from '@react_db_client/constants.client-types';
import { FieldTextArea } from './field-text-area';
import * as compositions from './field-text-area.composition';
import { defaultVal } from './demo-data';

const onChange = jest.fn();

const defaultProps: IFieldComponentProps<string, IHeadingTextArea> = {
  uid: 'uid',
  unit: 'unit',
  value: defaultVal,
  onChange,
  type: EFilterType.textLong,
  label: 'Text Area',
};

describe('field-text-area', () => {
  beforeEach(() => {
    onChange.mockClear();
  });
  test('Renders', () => {
    render(<FieldTextArea {...defaultProps} />);
  });

  describe('Compositions', () => {
    Object.entries(compositions).forEach(([name, Composition]) => {
      test(name, () => {
        render(<Composition />);
      });
    });
  });
  // describe('Unit Tests', () => {
  //   let component;
  //   let spyRef;
  //   beforeEach(() => {
  //     spyRef = jest.spyOn(React, 'useRef');
  //     spyRef.mockReturnValue({ current: { scrollHeight: 100 } });
  //     component = shallow(<FieldTextArea {...defaultProps} />);
  //   });
  //   describe('Auto size', () => {
  //     test('should autosize to initial content', async () => {
  //       spyRef.mockReturnValue({ current: { scrollHeight: 100 } });
  //       component.update();
  //       const textArea = component.find('textarea');
  //       expect(textArea.props().style.height).toEqual('auto');
  //       // await new Promise((resolve) => setTimeout(resolve));
  //       // TODO: THis works but not in test.
  //       // expect(textArea.props().style.height).toEqual(10);
  //     });
  //   });
  // });
});
