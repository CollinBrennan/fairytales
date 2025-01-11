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
  ])

  await db.insert(type).values([
    { name: 'book', id: 'type1' },
    { name: 'game', id: 'type2' },
    { name: 'movie', id: 'type3' },
    { name: 'other', id: 'type4' },
  ])

  await db.insert(title).values([
    {
      name: 'name1',
      id: 'title1',
      typeId: 'type1',
      coverUrl: 'https://i.imgur.com/Vj2zcfp.png',
      trailerUrl:
        'https://www.youtube.com/embed/4-MnhFSHTxU?si=beACAOaDjSZuaG3A',
    },
    {
      name: 'REALLY REALLY LONG NAME FOR TESTING PURPOSES',
      id: 'title2',
      typeId: 'type2',
    },
    {
      name: 'name3',
      id: 'title3',
      typeId: 'type3',
    },
    {
      name: 'name4',
      id: 'title4',
      typeId: 'type4',
      coverUrl: 'https://i.imgur.com/FSXpm85.jpeg',
    },
    {
      name: 'name10',
      id: 'title10',
      typeId: 'type4',
      coverUrl: 'https://i.imgur.com/Vj2zcfp.png',
    },
    {
      name: 'name20',
      id: 'title20',
      typeId: 'type3',
      coverUrl: 'https://i.imgur.com/FSXpm85.jpeg',
    },
    {
      name: 'name30',
      id: 'title30',
      typeId: 'type2',
      coverUrl: 'Invalid URL for testing',
    },
    {
      name: 'name40',
      id: 'title40',
      typeId: 'type1',
      coverUrl: 'https://i.imgur.com/Vj2zcfp.png',
    },
    {
      name: 'REALLY REALLY LONG NAME FOR TESTING PURPOSES REALLY REALLY LONG NAME FOR TESTING PURPOSES REALLY REALLY LONG NAME FOR TESTING PURPOSES ',
      id: 'title50',
      typeId: 'type2',
    },
    {
      name: 'REALLY REALLY LONG NAME FOR TESTING PURPOSES REALLY REALLY LONG NAME FOR TESTING PURPOSES REALLY REALLY LONG NAME FOR TESTING PURPOSES ',
      id: 'title51',
      typeId: 'type2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper egestas augue, quis tempor elit faucibus id. In ut leo malesuada, iaculis velit vel, euismod risus. Curabitur condimentum arcu vitae magna iaculis, ac blandit dolor ultrices. Etiam in commodo sapien, vel facilisis ligula. Nunc sollicitudin tellus nulla, ut congue augue malesuada ac. Nullam vestibulum varius ex vitae malesuada. Maecenas in justo mi. Sed ac eros in dolor laoreet vulputate.',
    },
    {
      name: 'Capitalized Name',
      id: 'title52',
      typeId: 'type1',
    },
  ])

  await db.insert(titleTag).values([
    { titleId: 'title1', tagId: 'tag1' },
    { titleId: 'title1', tagId: 'tag2' },
    { titleId: 'title3', tagId: 'tag3' },
    { titleId: 'title4', tagId: 'tag4' },
    { titleId: 'title10', tagId: 'tag1' },
    { titleId: 'title20', tagId: 'tag1' },
    { titleId: 'title30', tagId: 'tag4' },
    { titleId: 'title40', tagId: 'tag4' },
  ])
}

seed()
