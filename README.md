📱 Contacts Manager APIBu proje, Node.js, Express ve MongoDB Atlas kullanılarak geliştirilmiş, kişisel rehber yönetimini sağlayan bir RESTful API uygulamasıdır. GoIT Fullstack Developer programı kapsamında, backend geliştirme ve veritabanı entegrasyonu yetkinliklerini pekiştirmek amacıyla hazırlanmıştır.🚀 ÖzelliklerMongoDB Bulut Entegrasyonu: Veriler MongoDB Atlas üzerinde güvenli bir şekilde depolanır.RESTful Yapı: Standart HTTP metodları (GET, POST vb.) ile uyumlu mimari.Çevre Değişkenleri: Hassas veriler (API anahtarları, DB şifreleri) .env dosyası ile yönetilir.Otomatik Yeniden Başlatma: Geliştirme sürecinde nodemon ile anlık değişiklik takibi.🛠️ Kullanılan TeknolojilerRuntime: Node.jsFramework: Express.jsDatabase: MongoDB AtlasODM: MongooseLinter: ESLint (Google config)Format: Prettier📂 Klasör YapısıPlaintextsrc/
├── db/                 # Veritabanı bağlantı ayarları
├── services/           # Veritabanı sorgu mantığı
├── utils/              # Yardımcı fonksiyonlar (env okuma vb.)
├── index.js            # Uygulama giriş noktası
└── server.js           # Express sunucu yapılandırması
⚙️ Kurulum ve ÇalıştırmaBağımlılıkları Yükleyin:Bashnpm install
Çevre Değişkenlerini Ayarlayın:Ana dizinde bir .env dosyası oluşturun ve şu bilgileri ekleyin:Kod snippet'iPORT=3000
MONGODB_USER=your_user
MONGODB_PASSWORD=your_password
MONGODB_URL=cluster0.xxxx.mongodb.net
MONGODB_DB=contacts_db
Uygulamayı Başlatın:Bashnpm run dev
📡 API EndpointleriMetotEndpointAçıklamaGET/contactsTüm rehber listesini döndürür.GET/contacts/:idBelirli bir kişiyi ID ile getirir.
