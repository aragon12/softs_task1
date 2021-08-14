
import { IconButton, Tooltip, Button, Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import { useState } from 'react';
import './App.css';

function App() {
  const [imgSrc, setImgsrc] = useState();
  const [imgSrcH, setImgsrcH] = useState();
  const [imgSrcW, setImgsrcW] = useState();
  const [showImg, setShowImg] = useState(false);
  const [imgRotation, setImgRotation] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState(false);

  const fixH = 480;
  const toolTipDelay = 700;

const isImage = (file) => {
  return file['type'].split('/')[0]==='image';
}

const uploadHandler = (e) => {
 if(!e.target.files.length){
   setIsOpen(false);
   setShowControls(false);
   setShowImg(false);
   setImgsrc(undefined);
    return;
  }

  const file = e.target.files[0];
  if(!isImage(file)) {
    setIsOpen(false);
    setShowControls(false);
    setShowImg(false);
    setImgsrc(undefined);
    setAlert(true);
    return;
  }

  setShowImg(false);
  setIsOpen(true);
  setAlert(false);
  setImgsrc(URL.createObjectURL(file))
}

const imgResize = (natH, natW, newH) => {
  return ~~((newH * natW)/natH);
}

const openHandler = (e) => {
  if(!imgSrc) {
    return;
  }
  var i = new Image();
  i.src = imgSrc;
  console.log(i);
  i.onload = () => {
    setImgsrcH(fixH);
    setImgsrcW(imgResize(i.naturalHeight, i.naturalWidth, fixH));
  }
  setImgRotation(0);
  setIsOpen(false);
  setShowImg(true);
  setShowControls(true);
}

const closeHandler = (e) => {
  setShowControls(false);
  setShowImg(false);
  setIsOpen(true);
}

const zoomHandler = (fact) => (e) => {
  const newH = imgSrcH + fact;
  const newW = imgResize(imgSrcH, imgSrcW, newH);
  setImgsrcH(newH);
  setImgsrcW(newW);
}

const rotateHandler = (angle) => (e) => {
  const newImgRotation = imgRotation + angle;
  setImgRotation(newImgRotation);
}

  return (
          <div className="maincont">
            <div class="inst_cont">
              <span style={{paddingRight: '24px'}}>To start, first upload an image:</span>
              <input type="file" accept="image/*" onChange={uploadHandler} />
              <Button color="primary" onClick={openHandler} disabled={!isOpen} >Open</Button>
              {showImg && <Button color="primary" onClick={closeHandler} >Close</Button>}<br />
              </div>

              <div className="img_cont" >
                <div className="img_frame" >
                  <Collapse in={alert}>
                    <Alert severity="error">Not an image file</Alert>
                  </Collapse>
                  {showImg && <img alt="" style={{transform: `rotate(${imgRotation}deg)`}} src={imgSrc} height={imgSrcH} width={imgSrcW} />}
                </div>
              </div>
              <div className="control_cont" >
              <Tooltip title="Rotate Left" enterDelay={toolTipDelay}>
                  <IconButton color="primary" onClick={rotateHandler(-90)} disabled={!showControls}>
                    <RotateLeftIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              <Tooltip title="Rotate Right" enterDelay={toolTipDelay}>
                  <IconButton color="primary" onClick={rotateHandler(90)} disabled={!showControls}>
                    <RotateRightIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Zoom in" enterDelay={toolTipDelay}>
                  <IconButton color="primary" onClick={zoomHandler(50)} disabled={!showControls}>
                    <ZoomInIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Zoom out" enterDelay={toolTipDelay}>
                  <IconButton color="primary" onClick={zoomHandler(-50)} disabled={!showControls}>
                    <ZoomOutIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Restore" enterDelay={toolTipDelay}>
                  <IconButton color="primary" onClick={zoomHandler(fixH - imgSrcH)} disabled={!showControls}>
                    <YoutubeSearchedForIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </div>
          </div>
  );
}

export default App;
