const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Daha detaylı istek loglaması
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  if (Object.keys(req.body).length > 0) {
    // Şifreyi gizleme
    const body = { ...req.body };
    if (body.password) body.password = '***';
    console.log('Request Body:', body);
  }
  
  // Orijinal send metodunu kaydetme
  const originalSend = res.send;
  
  // send metodunu override etme
  res.send = function(body) {
    const responseTime = Date.now() - start;
    console.log(`${new Date().toISOString()} - Response Status: ${res.statusCode} - ${responseTime}ms`);
    
    if (body) {
      try {
        const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
        // Kullanıcı bilgilerini gizleyebiliriz
        if (parsedBody.user && parsedBody.user.password) {
          parsedBody.user.password = '***';
        }
        console.log('Response Body:', parsedBody);
      } catch(e) {
        // JSON parse hatası (önemli değil)
      }
    }
    
    // Orijinal send metodunu çağırma
    return originalSend.call(this, body);
  };
  
  next();
});

// MySQL bağlantı havuzu oluştur
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'recipe_app',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Veritabanı tabloları oluşturuluyor
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('Veritabanına başarıyla bağlandı');
    
    // Users tablosu
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(100),
        lastName VARCHAR(100),
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Veritabanı tabloları başarıyla oluşturuldu');
    connection.release();
  } catch (error) {
    console.error('Veritabanı tabloları oluşturulurken hata:', error);
  }
}

// Test endpoint'i
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'API çalışıyor!' });
});

// Giriş endpoint'i
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email ve şifre gereklidir' });
  }
  
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Geçersiz email veya şifre' });
    }
    
    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Geçersiz email veya şifre' });
    }
    
    // Şifreyi API yanıtından çıkar
    const { password: _, ...userWithoutPassword } = user;
    
    return res.status(200).json({ 
      message: 'Giriş başarılı',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Giriş işlemi sırasında hata:', error);
    return res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

// Kayıt endpoint'i
app.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email ve şifre gereklidir' });
  }
  
  try {
    // Email adresinin kullanılıp kullanılmadığını kontrol et
    const [existingUsers] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Bu email adresi zaten kullanılıyor' });
    }
    
    // Şifreyi hash'le
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Kullanıcıyı veritabanına ekle
    const [result] = await pool.execute(
      'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
      [firstName || '', lastName || '', email, hashedPassword]
    );
    
    const userId = result.insertId;
    
    // Yeni kullanıcıyı getir (şifre olmadan)
    const [newUsers] = await pool.execute(
      'SELECT id, firstName, lastName, email, created_at FROM users WHERE id = ?',
      [userId]
    );
    
    return res.status(201).json({
      message: 'Kullanıcı başarıyla oluşturuldu',
      user: newUsers[0]
    });
  } catch (error) {
    console.error('Kayıt işlemi sırasında hata:', error);
    return res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

// Uygulama başlatıldığında veritabanını hazırla
initializeDatabase();

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Server http://localhost:${port} adresinde çalışıyor`);
}); 