import React from 'react';
import PlaceholderIcon from './icons/kg-img-placeholder.svg';

const PlaceHolderText = ({progress, dragActive}) => {
    if (progress.uploading) {
        return (<div className='text-center'>{Math.round(progress?.progress)}% uploaded</div>);
    }
    if (dragActive) {
        return (<p className='text-center font-sans'>Drop it like it's hot!</p>);
    } else {
        return (<p className='mt-2 text-center font-sans text-sm text-grey'>Click to select an image</p>);
    }
};

const ImagePlaceholder = ({uploadRef, progress, handleFiles}) => {
    const [dragActive, setDragActive] = React.useState(false);

    const handleClick = () => {
        uploadRef.current.click();
    };
    
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    return (
        <figure 
            onDragEnter={handleDrag} 
            onDragLeave={handleDrag} 
            onDragOver={handleDrag} 
            onClick={handleClick}
            onDrop={e => handleDrop(e)}
            className={`h-96 cursor-pointer ${dragActive ? 'bg-green' : 'border border-transparent'}`}>
            <div className='h-100 relative flex items-center justify-center border border-grey-100 bg-grey-50'>
                <button className='flex flex-col items-center justify-center p-20'>
                    <PlaceholderIcon className=' h-32 w-32' />
                    <PlaceHolderText progress={progress} dragActive={dragActive} />
                </button>
            </div>
        </figure>
    );
};
export default ImagePlaceholder;
