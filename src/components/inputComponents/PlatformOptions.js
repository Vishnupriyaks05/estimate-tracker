import React from 'react';

const PlatformOptions = () => {
    const platformOptions = [
        "Mobile app",
        "Website",
        "Mobile app and website",
        "UI document",
        "UI document and Design",
        "Graphics Design",
        "Game"
    ];

    return (
        <>
            <option value="">Select Platform</option>
            {platformOptions.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </>
    );
};

export default PlatformOptions;
