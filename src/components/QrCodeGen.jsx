import React, {useState, useRef} from 'react';
import './QrCodeGen.css';
import QRCode from 'qrcode.react';
import ReactDOMServer from 'react-dom/server';

const QrCodeGen = () => {
  const [data, setData] = useState('');
  const [qrCodeVisible, setQrCodeVisible] = useState(false);
  const qrCodeRef = useRef(null);

  const handleInputChange = (event) => {
    setData(event.target.value);
    setQrCodeVisible(false);
  };

  const handleGenerateQRCode = (event) => {
    event.preventDefault();
    setQrCodeVisible(true);
  };

const handleDownloadQRCode = (event) => {
  event.preventDefault();
  const canvas = document.getElementById("qrcode-canvas");
  const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  const downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = "qrcode.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
  
  const handleSvgDownloadQRCode = (event) => {
  event.preventDefault();
  const svgString = ReactDOMServer.renderToString(<QRCode value={data} />);
  const blob = new Blob([svgString], {type: "image/svg+xml"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "qrcode.svg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};



  return (
    <>
      <div className='appbody'>
        <div className='qr-container'>
          <h1>
            <span className='react'>React</span> Qr-Code Generator
          </h1>

          <form className='qr-form'>
            <input
              type='text'
              className='qr-input'
              value={data}
              onChange={handleInputChange}
              placeholder='Enter data'
            />
            <button
              type='submit'
              className='qr-btn'
              onClick={handleGenerateQRCode}
            >
              Generate
            </button>

            {qrCodeVisible && data && (
              <>
              <QRCode value={data} className="qr-code" id="qrcode-canvas" />

                <button
                  type='button'
                  className='qr-btn'
                  onClick={handleDownloadQRCode}
                >
                  Download as PNG
                </button>

<button
                  type='button'
                  className='qr-btn'
                  onClick={handleSvgDownloadQRCode}
                >
                  Download as PNG
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default QrCodeGen;
