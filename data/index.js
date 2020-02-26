import fs from 'promise-fs'
import path from 'path'
import Monet from 'monet'
import csvParse from 'csv-parse'
const Maybe = Monet.Maybe

const peoplesDir = 'raw/person.json'
const readPeople = () => fs.readdir(peoplesDir).then(
  files =>
    Promise.all(files.map(f => fs.readFile(path.join(peoplesDir, f)).then(JSON.parse)))
)

const getStatus = (record) =>
  Maybe.fromUndefined(record)
    .flatMap(r => Maybe.fromUndefined(r.person))
    .flatMap(p => Maybe.fromUndefined(p.status))

const isActiveMember = (record) => {
  const status = getStatus(record)
  return status.equals(Maybe.of('Tjänstgörande riksdagsledamot'))
}

const readPeopleCsv = () => fs.readFile('raw/person.csv').then(csvParse)

// readPeople().then((people) => {
//   console.log(`Got ${people.length} entries`)
//   console.log(`Of which active: ${people.filter(isActiveMember).length}`)
//   Array.from(new Set(people.map(getStatus)
//     .filter(s => s.isJust())
//     .map(s => s.some())))
//     .filter(s => !s.startsWith('Avliden'))
//     .filter(s => !s.startsWith('Tidigare'))
//     .filter(s => !s.endsWith('minister'))
//     .filter(s => s !== 'Europaparlamentariker')
//     .forEach(console.log)
// })
//   .catch(console.error)
//

readPeopleCsv().then(console.log).catch(console.error)
