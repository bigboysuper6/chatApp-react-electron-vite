// import svg as a react component
declare module "*.svg" {
    import * as React from "react";
    const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >;

    export { ReactComponent };
}
