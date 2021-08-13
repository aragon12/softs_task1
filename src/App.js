
import { IconButton, Tooltip, Button } from '@material-ui/core';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import { useState } from 'react';
import './App.css'

function App() {
  const [imgSrc, setImgsrc] = useState();
  const [imgSrcH, setImgsrcH] = useState();
  const [imgSrcW, setImgsrcW] = useState();
  const [showImg, setShowImg] = useState(false);


const uploadHandler = (e) => {
 if(!e.target.files.length){
   setImgsrc(undefined);
   setShowImg(false);
    return;
  }
  const file = e.target.files[0];
  setShowImg(false);
  setImgsrc(URL.createObjectURL(file))
}

const imgResize = (natH, natW) => {
  return ~~((480 * natW)/natH);
}

const openHandler = (e) => {
  if(!imgSrc) {
    return;
  }
  var i = new Image();
  i.src = imgSrc;
  console.log(i);
  i.onload = () => {
      setImgsrcH(480);
      setImgsrcW(imgResize(i.naturalHeight, i.naturalWidth));
  }
  setShowImg(true);
}

const closeHandler = (e) => {
  setShowImg(false);
}

const zoomFact = 100;
const zoomInHandler = (e) => {
  setImgsrcH(imgSrcH + zoomFact);
  setImgsrcW(imgSrcW + zoomFact );
}

const zoomOutHandler = (e) => {
  setImgsrcH(imgSrcH - zoomFact);
  setImgsrcW(imgSrcW - zoomFact);
}

  return (
          <div className="maincont">
            <div class="inst_cont">
              <input type="file" accept="image/*" onChange={uploadHandler} />
              <Button color="primary" onClick={openHandler} >Open</Button>
              {showImg && <Button color="primary" onClick={closeHandler} >Close</Button>}
              </div>

              <div className="img_cont" >
                <div className="img_frame" >
                  {showImg && <img src={imgSrc} height={imgSrcH} width={imgSrcW} />}
                </div>
              </div>
              {showImg && <div className="control_cont" >
                <Tooltip title="Zoom in" enterDelay={1000}>
                  <IconButton color="primary" onClick={zoomInHandler}>
                    <ZoomInIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Zoom out" enterDelay={1000}>
                  <IconButton color="primary" onClick={zoomOutHandler}>
                    <ZoomOutIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </div>}
          </div>
  );
}

export default App;