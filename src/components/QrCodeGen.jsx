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
        const blob = new Blob([svgString], {type: 'image/svg+xml'});
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

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
                    className='qr-download-btn'
                    onClick={handleDownloadQRCode}
                    >
                        Download
                    </button>
                }
            </form>
        </div>
    </div>
    </>
  )
}

export default QrCodeGen
