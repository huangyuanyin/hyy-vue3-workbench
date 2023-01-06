// 此文件用于解决配置环境变量 import.meta.env 时出现 ts 错误 - 类型“ImportMeta”上不存在属性“env”。

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
