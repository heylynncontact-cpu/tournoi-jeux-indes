# 🎮 Tournoi des Jeux Indés - HeyLynn

Mini-site interactif pour voter sur les jeux indépendants et déterminer le prochain Let's Play de la chaîne HeyLynn.

## 🌐 Demo

Site en ligne : [https://heylynncontact-cpu.github.io/tournoi-jeux-indes/](https://heylynncontact-cpu.github.io/tournoi-jeux-indes/)

---

## 📋 Structure du projet

```
tournoi-jeux-indes/
├── index.html              # Page d'accueil
├── liste.html              # Liste des jeux
├── vote-berlin.html        # Vote Berlin Appartement
├── vote-ritual.html        # Vote Ritual of Raven
├── vote-fabledom.html      # Vote Fabledom
├── vote-lakeburg.html      # Vote Lakeburg Legacies
├── vote-newstower.html     # Vote News Tower
├── merci.html              # Page de remerciement
├── css/
│   └── style.css          # Styles responsive
├── js/
│   └── vote.js            # Logique de vote + Firebase
└── images/                 # Images des jeux (déjà uploadées)
```

---

## 🚀 Installation & Déploiement

### 1. Upload des fichiers sur GitHub

1. Clone ton repo localement :
```bash
git clone https://github.com/heylynncontact-cpu/tournoi-jeux-indes.git
cd tournoi-jeux-indes
```

2. Copie tous les fichiers du projet dans le dossier

3. Commit et push :
```bash
git add .
git commit -m "Initial commit - Site du tournoi"
git push origin main
```

### 2. Activer GitHub Pages

1. Va sur ton repo GitHub : `https://github.com/heylynncontact-cpu/tournoi-jeux-indes`
2. Clique sur **Settings** (⚙️)
3. Dans le menu de gauche, clique sur **Pages**
4. Sous "Source", sélectionne **main** branch
5. Clique sur **Save**
6. Attends 2-3 minutes

Ton site sera accessible à : `https://heylynncontact-cpu.github.io/tournoi-jeux-indes/`

---

## 🔥 Configuration Firebase

### Étape 1 : Créer un projet Firebase

1. Va sur [Firebase Console](https://console.firebase.google.com/)
2. Clique sur **Ajouter un projet**
3. Nomme-le : `tournoi-jeux-indes` (ou ce que tu veux)
4. Désactive Google Analytics (optionnel pour ce projet)
5. Clique sur **Créer le projet**

### Étape 2 : Configurer Firestore

1. Dans ton projet Firebase, clique sur **Firestore Database** dans le menu
2. Clique sur **Créer une base de données**
3. Choisis **Commencer en mode test** (tu changeras après)
4. Sélectionne une région (ex: `europe-west`)
5. Clique sur **Activer**

### Étape 3 : Règles de sécurité Firestore

Dans l'onglet **Règles**, remplace par :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permet à tout le monde d'écrire dans votes
    match /votes/{document=**} {
      allow read, write: if true;
    }
    match /votes_{game}/{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **Note** : Ces règles permettent à n'importe qui d'écrire. C'est OK pour un petit tournoi, mais pour un usage prolongé, ajoute des limites.

### Étape 4 : Récupérer la config Firebase

1. Dans Firebase Console, clique sur **⚙️** (paramètres du projet)
2. Descends jusqu'à **Vos applications**
3. Clique sur l'icône **</>** (Web)
4. Nomme ton app : `tournoi-web`
5. **NE coche PAS** Firebase Hosting
6. Clique sur **Enregistrer l'application**
7. Copie le code de configuration (ça ressemble à ça) :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "tournoi-jeux-indes.firebaseapp.com",
  projectId: "tournoi-jeux-indes",
  storageBucket: "tournoi-jeux-indes.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### Étape 5 : Intégrer la config dans le code

1. Ouvre le fichier `js/vote.js`
2. Remplace les valeurs de `firebaseConfig` (lignes 4-10) par ta vraie config
3. Sauvegarde et push sur GitHub :

```bash
git add js/vote.js
git commit -m "Config Firebase ajoutée"
git push origin main
```

**C'est tout !** Les votes vont maintenant s'enregistrer dans Firebase.

---

## 📊 Voir les résultats

### Option 1 : Console Firebase (simple)

1. Va sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionne ton projet
3. Clique sur **Firestore Database**
4. Tu verras toutes les collections : `votes`, `votes_berlin`, `votes_ritual`, etc.
5. Clique sur une collection pour voir les votes

### Option 2 : Exporter en CSV

1. Dans Firestore, clique sur les **3 points** (⋮) à côté d'une collection
2. Choisis **Exporter la collection**
3. Ou utilise ce script Python pour exporter :

```python
# Installe d'abord: pip install firebase-admin pandas

import firebase_admin
from firebase_admin import credentials, firestore
import pandas as pd

# Config
cred = credentials.Certificate('path/to/serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Récupère tous les votes
votes_ref = db.collection('votes')
docs = votes_ref.stream()

data = []
for doc in docs:
    vote = doc.to_dict()
    data.append({
        'game': vote['game'],
        'direction_artistique': vote['notes']['direction_artistique'],
        'gameplay': vote['notes']['gameplay'],
        'originalite': vote['notes']['originalite'],
        'univers': vote['notes']['univers'],
        'timestamp': vote['timestamp']
    })

df = pd.DataFrame(data)
df.to_csv('votes.csv', index=False)
print("✅ Export réussi : votes.csv")
```

### Option 3 : Dashboard temps réel (optionnel)

Si tu veux voir les résultats en temps réel pendant le stream, je peux te créer une page `admin.html` qui affiche les stats live !

---

## 🎨 Personnalisation

### Couleurs

Modifie dans `css/style.css` :

```css
:root {
    --color-dark: #4F4949;      /* Gris foncé */
    --color-purple: #CB99FF;    /* Violet */
    --color-yellow: #CDF667;    /* Jaune fluo */
    --color-bg: #F5F5F0;        /* Fond beige */
}
```

### Textes

- Descriptions des jeux : dans chaque `vote-*.html`, modifie la balise `<p class="game-description">`
- Tags : modifie les `<span class="tag tag-purple">` dans `liste.html` et les pages de vote

---

## 📱 Responsive

Le site est 100% responsive et optimisé pour :

- 📱 Mobile (< 480px) : 1 colonne
- 📱 Tablet (480-768px) : 2 colonnes
- 💻 Desktop (> 768px) : 3 colonnes

Testé sur :
- iOS Safari
- Android Chrome
- Desktop Chrome/Firefox/Safari

---

## 🐛 Troubleshooting

### Les votes ne s'enregistrent pas

1. Vérifie que tu as bien remplacé la config Firebase dans `js/vote.js`
2. Ouvre la console du navigateur (F12) pour voir les erreurs
3. Vérifie que les règles Firestore sont bien configurées

### Les images ne s'affichent pas

1. Vérifie que les images sont bien dans le dossier `images/` sur GitHub
2. Vérifie les noms de fichiers (respecte la casse : `Berlin.png` ≠ `berlin.png`)
3. Attends 2-3 minutes après un push pour que GitHub Pages se mette à jour

### Le site ne s'affiche pas sur GitHub Pages

1. Vérifie que GitHub Pages est bien activé dans **Settings > Pages**
2. Vérifie que la branche `main` est sélectionnée
3. Attends 5-10 minutes après activation
4. Vide le cache du navigateur (Ctrl+F5)

---

## 💡 Alternative à Firebase : Formspree

Si tu préfères utiliser Formspree (plus simple, mais moins flexible) :

1. Va sur [Formspree.io](https://formspree.io/)
2. Crée un compte gratuit
3. Crée un nouveau formulaire
4. Copie l'URL du formulaire (ex: `https://formspree.io/f/xyzabc123`)
5. Dans `js/vote.js`, commente la partie Firebase et décommente la partie Formspree
6. Remplace `YOUR_FORM_ID` par ton ID Formspree

---

## 📞 Support

Si tu as des problèmes :

1. Check la console du navigateur (F12)
2. Vérifie les logs Firebase Console
3. Envoie-moi les messages d'erreur !

---

## 🎉 C'est tout !

Le site est prêt à être utilisé ! Partage le lien pendant tes streams et laisse ta communauté voter 💜✨

**URL du site** : https://heylynncontact-cpu.github.io/tournoi-jeux-indes/

---

Made with 💜 for HeyLynn by Claude
