interface ImageProps {
    source: string;
    alt: string;
    identifier?: string;
    disableContextMenu?: boolean;
    disableDrag?: boolean;
}

function Image({ source, alt, identifier, disableContextMenu, disableDrag }: ImageProps) {
    if (identifier === undefined) {
        return <img
            src={source}
            alt={alt}
            onContextMenu={disableContextMenu ? (e) => e.preventDefault() : (e) => e}
            onDragStart={disableDrag ? (e) => e.preventDefault() : (e) => e} />
    }

    return <img
        src={source}
        alt={alt}
        id={identifier}
        onContextMenu={disableContextMenu ? (e) => e.preventDefault() : (e) => e}
        onDragStart={disableDrag ? (e) => e.preventDefault() : (e) => e} />;
}

export default Image;