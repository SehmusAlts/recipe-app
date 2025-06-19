# Recipe App Sunucu

Bu sunucu, React Native Recipe App uygulaması için kimlik doğrulama servislerini sağlar.

## Kurulum

1. Gerekli paketleri yükleyin:
```
npm install
```

2. MySQL veritabanınızı oluşturun:
```sql
CREATE DATABASE recipe_app;
```

3. `.env` dosyasını düzenleyin:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=recipe_app
DB_PORT=3306
```

4. Sunucuyu başlatın:
```
npm run dev
```

## API Endpoints

### Kayıt Olmak
```
POST /api/register
```
İstek gövdesi:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Giriş Yapmak
```
POST /api/login
```
İstek gövdesi:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

## Notlar

- Bu sunucu, React Native uygulamasında MySQL doğrudan kullanılamadığı için bir ara sunucu görevi görür.
- Gerçek bir ürün için, JWT token kimlik doğrulama gibi ek güvenlik önlemleri eklenmelidir. 