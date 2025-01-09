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
      imageUrl: 'https://i.imgur.com/Vj2zcfp.png',
    },
    {
      name: 'name2',
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
      imageUrl: 'https://i.imgur.com/FSXpm85.jpeg',
    },
    {
      name: 'name10',
      id: 'title10',
      typeId: 'type4',
      imageUrl: 'https://i.imgur.com/Vj2zcfp.png',
    },
    {
      name: 'name20',
      id: 'title20',
      typeId: 'type3',
      imageUrl: 'https://i.imgur.com/FSXpm85.jpeg',
    },
    {
      name: 'name30',
      id: 'title30',
      typeId: 'type2',
      imageUrl: 'Invalid URL for testing',
    },
    {
      name: 'name40',
      id: 'title40',
      typeId: 'type1',
      imageUrl: 'https://i.imgur.com/Vj2zcfp.png',
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
