
export type ServiceProps ={
    image: string | StaticImageData;
    text1?: string;
    text2?: string;
    text3?: string;
    text4?: string;
    onClick?: ()=> void;
}

export type SignUpModalProps = {
    onClose: () => void;
}

export type OverlayProps={
    image?: string | StaticImageData;
    message: string;
}

export type LeaderboardEntry = {
    name: string;
    wallet: string;
    deposits: string;
    position: {
        text: string;
        image: StaticImageData | null; // Use StaticImageData for Next.js images
    };
    reward: string;
}