import * as R from "ramda"

const capitalize = str => str.substr(0, 1).toUpperCase() + str.substr(1, str.length)

const makeUnion = (name, branches) => {
  const branchNames = R.keys(branches)
  const branchCtors = R.values(branches)
  if (branchCtors.some((ctor) => typeof (ctor) !== 'function')) {
    throw new Error('Branches to union type has to be constructor functions that return data objects')
  }
  const mkTag = (branchName) => `${name}/${branchName}`
  const taggedCtors = R.mapObjIndexed((ctor, branchName) =>
    (...args) => {
      const result = ctor(...args)
      const tag = mkTag(branchName)
      return {tag, ...(result != null ? result : {})}
    }, branches)
  const isFunctions = R.zipObj(
    R.map(branch => `is${capitalize(branch)}`, branchNames),
    R.map((branchName) =>
        (obj) =>
          obj != null && obj.tag === `${name}/${branchName}`,
      branchNames
    )
  )
  const caseFn = (obj, cases) => {
    if (obj == null || obj.tag == null) {
      // Actually an error but fuck that
      throw new Error(`Expecting object created by ${name}`)
    }
    const tag = obj.tag.split('/')[1]
    const handler = cases[tag]
    if (handler == null && typeof(cases['otherwise']) === 'function') {
      return cases['otherwise'](obj)
    } else if (handler == null) {
      throw new Error(`Cases must be exhaustive, but case for ${tag} was not found. Use 'otherwise' to handle missing cases`)
    } else {
      return handler(obj)
    }
  }

  return {
    'case': caseFn,
    ...taggedCtors,
    ...isFunctions
  }
}

export default makeUnion