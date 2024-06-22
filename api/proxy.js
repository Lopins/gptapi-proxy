import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';

const app = express();

// API反向代理地址
const PROXY_TARGETS = [
    /**************************************** 官方大模型API ****************************************/
    //OpenAI ChatGPT 官方API反代: https://chat.openai.com
    { 
        path: "/api/proxy/chatgpt", 
        target: "https://api.openai.com" 
    },                                
    //谷歌 双子座Gemini 官方API反代: https://gemini.google.com
    { 
        path: "/api/proxy/gemini", 
        target: "https://generativelanguage.googleapis.com" 
    },             
    //Anthropic Claude 官方API反代: https://console.anthropic.com
    { 
        path: "/api/proxy/claude", 
        target: "https://api.anthropic.com" 
    },
    //ByteDance Coze 官方API反代: https://api.coze.com
    { 
        path: "/api/proxy/coze", 
        target: "https://api.coze.com" 
    },
    //Groq Groq 官方API反代: https://api.groq.com
    { 
        path: "/api/proxy/groq", 
        target: "https://api.groq.com" 
    },
    //Perplexity Perplexity 官方API反代:  https://api.perplexity.ai
    { 
        path: "/api/proxy/perplexity", 
        target: "https://api.perplexity.ai" 
    },
]

// API反向代理 路由
PROXY_TARGETS.forEach(({ path, target }) => {
    app.use(path, createProxyMiddleware({
        target: target,
        changeOrigin: true,
        pathRewrite: {
            [`^${path}`]: '',
        }
    }));
});

// 固定主页
app.get('/', async (_, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

export default app;
