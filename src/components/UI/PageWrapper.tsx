import React from "react";
import PageHeader from "./PageHeader";

type PageWrapperProps = {
    title: string,
    children: React.ReactNode
}

const PageWrapper = ({ title, children }: PageWrapperProps) => {

    return (
        <>
            <PageHeader text={title} />

            <div className="px-4">
                { children }
            </div>
        </>
    )
}

export default PageWrapper;