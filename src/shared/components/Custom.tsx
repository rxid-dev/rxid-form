import { FunctionComponent, useEffect } from "react";

export const CustomComponent: FunctionComponent<any> = () => {
  useEffect(() => {
    console.log("INFO: Come from customComponent");
  }, []);
  console.log("Outside customComponent");
  return <>Custom Component</>;
};
