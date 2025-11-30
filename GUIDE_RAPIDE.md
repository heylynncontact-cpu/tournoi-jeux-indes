# 🚀 GUIDE RAPIDE - Mise en ligne en 10 minutes

## ✅ ÉTAPE 1 : Upload sur GitHub (2 min)

### Option A : Via l'interface GitHub (le plus simple)

1. Va sur ton repo : https://github.com/heylynncontact-cpu/tournoi-jeux-indes
2. Clique sur **Add file** > **Upload files**
3. Glisse-dépose TOUS les fichiers du dossier `tournoi-jeux-indes`
4. En bas, écris un message : "Upload du site complet"
5. Clique sur **Commit changes**

### Option B : Via Git (si tu as Git installé)

```bash
cd chemin/vers/tournoi-jeux-indes
git add .
git commit -m "Upload site complet"
git push origin main
```

---

## ✅ ÉTAPE 2 : Activer GitHub Pages (1 min)

1. Sur GitHub, va dans **Settings** (en haut)
2. Dans le menu de gauche, clique sur **Pages**
3. Sous "Branch", sélectionne **main**
4. Clique sur **Save**
5. Attends 2-3 minutes

🎉 **Ton site sera en ligne à :** https://heylynncontact-cpu.github.io/tournoi-jeux-indes/

---

## ✅ ÉTAPE 3 : Configurer Firebase (5 min)

### 3.1 Créer le projet
1. Va sur https://console.firebase.google.com/
2. **Ajouter un projet**
3. Nom : `tournoi-jeux-indes`
4. Désactive Google Analytics
5. **Créer le projet**

### 3.2 Activer Firestore
1. Menu **Firestore Database**
2. **Créer une base de données**
3. **Mode test**
4. Région : **europe-west**
5. **Activer**

### 3.3 Règles de sécurité
Onglet **Règles**, colle ça :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /votes/{document=**} {
      allow read, write: if true;
    }
    match /votes_{game}/{document=**} {
      allow read, write: if true;
    }
  }
}
```

Clique sur **Publier**

### 3.4 Récupérer la config
1. **⚙️ Paramètres du projet**
2. Descends à **Vos applications**
3. Clique sur **</>** (Web)
4. Nom : `tournoi-web`
5. **Enregistrer l'application**
6. **COPIE** le code qui apparaît

### 3.5 Intégrer dans ton code
1. Sur GitHub, ouvre `js/vote.js`
2. Clique sur **Edit** (crayon ✏️)
3. Remplace les lignes 4-10 par ta vraie config Firebase
4. **Commit changes**

---

## ✅ ÉTAPE 4 : Tester (2 min)

1. Va sur ton site : https://heylynncontact-cpu.github.io/tournoi-jeux-indes/
2. Clique sur **Démarrer**
3. Clique sur **Voter** pour un jeu
4. Remplis les notes et clique sur **Valider**
5. Tu devrais arriver sur la page "Merci"

### Vérifier que ça fonctionne
1. Retourne sur Firebase Console
2. Va dans **Firestore Database**
3. Tu devrais voir la collection `votes` avec ton vote dedans

🎉 **C'EST BON ! Le site est opérationnel !**

---

## 📊 Voir les résultats

### Pendant le stream
1. Firebase Console > Firestore Database
2. Clique sur `votes` pour voir tous les votes en temps réel
3. Rafraîchis pour voir les nouveaux votes

### Exporter les données
1. Dans Firestore, clique sur **⋮** (3 points) à côté de `votes`
2. **Exporter la collection**
3. Ou utilise le script Python dans le README complet

---

## 🐛 Si ça marche pas

### Les votes ne s'enregistrent pas
- Vérifie que tu as bien mis ta vraie config Firebase dans `js/vote.js`
- Ouvre la console du navigateur (F12) pour voir les erreurs
- Vérifie les règles Firestore

### Le site ne s'affiche pas
- Attends 5 minutes après avoir activé GitHub Pages
- Vide le cache (Ctrl + F5)
- Vérifie que la branche `main` est bien sélectionnée dans Settings > Pages

### Les images ne s'affichent pas
- Vérifie que les images sont bien dans le dossier `images/` sur GitHub
- Respecte la casse des noms de fichiers (Berlin.png ≠ berlin.png)

---

## 🎉 FINI !

Ton site est en ligne et prêt à être partagé avec ta communauté !

**Lien à partager :** https://heylynncontact-cpu.github.io/tournoi-jeux-indes/

---

Des questions ? Ping-moi ! 💜
