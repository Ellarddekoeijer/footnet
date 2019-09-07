//react
import React from "react";

//redux
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import "./../App.css";

//fontawsome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck} from '@fortawesome/free-solid-svg-icons'

//actions
import {playerAvatar} from "../actions/playerActions";

class CropImage extends React.Component {
    state = {
        src: null,
        crop: {
            unit: "%",
            x: 0,
            y: 0,
            aspect: 1/1
        },
        file: null
    };

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                this.setState({ src: reader.result })
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    userSubmit = () => {
        this.props.toggle();
    }

    onCropChange = (crop, percentCrop) => {
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                "newFile.jpeg"
            );
            this.setState({ croppedImageUrl });
            this.props.playerAvatar(this.state.file);
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error("Canvas is empty");
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                var file = new File([blob], fileName, {type:blob.type});
                this.setState({file:file});
                resolve(this.fileUrl);
            }, "image/jpeg");
        });
    }

    render() {
        const { crop, croppedImageUrl, src } = this.state;

        return (
            <div className="cropContainer">
                <div>
                    <div className="upload-btn-wrapper">
                        <button className="defaultButton">Pasfoto</button> Optioneel
                        <input type="file" name="myfile" onChange={this.onSelectFile}/>
                    </div>
                </div>

                {src && (

                    <ReactCrop
                        src={src}
                        x={0}
                        y={0}
                        crop={crop}
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                        maxHeight={200}
                        maxWidth={200}
                        minWidth={50}
                        minHeight={50}
                        keepSelection={true}
                    >

                    </ReactCrop>


                )}
                {croppedImageUrl && (
                    <div className="float-left">
                        <img className="crop_preview" alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
                        <div onClick={() => this.userSubmit()} className="imageDone"><FontAwesomeIcon icon={faCheck} /></div>
                    </div>

                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        playerAvatar: (avatar) => dispatch(playerAvatar(avatar)),
    }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(CropImage);
