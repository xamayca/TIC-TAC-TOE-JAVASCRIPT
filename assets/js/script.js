// Liste des joueurs [tableau] //
let player = [
	{
		name: 'Joueur DeLaCroix',
	},
	{
		name: 'Joueur DuRond',
	}
];

// Définit le tour de jouer ou non //
let turnToPlay = true;

// Tableau des conditions de victoires //
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

//Récupère les cases HTML //
const casesHTML = document.getElementsByClassName("cases");
//Récupère le message interactif HTML //
const messageHTML = document.getElementById("message");
//Récupère le bouton restart HTML //
const restartBtnHTML = document.getElementById("restart-btn");

//Personalisation du message par défaut //
messageHTML.textContent = `A vous de jouer !`;
messageHTML.classList.add('go-play');

// Création de la boucle pour l’événement 'click' sur chaque cases //
for (let i = 0; i < casesHTML.length; i++) {
	casesHTML[i].addEventListener("click", function () {

		// Console log pour savoir si on a cliqué, et sur quel case //
		console.log(`You clicked at case: ${[i]}`);

		// Le joueur 'X' jouer //
		if (turnToPlay === true) {
			// Si la case ne contient pas 'fa-times' ou 'fa-circle-o' on peu jouer //
			if (!casesHTML[i].classList.contains('fa-times') && !casesHTML[i].classList.contains('fa-circle-o')) {
				// TOUR DU JOUEUR 'X' //
				// Personalisation de l'icône du joueur "X" //
				casesHTML[i].classList.add('fa');
				casesHTML[i].classList.add('fa-5x');
				casesHTML[i].classList.add('fa-times');
				casesHTML[i].style.color = 'red';
				// Le joueur 'X' ne peu plus jouer //
				turnToPlay = false;
				// Personalisation du message interactif //
				messageHTML.textContent = `C'est au tour du ${player[1].name} !`;
				messageHTML.classList.add('success');
			} else if (casesHTML[i].classList.contains('fa-times')) {
				// Personalisation du message interactif //
				messageHTML.textContent = `Cette case est déjà prise par ${player[0].name} !`;
				messageHTML.classList.remove('success');
				messageHTML.classList.add('warning');
			} else {
				// Personalisation du message interactif //
				messageHTML.textContent = `Cette case est déjà prise par ${player[1].name} !`;
				messageHTML.classList.remove('success');
				messageHTML.classList.add('warning');
			};

		} else {
			// Si la case ne contient pas 'fa-times' ou 'fa-circle-o' on peu jouer //
			if (!casesHTML[i].classList.contains('fa-times') && !casesHTML[i].classList.contains('fa-circle-o')) {
				// TOUR DU JOUEUR 'O' //
				// Personalisation de l'icône du joueur "O" //
				casesHTML[i].classList.add('fa');
				casesHTML[i].classList.add('fa-5x');
				casesHTML[i].classList.add('fa-circle-o');
				casesHTML[i].style.color = 'green';
				// Le joueur 'X' peu de nouveau jouer //
				turnToPlay = true;
				// Personalisation du message interactif //
				messageHTML.textContent = `C'est au tour du ${player[0].name} !`;
				messageHTML.classList.add('success');
				// Et si la case contient 'fa-times' renvoyé le message (la case est déjà prise) //
			} else if (casesHTML[i].classList.contains('fa-times')) {
				// Personalisation du message interactif //
				messageHTML.textContent = `Cette case est déjà prise par ${player[0].name} !`;
				messageHTML.classList.remove('success');
				messageHTML.classList.add('warning');
				// Sinon la case contient 'fa-circle-o' renvoyé le message (la case est déjà prise) //
			} else {
				// Personalisation du message interactif //
				messageHTML.textContent = `Cette case est déjà prise par ${player[1].name} !`;
				messageHTML.classList.remove('success');
				messageHTML.classList.add('warning');
			}
		}

		// Crée une boucle pour verifier si chaque case contient une "X" ou "O" et les compare a WinCombo //
		for (let i = 0; i < winCombos.length; i++) {
			// Si WinCombo contient "X" alors victoire //
			if (casesHTML[winCombos[i][0]].classList.contains('fa-times') && casesHTML[winCombos[i][1]].classList.contains('fa-times') && casesHTML[winCombos[i][2]].classList.contains('fa-times')) {
				messageHTML.textContent = `Le ${player[0].name} a gagné !`;
				messageHTML.classList.add('success');
				// Ajoute la classe 'win' des cases (couleur de la victoire) //
				casesHTML[winCombos[i][0]].classList.add('win');
				casesHTML[winCombos[i][1]].classList.add('win');
				casesHTML[winCombos[i][2]].classList.add('win');
				break;
				// Si WinCombo contient "O" alors victoire //
			} else if (casesHTML[winCombos[i][0]].classList.contains('fa-circle-o') && casesHTML[winCombos[i][1]].classList.contains('fa-circle-o') && casesHTML[winCombos[i][2]].classList.contains('fa-circle-o')) {
				messageHTML.textContent = `Le ${player[1].name} a gagné !`;
				messageHTML.classList.add('success');
				// Ajoute la classe 'win' des cases (couleur de la victoire) //
				casesHTML[winCombos[i][0]].classList.add('win');
				casesHTML[winCombos[i][1]].classList.add('win');
				casesHTML[winCombos[i][2]].classList.add('win');
				break;
			}
		}

		// Définit si une case est vide ou non //
		let casesEmpty = false;

		// Crée une boucle pour savoir si une case est vide ou non //
		for (let i = 0; i < casesHTML.length; i++) {
			// Si les cases ne contiennent pas "X" et "O" alors la case est vide //
			if (!casesHTML[i].classList.contains('fa-times') && !casesHTML[i].classList.contains('fa-circle-o')) {
				casesEmpty = true;
				break;
			}
		}
		// Si toutes les cases ne sont pas vide, alors 'match nul' //
		if (!casesEmpty) {
			messageHTML.textContent = `Match Nul !`;
		}
	}
	)
};

