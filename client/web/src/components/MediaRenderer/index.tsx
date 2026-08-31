interface MediaRendererProps {
    src: string | undefined, 
}

function MediaRenderer({ src }: MediaRendererProps) {
    if (!src) return null;
    const s = src.toLowerCase();
    if (s.startsWith("data:video/") || s.match(/\.(mp4|webm|ogg)(\?.*)?$/)) {
        return (
            <video className="flex w-full h-full rounded object-contain" controls>
                <source src={src} />
                Your browser does not support the video tag.
            </video>
        );
    }
    if (s.startsWith("data:image/") || s.match(/\.(png|jpe?g|gif|svg)(\?.*)?$/)) {
        return <img className="flex w-full h-full rounded object-cover" src={src} alt={`post-img`} />;
    }

    return (
        <div className="flex w-full h-full rounded-2xl">
            Error Loading Media   
        </div> 
    )
}

export default MediaRenderer