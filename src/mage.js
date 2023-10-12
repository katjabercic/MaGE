import { WBK } from 'wikibase-sdk'

const wbk = WBK({
  instance: 'https://www.wikidata.org',
  sparqlEndpoint: 'https://query.wikidata.org/sparql'
})

// Function to retrieve information about a Wikidata item
export async function getItemInfo(itemId) {
  try {
    // Get the entity data for the given item ID
    const url = wbk.getEntities({
      ids: [itemId],
      languages: ['en'], // Replace 'en' with the desired language code
      props: ['labels', 'descriptions'], // You can customize the properties you want to fetch
      format: 'json',
      redirections: false,
    });

    const { entities } = await fetch(url).then(res => res.json())

    const entity = wbk.simplify.entity(entities[itemId])

    // Extract title and description from the entity data
    const title = entity.labels.en; // Replace 'en' with the desired language code
    const description = entity.descriptions.en; // Replace 'en' with the desired language code

    return {
      title: title.charAt(0).toUpperCase() + title.slice(1),
      description: description.charAt(0).toUpperCase() + description.slice(1) + '.'
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
