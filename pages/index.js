import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { trimCanvas } from "trim-canvas";
import publicIp from "public-ip";
import { internalIpV6, internalIpV4 } from "internal-ip";

import SignaturePad from "./SignatureCanvas";
import styles from "./index.module.css";

export default function Sign() {
  const [publicIP, setPublicIP] = useState(null);
  const [privateIP, setPrivateIP] = useState(null);
  const [imageURL, setImageURl] = useState(null);
  const sigCanvas = useRef({});
  const save = () => setImageURl(sigCanvas.current.toDataURL());
  const clear = () => {
    sigCanvas.current.clear();
    setImageURl(null);
  };
  const privateip = async () => setPrivateIP(await internalIpV4());
  const publicip = async () => setPublicIP(await publicIp.v4());

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>signature.rrs.net.br</title>
        <meta name="description" content="rodneyrinaldi services - signature" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.container}>
          <div>
            <h1>Signature</h1>
          </div>
          <div className={styles.space}>
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{ className: "signatureCanvas" }}
            />
          </div>
          <div>
            <button onClick={clear}>Clear</button>
            <button onClick={save}>Signature</button>
            <button onClick={privateip}>PrivateIP</button>
            <button onClick={publicip}>PublicIP</button>
          </div>
          <div>
            {imageURL ? (
              <Image
                id="imgsign"
                alt="sign"
                width={200}
                height={200}
                src={imageURL}
              ></Image>
            ) : null}
          </div>
          <br />
          <div>
            {publicIP ? publicIP : null} &nbsp; &nbsp;
            <span>{privateIP ? privateIP : null}</span>{" "}
          </div>
          <br />
          <div>{imageURL ? imageURL : null}</div>
        </div>
      </main>
    </>
  );
}
