import React from "react";


function RoomImg({ handleImageChange,imageUrls }) {
    return (
        <div>
            <div className="createLod-imgContainer">
                {[...Array(12)].map((_, index) => (
                    <React.Fragment key={index}>
                        <label htmlFor={`file-upload${index + 1}`}>
                            {imageUrls[index] ? (
                                <img style={{ width: '200px', height: '200px', borderRadius: '10px' }}
                                    src={imageUrls[index]} alt="이미지" />
                            ) : (
                                '+'
                            )}
                        </label>
                        <input
                            id={`file-upload${index + 1}`}
                            type="file"
                            name={`lod_image${index + 1}`}
                            onChange={(e) => handleImageChange(e, index)}
                        />
                    </React.Fragment>
                ))}
            </div>

        </div>
    );
}
export default RoomImg;