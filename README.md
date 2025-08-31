# 📊 ANSD Sénégal – Plateforme de Données et Publications

Une application web moderne permettant de gérer et de consulter les publications, études, enquêtes et données ouvertes de l’**ANSD (Agence Nationale de la Statistique et de la Démographie du Sénégal)**.  
Elle comprend un **frontend Next.js** et un **backend Express/Prisma/PostgreSQL**, avec une authentification par rôles (**Admin** / **Agent**).

---

## 🚀 Fonctionnalités principales

- ✅ **Authentification sécurisée** avec JWT (connexion, déconnexion, gestion des rôles)  
- ✅ **Espace privé** avec tableaux de bord :
  - **Admin Dashboard** : gestion des utilisateurs (CRUD), paramètres globaux, accès à la gestion des contenus
  - **Agent Dashboard** : gestion des publications et données  
- ✅ **Gestion dynamique des publications** : création, modification et téléchargement de documents avec upload de fichiers  
- ✅ **Portail Open Data** : consultation et filtrage des jeux de données par catégorie, format et région  
- ✅ **Portail Publications** : catalogue filtrable, publications phares, navigation par catégories  
- ✅ **Pages thématiques** : Études & Enquêtes, SESN, Actualités  
- ✅ **Interface moderne** avec **Next.js, Shadcn/UI, TailwindCSS** et un design **glassmorphism**

---

## 🏗️ Architecture

```
ansd-website/
│── backend/               # API Express + Prisma
│   ├── src/
│   │   ├── app.js         # Point d'entrée serveur
│   │   ├── routes/        # Routes (auth, users, publications, etc.)
│   │   ├── controllers/   # Logique métier (authController.js, etc.)
│   │   ├── middleware/    # Auth middleware (JWT protect)
│   │   └── utils/         # jwt.js, password.js
│   ├── prisma/
│   │   └── schema.prisma  # Modèle de la base de données
│   └── .env               # Variables d'environnement
│
│── src/                   # Frontend Next.js
│   ├── pages/             # Pages Next.js (index, login, admin, agent, etc.)
│   ├── components/        # Composants réutilisables (UI, Layout, Dashboards)
│   ├── context/           # AuthContext.js (gestion auth côté client)
│   ├── hooks/             # Hooks API (ex: useANSDApi)
│   └── styles/            # Styles globaux Tailwind
│
│── package.json           # Dépendances racine (ou séparées frontend/backend)
│── README.md              # Documentation
```

---

## ⚙️ Installation & Configuration

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/ton-utilisateur/ansd-website.git
cd ansd-website
```

### 2️⃣ Backend (Express + Prisma)
```bash
cd backend
npm install
```

Créer un fichier `.env` :
```env
DATABASE_URL="postgresql://ansduser:password123@localhost:5432/ansd_db?schema=public"
JWT_SECRET="changeme_secret"
```

Initialiser Prisma :
```bash
npx prisma migrate dev --name init
npx prisma db seed   # si tu as un fichier de seed
npx prisma studio    # interface de gestion DB
```

Lancer le serveur backend :
```bash
npm run dev
```
👉 Par défaut : [http://localhost:5000](http://localhost:5000)

---

### 3️⃣ Frontend (Next.js)
```bash
cd ../
npm install
```

Configurer `.env.local` à la racine du frontend :
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

Lancer le frontend :
```bash
npm run dev
```
👉 Par défaut : [http://localhost:3000](http://localhost:3000)

---

## 👥 Rôles & Authentification

- **Admin** :  
  - Gérer les utilisateurs (ajout, modification, suppression)  
  - Accéder à tous les contenus et paramètres  

- **Agent** :  
  - Créer et gérer les publications  
  - Accéder à l’espace privé agent  

---

## 📂 Pages principales

- `/` → Accueil  
- `/login` → Connexion  
- `/admin` → Tableau de bord Administrateur  
- `/agent` → Tableau de bord Agent  
- `/publications` → Catalogue des publications  
- `/open-data` → Catalogue Open Data  
- `/sesn` → Situation Économique et Sociale du Sénégal  
- `/etudes` → Études & Enquêtes  

---

## 🛠️ Technologies utilisées

- **Frontend** : Next.js, React, Shadcn/UI, TailwindCSS, Axios  
- **Backend** : Node.js, Express, Prisma, JWT, Bcrypt  
- **Base de données** : PostgreSQL (via Docker ou local)  
- **Auth** : JWT avec stockage local du token  

---

## 📌 Améliorations futures

- 🔐 Authentification OAuth2 / Keycloak  
- 📊 Tableau de bord interactif avec graphiques temps réel  
- 🗄️ Upload avancé (fichiers volumineux, stockage cloud S3/MinIO)  
- 🌍 Internationalisation (fr/en)  

---

## 👨‍💻 Développement

Lancer backend + frontend en parallèle :
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
npm run dev
```

---

## 📜 Licence

Ce projet est distribué sous licence MIT. Vous êtes libre de l’utiliser, le modifier et le redistribuer.
