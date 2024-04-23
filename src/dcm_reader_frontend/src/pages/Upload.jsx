// src/pages/Upload.jsx
import React, { useState } from 'react';
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as dcmUploaderIdl, canisterId as dcmUploaderCanisterId } from "declarations/dcm_reader_backend";

const agent = new HttpAgent({ host: "https://omnp4-sqaaa-aaaab-qab7q-cai.icp0.io/" });
const DcmUploader = Actor.createActor(dcmUploaderIdl, { agent, canisterId: dcmUploaderCanisterId });

function Upload() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            const result = await DcmUploader.uploadFile(file.name, uint8Array);
            alert(result); // 캐니스터에서 받은 응답을 표시
        } else {
            alert('Please select a file first.');
        }
    };

    return (
        <div>
            <h2>Upload DCM File</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload to Canister</button>
        </div>
    );
}

export default Upload;
