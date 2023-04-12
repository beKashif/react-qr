import React, {useState, useRef} from 'react'
import './QrCodeGen.css'
import QRCode from 'qrcode.react'
import ReactDOMServer from 'react-dom/server'

const QrCodeGen = () => {

    const [data, setData] = useState('');
    const [qrCodeVisible, setQrCodeVisible] = useState(false);
    const qrCodeRef = useRef(null);

    const handleInputChange = (event) => {
        setData(event.target.value);
        setQrCodeVisible(false);
    }

    const handleGenerateQRCode = (event) => {
        event.preventDefault();
        setQrCodeVisible(true)
    }

    const handleDownloadQRCode = (event) => {
  event.preventDefault();
  const svgString = ReactDOMServer.renderToStaticMarkup(qrCodeRef.current);
  const canvas = document.createElement("canvas");
  const svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
  const url = URL.createObjectURL(svg);
  const image = new Image();
  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    const png = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = png;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  image.src = url;
};


  return (
    <>
    <div className='appbody'>
        <div className="qr-container">
            <h1><span className='react'>React</span> Qr-Code Generator</h1>

            <form className='qr-form'>
                <input 
                type="text"
                className='qr-input'
                value={data}
                onChange={handleInputChange}
                placeholder="Enter data"
                />
                <button
                type='submit'
                className='qr-btn'
                onClick={handleGenerateQRCode}
                >
                    Generate
                </button>

                {qrCodeVisible && data && <QRCode value={data} className="qr-code" ref={qrCodeRef} />}
                
                {qrCodeVisible && data && 
                    <button
                    type='button'
                    className='qr-btn'
                    onClick={handleDownloadQRCode}
                    >
                        Download Png
                    </button>
                }
            </form>
        </div>
    </div>
    </>
  )
}

export default QrCodeGen
