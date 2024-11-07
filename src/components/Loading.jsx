import React from 'react';
import { Atom } from 'react-loading-indicators';

const Loading = () => {
    return (
        <div className="sl:mt-36 mt-16 p-4 w-full flex justify-center items-center">
            <Atom color="#4092d0" size="large" text="درحال بارگذاری... " textColor="" />
        </div>
    );
}

export default Loading;
