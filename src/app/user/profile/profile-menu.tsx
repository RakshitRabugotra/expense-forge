'use client'

const MENU_ITEMS = [
  {
    name: 'set monthly limit',
    Component: SetMonthlyLimit,
  },
]

export default function ProfileMenu() {
  return (
    <div>
      {MENU_ITEMS.map(({ name, Component }, index) => (
        <p key={index}>{name}</p>
      ))}
    </div>
  )
}

function SetMonthlyLimit() {
  return <div></div>
}
