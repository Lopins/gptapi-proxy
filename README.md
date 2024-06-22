# <center>api-proxy</center>

海外常用大模型API代理：一个域名代理ChatGPT、Gemini、Claude、Coze、Groq、Perplexity等多个大模型API接口，支持流式输出，支持无服务器部署。

## 快速开始

- 安装

  ```bash
  git clone git@github.com:Lopins/api-proxy.git
  cd api-proxy
  npm install
  ```

- 配置证书

  `app.js`

  ```js
  const PRIVATE_KEY = "./certs/key.pem";
  const CERT_CHAIN = "./certs/cert.pem";
  ```

- 运行

  ```bash
  npm start
  ```

## 以 Systemctl 方式运行

- 安装

  ```bash
  git clone git@github.com:Lopins/api-proxy.git
  cd api-proxy
  sh install.sh
  ```

- 配置证书

  `app.js`

  ```js
  const PRIVATE_KEY = "./certs/key.pem";
  const CERT_CHAIN = "./certs/cert.pem";
  ```

- 启动服务 & 配置自启动

  ```bash
  sudo systemctl start api-proxy
  sudo systemctl enable api-proxy
  ```

  启动失败

  ```bash
  vim /etc/sysconfig/selinux
  ```

  ```
  SELINUX=disabled
  ```

## Vercel部署

[![](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=git@github.com:lopins/api-proxy.git)

## Netlify部署

[![](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/lopins/api-proxy)

## API使用示例

- [x] **ChatGPT**：https://proxyhost/api/proxy/chatgpt

  ```bash
  curl \
    -H "Authorization: Bearer ${API_KEY}" \
    -H "Content-Type: application/json" \
    -d '{
      "model":"gpt-4o",
      "max_tokens":1024,
      "stream":true,
      "messages":[
        {
          "role":"system",
          "content":"You are a helpful assistant."
        },
        {
          "role":"user",
          "content":"Who won the world series in 2020?"
        },
        {
          "role":"assistant",
          "content":"The Los Angeles Dodgers won the World Series in 2020."
        },
        {
          "role":"user",
          "content":"YOUR_PROMPT"
        },
      ]
    }' \
    -X POST https://proxyhost/api/proxy/chatgpt/v1/completions
  ```
    
  - [开发指南](https://platform.openai.com/docs/api-reference/chat/create)

  - [Assistants](https://platform.openai.com/docs/api-reference/assistants/createAssistant)

- [x] **Gemini**：https://proxyhost/api/proxy/gemini

  ```bash
  curl \
    -H "x-goog-api-key: ${API_KEY}" \
    -H "Content-Type: application/json" \
    -d '{
      "generationConfig":{
        "response_mime_type": "application/json",
        "maxOutputTokens":4096,
      },
      "contents":[
        {
          "role":"user",
          "parts":[
            {
              "text":"Write the first line of a story about a magic backpack."
            }
          ]
        },
        {
          "role":"model",
          "parts":[
            {
              "text":"In the bustling city of Meadow brook, lived a young girl named Sophie. She was a bright and curious soul with an imaginative mind."
            }
          ]
        },
        {
          "role":"user",
          "parts":[
            {
              "text":"YOUR_PROMPT"
            }
          ]
        },
      ]
    }' \
    -X POST https://proxyhost/api/proxy/gemini/v1beta/models/gemini-pro:streamGenerateContent
  ```

  - [开发指南](https://ai.google.dev/gemini-api/docs/get-started/tutorial?lang=web&hl=zh-cn)

  - [回答格式输出](https://ai.google.dev/gemini-api/docs/models/gemini?hl=zh-cn#gemini-1.5-pro)： 

    JSON: 在请求参数中加入 `"generationConfig": {"response_mime_type": "application/json",}`

    Recipe列表: 在请求参数中加入：

    ``` json
    "generationConfig": {
      "responseMimeType": "application/json",
      "responseSchema": {
        "type": "ARRAY",
        "items": {
          "type": "OBJECT",
          "properties": {
            "recipe_name": {
              "type": "STRING"
            }
          }
        }
      }
    }
    ```

  - [设置模型参数和过滤规则](https://ai.google.dev/api/rest/v1beta/SafetySetting?hl=zh-cn#HarmBlockThreshold)：

  ``` json
  safetySettings = {
      "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      "threshold": "BLOCK_NONE"
  }
  generationConfig = {
      "stopSequences": [
          "Title"
      ],
      "temperature":1.0,
      "maxOutputTokens":4096,
      "topP":0.8,
      "topK":10
  }
  ```

  - [接口类型]： :generateContent / :streamGenerateContent

  ~~- [python 使用 Google Gemini API](https://www.cnblogs.com/passion2021/p/17908457.html)~~

- [x] **Claude**：https://proxyhost/api/proxy/claude

  ```bash
  curl \
    -H "x-api-key: ${API_KEY}" \
    -H "Content-Type: application/json" \
    -d '{
      "model":"claude-3-opus",
      "max_tokens":1024,
      "stream":true,
      "messages":[
        {
          "role":"user",
          "content":"You are a helpful assistant."
        },
        {
          "role":"assistant",
          "content": "Who won the world series in 2020?"
        },
        {
          "role":"user",
          "content":"YOUR_PROMPT"
        },
      ]
    }' \
    -X POST https://proxyhost/api/proxy/claude/v1/messages
  ```

  - [开发指南](https://docs.anthropic.com/zh-CN/api/messages)

  - [升级到 Messages API](https://docs.anthropic.com/zh-CN/docs/upgrading-to-the-messages-api)

  - [接口类型]： stream:true /  stream:fasle

- [x] **Coze**：https://proxyhost/api/proxy/coze

  ```bash
  curl \
    -H "Authorization: ${API_KEY}" \
    -H "Content-Type: application/json" \
    -d '{
        "bot_id":"735884567716*******",
        "user":"29032201862***",
        "conversation_id":"123",
        "stream":true,
        "chat_history":[
          {
            "role":"user",
            "content":"你好",
            "content_type":"text"
          },
          {
            "role":"assistant",
            "type":"text",
            "content":"你好,请问有什么可以帮助你的吗？",
            "content_type":"text"
          },
        ],
        "prompt":"YOUR_PROMPT"
      }' \
    -X POST https://proxyhost/api/proxy/coze/v2/chat
  ```

  - [开发指南]https://www.coze.com/docs/developer_guides/chat?_lang=zh#305971bf

  - [接口类型]： stream:true / stream:false

- [x] **Groq**：https://proxyhost/api/proxy/groq

 ```bash
  curl \
    -H "Authorization: Bearer ${API_KEY}" \
    -H "Content-Type: application/json" \
    -d '{
      "model":"llama3-70b-8192",
      "max_tokens":1024,
      "stream":true,
      "messages":[
        {
          "role":"system",
          "content":"You are a helpful assistant."
        },
        {
          "role":"user",
          "content":"Who won the world series in 2020?"
        },
        {
          "role":"assistant",
          "content":"The Los Angeles Dodgers won the World Series in 2020."
        },
        {
          "role":"user",
          "content":"YOUR_PROMPT"
        },
      ]
    }' \
    -X POST https://proxyhost/api/proxy/groq/openai/v1/chat/completions
  ```

- [x] **Perplexity**：https://proxyhost/api/proxy/perplexity