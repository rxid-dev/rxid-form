import { FunctionComponent } from "react";

interface Props {
  header?: string;
  children: JSX.Element | Array<JSX.Element>;
}

export const Card: FunctionComponent<Props> = ({ children, header }) => {
  return (
    <div className="card my-4">
      {header && (
        <div className="card-header">
          <h2 className="mb-0">{header}</h2>
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
};
