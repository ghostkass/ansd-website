# Guide d'Interaction avec Gemini (Votre Assistant CLI)

Bienvenue ! Je suis Gemini, votre assistant CLI pour les tâches d'ingénierie logicielle. Mon objectif est de vous aider à travailler de manière sûre et efficace sur ce projet.

Pour tirer le meilleur parti de notre interaction, voici quelques lignes directrices et commandes utiles :

## Principes Généraux

*   **Soyez Précis :** Plus votre demande est claire et précise, mieux je pourrai vous aider.
*   **Contexte :** Si votre demande concerne une partie spécifique du code, mentionnez les fichiers ou les répertoires pertinents.
*   **Confirmation :** Pour les actions importantes (modifications de fichiers, exécution de commandes shell), je vous demanderai une confirmation. Lisez attentivement mes explications.
*   **Itératif :** Nous pouvons travailler étape par étape. N'hésitez pas à me demander de détailler un plan ou de vérifier mon travail.

## Commandes Utiles

Voici quelques types de requêtes que vous pouvez me faire :

### 1. Navigation et Inspection du Projet

*   **Lister le contenu d'un répertoire :**
    `list files in src/pages`
    `show me the contents of the backend directory`

*   **Lire le contenu d'un fichier :**
    `read file src/pages/index.js`
    `show me the code for backend/src/controllers/authController.js`

*   **Rechercher du contenu dans les fichiers :**
    `search for "useEffect" in src/hooks`
    `find all occurrences of "console.log" in the project`

*   **Trouver des fichiers par motif (glob) :**
    `find all .js files in src/pages`
    `list all files matching backend/**/*.js`

### 2. Modification de Code

*   **Modifier un fichier (remplacement de texte) :**
    `In src/utils/client.js, replace "oldFunction" with "newFunction"`
    *(Je vous demanderai le contexte exact pour assurer un remplacement précis.)*

*   **Écrire un nouveau fichier ou écraser un fichier existant :**
    `create a new file named src/components/NewComponent.js with the following content: [votre code ici]`
    `write this content to src/styles/new.css: [votre code CSS ici]`

*   **Refactoriser du code :**
    `Refactor the authentication logic in src/middleware/authMiddleware.js to use JWT tokens.`
    *(Je proposerai un plan avant d'agir.)*

*   **Ajouter une nouvelle fonctionnalité :**
    `Add a new API endpoint in backend/src/routes/users.js for user profile updates.`

### 3. Exécution de Commandes Shell

*   **Exécuter une commande :**
    `run npm install`
    `execute git status`
    `start the backend server using 'npm start' in the backend directory`
    *(Je vous expliquerai l'impact des commandes critiques avant de les exécuter.)*

### 4. Gestion de Version (Git)

*   **Vérifier le statut Git :**
    `git status`

*   **Préparer un commit :**
    `prepare a commit for the changes I just made`
    *(Je vous montrerai les changements et vous proposerai un message de commit.)*

*   **Annuler des changements :**
    `revert the last changes you made to src/pages/actualites.js`

### 5. Demandes d'Information et d'Aide

*   **Obtenir de l'aide :**
    `What can you do?`
    `How do I use the 'replace' tool?`

*   **Poser des questions sur le projet :**
    `Where are the database models defined?`
    `How is the API configured?`

## Exemple de Flux de Travail

1.  **Vous :** `Je veux ajouter une nouvelle route /dashboard.`
2.  **Moi :** `Okay, je peux faire ça. Où voulez-vous que je crée le fichier de la route ?`
3.  **Vous :** `Dans backend/src/routes/dashboard.js.`
4.  **Moi :** `D'accord. Voici le contenu que je propose pour backend/src/routes/dashboard.js : [code proposé]. Voulez-vous que je l'écrive ?`
5.  **Vous :** `Oui.`
6.  **Moi :** `Fichier créé. Voulez-vous que je l'intègre dans app.js ?`

N'hésitez pas à me poser des questions ou à me donner des instructions. Je suis là pour vous aider !
