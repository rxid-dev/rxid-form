import { FunctionComponent } from "react";

interface Props {
  header?: string;
  children: JSX.Element | Array<JSX.Element>;
  headerRight?: () => JSX.Element | Array<JSX.Element>;
}

export const Card: FunctionComponent<Props> = ({
  children,
  header,
  headerRight,
}) => {
  return (
    <div className="card my-4">
      {header && (
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="mb-0">{header}</h2>
          {headerRight && headerRight()}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
};
