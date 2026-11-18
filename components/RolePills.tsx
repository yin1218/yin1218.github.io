export default function RolePills({
  roles,
  label = 'My role',
}: {
  roles: string[]
  label?: string
}) {
  return (
    <ul className="role-pills" aria-label={label}>
      {roles.map((role) => (
        <li key={role}>{role}</li>
      ))}
    </ul>
  )
}
