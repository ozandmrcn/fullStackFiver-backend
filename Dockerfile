# 1. Aşama: Uygulamayı derleme (Build stage)
FROM node:22-alpine AS builder

# Çalışma dizinini ayarla
WORKDIR /app

# Bağımlılık dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle (Sadece derleme için gerekli olanlar dahil)
RUN npm install

# Tüm proje dosyalarını kopyala
COPY . .

# TypeScript kodunu derle
RUN npm run build

# 2. Aşama: Çalışma ortamı (Production stage)
FROM node:22-alpine

# Çalışma dizinini ayarla
WORKDIR /app

# Sadece production bağımlılıklarını yüklemek için package.json kopyala
COPY package*.json ./

# Sadece production bağımlılıklarını yükle (daha küçük image boyutu için)
RUN npm install --omit=dev

# Derlenmiş dosyaları (dist klasörünü) builder aşamasından kopyala
COPY --from=builder /app/dist ./dist

# Uygulamanın çalışacağı portu belirt (Uygulama kodundaki port ile aynı olmalı)
EXPOSE 4000

# Uygulamayı başlat
CMD ["npm", "start"]
