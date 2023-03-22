import React, {useState} from 'react'
import './QrCodeGen.css'
import QRCode from 'qrcode.react'

const QrCodeGen = () => {

    const [data, setData] = useState('');
    const [qrCodeVisible, setQrCodeVisible] = useState(false);

    const handleInputChange = (event) => {
        setData(event.target.value);
        setQrCodeVisible(false);
    }

    const handleGenerateQRCode = (event) => {
        event.preventDefault();
        setQrCodeVisible(true)
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

                {qrCodeVisible && data && <QRCode value={data} className="qr-code" />}
            </form>
        </div>
    </div>
    </>
  )
}

export default QrCodeGen