restartBtnHTML.addEventListener('click', function () {
	// Définit si les joueurs ont jouer ou non //
	let played = false;

	for (let i = 0; i < casesHTML.length; i++) {
		// Si la case contient 'fa-times' OU 'fa-circle-o', considère la case comme 'played' //
		if (casesHTML[i].classList.contains('fa-times') || casesHTML[i].classList.contains('fa-circle-o')) {
			played = true;
			break;
		};
	};

	// Si aucune case n'est jouer renvoyer le message (Personne n'a encore jouer !))
	if (!played) {
		messageHTML.textContent = `Personne n'a encore jouer !`
		messageHTML.classList.add('warning');
		messageHTML.classList.remove('success');
		// Sinon Efface l'ensemble de la grille //
	} else {
		for (let i = 0; i < casesHTML.length; i++) {
			messageHTML.textContent = `A vous de jouer !`
			messageHTML.classList.add('go-play');
			// Retire les classe de l'ensemble des 'fa' pour vidé les cases //
			casesHTML[i].classList.remove('fa')
			casesHTML[i].classList.remove('fa-5x')
			casesHTML[i].classList.remove('fa-times')
			casesHTML[i].classList.remove('fa-circle-o')
			// Supprime la classe 'win' des cases (couleur de la victoire) //
			casesHTML[winCombos[i][0]].classList.remove('win');
			casesHTML[winCombos[i][1]].classList.remove('win');
			casesHTML[winCombos[i][2]].classList.remove('win');
		};

		// Reinitialisation du message par défaut //
		messageHTML.textContent = `A vous de jouer !`
		messageHTML.classList.remove('success');
		messageHTML.classList.remove('warning');
		messageHTML.classList.add('go-play');
	};

});