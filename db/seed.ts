import db from './drizzle'
import { tag } from './schema/tag'
import { title } from './schema/title'
import { titleTag } from './schema/title-tag'
import { type } from './schema/type'

async function seed() {
  await db.insert(tag).values([
    { name: 'action', id: 'tag1' },
    { name: 'adventure', id: 'tag2' },
    { name: 'horror', id: 'tag3' },
    { name: 'indie', id: 'tag4' },
    { name: 'sci-fi', id: 'tag5' },
    { name: 'fantasy', id: 'tag6' },
    { name: 'thriller', id: 'tag7' },
    { name: 'comedy', id: 'tag8' },
  ])

  await db.insert(type).values([
    { name: 'book', id: 'type1' },
    { name: 'game', id: 'type2' },
    { name: 'movie', id: 'type3' },
    { name: 'other', id: 'type4' },
    { name: 'series', id: 'type5' },
    { name: 'documentary', id: 'type6' },
    { name: 'podcast', id: 'type7' },
    { name: 'music', id: 'type8' },
  ])

  await db.insert(title).values([
    {
      id: 'title1',
      coverUrl:
        'https://ab0265ss87.ufs.sh/f/wOshHArCGXTeh2kjb0NlLrWPRaYvDtcnjd4Vp2ubUXg67wFi',
      name: 'The Great Adventure',
      typeId: 'type1',
      description: 'An epic tale of exploration and discovery.',
      releaseDate: '2023-11-01',
    },
    {
      id: 'title2',
      coverUrl:
        'https://ab0265ss87.ufs.sh/f/wOshHArCGXTebDN2tYAdOY2cp4QWH3urRvZU61eqylXTBhwP',
      name: 'Indie Action Game',
      typeId: 'type2',
      description: 'A fast-paced action game with indie aesthetics.',
      releaseDate: '2024-05-15',
    },
    {
      id: 'title3',
      coverUrl:
        'https://ab0265ss87.ufs.sh/f/wOshHArCGXTeyHNgwavhej01mnbwO7HaWdJISrZ5Ek8XpRLK',
      name: 'Horror Movie',
      typeId: 'type3',
      description:
        'A chilling horror film to keep you on the edge of your seat.',
      releaseDate: '2022-10-31',
    },
    {
      id: 'title4',
      coverUrl:
        'https://ab0265ss87.ufs.sh/f/wOshHArCGXTeB4HdUuOCnGNhRrqowH7ZXW5Ai3tTsUvSm2fj',
      name: 'Sci-Fi Novel',
      typeId: 'type4',
      description: 'A futuristic novel set in a dystopian world.',
      releaseDate: '2025-01-10',
    },
    {
      id: 'title5',
      name: 'Adventure RPG',
      typeId: 'type5',
      description: 'An open-world role-playing game with stunning visuals.',
      releaseDate: '2023-03-21',
    },
    {
      id: 'title6',
      coverUrl:
        'https://ab0265ss87.ufs.sh/f/wOshHArCGXTeEwuDgpaJCMFgjYra12exB7OsounILqD98WST',
      name: 'Comedy Special',
      typeId: 'type6',
      description: 'A hilarious stand-up comedy performance.',
      releaseDate: '2021-07-16',
    },
    {
      id: 'title7',
      coverUrl:
        'https://ab0265ss87.ufs.sh/f/wOshHArCGXTehKXcgj4NlLrWPRaYvDtcnjd4Vp2ubUXg67wF',
      name: 'Documentary',
      typeId: 'type7',
      description: 'An in-depth look at the mysteries of the ocean.',
      releaseDate: '2020-12-25',
    },
    {
      id: 'title8',
      coverUrl:
        'https://ab0265ss87.ufs.sh/f/wOshHArCGXTerGPkgvQsiX5Tz2HRMI9S4DdhkZgfulALW1qF',
      name: 'Fantasy Series',
      typeId: 'type8',
      description: 'A magical adventure spanning multiple seasons.',
      releaseDate: '2019-09-12',
    },
    {
      id: 'title9',
      coverUrl: 'f73feabd-b5a4-4120-9a99-f3de20059b04',
      name: 'The Lost Kingdom',
      typeId: 'type1',
      description: 'A historical novel about the fall of a great empire.',
      releaseDate: '2023-06-05',
    },
    {
      id: 'title10',
      coverUrl: 'f223af1c-f6fc-457b-9239-bc7bceddc29d',
      name: 'Space Odyssey',
      typeId: 'type2',
      description: 'A strategy game set in space exploration and colonization.',
      releaseDate: '2024-04-22',
    },
    {
      id: 'title11',
      name: 'Fright Night',
      typeId: 'type3',
      description: 'A terrifying slasher film set in a small town.',
      releaseDate: '2022-08-14',
    },
    {
      id: 'title12',
      name: 'The Galactic Wars',
      typeId: 'type4',
      description: 'An intergalactic tale of war and betrayal.',
      releaseDate: '2025-02-15',
    },
    {
      id: 'title13',
      name: 'Hidden Secrets',
      typeId: 'type5',
      description: 'An indie game that explores lost civilizations.',
      releaseDate: '2023-07-09',
    },
    {
      id: 'title14',
      name: 'Comedy Unleashed',
      typeId: 'type6',
      description: 'A stand-up special with jokes about life and politics.',
      releaseDate: '2021-10-17',
    },
    {
      id: 'title15',
      name: 'Ocean Deep',
      typeId: 'type7',
      description: 'A documentary about the uncharted depths of the ocean.',
      releaseDate: '2022-11-23',
    },
    {
      id: 'title16',
      name: 'Wizards of the Old World',
      typeId: 'type8',
      description: 'A fantasy epic about wizards battling dark forces.',
      releaseDate: '2019-05-30',
    },
    {
      id: 'title17',
      name: 'Alien Encounter',
      typeId: 'type1',
      description:
        'A science fiction novel about first contact with extraterrestrials.',
      releaseDate: '2023-02-11',
    },
    {
      id: 'title18',
      name: 'Zombie Apocalypse',
      typeId: 'type2',
      description: 'A survival game set in a post-apocalyptic world.',
      releaseDate: '2024-09-04',
    },
    {
      id: 'title19',
      name: 'Slasher Story',
      typeId: 'type3',
      description:
        'A horror film that follows a group of friends being hunted by a mysterious killer.',
      releaseDate: '2021-06-30',
    },
    {
      id: 'title20',
      name: 'Tech Revolution',
      typeId: 'type4',
      description: 'A non-fiction book exploring the future of technology.',
      releaseDate: '2025-03-12',
    },
    {
      id: 'title21',
      name: "Dragon's Quest",
      typeId: 'type5',
      description: 'An action-adventure game about a knight battling dragons.',
      releaseDate: '2023-12-05',
    },
    {
      id: 'title22',
      name: 'Stand-Up King',
      typeId: 'type6',
      description:
        'A stand-up comedy performance by the best comedian in the country.',
      releaseDate: '2022-01-14',
    },
    {
      id: 'title23',
      name: 'The Deep Sea',
      typeId: 'type7',
      description: 'A deep dive into the unexplored areas of the ocean.',
      releaseDate: '2020-07-01',
    },
    {
      id: 'title24',
      name: 'Realm of Shadows',
      typeId: 'type8',
      description:
        'A fantasy series where heroes face off against ancient dark forces.',
      releaseDate: '2019-11-22',
    },
    {
      id: 'title25',
      name: 'The Last Escape',
      typeId: 'type1',
      description: 'A thrilling novel about a man running from his past.',
      releaseDate: '2023-01-30',
    },
    {
      id: 'title26',
      name: 'Post-Apocalyptic',
      typeId: 'type2',
      description:
        'A game about surviving in a world destroyed by natural disasters.',
      releaseDate: '2024-06-14',
    },
    {
      id: 'title27',
      name: 'Fear in the Dark',
      typeId: 'type3',
      description:
        'A movie about a haunted house that traps its visitors inside.',
      releaseDate: '2021-03-11',
    },
    {
      id: 'title28',
      name: 'Artificial Intelligence',
      typeId: 'type4',
      description:
        'A documentary exploring the rise of artificial intelligence.',
      releaseDate: '2025-05-17',
    },
    {
      id: 'title29',
      name: 'Monsters in the City',
      typeId: 'type5',
      description:
        'A game where players must survive against city-dwelling monsters.',
      releaseDate: '2023-10-09',
    },
    {
      id: 'title30',
      name: 'Laugh Out Loud',
      typeId: 'type6',
      description:
        'A comedy special filled with the funniest moments of the year.',
      releaseDate: '2021-08-23',
    },
    {
      id: 'title31',
      name: 'Into the Abyss',
      typeId: 'type7',
      description: 'A documentary diving into the deepest parts of the ocean.',
      releaseDate: '2022-05-05',
    },
    {
      id: 'title32',
      name: 'Kingdom of Fire',
      typeId: 'type8',
      description: 'A fantasy series about the battle for a fiery throne.',
      releaseDate: '2019-02-20',
    },
    {
      id: 'title33',
      name: 'Secrets of the Universe',
      typeId: 'type1',
      description: 'A science fiction novel about the secrets of the cosmos.',
      releaseDate: '2023-04-18',
    },
    {
      id: 'title34',
      name: 'Nightmare World',
      typeId: 'type2',
      description:
        'A game where you explore a world filled with nightmarish creatures.',
      releaseDate: '2024-01-19',
    },
    {
      id: 'title35',
      name: 'Terror in the Woods',
      typeId: 'type3',
      description:
        'A horror movie about a group of friends stranded in a haunted forest.',
      releaseDate: '2022-02-14',
    },
    {
      id: 'title36',
      name: 'Future Tech',
      typeId: 'type4',
      description: 'A non-fiction book that delves into emerging technologies.',
      releaseDate: '2025-06-08',
    },
    {
      id: 'title37',
      name: "Hero's Journey",
      typeId: 'type5',
      description:
        'An RPG game that follows the journey of a hero saving the kingdom.',
      releaseDate: '2023-09-13',
    },
    {
      id: 'title38',
      name: 'Late Night Laughs',
      typeId: 'type6',
      description:
        'A stand-up comedy show filled with jokes for late-night audiences.',
      releaseDate: '2021-05-25',
    },
    {
      id: 'title39',
      name: "The Ocean's Secret",
      typeId: 'type7',
      description: 'A documentary uncovering the hidden wonders of the ocean.',
      releaseDate: '2020-09-30',
    },
    {
      id: 'title40',
      name: "Demon's Lair",
      typeId: 'type8',
      description: 'A fantasy series about heroes confronting demonic forces.',
      releaseDate: '2019-04-02',
    },
    {
      id: 'title41',
      name: 'Lost in Time',
      typeId: 'type1',
      description: 'A novel about a man who time-travels to fix his mistakes.',
      releaseDate: '2023-07-12',
    },
    {
      id: 'title42',
      name: 'Space Battle',
      typeId: 'type2',
      description:
        'A space combat game where players fight for control of the galaxy.',
      releaseDate: '2024-12-01',
    },
    {
      id: 'title43',
      name: 'Blood Moon',
      typeId: 'type3',
      description: 'A horror movie set during a mysterious blood moon.',
      releaseDate: '2021-09-07',
    },
    {
      id: 'title44',
      name: 'The New Age',
      typeId: 'type4',
      description:
        'A documentary that explores the new age of technology and society.',
      releaseDate: '2025-04-03',
    },
    {
      id: 'title45',
      name: 'Pirates of the Lost Sea',
      typeId: 'type5',
      description:
        'A pirate game set on the high seas filled with treasure and danger.',
      releaseDate: '2023-08-19',
    },
    {
      id: 'title46',
      name: 'Stand-Up for Life',
      typeId: 'type6',
      description:
        'A life-changing comedy special that blends humor with inspiration.',
      releaseDate: '2022-06-09',
    },
    {
      id: 'title47',
      name: 'Shark Attack',
      typeId: 'type7',
      description: 'A thrilling documentary about the biggest shark species.',
      releaseDate: '2020-04-11',
    },
    {
      id: 'title48',
      name: "Shadow's Edge",
      typeId: 'type8',
      description:
        'A fantasy series about warriors protecting the realm from shadow creatures.',
      releaseDate: '2019-10-28',
    },
    {
      id: 'title49',
      name: 'Chronicles of the Wild',
      typeId: 'type1',
      description: 'A story about the exploration of a wild and unknown land.',
      releaseDate: '2023-05-16',
    },
    {
      id: 'title50',
      name: 'Virtual Reality Escape',
      typeId: 'type2',
      description:
        'A game where players escape a dystopian future through VR worlds.',
      releaseDate: '2024-08-12',
    },
  ])

  await db.insert(titleTag).values([
    { titleId: 'title1', tagId: 'tag1' },
    { titleId: 'title1', tagId: 'tag2' },
    { titleId: 'title2', tagId: 'tag1' },
    { titleId: 'title2', tagId: 'tag4' },
    { titleId: 'title3', tagId: 'tag3' },
    { titleId: 'title3', tagId: 'tag2' },
    { titleId: 'title4', tagId: 'tag4' },
    { titleId: 'title5', tagId: 'tag2' },
    { titleId: 'title5', tagId: 'tag1' },
    { titleId: 'title6', tagId: 'tag1' },
    { titleId: 'title6', tagId: 'tag4' },
    { titleId: 'title7', tagId: 'tag3' },
    { titleId: 'title8', tagId: 'tag2' },
    { titleId: 'title8', tagId: 'tag4' },
  ])
}

seed()
