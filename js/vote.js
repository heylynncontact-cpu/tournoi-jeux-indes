// ===================================
// FIREBASE CONFIGURATION
// ===================================
const firebaseConfig = {
    apiKey: "AIzaSyB_NZNeptDSuIMccIA9ROxuE6BBNEtDSOY",
    authDomain: "tournoi-jeux-indes.firebaseapp.com",
    projectId: "tournoi-jeux-indes",
    storageBucket: "tournoi-jeux-indes.firebasestorage.app",
    messagingSenderId: "848224440716",
    appId: "1:848224440716:web:37c998fb3c51020dcac6a9"
};

// Import Firebase (CDN)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, doc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Initialize Firebase
let db;
try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log('✅ Firebase initialisé avec succès');
} catch (error) {
    console.error('❌ Erreur Firebase:', error);
}

// ===================================
// RATING SYSTEM
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('voteForm');
    if (!form) return;

    const gameName = form.dataset.game;
    const criteriaInputs = form.querySelectorAll('input[type="radio"]');

    // Update rating display when user selects
    criteriaInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const criteriaName = e.target.name;
            const value = e.target.value;
            const ratingDisplay = document.querySelector(`[data-criteria="${criteriaName}"]`);
            
            if (ratingDisplay) {
                ratingDisplay.textContent = value;
            }
        });
    });

    // ===================================
    // FORM SUBMISSION
    // ===================================
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collect form data
        const formData = new FormData(form);
        const voteData = {
            game: gameName,
            notes: {
                direction_artistique: parseInt(formData.get('direction_artistique')),
                gameplay: parseInt(formData.get('gameplay')),
                originalite: parseInt(formData.get('originalite')),
                univers: parseInt(formData.get('univers'))
            },
            timestamp: new Date().toISOString(),
            serverTimestamp: serverTimestamp()
        };

        // Validation
        const allRated = Object.values(voteData.notes).every(note => note >= 1 && note <= 10);
        
        if (!allRated) {
            alert('⚠️ Merci de noter tous les critères (1 à 10)');
            return;
        }

        try {
            // Save to Firebase
            await saveVoteToFirebase(voteData);
            
            // Redirect to thank you page
            window.location.href = 'merci.html';
        } catch (error) {
            console.error('❌ Erreur lors de l\'envoi du vote:', error);
            alert('❌ Une erreur est survenue. Réessaie dans quelques instants !');
        }
    });
});

// ===================================
// FIREBASE SAVE FUNCTION
// ===================================
async function saveVoteToFirebase(voteData) {
    try {
        // Save to "votes" collection
        const docRef = await addDoc(collection(db, 'votes'), voteData);
        console.log('✅ Vote enregistré avec l\'ID:', docRef.id);
        
        // Optional: Save also in a game-specific collection for easier querying
        await addDoc(collection(db, `votes_${voteData.game}`), voteData);
        
        return docRef.id;
    } catch (error) {
        console.error('❌ Erreur Firebase:', error);
        throw error;
    }
}

// ===================================
// ALTERNATIVE: FORMSPREE (if you prefer)
// ===================================
// Uncomment this function and comment out Firebase if you prefer Formspree
/*
async function saveVoteToFormspree(voteData) {
    const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';
    
    try {
        const response = await fetch(FORMSPREE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(voteData)
        });
        
        if (!response.ok) {
            throw new Error('Formspree error');
        }
        
        return await response.json();
    } catch (error) {
        console.error('❌ Erreur Formspree:', error);
        throw error;
    }
}
*/
