# 使用官方 node.js LTS版本作为基础镜像
FROM node:18-alpine

# 安装 pnpm
RUN npm install -g pnpm

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package*.json 和 pnpm-lock.yaml 文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖项
RUN pnpm install

# 复制应用程序源代码
COPY . .

# 构建 Nestjs 应用
RUN pnpm run build

# 使用非 root 用户
USER node

# 暴露应用程序端口
EXPOSE 3000

CMD [ "node", "dist/main.js"]