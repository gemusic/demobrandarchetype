export interface Collection {
  id: 'fondation' | 'structure' | 'expression';
  name: string;
  tagline: string;
  description: string;
  story: string;
  image: string;
  productCount: number;
}

export const collections: Collection[] = [
  {
    id: 'fondation',
    name: 'Fondation',
    tagline: 'Les assises qui fondent votre espace',
    description: 'Canapés, fauteuils et méridiennes modulaires. Chaque pièce est conçue pour durer des décennies, évoluer avec votre vie, et devenir le cœur de votre intérieur.',
    story: `La Fondation est notre collection originelle. Elle est née d'une conviction simple : un canapé n'est pas un meuble, c'est le lieu où se construit une vie.

C'est là que vous lisez, rêvez, discutez, vous réconciliez. C'est là que vos enfants font leurs premiers pas et que vos amis se sentent chez eux.

Nous avons donc imaginé des assises qui grandissent avec vous. Des modules qui s'ajoutent quand la famille s'agrandit. Des tissus qui se changent quand vos goûts évoluent. Des structures garanties 15 ans parce que nous refusons l'obsolescence programmée.

Chaque pièce Fondation est fabriquée dans nos ateliers partenaires au Portugal et en Italie, par des artisans qui ont appris leur métier de leur père, qui l'avait appris du sien. Cette transmission est notre garantie de qualité.`,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200',
    productCount: 12,
  },
  {
    id: 'structure',
    name: 'Structure',
    tagline: "L'architecture du quotidien",
    description: 'Tables, bureaux, consoles et étagères. Des pièces qui organisent votre espace et structurent votre vie, avec la précision d\'un architecte et la sensibilité d\'un artiste.',
    story: `Structure explore la frontière entre meuble et architecture. Une table n'est pas qu'une surface plane : c'est un lieu de rassemblement, un établi de création, un autel du quotidien.

Nous travaillons avec les meilleurs ébénistes européens pour créer des pièces qui défient le temps. Notre Table Monolithe, par exemple, est taillée dans des chênes centenaires de la forêt de Tronçais, puis séchée naturellement pendant trois ans avant d'être façonnée.

La collection Structure s'adresse à ceux qui comprennent que la qualité du bois, la précision de l'assemblage et la noblesse des finitions ne sont pas des détails. Ce sont les fondations invisibles de ce qui durera.

Chaque pièce porte la signature de son créateur et un numéro d'édition. Pas par snobisme, mais par responsabilité : nous voulons savoir où sont nos créations dans cinquante ans.`,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200',
    productCount: 10,
  },
  {
    id: 'expression',
    name: 'Expression',
    tagline: 'La signature finale',
    description: 'Luminaires, miroirs et objets décoratifs. Les touches finales qui transforment un espace meublé en un lieu qui vous ressemble.',
    story: `Expression est notre collection la plus personnelle. Si Fondation et Structure posent les bases d'un intérieur, Expression lui donne une âme.

Un luminaire change tout. La façon dont la lumière tombe sur un mur, les ombres qu'elle dessine, l'atmosphère qu'elle crée. Notre Lampe Aura, avec son abat-jour en papier washi fait main, transforme n'importe quelle pièce en sanctuaire.

Les objets Expression sont souvent les plus petits, mais leur impact est immense. Un vase peut devenir le centre de gravité visuel d'une pièce. Un miroir peut doubler la perception de l'espace. Un bougeoir peut créer un rituel.

Nous collaborons avec des artisans du monde entier : verriers de Murano, céramistes provençaux, tisserands marocains. Chaque pièce porte en elle une tradition et une histoire.

Expression, c'est aussi notre invitation à la collection. Ces pièces sont accessibles, mais jamais banales. C'est souvent par elles que commence une relation durable avec ARCHETYPES.`,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200',
    productCount: 10,
  },
];

export const getCollectionById = (id: Collection['id']): Collection | undefined => {
  return collections.find(c => c.id === id);
};
