interface MediaRendererProps {
    src: string, 
    idx: number
}

function MediaRenderer({ src, idx }:MediaRendererProps) {
    if (!src) return null;
    const s = src.toLowerCase();
    if (s.startsWith("data:video/") || s.match(/\.(mp4|webm|ogg)(\?.*)?$/)) {
        return (
            <video key={idx} className="flex w-full h-full rounded" controls>
                <source src={src} />
                Your browser does not support the video tag.
            </video>
        );
    }
    if (s.startsWith("data:image/") || s.match(/\.(png|jpe?g|gif|svg)(\?.*)?$/)) {
        return <img key={idx} className="flex w-full h-full rounded" src={src} alt={`post-${idx}`} />;
    }

    return (
        <div className="flex w-full h-full rounded-2xl">
            Error Loading Media   
        </div> 
    )
}

export default MediaRenderer