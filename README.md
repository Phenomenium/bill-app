# billed-app

# Structure MVC :

# Le Model qui représente la structure des données. Leur définition ainsi que les fonctions qui leur sont propres et qu'elles peuvent avoir. Ce module est complètement décoléré du code métier ou de l'affichage de telle sorte à ce que la modification de la logique ou de l'interface n'affecte pas la structure des données.

# La View (ou les vues) représente l'interface graphique à livrer au client qui en fait la requête. Avoir le code lié à l'interface isolé de la logique métier ou des données permet de faire des modifications à l'interface graphique sans avoir à se soucier de casser du code métier ou la structure des données.

# Le(s) Controller(s) sont au cœur de la logique métier de votre application. Ils se situent entre les vues et le model. Les requêtes qu'un client va faire depuis l'interface graphique, la view, vont être dirigées vers un controller qui sera en charge de manipuler les données dont il a besoin avec la brique Model, la traiter suivant le besoin métier, puis ordonner à la view de répondre au client avec les bons éléments.


![Shema MVC](https://user-images.githubusercontent.com/74776897/170074113-05b96690-53b5-4afc-9252-6196455a62a7.jpg)

