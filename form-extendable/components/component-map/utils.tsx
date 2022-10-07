import React from 'react';
import { FieldReadOnly } from '@form-extendable/fields.field-read-only';

type OrProps<C> = C extends React.FC<any> ? React.ComponentProps<C> : C;
type OrComponent<C> = C extends React.FC<any> ? C : React.FC<C>;

export const allowReadOnly =
  <C extends React.FC<any> | { [id: string]: any }>(
    Component: OrComponent<C>
  ) =>
  (props: OrProps<C>) =>
    props.readOnly ? (
      <FieldReadOnly {...(props as any)} />
    ) : (
      <Component {...props} />
    );

// const boo1 = allowReadOnly<IHeadingFile<string>>((props) => <>Hello</>);
// const boo1 = allowReadOnly<typeof FieldText>((props) => <>Hello</>);
// const fboo2 = allowReadOnly(FieldText);

// // const Component = ({ label }) => <>{label}</>;
// // const Foo =
// //   <C extends React.FC<any>>(Component: C) =>
// //   (props: React.ComponentProps<C>) =>
// //     <Component {...(props as any)} />;

// // const foo1 = Foo(Component);
// // const foo2 = Foo<typeof Component>(Component);
// // const foo3 = Foo<typeof Component>((props) => <>{props.label}</>);

// const Component = ({ label }) => <>{label}</>;
// const ComponentB: React.FC<
//   IFieldComponentProps<string> & IHeadingOther<string>
// > = (props) => <>{props.uid}</>;

// const Foo =
//   <C extends React.FC<any> | { [id: string]: any }>(
//     Component: OrComponent<C>
//   ) =>
//   (props: OrProps<C>) =>
//     <Component {...(props as any)} />;

// const foo1 = Foo(Component);
// const foo2 = Foo<typeof Component>(Component);
// const foo3 = Foo<typeof Component>((props) => <>{props.label}</>);
// const foo4 = Foo<typeof ComponentB>((props) => <>{props.label}</>);
// const foo4 = allowReadOnly<typeof ComponentB>((props) => <>{props.label}</>);
