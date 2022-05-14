import React from 'react';
import {Link} from 'react-router-dom';

type GraphicMessageProps = {
    illustration: string,
    title: string,
    text: string,
    link?: {
        path: string,
        text: string
    }
}

const GraphicMessage = ({illustration, title, text, link}: GraphicMessageProps) => {

    return (
        <div className="mt-4">
            <img src={illustration} alt={text} className=""/>
            <div className="px-2 mt-8">
                <h3 className="text-xl">{title}</h3>
                <p className="my-2">
                    {text}
                    {link &&
                        <span className="ml-1">
                            <Link to={link.path} className="text-emerald-400">{link.text}</Link>
                        </span>
                    }
                </p>
            </div>
        </div>
    )
}

export default GraphicMessage;