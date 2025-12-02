interface IconProps {
    bg?: string;
    opacity?: string
}
const UserIcon = ({ bg, opacity }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="14" fill={bg} fill-opacity={opacity} />
            <path d="M8.75 18.6667C10.1125 17.2215 11.9624 16.3333 14 16.3333C16.0376 16.3333 17.8875 17.2215 19.25 18.6667M16.625 11.375C16.625 12.8247 15.4497 14 14 14C12.5503 14 11.375 12.8247 11.375 11.375C11.375 9.92525 12.5503 8.75 14 8.75C15.4497 8.75 16.625 9.92525 16.625 11.375Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export default UserIcon