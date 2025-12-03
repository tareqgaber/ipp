import React from 'react'

const InProgressIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <g filter="url(#filter0_dd_1414_15477)">
                <path d="M4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16Z" fill="#144892" />
                <circle cx="16" cy="16" r="4" fill="white" />
            </g>
            <defs>
                <filter id="filter0_dd_1414_15477" x="0" y="0" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feMorphology radius="4" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1414_15477" />
                    <feOffset />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.470588 0 0 0 0 0.662745 0 0 0 0 0.929412 0 0 0 1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1414_15477" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feMorphology radius="2" operator="dilate" in="SourceAlpha" result="effect2_dropShadow_1414_15477" />
                    <feOffset />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
                    <feBlend mode="normal" in2="effect1_dropShadow_1414_15477" result="effect2_dropShadow_1414_15477" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1414_15477" result="shape" />
                </filter>
            </defs>
        </svg>
    )
}

export default InProgressIcon