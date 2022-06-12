							$$$$$$$$$$$$$$$$$$
							$$$$$$$$$$$$$$$$$$
							$$$            $$$
							$$$ BILLED APP $$$
							$$$            $$$
							$$$$$$$$$$$$$$$$$$
							$$$$$$$$$$$$$$$$$$


Back-End 


cd Billed-app-FR-Back

npm install

npm run run:dev

Accéder à l'API :

L'api est accessible sur le port 5678 en local, c'est à dire http://localhost:5678

**********************************************************************************


Front-End 


Install :

cd Billed-app-FR-Front

npm install

npm install -g live-server



Restriction windows (à enlever dans le powershell windows mode admin)

Set-ExecutionPolicy RemoteSigned


cd Billed-app-FR-Front

live-server

**********************************************************************************

Lancer les tests :

cd Billed-app-FR-Front

npm run test


Lancer un seul test :

npm i -g jest-cli

jest src/__tests__/your_test_file.js


Comment voir la couverture de test ?

http://127.0.0.1:8080/coverage/lcov-report/


**********************************************************************************
Login :


administrateur :

utilisateur : admin@test.tld 

mot de passe : admin


employé :

utilisateur : employee@test.tld

mot de passe : employee


**********************************************************************************
Liens utiles :


vidéo Jest :

https://www.youtube.com/watch?v=7r4xVDI2vho&ab_channel=TraversyMedia


Documentations :

https://istanbul.js.org/

https://www.tabnine.com/code/javascript/functions/pct

https://openclassrooms.com/fr/courses/4872916-creez-un-backend-scalable-et-performant-sur-firebase/4982769-creez-votre-premiere-structure-de-donnees


vidéo :

https://www.youtube.com/watch?v=6u39H4cTRFY&ab_channel=Alphorm


**********************************************************************************

