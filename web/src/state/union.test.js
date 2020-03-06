import makeUnion from "./union"

const Maybe = makeUnion('Maybe', {
  Nothing: () => {
  },
  Just: (a) => ({a})
})

test('union/Nothing', () => {
  expect(Maybe.Nothing()).toEqual({tag: 'Maybe/Nothing'})
})

test('union/Just', () => {
  expect(Maybe.Just(3)).toEqual({tag: 'Maybe/Just', a: 3})
})

test('union/isNothing', () => {
  const nothing = Maybe.Nothing()
  expect(Maybe.isNothing(nothing)).toEqual(true)
  expect(Maybe.isJust(nothing)).toEqual(false)
})

test('union/isJust', () => {
  const just = Maybe.Just('hi')
  expect(Maybe.isNothing(just)).toEqual(false)
  expect(Maybe.isJust(just)).toEqual(true)
})

test('union/cases', () => {
  const just = Maybe.Just(1)
  const nothing = Maybe.Nothing()
  expect(Maybe.case(just, {
      Just: ({a}) => a.toString(),
      Nothing: () => 'Nothing'
    }
  )).toEqual('1')
  expect(Maybe.case(nothing, {
      Just: ({a}) => a.toString(),
      Nothing: () => 'Nothing'
    }
  )).toEqual('Nothing')
})

test('union/case/otherwise', () => {
  const nothing = Maybe.Nothing()
  expect(Maybe.case(nothing, {
      Just: ({a}) => a.toString(),
      otherwise: () => 'Default'
    }
  )).toEqual('Default')
})
