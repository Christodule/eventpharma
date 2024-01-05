// QRCodeGenerator.js
import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ userData }) => {
  return (
    <div>
      <QRCode value={JSON.stringify(userData)} />
    </div>
  );
};

export default QRCodeGenerator;
