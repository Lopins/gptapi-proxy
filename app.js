import http from 'http';
import https from "https";
import fs from "fs";
import app from './api/proxy.js';

const PORT = 443;

// 证书路径
const PRIVATE_KEY = "./certs/key.pem";
const CERT_CHAIN = "./certs/cert.pem";

// 证书
let credentials = null;
try {
    credentials = {
        key: fs.readFileSync(PRIVATE_KEY, 'utf8'),
        cert: fs.readFileSync(CERT_CHAIN, 'utf8')
    };
} catch (_) {
    console.log("未提供SSL证书，使用HTTP协议访问！");
}

const server = credentials ? https.createServer(credentials, app) : http.createServer(app);

server.listen(PORT, () => {
    console.log(`服务正在 ${PORT}端口上 运行`);
});
