# 一、环境准备
# windows系统安装docker desktop桌面端 网络环境一定要稳定 你懂得！
# 检查docker是否安装成功 docker version  或者 docker images

# 二、制作镜像(软件包)
# step1：项目根目录下创建Dockerfile文件 和 .dockerignore文件
# step2：在Dockerfile文件中添加CMD命令
# node版本号   #From 表示从官方的node image中继承，继承版本号为15-alpine

# 三、辅助工具
# 用 Python 操作 Docker 的库。Docker 官方出品的 Python 库，可以用来批量、自动管理镜像   docker-py
FROM node:15-alpine as builder 
# 工作目录
WORKDIR /react-app
# 将当前目录下的代码拷贝到image中去，除了dockerignore文件中的代码
COPY . /react-app
ADD package.json package-lock.json  /react-app/
# 执行命令 
RUN npm install --registry=https://registry.npm.taobao.org 
RUN npm run build
# 拉取nginx镜像文件
FROM nginx:alpine
# 部署前端我们只需要静态生成的静态资源，只需要提取编译后的文件到ngix即可
COPY --from=builder /react-app/build /usr/share/nginx/html

# step3 : 创建Docker镜像  --progress plain 不显示进度条  -t web3-react-app:0.0.1  可以指定版本号/如果不指定版本号，默认为latest  
# docker image build --progress plain -t web3-react-app:0.0.1 .

# 三、启动镜像(软件包)
# 启动镜像，创建一个镜像实例（容器）
# // 将Dockerfile中暴露出来的3000端口映射到本机的1234端口
# docker container run -p 1234:3000 create-react-app-demo 


# 容器启动之后，打开浏览器，访问http://localhost:1234/



# =====================================================================================
#   dokcer 镜像优化--优化镜像文件大小
# =====================================================================================
# 1、docker images  查看镜像软件大小

# 2、不要用http-server，用nginx

# 3、