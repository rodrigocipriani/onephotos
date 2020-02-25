import React, { Fragment, useEffect, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Grid, Button } from "@material-ui/core";
import { Crop, Cancel } from "@material-ui/icons";

const CropImageComponent = ({
  id = "",
  file,
  onChange,
  showPreview = false,
  aspect
}) => {
  const DEFAULT_CROP = {
    unit: "px",
    width: 0,
    height: 0,
    aspect: aspect || null
  };
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [crop, setCrop] = useState(DEFAULT_CROP);

  useEffect(() => {
    setImageSrc(URL.createObjectURL(file));
  }, [file]);

  // useEffect(() => {
  //   makeClientCrop(crop);
  // }, [crop]);

  const handleCropFile = () => {
    onChange(croppedImageUrl);
    setCrop({ ...crop, width: 0, height: 0 });
  };

  const handleCancelCrop = () => {
    setCrop({ ...crop, width: 0, height: 0 });
    setCroppedImageUrl(null);
  };

  const handleStartCrop = () => {
    setCrop({ ...crop, width: 500, height: 500 });
  };

  const onImageLoaded = image => {
    setImageRef(image);
  };

  const onCropComplete = crop => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop, percentCrop) => {
    if (crop.width === 0 && crop.height === 0) {
      setCroppedImageUrl(null);
    }
    // You could also use percentCrop:
    setCrop(crop);
    // setCrop(percentCrop);
  };

  const makeClientCrop = async crop => {
    if (imageRef && crop.width && crop.height) {
      const fileCropped = await getCroppedImg(imageRef, crop, "newFile.jpeg");
      setCroppedImageUrl(fileCropped);
    }
  };

  let fileUrl = null;
  const getCroppedImg = (image, crop, fileName) => {
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
        if (fileUrl) {
          URL.revokeObjectURL(fileUrl);
        }
        fileUrl = URL.createObjectURL(blob);
        resolve(fileUrl);
      }, "image/jpeg");
    });
  };

  return (
    <Grid container>
      {imageSrc && (
        <Fragment>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <ReactCrop
              src={imageSrc}
              crop={crop}
              ruleOfThirds
              onImageLoaded={onImageLoaded}
              onComplete={onCropComplete}
              onChange={onCropChange}
              imageStyle={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            {!!croppedImageUrl ? (
              <Fragment>
                <Button onClick={handleCropFile}>
                  <Crop /> Salvar
                </Button>
                <Button onClick={handleCancelCrop}>
                  <Cancel /> Cancelar
                </Button>
              </Fragment>
            ) : (
              <Button onClick={handleStartCrop}>
                <Crop /> Cortar
              </Button>
            )}
          </Grid>
        </Fragment>
      )}
      <Grid item xs={12} style={{ textAlign: "center" }}>
        {croppedImageUrl && showPreview && (
          <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
        )}
      </Grid>
    </Grid>
  );
};

export default CropImageComponent;
