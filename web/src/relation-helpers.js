export const isInCommittee = ({roles}, committeeName, date) =>
  roles.some(role =>
    role.organ === committeeName &&
    role.from <= date &&
    role.to >= date
  )
export const isInDocument = (intressents, repId) =>
  intressents.some(int => int.intressent_id === repId)

export const isReferencedIn = (referred, referrer) =>
  referrer.references.some(ref => ref.dok_id === referred.dok_id)